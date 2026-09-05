import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import useDebounce from '../hooks/useDebounce';

const LIMIT = 12; // Static Limit per page

// API Fetcher with Page & Fixed Limit
const fetchProducts = async (searchTerm, page, limit) => {
  const response = await fetch(
    `https://dev-store-server.vercel.app/api/products?search=${encodeURIComponent(
      searchTerm
    )}&page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch product data from server!');
  }
  return response.json();
};

// Animation Variants for Grid & Items
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function ProductsPage() {
  // 1. Sync State with URL Search Params
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const urlSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 2. TanStack Query with Fixed LIMIT
  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ['products', debouncedSearchTerm, page, LIMIT],
    queryFn: () => fetchProducts(debouncedSearchTerm, page, LIMIT),
    placeholderData: keepPreviousData,
  });

  const products = data?.data || [];
  const pagination = data?.pagination || {};

  // URL Helpers
  const handlePageChange = (newPage) => {
    setSearchParams({ search: debouncedSearchTerm, page: newPage });
  };

  const handleSearchChange = (newSearch) => {
    setSearchTerm(newSearch);
    setSearchParams({ search: newSearch, page: 1 });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-900 py-10 px-4 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8"
        >
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Live Catalog
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Discover Products
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-md">
              Real-time server synchronization with zero-flicker transitions.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
          </div>
        </motion.div>

        {/* Live Search & Count Stats Bar */}
        <div className="flex flex-wrap justify-between items-center gap-3 text-sm font-medium">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs"
          >
            <span className="text-slate-400">Showing</span>
            <span className="font-bold text-slate-900">{pagination.totalItems || 0}</span>
            <span className="text-slate-400">products</span>
          </motion.div>

          <AnimatePresence>
            {searchTerm !== debouncedSearchTerm && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 text-amber-700 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Refining results...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content States */}
        {isLoading ? (
          /* Skeleton Shimmer Loading Grid (12 items) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: LIMIT }).map((_, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-4 animate-pulse shadow-2xs"
              >
                <div className="h-48 bg-slate-100 rounded-xl" />
                <div className="h-4 bg-slate-100 rounded w-1/3" />
                <div className="h-5 bg-slate-100 rounded w-3/4" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-slate-100 rounded w-1/4" />
                  <div className="h-8 bg-slate-100 rounded-xl w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          /* Error Banner */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-2xl text-center space-y-2 max-w-lg mx-auto my-12"
          >
            <div className="text-3xl">⚠️</div>
            <h3 className="font-bold text-base">Unable to load catalog</h3>
            <p className="text-xs text-rose-600 font-mono">{error.message}</p>
          </motion.div>
        ) : products.length > 0 ? (
          /* Products Grid with Framer Motion Stagger */
          <div className="space-y-10">
            <motion.div
              key={`${debouncedSearchTerm}-${page}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${
                isPlaceholderData ? 'opacity-50 pointer-events-none' : 'opacity-100'
              }`}
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                onPageChange={handlePageChange}
              />
            </motion.div>
          </div>
        ) : (
          /* Sleek Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-md mx-auto my-12 shadow-2xs space-y-4"
          >
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-2xs">
              🔎
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500">
                We couldn't find anything matching "{debouncedSearchTerm}". Try searching for something else.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}