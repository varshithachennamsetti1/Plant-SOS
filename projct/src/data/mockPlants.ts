import { Plant } from "@/components/Plants/PlantCard";

export const mockPlants: Plant[] = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    category: "indoor",
    image: "https://i.pinimg.com/736x/8e/4f/21/8e4f2183379dd2ec8506fcff899d8a46.jpg",
    wateringFrequency: "Weekly",
    sunlight: "medium",
    temperature: "18-24°C",
    isFlowering: false,
    nextWatering: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    healthStatus: "healthy"
  },
  {
    id: "2",
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    category: "flowering",
    image: "https://i.pinimg.com/736x/da/b7/89/dab7890dd6d4d89ab5f3e13e0f1c9dd1.jpg",
    wateringFrequency: "Twice weekly",
    sunlight: "low",
    temperature: "16-22°C",
    isFlowering: true,
    nextWatering: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    healthStatus: "healthy"
  },
  {
    id: "3",
    name: "English Ivy",
    scientificName: "Hedera helix",
    category: "climbing",
    image: "https://i.pinimg.com/736x/d3/be/e4/d3bee48ac55fe18dc273997303a40aaa.jpg",
    wateringFrequency: "Every 3 days",
    sunlight: "medium",
    temperature: "15-21°C",
    isFlowering: false,
    nextWatering: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    healthStatus: "warning"
  },
  {
    id: "4",
    name: "Rose Bush",
    scientificName: "Rosa rubiginosa",
    category: "shrub",
    image: "https://i.pinimg.com/736x/04/c6/df/04c6df391d1811982d71c94b3d759654.jpg",
    wateringFrequency: "Daily",
    sunlight: "high",
    temperature: "20-25°C",
    isFlowering: true,
    nextWatering: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    healthStatus: "healthy"
  },
  {
    id: "5",
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    category: "indoor",
    image: "https://i.pinimg.com/1200x/4a/73/d9/4a73d910356e9744ab418a7f1244ad74.jpg",
    wateringFrequency: "Bi-weekly",
    sunlight: "low",
    temperature: "18-27°C",
    isFlowering: false,
    nextWatering: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    healthStatus: "healthy"
  },
  {
    id: "6",
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    category: "climbing",
    image: "https://i.pinimg.com/1200x/33/fe/01/33fe01bec38e805e599596d080d54092.jpg",
    wateringFrequency: "Weekly",
    sunlight: "medium",
    temperature: "17-26°C",
    isFlowering: false,
    nextWatering: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    healthStatus: "healthy"
  },
  {
    id: "7",
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    category: "flowering",
    image: "https://i.pinimg.com/736x/61/3f/92/613f92916e8ddfc873711e27cce79bd2.jpg",
    wateringFrequency: "Every 4 days",
    sunlight: "high",
    temperature: "15-25°C",
    isFlowering: true,
    nextWatering: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    healthStatus: "healthy"
  },
  {
    id: "8",
    name: "Boxwood",
    scientificName: "Buxus sempervirens",
    category: "shrub",
    image: "https://i.pinimg.com/736x/17/94/5a/17945ac110f9cc20830b8731524a1555.jpg",
    wateringFrequency: "Twice weekly",
    sunlight: "medium",
    temperature: "10-20°C",
    isFlowering: false,
    nextWatering: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    healthStatus: "warning"
  }
];

// Mock plant identification function
export const identifyPlant = async (image: File, answers: any): Promise<Plant> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a random plant from our mock data
  const randomPlant = mockPlants[Math.floor(Math.random() * mockPlants.length)];
  
  // Adjust health status based on answers
  let healthStatus: 'healthy' | 'warning' | 'unhealthy' = 'healthy';
  
  if (answers.symptoms && answers.symptoms.length > 0) {
    healthStatus = 'warning';
  }
  
  // Simple watering frequency logic
  const frequencyCheck = answers.wateringFrequency.toLowerCase();
  if (frequencyCheck.includes('daily') && !frequencyCheck.includes('outdoor')) {
    healthStatus = 'warning';
  }
  
  return {
    ...randomPlant,
    id: Date.now().toString(),
    healthStatus,
    nextWatering: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
  };
};