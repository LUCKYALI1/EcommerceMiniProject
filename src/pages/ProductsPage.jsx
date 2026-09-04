import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import useDebounce from '../hooks/useDebounce';

// API Fetcher with Page & Limit
const fetchProducts = async (searchTerm, page, limit) => {
  const response = await fetch(
    `http://localhost:5000/api/products?search=${encodeURIComponent(
      searchTerm
    )}&page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch product data from server!');
  }
  return response.json();
};

export default function ProductsPage() {
  // 1. Sync State with URL Search Params
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 4;
  const urlSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 2. TanStack Query with Page & Limit Dependency
  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ['products', debouncedSearchTerm, page, limit],
    queryFn: () => fetchProducts(debouncedSearchTerm, page, limit),
    placeholderData: keepPreviousData, // Prevents layout flickering when changing pages!
  });

  const products = data?.data || [];
  const pagination = data?.pagination || {};

  // URL Helpers
  const handlePageChange = (newPage) => {
    setSearchParams({ search: debouncedSearchTerm, page: newPage, limit });
  };

  const handleLimitChange = (newLimit) => {
    setSearchParams({ search: debouncedSearchTerm, page: 1, limit: newLimit });
  };

  const handleSearchChange = (newSearch) => {
    setSearchTerm(newSearch);
    setSearchParams({ search: newSearch, page: 1, limit });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Explore Products</h1>
            <p className="text-sm text-gray-500 mt-1">
              Server-Side Pagination & URL Synchronized
            </p>
          </div>

          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600 font-medium">
            Found <span className="font-bold text-gray-900">{pagination.totalItems || 0}</span> matching items
          </span>

          {searchTerm !== debouncedSearchTerm && (
            <span className="text-xs text-amber-600 font-semibold animate-pulse">
              ⏳ Waiting for you to stop typing...
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center text-lg font-semibold text-blue-600">
            🌀 Fetching Page {page}...
          </div>
        ) : isError ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-medium">
            Error: {error.message}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-200 ${isPlaceholderData ? 'opacity-50' : 'opacity-100'}`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls Component */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              onPageChange={handlePageChange}
              limit={limit}
              onLimitChange={handleLimitChange}
            />
          </>
        ) : (
          <div className="bg-white border rounded-xl p-12 text-center my-8">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-gray-800">No products found</h3>
          </div>
        )}
      </div>
    </div>
  );
}