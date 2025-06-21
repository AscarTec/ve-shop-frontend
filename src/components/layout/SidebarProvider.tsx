
import React, { createContext, useContext, ReactNode } from 'react';

interface SidebarContextType {
  defaultOpen?: boolean;
}

const SidebarContext = createContext<SidebarContextType>({});

export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SidebarProvider({ children, defaultOpen = true }: SidebarProviderProps) {
  return (
    <SidebarContext.Provider value={{ defaultOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
