
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { facilitiesService, SwimmingActivity, FieldActivity } from '@/services/facilities';
import { useToast } from '@/hooks/use-toast';

interface FacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  facility: SwimmingActivity | FieldActivity | null;
  type: 'swimming' | 'field';
}

export const FacilityModal: React.FC<FacilityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  facility,
  type
}) => {
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    unit_type: 'hour' as 'hour' | 'session',
    price: '',
    deposit_percentage: '',
    active: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (facility) {
      setFormData({
        title_ar: facility.title_ar,
        title_en: facility.title_en || '',
        unit_type: facility.unit_type,
        price: facility.price.toString(),
        deposit_percentage: facility.deposit_percentage.toString(),
        active: facility.active
      });
    } else {
      setFormData({
        title_ar: '',
        title_en: '',
        unit_type: 'hour',
        price: '',
        deposit_percentage: '30',
        active: true
      });
    }
  }, [facility, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        title_ar: formData.title_ar,
        title_en: formData.title_en || null,
        unit_type: formData.unit_type,
        price: parseFloat(formData.price),
        deposit_percentage: parseInt(formData.deposit_percentage),
        active: formData.active
      };

      if (facility) {
        // Update existing facility
        if (type === 'swimming') {
          await facilitiesService.updateSwimmingActivity(facility.id, data);
        } else {
          await facilitiesService.updateFieldActivity(facility.id, data);
        }
        toast({
          title: 'تم التحديث',
          description: 'تم تحديث المرفق بنجاح'
        });
      } else {
        // Create new facility
        if (type === 'swimming') {
          await facilitiesService.createSwimmingActivity(data);
        } else {
          await facilitiesService.createFieldActivity(data);
        }
        toast({
          title: 'تم الإنشاء',
          description: 'تم إنشاء المرفق بنجاح'
        });
      }

      onSave();
      onClose();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في حفظ المرفق',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {facility ? 'تعديل المرفق' : `إضافة ${type === 'swimming' ? 'نشاط سباحة' : 'نشاط ملعب'}`}
          </DialogTitle>
          <DialogDescription>
            {facility ? 'قم بتعديل بيانات المرفق' : 'أدخل بيانات المرفق الجديد'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title_ar">الاسم بالعربية *</Label>
            <Input
              id="title_ar"
              value={formData.title_ar}
              onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title_en">الاسم بالإنجليزية</Label>
            <Input
              id="title_en"
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit_type">نوع الوحدة *</Label>
              <Select
                value={formData.unit_type}
                onValueChange={(value: 'hour' | 'session') => 
                  setFormData({ ...formData, unit_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">ساعة</SelectItem>
                  <SelectItem value="session">جلسة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">السعر (ر.س) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deposit_percentage">نسبة المقدم (%) *</Label>
            <Input
              id="deposit_percentage"
              type="number"
              min="0"
              max="100"
              value={formData.deposit_percentage}
              onChange={(e) => setFormData({ ...formData, deposit_percentage: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">نشط</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'جاري الحفظ...' : (facility ? 'تحديث' : 'إنشاء')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
