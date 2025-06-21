
import { supabase } from '@/integrations/supabase/client';

export interface Booking {
  id: string;
  client_id: string;
  activity_id: number;
  activity_type: 'swimming' | 'field';
  start_time: string;
  end_time: string;
  duration: number;
  total_price: number;
  deposit_amount: number;
  remaining_amount: number;
  deposit_paid: boolean;
  final_payment_paid: boolean;
  status: 'pending' | 'deposit_paid' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  clients?: {
    full_name: string;
    phone_number: string;
  };
}

export interface CreateBookingData {
  client_id: string;
  activity_id: number;
  activity_type: 'swimming' | 'field';
  start_time: string;
  end_time: string;
  duration: number;
  total_price: number;
  deposit_amount: number;
  remaining_amount: number;
  notes?: string;
  created_by?: string;
}

export const bookingsService = {
  async getBookings(): Promise<Booking[]> {
    const { data, error } = await (supabase as any)
      .from('bookings')
      .select(`
        *,
        clients (
          full_name,
          phone_number
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as Booking[];
  },

  async getBookingById(id: string): Promise<Booking | null> {
    const { data, error } = await (supabase as any)
      .from('bookings')
      .select(`
        *,
        clients (
          full_name,
          phone_number
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  async createBooking(booking: CreateBookingData): Promise<Booking> {
    // Generate booking ID
    const bookingId = `BK-${Date.now().toString().slice(-8)}`;
    
    const { data, error } = await (supabase as any)
      .from('bookings')
      .insert({
        id: bookingId,
        ...booking
      })
      .select(`
        *,
        clients (
          full_name,
          phone_number
        )
      `)
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const { data, error } = await (supabase as any)
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        clients (
          full_name,
          phone_number
        )
      `)
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<Booking> {
    return this.updateBooking(id, { status });
  },

  async deleteBooking(id: string): Promise<void> {
    const { error } = await (supabase as any)
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getBookingsByStatus(status: Booking['status']): Promise<Booking[]> {
    const { data, error } = await (supabase as any)
      .from('bookings')
      .select(`
        *,
        clients (
          full_name,
          phone_number
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as Booking[];
  },

  async getBookingsByDateRange(startDate: string, endDate: string): Promise<Booking[]> {
    const { data, error } = await (supabase as any)
      .from('bookings')
      .select(`
        *,
        clients (
          full_name,
          phone_number
        )
      `)
      .gte('start_time', startDate)
      .lte('start_time', endDate)
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return (data || []) as Booking[];
  }
};
