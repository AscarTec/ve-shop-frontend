
import { supabase } from '@/integrations/supabase/client';

export interface Coach {
  id: string;
  user_id: string;
  specialty: string;
  certification: string | null;
  experience_years: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCoachData {
  user_id: string;
  specialty: string;
  certification?: string;
  experience_years?: number;
}

export const coachesService = {
  async getCoaches(): Promise<Coach[]> {
    const { data, error } = await (supabase as any)
      .from('coaches')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as Coach[];
  },

  async getCoachById(id: string): Promise<Coach | null> {
    const { data, error } = await (supabase as any)
      .from('coaches')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Coach;
  },

  async createCoach(coach: CreateCoachData): Promise<Coach> {
    const { data, error } = await (supabase as any)
      .from('coaches')
      .insert(coach)
      .select()
      .single();
    
    if (error) throw error;
    return data as Coach;
  },

  async updateCoach(id: string, updates: Partial<Coach>): Promise<Coach> {
    const { data, error } = await (supabase as any)
      .from('coaches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Coach;
  },

  async deleteCoach(id: string): Promise<void> {
    const { error } = await (supabase as any)
      .from('coaches')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
