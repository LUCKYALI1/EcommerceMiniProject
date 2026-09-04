import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async (searchTerm) => {
    const response = await fetch(
        `http://localhost:5000/api/products${searchTerm ? `?search=${searchTerm}` : ''}`
    )
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export default function ProductsPage({ addToCart }) {

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['products', debouncedSearchTerm],
        queryFn: () => fetchProducts(debouncedSearchTerm),
        keepPreviousData: true,
    })

    const products = data?.data || [];
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Explore Products</h1>
                        <p className="text-sm text-gray-500 mt-1">Powered by Express REST API & TanStack Query</p>
                    </div>

                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>

                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-gray-600 font-medium">
                        Found <span className="font-bold text-gray-900">{products.length}</span> matching items
                    </span>

                    {searchTerm !== debouncedSearchTerm && (
                        <span className="text-xs text-amber-600 font-semibold animate-pulse">
                            ⏳ Waiting for you to stop typing...
                        </span>
                    )}
                </div>

                {isLoading ? (
                    <div className="min-h-[300px] flex items-center justify-center text-lg font-semibold text-blue-600">
                        🌀 Fetching with TanStack Query...
                    </div>
                ) : isError ? (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center font-medium">
                        Error: {error.message}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
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