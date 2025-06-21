
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
}

export interface CreatePaymentData {
  booking_id: string;
  amount: number;
  payment_type: 'deposit' | 'final' | 'full';
  reference?: string;
  method: 'cash' | 'bank_transfer' | 'card' | 'other';
  notes?: string;
}

export const paymentsService = {
  async getPayments(): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments' as any)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getPaymentById(id: string): Promise<Payment | null> {
    const { data, error } = await supabase
      .from('payments' as any)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getPaymentsByBooking(bookingId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments' as any)
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createPayment(payment: CreatePaymentData): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments' as any)
      .insert(payment)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments' as any)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async confirmPayment(id: string, confirmedBy: string): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments' as any)
      .update({
        confirmed: true,
        confirmed_by: confirmedBy,
        confirmed_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePayment(id: string): Promise<void> {
    const { error } = await supabase
      .from('payments' as any)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
