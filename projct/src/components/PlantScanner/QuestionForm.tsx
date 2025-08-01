import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PlantQuestions {
  age: string;
  location: 'indoor' | 'outdoor' | '';
  wateringFrequency: string;
  symptoms: string;
  sunlight: 'low' | 'medium' | 'high' | '';
}

interface QuestionFormProps {
  onSubmit: (answers: PlantQuestions) => void;
  isLoading?: boolean;
}

const QuestionForm = ({ onSubmit, isLoading }: QuestionFormProps) => {
  const [answers, setAnswers] = useState<PlantQuestions>({
    age: '',
    location: '',
    wateringFrequency: '',
    symptoms: '',
    sunlight: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const isValid = answers.age && answers.location && answers.wateringFrequency && answers.sunlight;

  return (
    <Card className="p-6 gradient-card shadow-soft">
      <h2 className="text-2xl font-bold text-foreground mb-6">Tell us about your plant</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="age" className="text-base font-medium">How old is your plant?</Label>
          <Input
            id="age"
            placeholder="e.g., 6 months, 2 years, not sure"
            value={answers.age}
            onChange={(e) => setAnswers(prev => ({ ...prev, age: e.target.value }))}
            className="border-2 border-border focus:border-primary"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Where is your plant located?</Label>
          <RadioGroup 
            value={answers.location} 
            onValueChange={(value) => setAnswers(prev => ({ ...prev, location: value as 'indoor' | 'outdoor' }))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="indoor" id="indoor" />
              <Label htmlFor="indoor">Indoor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outdoor" id="outdoor" />
              <Label htmlFor="outdoor">Outdoor</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label htmlFor="watering" className="text-base font-medium">How often do you currently water it?</Label>
          <Input
            id="watering"
            placeholder="e.g., daily, twice a week, when soil is dry"
            value={answers.wateringFrequency}
            onChange={(e) => setAnswers(prev => ({ ...prev, wateringFrequency: e.target.value }))}
            className="border-2 border-border focus:border-primary"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">How much sunlight does it receive?</Label>
          <RadioGroup 
            value={answers.sunlight} 
            onValueChange={(value) => setAnswers(prev => ({ ...prev, sunlight: value as 'low' | 'medium' | 'high' }))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low">Low light (shade, north-facing)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium light (bright indirect)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high">High light (direct sunlight)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label htmlFor="symptoms" className="text-base font-medium">
            Any concerns or symptoms? (Optional)
          </Label>
          <Textarea
            id="symptoms"
            placeholder="e.g., yellowing leaves, brown spots, wilting..."
            value={answers.symptoms}
            onChange={(e) => setAnswers(prev => ({ ...prev, symptoms: e.target.value }))}
            className="border-2 border-border focus:border-primary min-h-20"
          />
        </div>

        <Button 
          type="submit" 
          disabled={!isValid || isLoading}
          className="w-full gradient-primary text-primary-foreground shadow-soft hover:shadow-nature transition-all duration-300"
        >
          {isLoading ? "Analyzing your plant..." : "Analyze My Plant"}
        </Button>
      </form>
    </Card>
  );
};

export default QuestionForm;