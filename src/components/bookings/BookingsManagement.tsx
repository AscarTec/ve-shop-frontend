
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, Calendar, Clock, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { bookingsService, Booking } from '@/services/bookings';
import { BookingModal } from './BookingModal';
import { useToast } from '@/hooks/use-toast';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter, typeFilter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingsService.getBookings();
      setBookings(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الحجوزات',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.clients?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.clients?.phone_number?.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(booking => booking.activity_type === typeFilter);
    }

    setFilteredBookings(filtered);
  };

  const handleCreateBooking = () => {
    setSelectedBooking(null);
    setIsModalOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      await bookingsService.updateBookingStatus(bookingId, newStatus);
      await fetchBookings();
      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة الحجز بنجاح'
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة الحجز',
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    const statusConfig = {
      pending: { label: 'معلق', variant: 'secondary' as const },
      deposit_paid: { label: 'تم دفع المقدم', variant: 'default' as const },
      confirmed: { label: 'مؤكد', variant: 'default' as const },
      completed: { label: 'مكتمل', variant: 'default' as const },
      cancelled: { label: 'ملغي', variant: 'destructive' as const }
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('ar-SA'),
      time: date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">إدارة الحجوزات</h1>
        <Button onClick={handleCreateBooking}>
          <Plus className="w-4 h-4 ml-2" />
          حجز جديد
        </Button>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي الحجوزات', value: bookings.length, icon: Calendar },
          { label: 'الحجوزات المعلقة', value: bookings.filter(b => b.status === 'pending').length, icon: Clock },
          { label: 'الحجوزات المؤكدة', value: bookings.filter(b => b.status === 'confirmed').length, icon: User },
          { label: 'الحجوزات المكتملة', value: bookings.filter(b => b.status === 'completed').length, icon: CreditCard }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والتصفية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث برقم الحجز أو اسم العميل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">معلق</SelectItem>
                <SelectItem value="deposit_paid">تم دفع المقدم</SelectItem>
                <SelectItem value="confirmed">مؤكد</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="نوع النشاط" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنشطة</SelectItem>
                <SelectItem value="swimming">سباحة</SelectItem>
                <SelectItem value="field">ملاعب</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>الحجوزات ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الحجز</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>نوع النشاط</TableHead>
                <TableHead>التاريخ والوقت</TableHead>
                <TableHead>المبلغ الإجمالي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>العمليات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                const startDateTime = formatDateTime(booking.start_time);
                const endDateTime = formatDateTime(booking.end_time);
                
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.clients?.full_name}</p>
                        <p className="text-sm text-gray-600">{booking.clients?.phone_number}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {booking.activity_type === 'swimming' ? 'سباحة' : 'ملاعب'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{startDateTime.date}</p>
                        <p className="text-sm text-gray-600">
                          {startDateTime.time} - {endDateTime.time}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      {booking.total_price} ر.س
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditBooking(booking)}
                        >
                          عرض
                        </Button>
                        {booking.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          >
                            تأكيد
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchBookings}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingsManagement;
