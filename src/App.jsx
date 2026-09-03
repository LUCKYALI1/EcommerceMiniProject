import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch product data!');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading Products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900">Explore Products</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {products.length} Items Available
          </span>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}