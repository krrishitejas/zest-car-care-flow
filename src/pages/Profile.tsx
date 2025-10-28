import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, Car, Bell, Lock, CreditCard, HelpCircle, LogOut } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Car, label: "My Vehicles", path: "/vehicles" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Lock, label: "Privacy & Security", path: "/security" },
    { icon: CreditCard, label: "ZEST Pro", path: "/subscription", badge: "Upgrade" },
    { icon: HelpCircle, label: "Help & Support", path: "/support" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20 border-4 border-white/20">
            <AvatarFallback className="bg-white text-primary text-2xl font-bold">
              R
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-white">Rahul Sharma</h1>
            <p className="text-white/80">rahul@example.com</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-xs text-muted-foreground">Vehicles</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-secondary">12</p>
              <p className="text-xs text-muted-foreground">Services</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-accent">8</p>
              <p className="text-xs text-muted-foreground">Bookings</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 mt-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <Card
              key={index}
              className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-gradient-accent text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Logout */}
      <div className="px-6 mt-6 mb-6">
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive hover:bg-destructive hover:text-white"
          onClick={() => navigate("/auth")}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
