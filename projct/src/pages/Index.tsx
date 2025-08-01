import { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Leaf, Droplets, Sun, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-plants.jpg";
import { Button } from "@/components/UI/button";
import { Card } from "@/components/UI/card";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import PlantCard from "@/components/Plants/PlantCard";
import SearchBar from "@/components/UI/SearchBar";
import { mockPlants } from "@/data/mockPlants";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredPlants = mockPlants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(plant.category);
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { 
      name: "Climbing Plants", 
      type: "climbing", 
      icon: "🌿", 
      count: mockPlants.filter(p => p.category === 'climbing').length 
    },
    { 
      name: "Shrubs", 
      type: "shrub", 
      icon: "🌳", 
      count: mockPlants.filter(p => p.category === 'shrub').length 
    },
    { 
      name: "Indoor Plants", 
      type: "indoor", 
      icon: "🏠", 
      count: mockPlants.filter(p => p.category === 'indoor').length 
    },
    { 
      name: "Flowering Plants", 
      type: "flowering", 
      icon: "🌸", 
      count: mockPlants.filter(p => p.category === 'flowering').length 
    },
  ];

  return (
    <div className="min-h-screen gradient-nature">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Beautiful plants" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Keep Your Plants
              <span className="gradient-primary bg-clip-text text-transparent"> Thriving</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              AI-powered plant care assistant that helps identify your plants and provides 
              personalized watering schedules to keep them healthy and happy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/scan">
                <Button 
                  size="lg" 
                  className="gradient-primary text-primary-foreground shadow-nature hover:scale-105 transition-all duration-300 plant-scanner-animation px-8 py-6 text-lg"
                >
                  <Camera className="mr-3 h-6 w-6" />
                  Scan Your Plant
                </Button>
              </Link>
              <Link to="/encyclopedia">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary/30 hover:bg-primary/5 px-8 py-6 text-lg"
                >
                  <Leaf className="mr-3 h-6 w-6" />
                  Browse Plants
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 gradient-card shadow-soft hover:shadow-nature transition-all duration-300 text-center">
              <div className="p-4 rounded-full gradient-primary w-fit mx-auto mb-4">
                <Camera className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Plant Scanner</h3>
              <p className="text-muted-foreground">
                Simply take a photo and our AI will identify your plant species instantly
              </p>
            </Card>
            
            <Card className="p-6 gradient-card shadow-soft hover:shadow-nature transition-all duration-300 text-center">
              <div className="p-4 rounded-full gradient-primary w-fit mx-auto mb-4">
                <Droplets className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Watering</h3>
              <p className="text-muted-foreground">
                Get personalized watering schedules based on your plant's specific needs
              </p>
            </Card>
            
            <Card className="p-6 gradient-card shadow-soft hover:shadow-nature transition-all duration-300 text-center">
              <div className="p-4 rounded-full gradient-primary w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Monitoring</h3>
              <p className="text-muted-foreground">
                Track your plant's health and get expert tips for optimal growth
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Explore Plant Categories
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <Card 
                key={category.type}
                className="p-6 gradient-card shadow-soft hover:shadow-nature transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveFilters([category.type])}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.count} plants available
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plant Gallery */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Popular Plants
          </h2>
          
          <div className="mb-8">
            <SearchBar 
              onSearch={setSearchQuery}
              onFilterChange={setActiveFilters}
              placeholder="Search for plants..."
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.slice(0, 8).map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant}
                showStatus={true}
              />
            ))}
          </div>

          {filteredPlants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No plants found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
