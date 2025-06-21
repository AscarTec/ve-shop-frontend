
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { coachesService, Coach } from '@/services/coaches';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CoachForm } from '@/components/forms/CoachForm';
import { ConfirmDeleteModal } from '@/components/forms/ConfirmDeleteModal';
import { toast } from 'sonner';

const Coaches: React.FC = () => {
  const { t } = useTranslation();
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const data = await coachesService.getCoaches();
      setCoaches(data);
    } catch (error) {
      console.error('Error fetching coaches:', error);
      toast.error('فشل في تحميل المدربين');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoach = () => {
    setSelectedCoach(null);
    setIsFormOpen(true);
  };

  const handleEditCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsFormOpen(true);
  };

  const handleDeleteCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedCoach(null);
    fetchCoaches();
    toast.success(selectedCoach ? 'تم تحديث المدرب بنجاح' : 'تم إنشاء المدرب بنجاح');
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCoach) return;
    
    try {
      await coachesService.deleteCoach(selectedCoach.id);
      setIsDeleteOpen(false);
      setSelectedCoach(null);
      fetchCoaches();
      toast.success('تم حذف المدرب بنجاح');
    } catch (error) {
      console.error('Error deleting coach:', error);
      toast.error('فشل في حذف المدرب');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة المدربين</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateCoach}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة مدرب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedCoach ? 'تعديل المدرب' : 'إضافة مدرب جديد'}
              </DialogTitle>
            </DialogHeader>
            <CoachForm
              coach={selectedCoach}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            قائمة المدربين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>التخصص</TableHead>
                <TableHead>الشهادة</TableHead>
                <TableHead>سنوات الخبرة</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coaches.map((coach) => (
                <TableRow key={coach.id}>
                  <TableCell>
                    <Badge variant="outline">{coach.specialty}</Badge>
                  </TableCell>
                  <TableCell>{coach.certification || 'غير محدد'}</TableCell>
                  <TableCell>{coach.experience_years} سنة</TableCell>
                  <TableCell>
                    {new Date(coach.created_at).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCoach(coach)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteCoach(coach)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {coaches.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد مدربين مسجلين حالياً
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="حذف المدرب"
        description={`هل أنت متأكد من حذف هذا المدرب؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </div>
  );
};

export default Coaches;
