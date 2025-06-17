
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const activitySchema = z.object({
  name: z.string().min(2, 'Activity name is required'),
  type: z.enum(['swimming', 'field'], { required_error: 'Activity type is required' }),
  category: z.string().min(1, 'Category is required'),
  duration: z.number().min(30, 'Duration must be at least 30 minutes'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.string().optional(),
  isActive: z.boolean().default(true),
});

type ActivityFormData = z.infer<typeof activitySchema>;

interface ActivityFormProps {
  initialData?: Partial<ActivityFormData>;
  onSubmit: (data: ActivityFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const { t } = useTranslation();
  
  const form = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: initialData?.name || '',
      type: initialData?.type || undefined,
      category: initialData?.category || '',
      duration: initialData?.duration || 60,
      capacity: initialData?.capacity || 1,
      price: initialData?.price || 0,
      description: initialData?.description || '',
      requirements: initialData?.requirements || '',
      isActive: initialData?.isActive ?? true,
    }
  });

  const handleSubmit = async (data: ActivityFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {initialData ? t('edit_activity') : t('add_activity')}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('activity_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enter_activity_name')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('activity_type')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_type')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="swimming">{t('swimming')}</SelectItem>
                      <SelectItem value="field">{t('field_sports')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('category')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('enter_category')} {...field} />
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
                  <FormLabel>{t('duration_minutes')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="30" 
                      step="15"
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
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('capacity')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('price')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('enter_description')} 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('requirements')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('enter_requirements')} 
                    {...field} 
                  />
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

export default ActivityForm;
