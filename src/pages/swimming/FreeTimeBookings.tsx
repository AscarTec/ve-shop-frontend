
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';
import { toast } from '@/hooks/use-toast';

interface FreeTimeBooking {
  id: string;
  sessionName: string;
  date: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  currentBookings: number;
  pricePerPerson: number;
  status: 'متاحة' | 'ممتلئة' | 'ملغية' | 'مكتملة';
  instructor: string;
}

const FreeTimeBookings = () => {
  const [sessions, setSessions] = useState<FreeTimeBooking[]>([
    {
      id: '1',
      sessionName: 'جلسة السباحة الحرة المسائية',
      date: '2024-01-25',
      startTime: '17:00',
      endTime: '19:00',
      maxCapacity: 25,
      currentBookings: 18,
      pricePerPerson: 50,
      status: 'متاحة',
      instructor: 'أحمد سالم'
    },
    {
      id: '2',
      sessionName: 'جلسة السباحة الحرة الصباحية',
      date: '2024-01-26',
      startTime: '06:00',
      endTime: '08:00',
      maxCapacity: 30,
      currentBookings: 30,
      pricePerPerson: 40,
      status: 'ممتلئة',
      instructor: 'فاطمة أحمد'
    },
    {
      id: '3',
      sessionName: 'جلسة عائلية - نهاية الأسبوع',
      date: '2024-01-27',
      startTime: '14:00',
      endTime: '16:00',
      maxCapacity: 20,
      currentBookings: 12,
      pricePerPerson: 60,
      status: 'متاحة',
      instructor: 'عمر حسن'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; sessionId: string | null; sessionName: string }>({
    isOpen: false,
    sessionId: null,
    sessionName: ''
  });

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = 
      session.sessionName.includes(searchTerm) ||
      session.instructor.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'الكل' || session.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متاحة':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'ممتلئة':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'ملغية':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
      case 'مكتملة':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleDeleteClick = (session: FreeTimeBooking) => {
    setDeleteModal({
      isOpen: true,
      sessionId: session.id,
      sessionName: session.sessionName
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.sessionId) {
      setSessions(prev => prev.filter(s => s.id !== deleteModal.sessionId));
      toast({
        title: 'تم الحذف بنجاح',
        description: 'تم حذف الجلسة بنجاح',
      });
    }
    setDeleteModal({ isOpen: false, sessionId: null, sessionName: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, sessionId: null, sessionName: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            الأوقات الحرة
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة جلسات السباحة الحرة والعائلية
          </p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          إضافة جلسة جديدة
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث باسم الجلسة أو المدرب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="تصفية بالحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع الحالات</SelectItem>
                <SelectItem value="متاحة">متاحة</SelectItem>
                <SelectItem value="ممتلئة">ممتلئة</SelectItem>
                <SelectItem value="ملغية">ملغية</SelectItem>
                <SelectItem value="مكتملة">مكتملة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الجلسة</TableHead>
                <TableHead className="hidden md:table-cell">التاريخ والوقت</TableHead>
                <TableHead className="hidden sm:table-cell">السعة</TableHead>
                <TableHead className="hidden lg:table-cell">السعر للفرد</TableHead>
                <TableHead className="hidden lg:table-cell">المدرب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{session.sessionName}</div>
                      <div className="text-sm text-gray-500 md:hidden">
                        {session.date} | {session.startTime} - {session.endTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <div>{session.date}</div>
                        <div className="text-sm text-gray-500">
                          {session.startTime} - {session.endTime}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className={getCapacityColor(session.currentBookings, session.maxCapacity)}>
                      {session.currentBookings}/{session.maxCapacity}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {session.pricePerPerson} ريال
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {session.instructor}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteClick(session)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="هل أنت متأكد من حذف هذه الجلسة؟"
        itemName={deleteModal.sessionName}
      />
    </div>
  );
};

export default FreeTimeBookings;
