
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Activities from "./pages/Activities";
import Swimming from "./pages/Swimming";  
import Fields from "./pages/Fields";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes with Layout */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/bookings" element={<Layout><Bookings /></Layout>} />
          <Route path="/activities" element={<Layout><Activities /></Layout>} />
          <Route path="/activities/swimming" element={<Layout><Swimming /></Layout>} />
          <Route path="/activities/fields" element={<Layout><Fields /></Layout>} />
          <Route path="/clients" element={<Layout><Clients /></Layout>} />
          <Route path="/payments" element={<Layout><Dashboard /></Layout>} />
          <Route path="/users" element={<Layout><Dashboard /></Layout>} />
          <Route path="/roles" element={<Layout><Dashboard /></Layout>} />
          <Route path="/reports" element={<Layout><Dashboard /></Layout>} />
          <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
