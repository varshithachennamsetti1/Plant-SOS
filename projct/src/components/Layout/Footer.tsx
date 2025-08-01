import { Leaf, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-nature border-t border-border/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg gradient-primary shadow-soft">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">PlantCare Assistant</span>
          </div>
          
          <div className="flex items-center space-x-1 text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for plant lovers</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>Keep your plants healthy and happy with AI-powered care recommendations.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;