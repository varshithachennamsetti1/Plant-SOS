import { Link, useLocation } from "react-router-dom";
import { Leaf, Camera, Calendar, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Leaf },
    { path: "/scan", label: "Scan", icon: Camera },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/encyclopedia", label: "Plants", icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 gradient-nature border-b border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg gradient-primary shadow-soft group-hover:shadow-nature transition-all duration-300">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Plant SOS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-2 transition-all duration-300 ${
                      isActive 
                        ? "gradient-primary text-primary-foreground shadow-soft" 
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;