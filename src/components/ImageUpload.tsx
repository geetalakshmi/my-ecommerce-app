import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, currentImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages(prev => [...prev, imageUrl]);
      onImageSelect(imageUrl);
      setIsUploading(false);
    }, 1500);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Image
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-600">Uploading image...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              Drag and drop your image here, or{' '}
              <button
                type="button"
                onClick={onButtonClick}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {/* Current Image Preview */}
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage}
            alt="Current product"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
            <Check className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Recently Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recently Uploaded</h4>
          <div className="grid grid-cols-3 gap-2">
            {uploadedImages.map((imageUrl, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => onImageSelect(imageUrl)}
              >
                <img
                  src={imageUrl}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-20 object-cover rounded border border-gray-200 group-hover:border-blue-400 transition-colors"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};