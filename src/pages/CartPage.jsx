import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <Link to="/" className="mt-6 bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white border rounded-xl p-4 flex gap-4 items-center justify-between shadow-sm">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain p-2 bg-gray-50 rounded-lg border" />

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">${item.price} each</p>
                <p className="text-sm font-bold text-gray-900 mt-2">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2 border rounded-lg p-1 bg-gray-50">
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  className="w-7 h-7 flex items-center justify-center bg-white border rounded font-bold hover:bg-gray-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-bold px-2">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  className="w-7 h-7 flex items-center justify-center bg-white border rounded font-bold hover:bg-gray-100 cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-6 h-fit shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-base text-gray-900">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}