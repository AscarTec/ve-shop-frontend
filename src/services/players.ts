
import { supabase } from '@/integrations/supabase/client';

export interface Player {
  id: string;
  user_id: string;
  position: string | null;
  team: string | null;
  rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreatePlayerData {
  user_id: string;
  position?: string;
  team?: string;
  rating?: number;
}

export const playersService = {
  async getPlayers(): Promise<Player[]> {
    const { data, error } = await (supabase as any)
      .from('players')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as Player[];
  },

  async getPlayerById(id: string): Promise<Player | null> {
    const { data, error } = await (supabase as any)
      .from('players')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Player;
  },

  async createPlayer(player: CreatePlayerData): Promise<Player> {
    const { data, error } = await (supabase as any)
      .from('players')
      .insert(player)
      .select()
      .single();
    
    if (error) throw error;
    return data as Player;
  },

  async updatePlayer(id: string, updates: Partial<Player>): Promise<Player> {
    const { data, error } = await (supabase as any)
      .from('players')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Player;
  },

  async deletePlayer(id: string): Promise<void> {
    const { error } = await (supabase as any)
      .from('players')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
