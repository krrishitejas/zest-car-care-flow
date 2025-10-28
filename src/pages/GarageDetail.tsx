import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";

const GarageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock garage data - in real app would fetch based on id
  const garage = {
    id: id || "1",
    name: "Premium Auto Service",
    rating: 4.8,
    reviews: 234,
    distance: "1.2 km",
    address: "123 Main Street, Bangalore, Karnataka 560001",
    phone: "+91 98765 43210",
    hours: "Mon-Sat: 9:00 AM - 7:00 PM, Sun: Closed",
    image: "🔧",
    priceRange: "₹₹",
    description: "Premium auto service center with certified mechanics and state-of-the-art equipment. We specialize in all major car brands and provide warranty on all services.",
    services: [
      { name: "Oil Change", price: 1500, duration: "30 mins" },
      { name: "Tire Service", price: 2500, duration: "45 mins" },
      { name: "Engine Repair", price: 5000, duration: "2 hours" },
      { name: "Brake Service", price: 3500, duration: "1 hour" },
      { name: "AC Service", price: 2000, duration: "45 mins" },
      { name: "Battery Replacement", price: 4000, duration: "30 mins" },
    ],
    features: ["Certified Mechanics", "Warranty on Services", "Free Pickup & Drop", "Genuine Parts"],
    customerReviews: [
      { name: "Amit Kumar", rating: 5, comment: "Excellent service! Very professional and quick.", date: "2 days ago" },
      { name: "Priya Singh", rating: 4, comment: "Good work, slightly expensive but worth it.", date: "1 week ago" },
      { name: "Rajesh Sharma", rating: 5, comment: "Best garage in the area. Highly recommended!", date: "2 weeks ago" },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-primary px-6 pt-12 pb-6 rounded-b-3xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <div className="flex items-start gap-4">
          <div className="text-6xl">{garage.image}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">{garage.name}</h1>
            <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{garage.rating}</span>
              </div>
              <span>({garage.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{garage.distance} away</span>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="px-6 mt-6">
        <Card className="shadow-card">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold mb-3">About</h2>
            <p className="text-muted-foreground mb-4">{garage.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {garage.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>{garage.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{garage.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{garage.hours}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Services Offered</h2>
        <div className="space-y-3">
          {garage.services.map((service, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{service.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-3">
          {garage.customerReviews.map((review, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 shadow-elevated">
        <div className="max-w-screen-sm mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => window.open(`tel:${garage.phone}`)}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-gradient-accent"
            onClick={() => navigate(`/book-service/${garage.id}`)}
          >
            Book Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GarageDetail;
