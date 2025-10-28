import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Navigation, Filter } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";

const Garages = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const garages = [
    {
      id: 1,
      name: "Premium Auto Service",
      rating: 4.8,
      reviews: 234,
      distance: "1.2 km",
      services: ["Oil Change", "Tire Service", "Engine Repair"],
      priceRange: "₹₹",
      image: "🔧",
    },
    {
      id: 2,
      name: "QuickFix Garage",
      rating: 4.6,
      reviews: 156,
      distance: "2.5 km",
      services: ["Oil Change", "Brake Service", "AC Service"],
      priceRange: "₹",
      image: "⚙️",
    },
    {
      id: 3,
      name: "Elite Car Care",
      rating: 4.9,
      reviews: 312,
      distance: "3.8 km",
      services: ["Full Service", "Detailing", "Paint Work"],
      priceRange: "₹₹₹",
      image: "🚗",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white mb-6">Find Garages</h1>
        
        <div className="space-y-3">
          <Input
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white"
          />
          
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white flex-1">
              <Navigation className="w-4 h-4 mr-2" />
              Near Me
            </Button>
            <Button variant="outline" className="bg-white">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="px-6 mt-6">
        <Card className="shadow-card overflow-hidden">
          <div className="bg-muted h-48 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">Map View Coming Soon</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Garage List */}
      <div className="px-6 mt-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Nearby Garages</h2>
        <div className="space-y-4">
          {garages.map((garage) => (
            <Card
              key={garage.id}
              className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow"
              onClick={() => navigate(`/garage/${garage.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg mb-1">{garage.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{garage.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({garage.reviews})</span>
                      <span className="text-muted-foreground">• {garage.distance}</span>
                    </div>
                  </div>
                  <div className="text-3xl">{garage.image}</div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {garage.services.slice(0, 3).map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">{garage.priceRange}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-gradient-accent">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Garages;
