export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    originalPrice?: number;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }