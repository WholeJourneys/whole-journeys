export function Option6() {
  const svgLarge = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="90" fill="#1E3A5C"/>
      <rect x="12" y="12" width="156" height="156" rx="78" stroke="#C4855A" stroke-width="4" fill="none"/>
      <rect x="22" y="22" width="136" height="136" rx="68" stroke="white" stroke-width="1" fill="none" opacity="0.3"/>
      <text x="90" y="105" fontFamily="Georgia, serif" fontSize="66" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="-2">WJ</text>
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
        <p className="text-sm font-semibold text-gray-800 text-center">Circle Emblem</p>
        <p className="text-xs text-gray-500 text-center">WJ in layered circular crest</p>
      </div>
    </div>
  );
}
