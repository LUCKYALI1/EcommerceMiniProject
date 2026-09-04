import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-2">
          🛍️ <span className="text-blue-600">Dev</span>Store
        </Link>

        <Link
          to="/cart"
          className="relative bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer"
        >
          🛒 Cart
          {totalCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}