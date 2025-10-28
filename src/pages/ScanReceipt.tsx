import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { toast } from "sonner";

const ScanReceipt = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCapture = () => {
    setIsProcessing(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Receipt scanned successfully!");
      
      // In a real app, this would extract data and pre-fill the add expense form
      navigate("/add-expense", {
        state: {
          scannedData: {
            type: "Fuel",
            category: "fuel",
            amount: "2500",
            date: new Date().toISOString().split("T")[0],
          },
        },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary px-6 pt-12 pb-8 rounded-b-3xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <h1 className="text-2xl font-bold text-white mb-2">Scan Receipt</h1>
        <p className="text-white/80 text-sm">
          Take a photo of your receipt to automatically extract expense details
        </p>
      </div>

      {/* Camera View */}
      <div className="px-6 mt-6">
        <Card className="shadow-card overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-muted aspect-[3/4] flex flex-col items-center justify-center relative">
              {isProcessing ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-lg font-semibold">Processing Receipt...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Extracting expense details
                  </p>
                </div>
              ) : (
                <>
                  <Camera className="w-24 h-24 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">Position receipt in frame</p>
                  <p className="text-sm text-muted-foreground px-6 text-center">
                    Make sure all text is clearly visible and well-lit
                  </p>
                  
                  {/* Frame overlay */}
                  <div className="absolute inset-8 border-2 border-dashed border-primary rounded-lg pointer-events-none"></div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full bg-gradient-accent"
            size="lg"
            onClick={handleCapture}
            disabled={isProcessing}
          >
            <Camera className="w-5 h-5 mr-2" />
            Capture Receipt
          </Button>

          <Button
            variant="outline"
            className="w-full"
            size="lg"
            disabled={isProcessing}
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload from Gallery
          </Button>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-sm">Tips for best results:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Avoid shadows and glare</li>
                <li>• Keep receipt flat and straight</li>
                <li>• Include entire receipt in frame</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScanReceipt;
