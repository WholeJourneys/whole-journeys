export function Option1() {
  const svgLarge = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="36" fill="#1E3A5C"/>
      <text x="90" y="108" fontFamily="Georgia, serif" fontSize="82" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="-2">WJ</text>
    </svg>
  );
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-5 w-56">
        {svgLarge(160)}
        <div className="flex items-center gap-3 mt-1">
          <div className="bg-gray-200 rounded px-2 py-1 flex items-center gap-1.5 text-xs text-gray-600">
            {svgLarge(16)}
            <span>Whole Journeys</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-800 text-center">WJ Serif Monogram</p>
        <p className="text-xs text-gray-500 text-center">Classic serif lettering on navy</p>
      </div>
    </div>
  );
}
