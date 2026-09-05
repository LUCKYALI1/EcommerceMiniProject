import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.success(`${title} removed from cart`);
  };

  // Empty Cart View
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FBFBFD] px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white border border-slate-200/80 rounded-3xl p-10 sm:p-14 text-center max-w-md w-full shadow-2xs space-y-6"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-4xl mx-auto shadow-2xs"
          >
            🛒
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Your Cart is Empty
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Looks like you haven't added anything to your cart yet. Explore our products to find something you love.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm"
            >
              Explore Products
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-900 py-10 px-4 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-6"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Shopping Bag
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Shopping Cart
            </h1>
          </div>

          <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-full self-start sm:self-auto shadow-2xs">
            Total Items: <span className="text-slate-900 font-bold">{cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
          </span>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Product Details */}
                  <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-bold text-blue-600">
                        ${item.price} <span className="text-slate-400 font-medium">each</span>
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    
                    {/* Quantity Pill */}
                    <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden p-0.5">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors font-bold text-sm cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        −
                      </motion.button>
                      <span className="w-9 text-center text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors font-bold text-sm cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </motion.button>
                    </div>

                    {/* Subtotal Item Price */}
                    <span className="font-extrabold text-sm text-slate-900 min-w-[70px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(item.id, item.title)}
                      className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors text-xs font-semibold cursor-pointer"
                      title="Remove Item"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-4 lg:sticky lg:top-8"
          >
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
              
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
                <p className="text-xs text-slate-500">Subtotal and taxes calculated at checkout</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-between items-center font-extrabold text-base text-slate-900">
                <span>Total Amount</span>
                <span className="text-2xl text-blue-600">${totalAmount.toFixed(2)}</span>
              </div>

              {/* Checkout Link Button */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/checkout"
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm cursor-pointer"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}