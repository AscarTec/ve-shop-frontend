
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { playersService, Player } from '@/services/players';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlayerForm } from '@/components/forms/PlayerForm';
import { ConfirmDeleteModal } from '@/components/forms/ConfirmDeleteModal';
import { toast } from 'sonner';

const Players: React.FC = () => {
  const { t } = useTranslation();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const data = await playersService.getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
      toast.error('فشل في تحميل اللاعبين');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlayer = () => {
    setSelectedPlayer(null);
    setIsFormOpen(true);
  };

  const handleEditPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsFormOpen(true);
  };

  const handleDeletePlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedPlayer(null);
    fetchPlayers();
    toast.success(selectedPlayer ? 'تم تحديث اللاعب بنجاح' : 'تم إنشاء اللاعب بنجاح');
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPlayer) return;
    
    try {
      await playersService.deletePlayer(selectedPlayer.id);
      setIsDeleteOpen(false);
      setSelectedPlayer(null);
      fetchPlayers();
      toast.success('تم حذف اللاعب بنجاح');
    } catch (error) {
      console.error('Error deleting player:', error);
      toast.error('فشل في حذف اللاعب');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة اللاعبين</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreatePlayer}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة لاعب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedPlayer ? 'تعديل اللاعب' : 'إضافة لاعب جديد'}
              </DialogTitle>
            </DialogHeader>
            <PlayerForm
              player={selectedPlayer}
              onSuccess={handleFormSuccess}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            قائمة اللاعبين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المركز</TableHead>
                <TableHead>الفريق</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.position || 'غير محدد'}</TableCell>
                  <TableCell>{player.team || 'غير محدد'}</TableCell>
                  <TableCell>
                    {player.rating ? (
                      <Badge variant="secondary">{player.rating}/10</Badge>
                    ) : (
                      'غير مقيم'
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(player.created_at).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPlayer(player)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeletePlayer(player)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {players.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد لاعبين مسجلين حالياً
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="حذف اللاعب"
        description={`هل أنت متأكد من حذف هذا اللاعب؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </div>
  );
};

export default Players;
