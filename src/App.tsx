
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
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
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/swimming" element={<Swimming />} />
            <Route path="/activities/fields" element={<Fields />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/payments" element={<Dashboard />} />
            <Route path="/users" element={<Dashboard />} />
            <Route path="/roles" element={<Dashboard />} />
            <Route path="/reports" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
