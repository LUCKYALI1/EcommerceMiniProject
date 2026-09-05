import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
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

  const handleAddToCart = (productData) => {
    dispatch(addToCart(productData));
    toast.success(`${productData.title} added to cart! 🛒`);
  };

  // Skeleton Shimmer Loader
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBFBFD] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-2xs animate-pulse space-y-8">
          <div className="h-6 w-28 bg-slate-100 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-96 bg-slate-100 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-4 w-20 bg-slate-100 rounded" />
              <div className="h-8 w-3/4 bg-slate-100 rounded-lg" />
              <div className="h-4 w-1/3 bg-slate-100 rounded" />
              <div className="h-10 w-1/4 bg-slate-100 rounded-lg mt-6" />
              <div className="h-20 w-full bg-slate-100 rounded-lg mt-4" />
              <div className="h-12 w-full bg-slate-100 rounded-xl mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-rose-200 text-center p-8 rounded-3xl max-w-md shadow-2xs space-y-4"
        >
          <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-xl mx-auto">
            ⚠️
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Product Unavailable</h2>
            <p className="text-xs text-slate-500 mt-1">{error?.message || 'We couldn\'t find the requested product.'}</p>
          </div>
          <Link
            to="/products"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-2xs"
          >
            Return to Catalog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] py-10 px-4 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-3xl shadow-2xs overflow-hidden p-6 md:p-10 space-y-6"
      >
        {/* Navigation Back Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer bg-slate-50 hover:bg-blue-50 border border-slate-200/80 px-3 py-1.5 rounded-xl"
        >
          ← Back to Catalog
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image Showcase */}
          <div className="flex items-center justify-center bg-slate-50/80 p-8 rounded-2xl border border-slate-100 h-96 group">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
            />
          </div>

          {/* Details Content */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                {product.category}
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                  <span>★</span>
                  <span>{product.rating?.rate}</span>
                </div>
                <span className="text-xs font-medium text-slate-400">
                  ({product.rating?.count} customer reviews)
                </span>
              </div>

              <div className="pt-2">
                <span className="text-3xl font-black text-slate-900">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
              >
                Add to Shopping Cart
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}