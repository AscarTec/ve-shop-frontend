
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  initialData?: Partial<ClientFormData>;
  onSubmit: (data: ClientFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const { t } = useTranslation();
  
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      dateOfBirth: initialData?.dateOfBirth || '',
      gender: initialData?.gender || undefined,
      address: initialData?.address || '',
      emergencyContact: initialData?.emergencyContact || '',
    }
  });

  const handleSubmit = async (data: ClientFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {initialData ? t('edit_client') : t('add_client')}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('full_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enter_full_name')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('enter_email')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('phone')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enter_phone')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('date_of_birth')}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('gender')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_gender')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">{t('male')}</SelectItem>
                      <SelectItem value="female">{t('female')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('emergency_contact')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enter_emergency_contact')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('address')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('enter_address')} {...field} />
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

export default ClientForm;
