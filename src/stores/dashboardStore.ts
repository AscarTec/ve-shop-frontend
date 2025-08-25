
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Dashboard filters and state management
 */
export interface Filters {
  dateFrom?: string;
  dateTo?: string;
  region?: string;
  countries?: string[];
  categories?: string[];
  search?: string;
}

interface DashboardState {
  // Filters
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  
  // UI State
  hoveredCountry?: string;
  selectedSeries: string[];
  isLoading: boolean;
  
  // Actions
  setHoveredCountry: (country?: string) => void;
  toggleSeries: (series: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      // Initial state
      filters: {},
      selectedSeries: [],
      isLoading: false,
      
      // Filter actions
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        })),
        
      resetFilters: () =>
        set({ filters: {} }),
        
      // UI actions
      setHoveredCountry: (country) =>
        set({ hoveredCountry: country }),
        
      toggleSeries: (series) =>
        set((state) => ({
          selectedSeries: state.selectedSeries.includes(series)
            ? state.selectedSeries.filter(s => s !== series)
            : [...state.selectedSeries, series]
        })),
        
      setLoading: (loading) =>
        set({ isLoading: loading }),
    }),
    { name: 'dashboard-store' }
  )
);
