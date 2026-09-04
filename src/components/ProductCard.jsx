import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function ProductCard({ product }) {
  const { id, title, price, image, category, rating } = product;
  const dispatch = useDispatch();

  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col justify-between p-4">
      <Link to={`/products/${id}`} className="w-full h-48 flex items-center justify-center p-2 bg-white">
        <img src={image} alt={title} className="h-full object-contain hover:scale-105 transition-transform duration-200" />
      </Link>

      <div className="mt-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">{category}</span>
          <Link to={`/products/${id}`}>
            <h2 className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mt-1 min-h-[2.5rem]">
              {title}
            </h2>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block">Price</span>
            <span className="text-lg font-bold text-gray-900">${price}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Rating</span>
            <span className="text-sm font-semibold text-amber-500">★ {rating?.rate}</span>
          </div>
        </div>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}