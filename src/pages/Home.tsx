import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Car, ChevronDown, Plus, TrendingUp } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [selectedVehicle] = useState({
    make: "Honda",
    model: "Civic",
    year: "2020",
    plate: "ABC 1234",
  });

  const upcomingServices = [
    { type: "Oil Change", dueIn: "15 days", urgent: false },
    { type: "Tire Rotation", dueIn: "30 days", urgent: false },
  ];

  const recentExpenses = [
    { category: "Fuel", amount: 2500, date: "Today" },
    { category: "Maintenance", amount: 4500, date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Hello, Rahul</h1>
            <p className="text-white/80 text-sm">Let's take care of your car</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bell className="w-6 h-6" />
          </Button>
        </div>

        {/* Vehicle Selector */}
        <Card className="shadow-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-xl p-3">
                  <Car className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedVehicle.make} {selectedVehicle.model}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedVehicle.year} • {selectedVehicle.plate}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronDown className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6 grid grid-cols-2 gap-3">
        <Button
          onClick={() => navigate("/garages")}
          className="bg-gradient-accent h-24 flex-col gap-2"
        >
          <Calendar className="w-6 h-6" />
          <span>Book Service</span>
        </Button>
        <Button
          onClick={() => navigate("/expenses")}
          variant="outline"
          className="h-24 flex-col gap-2 border-2"
        >
          <Plus className="w-6 h-6" />
          <span>Add Expense</span>
        </Button>
      </div>

      {/* Upcoming Services */}
      <div className="px-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Upcoming Services</h2>
        <div className="space-y-3">
          {upcomingServices.map((service, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 rounded-full p-2">
                    <Bell className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">{service.type}</p>
                    <p className="text-sm text-muted-foreground">Due in {service.dueIn}</p>
                  </div>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="px-6 mt-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Expenses</h2>
          <Button variant="link" className="text-primary" onClick={() => navigate("/expenses")}>
            See All
          </Button>
        </div>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <CardTitle className="text-lg">This Month</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{expense.category}</p>
                  <p className="text-sm text-muted-foreground">{expense.date}</p>
                </div>
                <p className="font-semibold text-lg">₹{expense.amount}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
