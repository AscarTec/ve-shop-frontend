import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  CreditCard,
  Target,
  Waves,
  Plus,
  Edit,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const appointmentSchema = z.object({
  clientPhone: z.string().min(10, 'رقم الهاتف مطلوب'),
  clientName: z.string().min(2, 'اسم العميل مطلوب'),
  activityType: z.enum(['courts', 'swimming']),
  selectedType: z.string().min(1, 'نوع النشاط مطلوب'),
  selectedDate: z.date({
    required_error: 'التاريخ مطلوب',
  }),
  selectedTime: z.string().min(1, 'الوقت مطلوب'),
  duration: z.number().min(1, 'المدة مطلوبة'),
  price: z.number().min(1, 'السعر مطلوب'),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  activityType: 'courts' | 'swimming';
  selectedType: string;
  selectedDate: Date;
  selectedTime: string;
  duration: number;
  price: number;
  status: string;
  notes?: string;
  createdAt?: Date;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: Appointment;
  mode?: 'create' | 'edit' | 'view';
}

const courtTypes = [
  { value: 'football', label: 'ملعب كرة قدم', price: 200 },
  { value: 'basketball', label: 'ملعب كرة سلة', price: 150 },
  { value: 'tennis', label: 'ملعب تنس', price: 100 },
];

const swimmingTypes = [
  { value: 'free', label: 'فترة حرة', price: 50 },
  { value: 'private', label: 'جلسة خاصة', price: 150 },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

export function AppointmentModal({ isOpen, onClose, appointment, mode = 'create' }: AppointmentModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'management'>('details');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      clientPhone: '',
      clientName: '',
      activityType: 'courts',
      selectedType: '',
      selectedDate: new Date(),
      selectedTime: '',
      duration: 1,
      price: 0,
      notes: '',
    },
  });

  const watchActivityType = form.watch('activityType');
  const watchSelectedType = form.watch('selectedType');
  const watchDuration = form.watch('duration');

  // Auto-calculate price based on activity type, selected type and duration
  useEffect(() => {
    const types = watchActivityType === 'courts' ? courtTypes : swimmingTypes;
    const selectedTypeData = types.find((t) => t.value === watchSelectedType);
    if (selectedTypeData && watchDuration) {
      form.setValue('price', selectedTypeData.price * watchDuration);
    }
  }, [watchActivityType, watchSelectedType, watchDuration, form]);

  // Load existing appointments
  useEffect(() => {
    if (isOpen) {
      // Mock data - replace with actual API call
      setAppointments([
        {
          id: '1',
          clientName: 'محمد أحمد',
          clientPhone: '+966501234567',
          activityType: 'courts',
          selectedType: 'football',
          selectedDate: new Date(),
          selectedTime: '10:00',
          duration: 2,
          price: 400,
          status: 'confirmed',
          notes: 'حجز مؤكد'
        },
        {
          id: '2',
          clientName: 'سارة علي',
          clientPhone: '+966507654321',
          activityType: 'swimming',
          selectedType: 'private',
          selectedDate: new Date(),
          selectedTime: '14:00',
          duration: 1,
          price: 150,
          status: 'pending',
          notes: 'في انتظار الدفع'
        }
      ]);
    }
  }, [isOpen]);

  const onSubmit = (data: AppointmentFormData) => {
    console.log('Creating appointment:', data);
    
    // Create properly typed appointment object
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      activityType: data.activityType,
      selectedType: data.selectedType,
      selectedDate: data.selectedDate,
      selectedTime: data.selectedTime,
      duration: data.duration,
      price: data.price,
      status: 'confirmed',
      notes: data.notes,
      createdAt: new Date(),
    };

    setAppointments(prev => [...prev, newAppointment]);
    
    toast({
      title: "تم إنشاء الحجز بنجاح",
      description: `تم إنشاء حجز جديد للعميل ${data.clientName}`,
    });

    form.reset();
    onClose();
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    form.reset({
      clientPhone: appointment.clientPhone,
      clientName: appointment.clientName,
      activityType: appointment.activityType,
      selectedType: appointment.selectedType,
      selectedDate: new Date(appointment.selectedDate),
      selectedTime: appointment.selectedTime,
      duration: appointment.duration,
      price: appointment.price,
      notes: appointment.notes,
    });
    setActiveTab('details');
  };

  const handleDelete = (appointmentId: string) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    toast({
      title: "تم حذف الحجز",
      description: "تم حذف الحجز بنجاح",
      variant: "destructive",
    });
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId 
          ? { ...app, status: newStatus }
          : app
      )
    );
    toast({
      title: "تم تحديث حالة الحجز",
      description: `تم تغيير حالة الحجز إلى ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'pending': return 'معلق';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };

  const handleTabChange = (value: string) => {
    if (value === 'details' || value === 'management') {
      setActiveTab(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-blue-600" />
            إدارة الحجوزات
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="details" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>حجز جديد</span>
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>إدارة الحجوزات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Information */}
                  <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      معلومات العميل
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم العميل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسم العميل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            رقم الهاتف
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="+966xxxxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Activity Information */}
                  <div className="space-y-4 p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      تفاصيل النشاط
                    </h3>

                    <FormField
                      control={form.control}
                      name="activityType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نوع النشاط</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر نوع النشاط" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="courts">
                                <div className="flex items-center space-x-2">
                                  <Target className="h-4 w-4" />
                                  <span>الملاعب الرياضية</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="swimming">
                                <div className="flex items-center space-x-2">
                                  <Waves className="h-4 w-4" />
                                  <span>حمام السباحة</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="selectedType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>التخصص</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر التخصص" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {(watchActivityType === 'courts' ? courtTypes : swimmingTypes).map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{type.label}</span>
                                    <Badge variant="secondary">{type.price} ريال/ساعة</Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Date Selection */}
                  <FormField
                    control={form.control}
                    name="selectedDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>التاريخ</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ar })
                                ) : (
                                  <span>اختر التاريخ</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Time Selection */}
                  <FormField
                    control={form.control}
                    name="selectedTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          الوقت
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الوقت" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدة (ساعات)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="8"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Price and Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" />
                          السعر الإجمالي
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              className="pl-16"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              ريال
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ملاحظات</FormLabel>
                        <FormControl>
                          <Input placeholder="ملاحظات إضافية..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-3 space-x-reverse">
                  <Button type="button" variant="outline" onClick={onClose}>
                    إلغاء
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    إنشاء الحجز
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="management" className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  الحجوزات الحالية
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 space-x-reverse mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {appointment.clientName}
                          </h4>
                          <Badge className={`${getStatusColor(appointment.status)} text-white`}>
                            {getStatusText(appointment.status)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>{appointment.clientPhone}</span>
                          <span>{format(new Date(appointment.selectedDate), 'dd/MM/yyyy')}</span>
                          <span>{appointment.selectedTime}</span>
                          <span>{appointment.price} ريال</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(appointment)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {appointment.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                            className="hover:bg-green-50 hover:border-green-300 text-green-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                          className="hover:bg-red-50 hover:border-red-300 text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(appointment.id)}
                          className="hover:bg-red-50 hover:border-red-300 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    لا توجد حجوزات حالياً
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
