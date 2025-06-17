
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';
import { toast } from '@/hooks/use-toast';

interface PrivateBooking {
  id: string;
  bookingNumber: string;
  clientName: string;
  phone: string;
  date: string;
  time: string;
  duration: number;
  totalPrice: number;
  depositPaid: number;
  remainingAmount: number;
  status: 'معلقة' | 'تم دفع المقدم' | 'مؤكدة' | 'مكتملة' | 'ملغية';
  createdAt: string;
}

const PrivateBookings = () => {
  const [bookings, setBookings] = useState<PrivateBooking[]>([
    {
      id: '1',
      bookingNumber: 'PVS-001',
      clientName: 'أحمد محمد الأحمد',
      phone: '+966501234567',
      date: '2024-01-25',
      time: '10:00',
      duration: 2,
      totalPrice: 400,
      depositPaid: 120,
      remainingAmount: 280,
      status: 'تم دفع المقدم',
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      bookingNumber: 'PVS-002',
      clientName: 'فاطمة سالم الزهراء',
      phone: '+966507654321',
      date: '2024-01-26',
      time: '14:00',
      duration: 1,
      totalPrice: 200,
      depositPaid: 60,
      remainingAmount: 140,
      status: 'مؤكدة',
      createdAt: '2024-01-21'
    },
    {
      id: '3',
      bookingNumber: 'PVS-003',
      clientName: 'خالد عبدالله النصر',
      phone: '+966509876543',
      date: '2024-01-24',
      time: '16:00',
      duration: 3,
      totalPrice: 600,
      depositPaid: 0,
      remainingAmount: 600,
      status: 'معلقة',
      createdAt: '2024-01-22'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; bookingId: string | null; clientName: string }>({
    isOpen: false,
    bookingId: null,
    clientName: ''
  });

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.clientName.includes(searchTerm) ||
      booking.bookingNumber.includes(searchTerm) ||
      booking.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'الكل' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'معلقة':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'تم دفع المقدم':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'مؤكدة':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'مكتملة':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'ملغية':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  const handleDeleteClick = (booking: PrivateBooking) => {
    setDeleteModal({
      isOpen: true,
      bookingId: booking.id,
      clientName: booking.clientName
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.bookingId) {
      setBookings(prev => prev.filter(b => b.id !== deleteModal.bookingId));
      toast({
        title: 'تم الحذف بنجاح',
        description: 'تم حذف الحجز بنجاح',
      });
    }
    setDeleteModal({ isOpen: false, bookingId: null, clientName: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, bookingId: null, clientName: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            الحجوزات الخاصة
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة جلسات السباحة الخاصة
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          حجز جديد
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
                placeholder="البحث بالاسم، رقم الحجز، أو الهاتف..."
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
                <SelectItem value="تم دفع المقدم">تم دفع المقدم</SelectItem>
                <SelectItem value="مؤكدة">مؤكدة</SelectItem>
                <SelectItem value="مكتملة">مكتملة</SelectItem>
                <SelectItem value="ملغية">ملغية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الحجز</TableHead>
                <TableHead>اسم العميل</TableHead>
                <TableHead className="hidden md:table-cell">التاريخ والوقت</TableHead>
                <TableHead className="hidden sm:table-cell">المدة</TableHead>
                <TableHead className="hidden lg:table-cell">المبلغ الإجمالي</TableHead>
                <TableHead className="hidden lg:table-cell">المقدم المدفوع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.bookingNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{booking.clientName}</div>
                      <div className="text-sm text-gray-500 md:hidden">
                        {booking.date} - {booking.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>
                      <div>{booking.date}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {booking.duration} ساعة
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {booking.totalPrice} ريال
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {booking.depositPaid} ريال
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
        message="هل أنت متأكد من حذف هذا الحجز؟"
        itemName={deleteModal.clientName}
      />
    </div>
  );
};

export default PrivateBookings;
