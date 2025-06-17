
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const bookingSchema = z.object({
  clientName: z.string().min(2, 'Client name is required'),
  activityType: z.enum(['swimming', 'football', 'basketball', 'tennis'], { required_error: 'Activity type is required' }),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.number().min(1, 'Duration must be at least 1 hour'),
  status: z.enum(['pending', 'confirmed', 'cancelled'], { required_error: 'Status is required' }),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  initialData?: Partial<BookingFormData>;
  onSubmit: (data: BookingFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const { t } = useTranslation();
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      clientName: initialData?.clientName || '',
      activityType: initialData?.activityType || undefined,
      date: initialData?.date || '',
      time: initialData?.time || '',
      duration: initialData?.duration || 1,
      status: initialData?.status || 'pending',
      notes: initialData?.notes || '',
    }
  });

  const handleSubmit = async (data: BookingFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {initialData ? t('edit_booking') : t('new_booking')}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('client_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enter_client_name')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="activityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('activity_type')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_activity')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="swimming">{t('swimming')}</SelectItem>
                      <SelectItem value="football">{t('football')}</SelectItem>
                      <SelectItem value="basketball">{t('basketball')}</SelectItem>
                      <SelectItem value="tennis">{t('tennis')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('booking_date')}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('booking_time')}</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('duration_hours')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="8"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('booking_status')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_status')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">{t('pending')}</SelectItem>
                      <SelectItem value="confirmed">{t('confirmed')}</SelectItem>
                      <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('notes')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_notes')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-4 justify-end pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? t('saving') : t('save')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
