
export type BookingStatus = 'معلقة' | 'تم دفع المقدم' | 'مؤكدة' | 'مكتملة' | 'ملغية';

export interface BookingLifecycle {
  status: BookingStatus;
  timestamp: string;
  notes?: string;
  updatedBy: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  activityType: string;
  clientName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  duration: number;
  participants: number;
  totalPrice: number;
  depositPaid: number;
  remainingAmount: number;
  status: BookingStatus;
  lifecycle: BookingLifecycle[];
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export const BOOKING_STATUS_FLOW: Record<BookingStatus, BookingStatus[]> = {
  'معلقة': ['تم دفع المقدم', 'ملغية'],
  'تم دفع المقدم': ['مؤكدة', 'ملغية'],
  'مؤكدة': ['مكتملة', 'ملغية'],
  'مكتملة': [],
  'ملغية': []
};

export const updateBookingStatus = async (
  bookingId: string,
  newStatus: BookingStatus,
  updatedBy: string,
  notes?: string
): Promise<Booking> => {
  // In real app, this would be an API call
  console.log(`Updating booking ${bookingId} to status: ${newStatus}`);
  
  // Simulate API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: bookingId,
        status: newStatus,
        updatedAt: new Date().toISOString(),
        lifecycle: [
          {
            status: newStatus,
            timestamp: new Date().toISOString(),
            updatedBy,
            notes
          }
        ]
      } as Booking);
    }, 500);
  });
};

export const generateBookingNumber = (activityType: string): string => {
  const prefix = activityType.toUpperCase().substring(0, 3);
  const timestamp = Date.now().toString().slice(-6);
  return `${prefix}-${timestamp}`;
};

export const getStatusColor = (status: BookingStatus): string => {
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
