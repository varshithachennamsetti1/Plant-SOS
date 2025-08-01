import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: string[]) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, onFilterChange, placeholder = "Search plants..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    { id: 'indoor', label: 'Indoor', emoji: '🏠' },
    { id: 'flowering', label: 'Flowering', emoji: '🌸' },
    { id: 'climbing', label: 'Climbing', emoji: '🌿' },
    { id: 'shrub', label: 'Shrubs', emoji: '🌳' },
  ];

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 border-2 border-border focus:border-primary shadow-soft"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by:</span>
        </div>
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={activeFilters.includes(category.id) ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 ${
              activeFilters.includes(category.id)
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "hover:bg-accent/50"
            }`}
            onClick={() => toggleFilter(category.id)}
          >
            <span className="mr-1">{category.emoji}</span>
            {category.label}
          </Badge>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-1">
            {activeFilters.map((filterId) => {
              const category = categories.find(c => c.id === filterId);
              return (
                <Badge
                  key={filterId}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filterId)}
                >
                  {category?.emoji} {category?.label} ✕
                </Badge>
              );
            })}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveFilters([]);
              onFilterChange([]);
            }}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;