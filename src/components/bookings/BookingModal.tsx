
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { bookingsService, Booking, CreateBookingData } from '@/services/bookings';
import { clientsService, Client } from '@/services/clients';
import { facilitiesService, SwimmingActivity, FieldActivity } from '@/services/facilities';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  booking: Booking | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  booking
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [swimmingActivities, setSwimmingActivities] = useState<SwimmingActivity[]>([]);
  const [fieldActivities, setFieldActivities] = useState<FieldActivity[]>([]);
  const [formData, setFormData] = useState({
    client_id: '',
    activity_type: 'swimming' as 'swimming' | 'field',
    activity_id: '',
    start_time: '',
    end_time: '',
    duration: '',
    notes: ''
  });
  const [selectedActivity, setSelectedActivity] = useState<SwimmingActivity | FieldActivity | null>(null);
  const [pricing, setPricing] = useState({
    totalPrice: 0,
    depositAmount: 0,
    remainingAmount: 0
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (booking) {
      setFormData({
        client_id: booking.client_id,
        activity_type: booking.activity_type,
        activity_id: booking.activity_id.toString(),
        start_time: new Date(booking.start_time).toISOString().slice(0, 16),
        end_time: new Date(booking.end_time).toISOString().slice(0, 16),
        duration: booking.duration.toString(),
        notes: booking.notes || ''
      });
      setPricing({
        totalPrice: booking.total_price,
        depositAmount: booking.deposit_amount,
        remainingAmount: booking.remaining_amount
      });
    } else {
      resetForm();
    }
  }, [booking, isOpen]);

  useEffect(() => {
    calculatePricing();
  }, [formData.activity_id, formData.duration, formData.activity_type]);

  const fetchData = async () => {
    try {
      const [clientsData, swimmingData, fieldData] = await Promise.all([
        clientsService.getClients(),
        facilitiesService.getSwimmingActivities(),
        facilitiesService.getFieldActivities()
      ]);
      setClients(clientsData);
      setSwimmingActivities(swimmingData);
      setFieldActivities(fieldData);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل البيانات',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      client_id: '',
      activity_type: 'swimming',
      activity_id: '',
      start_time: '',
      end_time: '',
      duration: '1',
      notes: ''
    });
    setPricing({
      totalPrice: 0,
      depositAmount: 0,
      remainingAmount: 0
    });
    setSelectedActivity(null);
  };

  const calculatePricing = () => {
    if (!formData.activity_id || !formData.duration) return;

    const activities = formData.activity_type === 'swimming' ? swimmingActivities : fieldActivities;
    const activity = activities.find(a => a.id === parseInt(formData.activity_id));
    
    if (activity) {
      setSelectedActivity(activity);
      const duration = parseInt(formData.duration);
      const totalPrice = activity.price * duration;
      const depositAmount = (totalPrice * activity.deposit_percentage) / 100;
      const remainingAmount = totalPrice - depositAmount;
      
      setPricing({
        totalPrice,
        depositAmount,
        remainingAmount
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData: CreateBookingData = {
        client_id: formData.client_id,
        activity_id: parseInt(formData.activity_id),
        activity_type: formData.activity_type,
        start_time: formData.start_time,
        end_time: formData.end_time,
        duration: parseInt(formData.duration),
        total_price: pricing.totalPrice,
        deposit_amount: pricing.depositAmount,
        remaining_amount: pricing.remainingAmount,
        notes: formData.notes || undefined
      };

      if (booking) {
        await bookingsService.updateBooking(booking.id, bookingData);
        toast({
          title: 'تم التحديث',
          description: 'تم تحديث الحجز بنجاح'
        });
      } else {
        await bookingsService.createBooking(bookingData);
        toast({
          title: 'تم الإنشاء',
          description: 'تم إنشاء الحجز بنجاح'
        });
      }

      onSave();
      onClose();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في حفظ الحجز',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentActivities = () => {
    return formData.activity_type === 'swimming' ? swimmingActivities : fieldActivities;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {booking ? 'تفاصيل الحجز' : 'حجز جديد'}
          </DialogTitle>
          <DialogDescription>
            {booking ? 'عرض وتعديل تفاصيل الحجز' : 'إنشاء حجز جديد'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Selection */}
          <div className="space-y-2">
            <Label htmlFor="client_id">العميل *</Label>
            <Select
              value={formData.client_id}
              onValueChange={(value) => setFormData({ ...formData, client_id: value })}
              disabled={!!booking}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر العميل" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.full_name} - {client.phone_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Activity Type */}
          <div className="space-y-2">
            <Label htmlFor="activity_type">نوع النشاط *</Label>
            <Select
              value={formData.activity_type}
              onValueChange={(value: 'swimming' | 'field') => 
                setFormData({ ...formData, activity_type: value, activity_id: '' })
              }
              disabled={!!booking}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="swimming">سباحة</SelectItem>
                <SelectItem value="field">ملاعب</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Activity Selection */}
          <div className="space-y-2">
            <Label htmlFor="activity_id">النشاط *</Label>
            <Select
              value={formData.activity_id}
              onValueChange={(value) => setFormData({ ...formData, activity_id: value })}
              disabled={!!booking}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر النشاط" />
              </SelectTrigger>
              <SelectContent>
                {getCurrentActivities().map((activity) => (
                  <SelectItem key={activity.id} value={activity.id.toString()}>
                    {activity.title_ar} - {activity.price} ر.س/{activity.unit_type === 'hour' ? 'ساعة' : 'جلسة'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time">وقت البداية *</Label>
              <Input
                id="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
                disabled={!!booking}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time">وقت النهاية *</Label>
              <Input
                id="end_time"
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
                disabled={!!booking}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">المدة *</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
              disabled={!!booking}
            />
          </div>

          {/* Pricing Information */}
          {selectedActivity && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تفاصيل التسعير</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">المبلغ الإجمالي</p>
                    <p className="text-xl font-bold text-blue-600">{pricing.totalPrice} ر.س</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المقدم ({selectedActivity.deposit_percentage}%)</p>
                    <p className="text-xl font-bold text-orange-600">{pricing.depositAmount} ر.س</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المبلغ المتبقي</p>
                    <p className="text-xl font-bold text-green-600">{pricing.remainingAmount} ر.س</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            {!booking && (
              <Button type="submit" disabled={loading}>
                {loading ? 'جاري الحفظ...' : 'إنشاء الحجز'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
