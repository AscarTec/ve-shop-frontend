
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Search, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';
import { toast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  clientName: string;
  activityType: 'swimming' | 'football' | 'basketball' | 'tennis';
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

const BookingList = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      clientName: 'Ahmed Mohamed',
      activityType: 'swimming',
      date: '2024-01-20',
      time: '10:00',
      duration: 2,
      status: 'confirmed',
      notes: 'Lane preference: 5',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      clientName: 'Fatima Al-Zahra',
      activityType: 'tennis',
      date: '2024-01-21',
      time: '16:00',
      duration: 1,
      status: 'pending',
      createdAt: '2024-01-16'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; bookingId: string | null; clientName: string }>({
    isOpen: false,
    bookingId: null,
    clientName: ''
  });

  const filteredBookings = bookings.filter(booking =>
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.activityType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleDeleteClick = (booking: Booking) => {
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
        title: t('success'),
        description: t('booking_deleted_successfully'),
      });
    }
    setDeleteModal({ isOpen: false, bookingId: null, clientName: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, bookingId: null, clientName: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t('bookings')}
        </h1>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          {t('new_booking')}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('search_bookings')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('client')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('activity')}</TableHead>
                <TableHead className="hidden sm:table-cell">{t('date_time')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('duration')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{booking.clientName}</div>
                      <div className="text-sm text-gray-500 md:hidden capitalize">
                        {t(booking.activityType)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell capitalize">
                    {t(booking.activityType)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      {booking.date}
                      <Clock className="w-4 h-4 ml-2" />
                      {booking.time}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {booking.duration}h
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {t(booking.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">{t('edit')}</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteClick(booking)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">{t('delete')}</span>
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
        message={t('are_you_sure_delete_booking')}
        itemName={deleteModal.clientName}
      />
    </div>
  );
};

export default BookingList;
