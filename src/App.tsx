
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/layout/Layout';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { RouteChangeListener } from '@/components/RouteChangeListener';
import './App.css';

// Lazy load pages
const Index = React.lazy(() => import('@/pages/Index'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const PremiumDashboard = React.lazy(() => import('@/pages/PremiumDashboard'));
const Bookings = React.lazy(() => import('@/pages/Bookings'));
const Clients = React.lazy(() => import('@/pages/Clients'));
const Users = React.lazy(() => import('@/pages/Users'));
const Players = React.lazy(() => import('@/pages/Players'));
const Coaches = React.lazy(() => import('@/pages/Coaches'));
const Swimming = React.lazy(() => import('@/pages/Swimming'));
const Fields = React.lazy(() => import('@/pages/Fields'));
const Activities = React.lazy(() => import('@/pages/Activities'));
const Roles = React.lazy(() => import('@/pages/Roles'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const Landing = React.lazy(() => import('@/pages/Landing'));
const AdminDashboard = React.lazy(() => import('@/pages/admin/Dashboard'));
const AdminBookings = React.lazy(() => import('@/pages/admin/BookingsPage'));
const AdminFacilities = React.lazy(() => import('@/pages/admin/FacilitiesPage'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RouteChangeListener />
        <LoadingOverlay />
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/landing" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Landing />
              </Suspense>
            } />
            <Route path="/*" element={
              <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/premium-dashboard" element={<PremiumDashboard />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/coaches" element={<Coaches />} />
                    <Route path="/activities/swimming" element={<Swimming />} />
                    <Route path="/activities/fields" element={<Fields />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/bookings" element={<AdminBookings />} />
                    <Route path="/admin/facilities" element={<AdminFacilities />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            } />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
