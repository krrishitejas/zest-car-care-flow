import React, { createContext, useContext, useState, useEffect } from "react";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  plate: string;
  vin?: string;
  registrationNumber?: string;
}

export interface Expense {
  id: string;
  vehicleId: string;
  type: string;
  category: "fuel" | "maintenance" | "insurance" | "other";
  amount: number;
  date: string;
  notes?: string;
  receiptImage?: string;
}

export interface ServiceReminder {
  id: string;
  vehicleId: string;
  type: string;
  dueDate: string;
  dueKm?: number;
  urgent: boolean;
  completed: boolean;
}

export interface Booking {
  id: string;
  vehicleId: string;
  garageId: string;
  garageName: string;
  services: string[];
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  totalPrice?: number;
}

export interface ServiceHistoryEntry {
  id: string;
  vehicleId: string;
  type: string;
  date: string;
  odometer?: number;
  cost?: number;
  garage?: string;
  notes?: string;
  parts?: string;
  photos?: string[];
}

interface AppContextType {
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  expenses: Expense[];
  serviceReminders: ServiceReminder[];
  bookings: Booking[];
  serviceHistory: ServiceHistoryEntry[];
  user: { name: string; email: string } | null;
  isPro: boolean;
  
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  selectVehicle: (id: string) => void;
  
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  
  addServiceReminder: (reminder: Omit<ServiceReminder, "id">) => void;
  updateServiceReminder: (id: string, reminder: Partial<ServiceReminder>) => void;
  deleteServiceReminder: (id: string) => void;
  
  addBooking: (booking: Omit<Booking, "id">) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  
  addServiceHistory: (entry: Omit<ServiceHistoryEntry, "id">) => void;
  updateServiceHistory: (id: string, entry: Partial<ServiceHistoryEntry>) => void;
  deleteServiceHistory: (id: string) => void;
  
  setUser: (user: { name: string; email: string } | null) => void;
  upgradeToPro: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [serviceReminders, setServiceReminders] = useState<ServiceReminder[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [serviceHistory, setServiceHistory] = useState<ServiceHistoryEntry[]>([]);
  const [user, setUserState] = useState<{ name: string; email: string } | null>(null);
  const [isPro, setIsPro] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedVehicles = localStorage.getItem("zest_vehicles");
        const storedSelectedVehicleId = localStorage.getItem("zest_selected_vehicle");
        const storedExpenses = localStorage.getItem("zest_expenses");
        const storedReminders = localStorage.getItem("zest_reminders");
        const storedBookings = localStorage.getItem("zest_bookings");
        const storedHistory = localStorage.getItem("zest_history");
        const storedUser = localStorage.getItem("zest_user");
        const storedIsPro = localStorage.getItem("zest_is_pro");

        if (storedVehicles) setVehicles(JSON.parse(storedVehicles));
        if (storedSelectedVehicleId) setSelectedVehicleId(storedSelectedVehicleId);
        if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
        if (storedReminders) setServiceReminders(JSON.parse(storedReminders));
        if (storedBookings) setBookings(JSON.parse(storedBookings));
        if (storedHistory) setServiceHistory(JSON.parse(storedHistory));
        if (storedUser) setUserState(JSON.parse(storedUser));
        if (storedIsPro) setIsPro(JSON.parse(storedIsPro));
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("zest_vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    if (selectedVehicleId) {
      localStorage.setItem("zest_selected_vehicle", selectedVehicleId);
    }
  }, [selectedVehicleId]);

  useEffect(() => {
    localStorage.setItem("zest_expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("zest_reminders", JSON.stringify(serviceReminders));
  }, [serviceReminders]);

  useEffect(() => {
    localStorage.setItem("zest_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("zest_history", JSON.stringify(serviceHistory));
  }, [serviceHistory]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("zest_user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("zest_is_pro", JSON.stringify(isPro));
  }, [isPro]);

  const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
    const newVehicle = { ...vehicle, id: Date.now().toString() };
    setVehicles([...vehicles, newVehicle]);
    if (!selectedVehicleId) {
      setSelectedVehicleId(newVehicle.id);
    }
  };

  const updateVehicle = (id: string, vehicle: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...vehicle } : v));
  };

  const deleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    if (selectedVehicleId === id) {
      setSelectedVehicleId(vehicles.find(v => v.id !== id)?.id || null);
    }
  };

  const selectVehicle = (id: string) => {
    setSelectedVehicleId(id);
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    setExpenses([...expenses, { ...expense, id: Date.now().toString() }]);
  };

  const updateExpense = (id: string, expense: Partial<Expense>) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, ...expense } : e));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const addServiceReminder = (reminder: Omit<ServiceReminder, "id">) => {
    setServiceReminders([...serviceReminders, { ...reminder, id: Date.now().toString() }]);
  };

  const updateServiceReminder = (id: string, reminder: Partial<ServiceReminder>) => {
    setServiceReminders(serviceReminders.map(r => r.id === id ? { ...r, ...reminder } : r));
  };

  const deleteServiceReminder = (id: string) => {
    setServiceReminders(serviceReminders.filter(r => r.id !== id));
  };

  const addBooking = (booking: Omit<Booking, "id">) => {
    setBookings([...bookings, { ...booking, id: Date.now().toString() }]);
  };

  const updateBooking = (id: string, booking: Partial<Booking>) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, ...booking } : b));
  };

  const addServiceHistory = (entry: Omit<ServiceHistoryEntry, "id">) => {
    setServiceHistory([...serviceHistory, { ...entry, id: Date.now().toString() }]);
  };

  const updateServiceHistory = (id: string, entry: Partial<ServiceHistoryEntry>) => {
    setServiceHistory(serviceHistory.map(h => h.id === id ? { ...h, ...entry } : h));
  };

  const deleteServiceHistory = (id: string) => {
    setServiceHistory(serviceHistory.filter(h => h.id !== id));
  };

  const setUser = (user: { name: string; email: string } | null) => {
    setUserState(user);
  };

  const upgradeToPro = () => {
    setIsPro(true);
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        selectedVehicleId,
        expenses,
        serviceReminders,
        bookings,
        serviceHistory,
        user,
        isPro,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        selectVehicle,
        addExpense,
        updateExpense,
        deleteExpense,
        addServiceReminder,
        updateServiceReminder,
        deleteServiceReminder,
        addBooking,
        updateBooking,
        addServiceHistory,
        updateServiceHistory,
        deleteServiceHistory,
        setUser,
        upgradeToPro,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
