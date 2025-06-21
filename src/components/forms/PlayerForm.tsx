
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Player, playersService, CreatePlayerData } from '@/services/players';
import { useState } from 'react';

const playerSchema = z.object({
  user_id: z.string().min(1, 'معرف المستخدم مطلوب'),
  position: z.string().optional(),
  team: z.string().optional(),
  rating: z.number().min(1).max(10).optional()
});

interface PlayerFormProps {
  player?: Player | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PlayerForm: React.FC<PlayerFormProps> = ({
  player,
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
  } = useForm<CreatePlayerData>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      user_id: player?.user_id || '',
      position: player?.position || '',
      team: player?.team || '',
      rating: player?.rating || undefined
    }
  });

  const onSubmit = async (data: CreatePlayerData) => {
    setLoading(true);
    try {
      if (player) {
        await playersService.updatePlayer(player.id, data);
      } else {
        await playersService.createPlayer(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving player:', error);
    } finally {
      setLoading(false);
    }
  };

  const positions = [
    'حارس مرمى',
    'مدافع',
    'لاعب وسط',
    'مهاجم',
    'جناح أيمن',
    'جناح أيسر'
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
        <Label htmlFor="position">المركز</Label>
        <Select
          value={watch('position') || ''}
          onValueChange={(value) => setValue('position', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر المركز" />
          </SelectTrigger>
          <SelectContent>
            {positions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="team">الفريق</Label>
        <Input
          id="team"
          {...register('team')}
          placeholder="أدخل اسم الفريق"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="rating">التقييم (1-10)</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="10"
          {...register('rating', { valueAsNumber: true })}
          placeholder="أدخل التقييم"
          disabled={loading}
        />
        {errors.rating && (
          <p className="text-sm text-red-600 mt-1">{errors.rating.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'جاري الحفظ...' : (player ? 'تحديث' : 'إنشاء')}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          إلغاء
        </Button>
      </div>
    </form>
  );
};
