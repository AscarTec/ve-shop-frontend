
import { supabase } from '@/integrations/supabase/client';

export interface SwimmingActivity {
  id: number;
  title_ar: string;
  title_en: string | null;
  unit_type: 'session' | 'hour';
  price: number;
  deposit_percentage: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FieldActivity {
  id: number;
  title_ar: string;
  title_en: string | null;
  unit_type: 'session' | 'hour';
  price: number;
  deposit_percentage: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const facilitiesService = {
  // Swimming Activities CRUD
  async getSwimmingActivities(): Promise<SwimmingActivity[]> {
    const { data, error } = await (supabase as any)
      .from('swimming_activities')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as SwimmingActivity[];
  },

  async createSwimmingActivity(activity: Omit<SwimmingActivity, 'id' | 'created_at' | 'updated_at'>): Promise<SwimmingActivity> {
    const { data, error } = await (supabase as any)
      .from('swimming_activities')
      .insert(activity)
      .select()
      .single();
    
    if (error) throw error;
    return data as SwimmingActivity;
  },

  async updateSwimmingActivity(id: number, updates: Partial<SwimmingActivity>): Promise<SwimmingActivity> {
    const { data, error } = await (supabase as any)
      .from('swimming_activities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as SwimmingActivity;
  },

  async deleteSwimmingActivity(id: number): Promise<void> {
    const { error } = await (supabase as any)
      .from('swimming_activities')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Field Activities CRUD
  async getFieldActivities(): Promise<FieldActivity[]> {
    const { data, error } = await (supabase as any)
      .from('field_activities')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as FieldActivity[];
  },

  async createFieldActivity(activity: Omit<FieldActivity, 'id' | 'created_at' | 'updated_at'>): Promise<FieldActivity> {
    const { data, error } = await (supabase as any)
      .from('field_activities')
      .insert(activity)
      .select()
      .single();
    
    if (error) throw error;
    return data as FieldActivity;
  },

  async updateFieldActivity(id: number, updates: Partial<FieldActivity>): Promise<FieldActivity> {
    const { data, error } = await (supabase as any)
      .from('field_activities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as FieldActivity;
  },

  async deleteFieldActivity(id: number): Promise<void> {
    const { error } = await (supabase as any)
      .from('field_activities')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
