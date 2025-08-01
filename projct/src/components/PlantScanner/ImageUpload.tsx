import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage?: File | null;
  onRemove?: () => void;
}

const ImageUpload = ({ onImageSelect, selectedImage, onRemove }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onRemove?.();
  };

  return (
    <Card className="p-6 gradient-card shadow-soft border-2 border-dashed border-border hover:border-primary/30 transition-all duration-300">
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Plant preview" 
            className="w-full h-64 object-cover rounded-lg shadow-soft"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 rounded-full p-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center h-64 cursor-pointer group"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="p-6 rounded-full gradient-primary shadow-nature group-hover:scale-105 transition-transform duration-300 mb-4">
            <Camera className="h-12 w-12 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload Plant Photo</h3>
          <p className="text-muted-foreground text-center mb-4 max-w-sm">
            Take a clear photo of your plant or drag and drop an image here
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Choose File</span>
            </Button>
            <span className="text-sm text-muted-foreground">or</span>
            <Button variant="default" className="gradient-primary">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        className="hidden"
      />
    </Card>
  );
};

export default ImageUpload;