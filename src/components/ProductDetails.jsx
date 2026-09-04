import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const fetchProductById = async (id) => {
  const response = await fetch(`http://localhost:5000/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Product not found!');
  }
  return response.json();
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600 font-semibold text-lg">
        🌀 Loading Product Details...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{error?.message || 'Product not found'}</p>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white border rounded-2xl shadow-sm overflow-hidden p-6 md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          ← Back to Catalog
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center bg-gray-50 p-6 rounded-xl border">
            <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-amber-500 font-bold text-sm">
                  ★ {product.rating?.rate} <span className="text-gray-400 font-normal">({product.rating?.count} reviews)</span>
                </span>
              </div>
              <div className="mt-6">
                <span className="text-3xl font-black text-gray-900">${product.price}</span>
              </div>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={() => dispatch(addToCart(product))}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}