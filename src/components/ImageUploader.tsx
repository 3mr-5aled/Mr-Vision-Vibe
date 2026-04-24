import { useState } from 'react';
import { Upload } from 'lucide-react';
import { visionLogic } from '../logic/visionLogic';

export function ImageUploader() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      visionLogic.processImage(file, file.type);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      visionLogic.processImage(file, file.type);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
        isDragging 
          ? 'border-theme-primary bg-theme-primary/10 scale-[1.02]' 
          : 'bg-theme-cream border-gray-200 dark:border-gray-700 hover:bg-theme-cream-hover hover:border-theme-secondary'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
        <div className="p-4 bg-white/50 dark:bg-gray-700 rounded-full text-gray-400 group-hover:text-theme-primary transition-colors">
          <Upload size={40} />
        </div>
        <div>
          <span className="text-xl font-semibold text-theme-text block">Upload an Image</span>
          <span className="text-sm text-theme-text-muted mt-1 block">Drag and drop or click to browse</span>
        </div>
      </label>
    </div>
  );
}
