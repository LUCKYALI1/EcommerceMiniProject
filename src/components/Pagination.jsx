import { motion } from 'framer-motion';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}) {
  // Agar ek hi page hai ya 0 pages hain, toh pagination hide rahega
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200/80">
      
      {/* Static Info Label */}
      <span className="text-xs font-semibold text-slate-500">
        Showing page <span className="text-slate-900 font-bold">{currentPage}</span> of{' '}
        <span className="text-slate-900 font-bold">{totalPages}</span> (12 items per page)
      </span>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!hasPrevPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3.5 py-1.5 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
        >
          Previous
        </motion.button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <motion.button
              key={pageNum}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
              }`}
            >
              {pageNum}
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3.5 py-1.5 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}