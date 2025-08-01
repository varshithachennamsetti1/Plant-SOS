import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import ImageUpload from "@/components/PlantScanner/ImageUpload";
import QuestionForm from "@/components/PlantScanner/QuestionForm";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { identifyPlant } from "@/data/mockPlants";
import PlantCard, { Plant } from "@/components/Plants/PlantCard";
import { toast } from "sonner";

const ScanPlant = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [identifiedPlant, setIdentifiedPlant] = useState<Plant | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setShowQuestions(true);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setShowQuestions(false);
    setIdentifiedPlant(null);
  };

  const handleQuestionSubmit = async (answers: any) => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const plant = await identifyPlant(selectedImage, answers);
      setIdentifiedPlant(plant);
      toast.success("Plant identified successfully!");
    } catch (error) {
      toast.error("Failed to identify plant. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen gradient-nature">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Plant Scanner</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${selectedImage ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedImage ? 'gradient-primary text-primary-foreground' : 'bg-muted'}`}>
                  {selectedImage ? <CheckCircle className="h-4 w-4" /> : '1'}
                </div>
                <span className="font-medium">Upload Photo</span>
              </div>
              
              <div className={`w-16 h-1 ${showQuestions ? 'bg-primary' : 'bg-muted'} rounded`} />
              
              <div className={`flex items-center space-x-2 ${showQuestions ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${showQuestions ? 'gradient-primary text-primary-foreground' : 'bg-muted'}`}>
                  {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : showQuestions ? <CheckCircle className="h-4 w-4" /> : '2'}
                </div>
                <span className="font-medium">Plant Details</span>
              </div>
              
              <div className={`w-16 h-1 ${identifiedPlant ? 'bg-primary' : 'bg-muted'} rounded`} />
              
              <div className={`flex items-center space-x-2 ${identifiedPlant ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${identifiedPlant ? 'gradient-primary text-primary-foreground' : 'bg-muted'}`}>
                  {identifiedPlant ? <CheckCircle className="h-4 w-4" /> : '3'}
                </div>
                <span className="font-medium">Results</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Step 1: Image Upload */}
            <ImageUpload 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onRemove={handleRemoveImage}
            />

            {/* Step 2: Questions */}
            {showQuestions && !identifiedPlant && (
              <QuestionForm 
                onSubmit={handleQuestionSubmit}
                isLoading={isAnalyzing}
              />
            )}

            {/* Step 3: Results */}
            {identifiedPlant && (
              <Card className="p-6 gradient-card shadow-soft">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  🎉 Plant Identified!
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <PlantCard plant={identifiedPlant} showStatus={true} />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Care Instructions</h3>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-accent/50">
                          <h4 className="font-medium text-accent-foreground">Watering</h4>
                          <p className="text-sm text-muted-foreground">{identifiedPlant.wateringFrequency}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-accent/50">
                          <h4 className="font-medium text-accent-foreground">Light Requirements</h4>
                          <p className="text-sm text-muted-foreground">{identifiedPlant.sunlight} light</p>
                        </div>
                        <div className="p-3 rounded-lg bg-accent/50">
                          <h4 className="font-medium text-accent-foreground">Temperature</h4>
                          <p className="text-sm text-muted-foreground">{identifiedPlant.temperature}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Health Status</h3>
                      <div className={`p-4 rounded-lg ${
                        identifiedPlant.healthStatus === 'healthy' ? 'bg-healthy/10 border border-healthy/20' :
                        identifiedPlant.healthStatus === 'warning' ? 'bg-warning/10 border border-warning/20' :
                        'bg-destructive/10 border border-destructive/20'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`w-3 h-3 rounded-full ${
                            identifiedPlant.healthStatus === 'healthy' ? 'bg-healthy' :
                            identifiedPlant.healthStatus === 'warning' ? 'bg-warning' :
                            'bg-destructive'
                          }`} />
                          <span className="font-medium capitalize">{identifiedPlant.healthStatus}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {identifiedPlant.healthStatus === 'healthy' 
                            ? "Your plant appears to be healthy! Continue with current care routine."
                            : identifiedPlant.healthStatus === 'warning'
                            ? "Your plant may need some attention. Check watering schedule and light conditions."
                            : "Your plant needs immediate care. Review watering and environmental conditions."
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        onClick={() => navigate('/calendar')}
                        className="flex-1 gradient-primary"
                      >
                        View Calendar
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null);
                          setShowQuestions(false);
                          setIdentifiedPlant(null);
                        }}
                        className="flex-1"
                      >
                        Scan Another
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScanPlant;