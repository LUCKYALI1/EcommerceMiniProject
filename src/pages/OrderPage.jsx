import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Stagger Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
  },
};

// Helper for Status Badge Styling
const getStatusBadge = (status = 'Processing') => {
  const lower = status.toLowerCase();
  if (lower.includes('deliver')) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dot-emerald-500';
  }
  if (lower.includes('ship')) {
    return 'bg-blue-50 text-blue-700 border-blue-200/80 dot-blue-500';
  }
  return 'bg-amber-50 text-amber-700 border-amber-200/80 dot-amber-500';
};

export default function OrdersPage() {
  const orders = useSelector((state) => state.orders.orders);

  // Empty State
  if (orders.length === 0) {
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
            📦
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              No Orders Found
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              You haven't placed any orders yet. Start exploring our catalog to fill your history!
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm"
            >
              Start Shopping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-900 py-10 px-4 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
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
              Order History
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Your Orders
            </h1>
          </div>

          <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-full self-start sm:self-auto shadow-2xs">
            Total Orders: <span className="text-slate-900 font-bold">{orders.length}</span>
          </span>
        </motion.div>

        {/* Orders List with Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {orders.map((order) => {
            const badgeStyle = getStatusBadge(order.status);
            return (
              <motion.div
                key={order.id}
                variants={cardVariants}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow duration-300"
              >
                {/* Order Header Summary Bar */}
                <div className="bg-slate-50/60 border-b border-slate-200/80 p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                  <div>
                    <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider block">
                      Order ID
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {order.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider block">
                      Date Placed
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {order.date}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider block">
                      Total Amount
                    </span>
                    <span className="text-sm font-extrabold text-blue-600">
                      ${order.totalAmount}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex sm:justify-end items-center">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${badgeStyle}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items List */}
                <div className="p-5 sm:p-6 divide-y divide-slate-100">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl p-2 shrink-0 flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-slate-900 line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">
                            ${item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      <span className="font-bold text-sm text-slate-900 shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}