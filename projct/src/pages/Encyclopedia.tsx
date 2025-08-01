import { useState, useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import PlantCard from "@/components/Plants/PlantCard";
import SearchBar from "@/components/UI/SearchBar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Encyclopedia = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("https://plant-sos.onrender.com/plants");
        if (!response.ok) {
          throw new Error("Failed to fetch plants");
        }
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(plant.category);
    return matchesSearch && matchesFilter;
  });

  const categoryStats = {
    indoor: plants.filter(p => p.category === 'indoor').length,
    flowering: plants.filter(p => p.category === 'flowering').length,
    climbing: plants.filter(p => p.category === 'climbing').length,
    shrub: plants.filter(p => p.category === 'shrub').length,
  };

  return (
    <div className="min-h-screen gradient-nature">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Plant Encyclopedia</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover and learn about different plant species, their care requirements, 
              and growing conditions.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 gradient-card shadow-soft text-center">
              <div className="text-2xl mb-1">🏠</div>
              <div className="text-2xl font-bold text-foreground">{categoryStats.indoor}</div>
              <div className="text-sm text-muted-foreground">Indoor Plants</div>
            </Card>
            <Card className="p-4 gradient-card shadow-soft text-center">
              <div className="text-2xl mb-1">🌸</div>
              <div className="text-2xl font-bold text-foreground">{categoryStats.flowering}</div>
              <div className="text-sm text-muted-foreground">Flowering</div>
            </Card>
            <Card className="p-4 gradient-card shadow-soft text-center">
              <div className="text-2xl mb-1">🌿</div>
              <div className="text-2xl font-bold text-foreground">{categoryStats.climbing}</div>
              <div className="text-sm text-muted-foreground">Climbing</div>
            </Card>
            <Card className="p-4 gradient-card shadow-soft text-center">
              <div className="text-2xl mb-1">🌳</div>
              <div className="text-2xl font-bold text-foreground">{categoryStats.shrub}</div>
              <div className="text-sm text-muted-foreground">Shrubs</div>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <SearchBar 
              onSearch={setSearchQuery}
              onFilterChange={setActiveFilters}
              placeholder="Search plant encyclopedia..."
            />
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-foreground">
                {filteredPlants.length} plants found
              </h2>
              {searchQuery && (
                <Badge variant="outline" className="px-3 py-1">
                  Searching: "{searchQuery}"
                </Badge>
              )}
            </div>
            
            {activeFilters.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Filtered by:</span>
                {activeFilters.map(filter => (
                  <Badge key={filter} className="capitalize">
                    {filter}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Plant Grid */}
          {filteredPlants.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlants.map((plant) => (
                <PlantCard 
                  key={plant.id} 
                  plant={plant}
                  showStatus={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">No plants found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any plants matching your search criteria. 
                Try adjusting your search terms or filters.
              </p>
              <div className="space-x-4">
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-primary hover:underline"
                >
                  Clear search
                </button>
                <button 
                  onClick={() => setActiveFilters([])}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}

          {/* Educational Content */}
          {filteredPlants.length > 0 && (
            <div className="mt-16 space-y-8">
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">
                Plant Care Tips
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 gradient-card shadow-soft">
                  <div className="text-center mb-4">
                    <div className="p-3 rounded-full gradient-primary w-fit mx-auto mb-3">
                      💧
                    </div>
                    <h3 className="text-lg font-semibold">Watering Guide</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Most plants prefer consistent watering. Check soil moisture 
                    before watering and ensure proper drainage.
                  </p>
                </Card>

                <Card className="p-6 gradient-card shadow-soft">
                  <div className="text-center mb-4">
                    <div className="p-3 rounded-full gradient-primary w-fit mx-auto mb-3">
                      ☀️
                    </div>
                    <h3 className="text-lg font-semibold">Light Requirements</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Understanding light needs is crucial. Low, medium, and high 
                    light plants have different placement requirements.
                  </p>
                </Card>

                <Card className="p-6 gradient-card shadow-soft">
                  <div className="text-center mb-4">
                    <div className="p-3 rounded-full gradient-primary w-fit mx-auto mb-3">
                      🌡️
                    </div>
                    <h3 className="text-lg font-semibold">Temperature Control</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Most houseplants thrive in temperatures between 65-75°F. 
                    Avoid sudden temperature changes.
                  </p>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Encyclopedia;

