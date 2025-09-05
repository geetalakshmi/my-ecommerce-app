import React from 'react';
import { X, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!isOpen || !product) return null;

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 lg:h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                    -{discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="lg:w-1/2 p-8">
                <div className="mb-4">
                  <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{product.reviews} reviews</span>
                  <span className="text-gray-400">•</span>
                  <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      product.inStock
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>• Free shipping on orders over $50</p>
                  <p>• 30-day return policy</p>
                  <p>• Secure payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};