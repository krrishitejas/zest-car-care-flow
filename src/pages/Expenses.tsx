import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Fuel, Wrench, Shield, Scan } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";

const Expenses = () => {
  const navigate = useNavigate();
  const [selectedPeriod] = useState("month");

  const totalSpent = 24500;
  const categories = [
    { name: "Fuel", amount: 12000, icon: Fuel, color: "text-blue-500" },
    { name: "Maintenance", amount: 8500, icon: Wrench, color: "text-orange-500" },
    { name: "Insurance", amount: 4000, icon: Shield, color: "text-green-500" },
  ];

  const recentExpenses = [
    { id: 1, type: "Fuel", amount: 2500, date: "Dec 28", category: "fuel" },
    { id: 2, type: "Oil Change", amount: 4500, date: "Dec 26", category: "maintenance" },
    { id: 3, type: "Fuel", amount: 2200, date: "Dec 25", category: "fuel" },
    { id: 4, type: "Car Wash", amount: 500, date: "Dec 24", category: "maintenance" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white mb-6">Expenses</h1>
        
        {/* Total Spent Card */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Spent (This Month)</p>
                <h2 className="text-3xl font-bold">₹{totalSpent.toLocaleString()}</h2>
              </div>
              <div className="bg-secondary/10 rounded-full p-3">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
            </div>
            
            <div className="flex gap-2">
              {["Week", "Month", "Year"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period.toLowerCase() ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                >
                  {period}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <div className="px-6 mt-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl h-48 flex items-center justify-center">
              <p className="text-muted-foreground">Expense Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="space-y-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const percentage = ((category.amount / totalSpent) * 100).toFixed(0);
            
            return (
              <Card key={index} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`${category.color} bg-current/10 rounded-full p-2`}>
                        <Icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <span className="font-semibold">{category.name}</span>
                    </div>
                    <span className="font-bold text-lg">₹{category.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-accent h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{percentage}% of total</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="px-6 mt-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
        <Card className="shadow-card">
          <CardContent className="p-4 space-y-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{expense.type}</p>
                  <p className="text-sm text-muted-foreground">{expense.date}</p>
                </div>
                <p className="font-semibold text-lg">₹{expense.amount}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => navigate("/add-expense")}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-elevated bg-gradient-accent"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Scan Receipt FAB */}
      <Button
        onClick={() => navigate("/scan-receipt")}
        variant="outline"
        className="fixed bottom-24 left-6 h-14 px-6 rounded-full shadow-elevated bg-card"
      >
        <Scan className="w-5 h-5 mr-2" />
        Scan Receipt
      </Button>

      <BottomNav />
    </div>
  );
};

export default Expenses;
