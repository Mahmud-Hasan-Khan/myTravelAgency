export default function OfferNoticeSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto px-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-2 animate-pulse"
        >
          <div className="bg-gray-200 h-40 md:h-52 w-full rounded-lg mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6 mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}
