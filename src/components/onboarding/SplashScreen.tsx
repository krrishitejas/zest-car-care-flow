import { Car } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 inline-block mb-6">
          <Car className="w-20 h-20 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tight">ZEST</h1>
        <p className="text-white/80 mt-2 text-lg">Your Car Care Companion</p>
      </div>
    </div>
  );
};

export default SplashScreen;
