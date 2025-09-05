import React from 'react';
import { ShoppingCart, Search, User, Heart } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-blue-600">
              ShopHub
            </h1>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Categories</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Deals</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
            </nav>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="w-6 h-6" />
            </button>
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};