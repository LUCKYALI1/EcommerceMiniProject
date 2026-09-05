import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../redux/authSlice';
import toast from 'react-hot-toast';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.05 }}
            className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg shadow-2xs group-hover:bg-blue-600 transition-colors duration-300"
          >
            🛍️
          </motion.div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            <span className="text-blue-600">Dev</span>Store
          </span>
        </Link>

        {/* Right Navigation & User Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Orders Link (Only shown when authenticated) */}
          {isAuthenticated && (
            <Link
              to="/orders"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200/60"
            >
              <span>📦</span>
              <span className="hidden sm:inline">Orders</span>
            </Link>
          )}

          {/* Cart Button with Animated Badge */}
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 bg-slate-100/80 hover:bg-slate-100 text-slate-800 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all border border-slate-200/60 hover:border-slate-300/80 cursor-pointer"
          >
            <span>🛒</span>
            <span>Cart</span>
            <AnimatePresence>
              {totalCount > 0 && (
                <motion.span
                  key={totalCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-2xs shadow-blue-500/40"
                >
                  {totalCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5 pl-1 sm:pl-2 border-l border-slate-200/80">
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl">
                <span className="text-xs">👤</span>
                <span className="text-xs font-bold text-slate-700 max-w-[120px] truncate">
                  {user?.name || 'User'}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/60 px-3 py-2 rounded-xl font-bold transition-all cursor-pointer"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/login"
                className="inline-flex items-center justify-center text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20"
              >
                Login
              </Link>
            </motion.div>
          )}

        </div>
      </div>
    </header>
  );
}