export interface UploadedImage {
    id: string;
    file: File;
    url: string;
    name: string;
    size: number;
    uploadedAt: Date;
  }
  
  export interface ProductForm {
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    description: string;
    image: string;
    inStock: boolean;
  }