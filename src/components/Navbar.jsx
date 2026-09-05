import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-2">
          🛍️ <span className="text-blue-600">Dev</span>Store
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            🛒 Cart
            {totalCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">👤 {user?.name}</span>
              <button
                onClick={() => dispatch(logout())}
                className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}