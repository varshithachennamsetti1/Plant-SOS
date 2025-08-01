import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Sun, Thermometer, Calendar } from "lucide-react";

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: 'climbing' | 'shrub' | 'indoor' | 'flowering';
  image: string;
  wateringFrequency: string;
  sunlight: 'low' | 'medium' | 'high';
  temperature: string;
  isFlowering?: boolean;
  nextWatering?: Date;
  healthStatus: 'healthy' | 'warning' | 'unhealthy';
}

interface PlantCardProps {
  plant: Plant;
  onClick?: () => void;
  showStatus?: boolean;
}

const PlantCard = ({ plant, onClick, showStatus = false }: PlantCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'climbing': return 'bg-blue-100 text-blue-800';
      case 'shrub': return 'bg-green-100 text-green-800';
      case 'indoor': return 'bg-purple-100 text-purple-800';
      case 'flowering': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-healthy text-healthy-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'unhealthy': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSunlightIcon = (level: string) => {
    switch (level) {
      case 'low': return '🌑';
      case 'medium': return '⛅';
      case 'high': return '☀️';
      default: return '🌤️';
    }
  };

  return (
    <Card 
      className="overflow-hidden gradient-card shadow-soft hover:shadow-nature transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={plant.image} 
          alt={plant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={getCategoryColor(plant.category)}>
            {plant.category}
          </Badge>
          {plant.isFlowering && (
            <Badge variant="secondary" className="bg-pink-50 text-pink-700">
              🌸 Flowering
            </Badge>
          )}
        </div>
        {showStatus && (
          <div className="absolute top-3 right-3">
            <Badge className={getHealthStatusColor(plant.healthStatus)}>
              {plant.healthStatus}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {plant.name}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-3">
          {plant.scientificName}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-muted-foreground">{plant.wateringFrequency}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-lg">{getSunlightIcon(plant.sunlight)}</span>
            <span className="text-muted-foreground">{plant.sunlight} light</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <span className="text-muted-foreground">{plant.temperature}</span>
          </div>
          {plant.nextWatering && (
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">
                {plant.nextWatering.toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-2 border-primary/20 hover:border-primary hover:bg-primary/5"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default PlantCard;