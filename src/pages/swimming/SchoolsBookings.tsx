
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';
import { toast } from '@/hooks/use-toast';

interface SchoolBooking {
  id: string;
  schoolName: string;
  contactPerson: string;
  phone: string;
  studentsCount: number;
  ageGroup: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  depositPaid: number;
  status: 'معلقة' | 'مؤكدة' | 'مكتملة' | 'ملغية';
  instructor: string;
  notes: string;
}

const SchoolsBookings = () => {
  const [bookings, setBookings] = useState<SchoolBooking[]>([
    {
      id: '1',
      schoolName: 'مدرسة الفيصل الأهلية',
      contactPerson: 'محمد أحمد السالم',
      phone: '+966501234567',
      studentsCount: 25,
      ageGroup: '12-15 سنة',
      date: '2024-01-28',
      startTime: '09:00',
      endTime: '11:00',
      totalPrice: 1000,
      depositPaid: 300,
      status: 'مؤكدة',
      instructor: 'أحمد سالم',
      notes: 'برنامج تعليم السباحة للمبتدئين'
    },
    {
      id: '2',
      schoolName: 'مدرسة الأندلس الابتدائية',
      contactPerson: 'فاطمة عبدالله',
      phone: '+966507654321',
      studentsCount: 18,
      ageGroup: '8-10 سنوات',
      date: '2024-01-29',
      startTime: '10:00',
      endTime: '12:00',
      totalPrice: 800,
      depositPaid: 0,
      status: 'معلقة',
      instructor: 'ليلى محمد',
      notes: 'أول مرة للطلاب في السباحة'
    },
    {
      id: '3',
      schoolName: 'مدرسة النور الثانوية',
      contactPerson: 'عمر حسن النجار',
      phone: '+966509876543',
      studentsCount: 30,
      ageGroup: '16-18 سنة',
      date: '2024-01-30',
      startTime: '14:00',
      endTime: '16:00',
      totalPrice: 1200,
      depositPaid: 1200,
      status: 'مكتملة',
      instructor: 'خالد أحمد',
      notes: 'تدريب متقدم للسباحة'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; bookingId: string | null; schoolName: string }>({
    isOpen: false,
    bookingId: null,
    schoolName: ''
  });

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.schoolName.includes(searchTerm) ||
      booking.contactPerson.includes(searchTerm) ||
      booking.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'الكل' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'معلقة':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'مؤكدة':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'مكتملة':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'ملغية':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  const handleDeleteClick = (booking: SchoolBooking) => {
    setDeleteModal({
      isOpen: true,
      bookingId: booking.id,
      schoolName: booking.schoolName
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.bookingId) {
      setBookings(prev => prev.filter(b => b.id !== deleteModal.bookingId));
      toast({
        title: 'تم الحذف بنجاح',
        description: 'تم حذف حجز المدرسة بنجاح',
      });
    }
    setDeleteModal({ isOpen: false, bookingId: null, schoolName: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, bookingId: null, schoolName: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            حجوزات المدارس
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة حجوزات المدارس والأنشطة التعليمية
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          حجز مدرسة جديد
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
                placeholder="البحث باسم المدرسة، جهة الاتصال، أو رقم الهاتف..."
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
                <SelectItem value="معلقة">معلقة</SelectItem>
                <SelectItem value="مؤكدة">مؤكدة</SelectItem>
                <SelectItem value="مكتملة">مكتملة</SelectItem>
                <SelectItem value="ملغية">ملغية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Schools Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم المدرسة</TableHead>
                <TableHead className="hidden md:table-cell">جهة الاتصال</TableHead>
                <TableHead className="hidden sm:table-cell">عدد الطلاب</TableHead>
                <TableHead className="hidden lg:table-cell">العمر</TableHead>
                <TableHead className="hidden lg:table-cell">التاريخ والوقت</TableHead>
                <TableHead className="hidden xl:table-cell">المبلغ الإجمالي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-semibold">{booking.schoolName}</div>
                        <div className="text-sm text-gray-500 md:hidden">
                          {booking.contactPerson}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>
                      <div className="font-medium">{booking.contactPerson}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      {booking.studentsCount}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {booking.ageGroup}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div>
                      <div>{booking.date}</div>
                      <div className="text-sm text-gray-500">
                        {booking.startTime} - {booking.endTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <div>
                      <div className="font-medium">{booking.totalPrice} ريال</div>
                      <div className="text-sm text-gray-500">
                        مقدم: {booking.depositPaid} ريال
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
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
                        onClick={() => handleDeleteClick(booking)}
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
        message="هل أنت متأكد من حذف حجز هذه المدرسة؟"
        itemName={deleteModal.schoolName}
      />
    </div>
  );
};

export default SchoolsBookings;
