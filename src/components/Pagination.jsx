export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
  hasNextPage,
  hasPrevPage,
}) {
  if (totalPages <= 1 && limit === 4) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t">
      {/* Limit Selector */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Items per page:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-2">
        <button
          disabled={!hasPrevPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 border rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 border rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}