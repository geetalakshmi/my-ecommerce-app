import React, { useState, useMemo } from 'react';
import { Settings } from 'lucide-react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ShoppingCart } from './components/ShoppingCart';
import { CategoryFilter } from './components/CategoryFilter';
import { AdminPanel } from './components/AdminPanel';
import { Product, CartItem } from './types/Product';
import { products as initialProducts } from './data/products';

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.max(...products.map(p => p.id)) + 1,
      rating: 4.0,
      reviews: 0
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    // Also remove from cart if present
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={() => setIsAdminMode(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Back to Store
              </button>
            </div>
          </div>
        </div>
        
        <AdminPanel
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Admin Toggle Button */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={() => setIsAdminMode(true)}
          className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Amazing Products
          </h2>
          <p className="text-gray-600 text-lg">
            Find the perfect items for your lifestyle
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or category filters
            </p>
          </div>
        )}
      </main>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;