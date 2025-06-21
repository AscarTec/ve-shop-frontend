
import { supabase } from '@/integrations/supabase/client';

export interface CoachAssignment {
  id: string;
  coach_id: string;
  player_id: string;
  training_type: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateCoachAssignmentData {
  coach_id: string;
  player_id: string;
  training_type: string;
  start_date: string;
  end_date?: string;
}

export const coachAssignmentsService = {
  async getAssignments(): Promise<CoachAssignment[]> {
    const { data, error } = await (supabase as any)
      .from('coach_assignments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as CoachAssignment[];
  },

  async getAssignmentsByCoach(coachId: string): Promise<CoachAssignment[]> {
    const { data, error } = await (supabase as any)
      .from('coach_assignments')
      .select('*')
      .eq('coach_id', coachId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as CoachAssignment[];
  },

  async getAssignmentsByPlayer(playerId: string): Promise<CoachAssignment[]> {
    const { data, error } = await (supabase as any)
      .from('coach_assignments')
      .select('*')
      .eq('player_id', playerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as CoachAssignment[];
  },

  async createAssignment(assignment: CreateCoachAssignmentData): Promise<CoachAssignment> {
    const { data, error } = await (supabase as any)
      .from('coach_assignments')
      .insert(assignment)
      .select()
      .single();
    
    if (error) throw error;
    return data as CoachAssignment;
  },

  async updateAssignment(id: string, updates: Partial<CoachAssignment>): Promise<CoachAssignment> {
    const { data, error } = await (supabase as any)
      .from('coach_assignments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as CoachAssignment;
  },

  async deleteAssignment(id: string): Promise<void> {
    const { error } = await (supabase as any)
      .from('coach_assignments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
