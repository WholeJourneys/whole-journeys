export function Option3() {
  const svgLarge = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="36" fill="#1E3A5C"/>
      <circle cx="90" cy="90" r="58" stroke="#C4855A" strokeWidth="5"/>
      <circle cx="90" cy="90" r="44" stroke="white" strokeWidth="1.5" opacity="0.3"/>
      <line x1="90" y1="32" x2="90" y2="148" stroke="white" strokeWidth="1.5" opacity="0.3"/>
      <line x1="32" y1="90" x2="148" y2="90" stroke="white" strokeWidth="1.5" opacity="0.3"/>
      <polygon points="90,38 96,58 90,54 84,58" fill="#C4855A"/>
      <text x="90" y="100" fontFamily="Georgia, serif" fontSize="36" fontWeight="700" fill="white" textAnchor="middle">WJ</text>
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
        <p className="text-sm font-semibold text-gray-800 text-center">Compass Rose</p>
        <p className="text-xs text-gray-500 text-center">Navigation compass with WJ center</p>
      </div>
    </div>
  );
}
