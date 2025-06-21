
import { supabase } from '@/integrations/supabase/client';

export interface Client {
  id: string;
  full_name: string;
  phone_number: string | null;
  national_id: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateClientData {
  full_name: string;
  phone_number?: string;
  national_id?: string;
  email?: string;
}

export const clientsService = {
  async getClients(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients' as any)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getClientById(id: string): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients' as any)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createClient(client: CreateClientData): Promise<Client> {
    const { data, error } = await supabase
      .from('clients' as any)
      .insert(client)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients' as any)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteClient(id: string): Promise<void> {
    const { error } = await supabase
      .from('clients' as any)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async searchClients(query: string): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients' as any)
      .select('*')
      .or(`full_name.ilike.%${query}%,phone_number.ilike.%${query}%,national_id.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};
