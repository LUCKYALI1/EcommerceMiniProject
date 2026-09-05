import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice';
import { setCart } from '../redux/cartSlice';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const localCart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
  const payload = isRegistering ? { name, email, password } : { email, password };

  try {
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // 1. Check if response is valid JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Backend server is not returning JSON. Check if server is running on port 5000.');
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Authentication failed');

    dispatch(loginSuccess({ user: data.user, token: data.token }));

    // Merge / Sync Cart on Login
    const mergedCart = data.cart && data.cart.length > 0 ? data.cart : localCart;

    if (mergedCart.length > 0) {
      await fetch('http://localhost:5000/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({ cart: mergedCart }),
      });
    }

    dispatch(setCart(mergedCart));
    navigate('/');
  } catch (err) {
    setError(err.message);
  }
};

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 border rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    {isRegistering ? 'Create DevStore Account' : 'Sign in to DevStore'}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                        {isRegistering ? 'Register' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-500">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        {isRegistering ? 'Sign In' : 'Register'}
                    </button>
                </p>
            </div>
        </div>
    );
}