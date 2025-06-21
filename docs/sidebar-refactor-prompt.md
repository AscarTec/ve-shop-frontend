# Sidebar Refactor AI Prompt

Use these instructions to implement a responsive, RTL-aware sidebar for the Sports Hub dashboard. The sidebar should behave as follows:

1. **Responsive Display**
   - On screens below `lg`, hide the mini rail. When the menu button is pressed, render the sidebar as a full-screen overlay using `fixed inset-0 w-full h-full` classes.
   - On `lg` and `xl` screens, show a collapsed rail with icons only (`w-16`). When expanded, animate to `w-72`.
   - On screens `2xl` and above, the sidebar is permanently expanded (`w-72`).

2. **Auto-Close Behaviour**
   - Clicking any navigation item or outside the sidebar area should close/collapse the sidebar.

3. **RTL / LTR Positioning**
   - For LTR layouts, place the sidebar on the left and apply `lg:ml-16` when collapsed and `2xl:ml-72` when expanded.
   - For RTL layouts, place the sidebar on the right with `lg:mr-16` when collapsed and `2xl:mr-72` when expanded.
   - Toggling the language should update `<html dir>` accordingly and switch the margin utilities.

4. **Header & Main Alignment**
   - Apply the same margin utilities to both `<header>` and `<main>` so they stay aligned with the sidebar state.

5. **Dynamic Styling & Theming**
   - Use Tailwind color tokens for background and foreground. Add `transition-all duration-200 ease-in-out` to width, margin and overlay opacity. Ensure focus outlines are visible for accessibility.

6. **Tooltip Behaviour**
   - When the sidebar is collapsed (`w-16`), show tooltips on hover for each icon. When expanded, tooltips are hidden and labels are displayed instead.

The following snippet shows a unified `Layout` component implementing the above behaviour using Zustand for state management.

```tsx
import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import SidebarNav from '@/components/ui/sidebar';
import Topbar from '@/components/layout/Topbar';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, language, theme } = useAppStore();
  const isRTL = language === 'ar';
  const ref = useRef<HTMLDivElement>(null);

  // Apply direction and theme to <html>
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [isRTL, theme]);

  // Close sidebar on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    }
    if (sidebarOpen) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [sidebarOpen, setSidebarOpen]);

  const marginClass = cn(
    'transition-all duration-200 ease-in-out',
    sidebarOpen
      ? isRTL
        ? '2xl:mr-72'
        : '2xl:ml-72'
      : isRTL
        ? 'lg:mr-16 2xl:mr-16'
        : 'lg:ml-16 2xl:ml-16'
  );

  return (
    <div className={cn('min-h-screen flex', isRTL && 'flex-row-reverse')}>
      {/* Sidebar */}
      <SidebarNav ref={ref} />

      {/* Content area */}
      <div className="flex flex-col flex-1" >
        <header className={marginClass}>
          <Topbar />
        </header>
        <main className={cn('flex-1', marginClass)}>{children}</main>
      </div>
    </div>
  );
}
```

### Tailwind Class Utilities

```txt
w-sidebar-mini  => width: 4rem        // collapsed rail
w-sidebar-full  => width: 18rem       // expanded sidebar
lg:ml-16 / lg:mr-16  => margin for collapsed state on desktop
2xl:ml-72 / 2xl:mr-72 => margin for expanded state on very large screens
transition-all duration-200 ease-in-out => apply to sidebar width and margins
```

Place these utilities in your sidebar component to animate between states. Ensure overlay background uses `bg-black/60` and fades with the same transition utilities on small screens.

