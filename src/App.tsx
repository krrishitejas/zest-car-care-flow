import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Garages from "./pages/Garages";
import GarageDetail from "./pages/GarageDetail";
import BookService from "./pages/BookService";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import ScanReceipt from "./pages/ScanReceipt";
import Profile from "./pages/Profile";
import Vehicles from "./pages/Vehicles";
import AddVehicle from "./pages/AddVehicle";
import Bookings from "./pages/Bookings";
import ServiceHistory from "./pages/ServiceHistory";
import AddServiceHistory from "./pages/AddServiceHistory";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/garages" element={<Garages />} />
            <Route path="/garage/:id" element={<GarageDetail />} />
            <Route path="/book-service/:id" element={<BookService />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/scan-receipt" element={<ScanReceipt />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/service-history" element={<ServiceHistory />} />
            <Route path="/add-service-history" element={<AddServiceHistory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/subscription" element={<Subscription />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
