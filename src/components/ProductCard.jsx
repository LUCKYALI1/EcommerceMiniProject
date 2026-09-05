import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents navigating to product detail page on button click
    dispatch(addToCart(product));
    toast.success(`${product.title.slice(0, 22)}... added! 🛒`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
    >
      <Link to={`/products/${product.id}`} className="block mb-3 space-y-3">
        {/* Product Image Frame */}
        <div className="h-48 w-full flex items-center justify-center bg-slate-50/80 rounded-xl p-4 overflow-hidden border border-slate-100 group-hover:bg-slate-100/60 transition-colors">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>

        {/* Category & Title */}
        <div className="space-y-1">
          <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50/80 border border-blue-100/60 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {product.category}
          </span>
          <h2 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h2>
        </div>
      </Link>

      {/* Footer Info & Action */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-black text-slate-900">
            ${Number(product.price).toFixed(2)}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
            <span>★</span>
            <span>{product.rating?.rate || '4.5'}</span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleAddToCart}
          className="w-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
}