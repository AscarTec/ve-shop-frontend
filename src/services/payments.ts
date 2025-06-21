
import { supabase } from '@/integrations/supabase/client';

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  payment_type: 'deposit' | 'final' | 'full';
  reference: string | null;
  method: 'cash' | 'bank_transfer' | 'card' | 'other';
  confirmed: boolean;
  confirmed_by: string | null;
  confirmed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  bookings?: {
    id: string;
    clients: {
      full_name: string;
    };
  };
}

export interface CreatePaymentData {
  booking_id: string;
  amount: number;
  payment_type: 'deposit' | 'final' | 'full';
  method: 'cash' | 'bank_transfer' | 'card' | 'other';
  reference?: string;
  notes?: string;
}

export const paymentsService = {
  async getPayments(): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        bookings (
          id,
          clients (
            full_name
          )
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getPaymentsByBooking(bookingId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createPayment(payment: CreatePaymentData): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select(`
        *,
        bookings (
          id,
          clients (
            full_name
          )
        )
      `)
      .single();
    
    if (error) throw error;
    return data;
  },

  async confirmPayment(id: string, confirmedBy: string): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .update({
        confirmed: true,
        confirmed_by: confirmedBy,
        confirmed_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        bookings (
          id,
          clients (
            full_name
          )
        )
      `)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        bookings (
          id,
          clients (
            full_name
          )
        )
      `)
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePayment(id: string): Promise<void> {
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
