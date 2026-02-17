export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-xl mb-3" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonSearchForm() {
  return (
    <div className="bg-white rounded-2xl shadow-xl mx-4 p-4 animate-pulse">
      <div className="flex gap-4 mb-4 overflow-x-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col items-center min-w-[80px]">
            <div className="h-8 w-8 bg-gray-200 rounded-full mb-2" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-12 bg-gray-200 rounded-lg" />
        <div className="h-12 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 bg-gray-200 rounded-lg" />
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>
        <div className="h-12 bg-gray-200 rounded-lg" />
        <div className="h-12 bg-orange-200 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonDestination() {
  return (
    <div className="px-4 py-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>
      <div className="h-60 bg-gray-200 rounded-xl" />
    </div>
  );
}

export function SkeletonServiceGrid() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mx-4 animate-pulse">
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-10 w-10 bg-gray-200 rounded-full mb-2" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
