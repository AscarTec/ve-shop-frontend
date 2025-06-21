
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Coach, coachesService, CreateCoachData } from '@/services/coaches';
import { useState } from 'react';

const coachSchema = z.object({
  user_id: z.string().min(1, 'معرف المستخدم مطلوب'),
  specialty: z.string().min(1, 'التخصص مطلوب'),
  certification: z.string().optional(),
  experience_years: z.number().min(0).optional()
});

interface CoachFormProps {
  coach?: Coach | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CoachForm: React.FC<CoachFormProps> = ({
  coach,
  onSuccess,
  onCancel
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CreateCoachData>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      user_id: coach?.user_id || '',
      specialty: coach?.specialty || '',
      certification: coach?.certification || '',
      experience_years: coach?.experience_years || 0
    }
  });

  const onSubmit = async (data: CreateCoachData) => {
    setLoading(true);
    try {
      if (coach) {
        await coachesService.updateCoach(coach.id, data);
      } else {
        await coachesService.createCoach(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving coach:', error);
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    'كرة القدم',
    'السباحة',
    'كرة السلة',
    'التنس',
    'الكرة الطائرة',
    'الجمباز',
    'ألعاب القوى',
    'الفنون القتالية'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="user_id">معرف المستخدم *</Label>
        <Input
          id="user_id"
          {...register('user_id')}
          placeholder="أدخل معرف المستخدم"
          disabled={loading}
        />
        {errors.user_id && (
          <p className="text-sm text-red-600 mt-1">{errors.user_id.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="specialty">التخصص *</Label>
        <Select
          value={watch('specialty') || ''}
          onValueChange={(value) => setValue('specialty', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر التخصص" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.specialty && (
          <p className="text-sm text-red-600 mt-1">{errors.specialty.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="certification">الشهادة</Label>
        <Input
          id="certification"
          {...register('certification')}
          placeholder="أدخل الشهادة"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="experience_years">سنوات الخبرة</Label>
        <Input
          id="experience_years"
          type="number"
          min="0"
          {...register('experience_years', { valueAsNumber: true })}
          placeholder="أدخل سنوات الخبرة"
          disabled={loading}
        />
        {errors.experience_years && (
          <p className="text-sm text-red-600 mt-1">{errors.experience_years.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'جاري الحفظ...' : (coach ? 'تحديث' : 'إنشاء')}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          إلغاء
        </Button>
      </div>
    </form>
  );
};
