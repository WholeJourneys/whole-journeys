export function Option6() {
  const svgLarge = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="36" fill="#1E3A5C"/>
      <circle cx="90" cy="90" r="62" stroke="white" strokeWidth="3"/>
      <ellipse cx="90" cy="90" rx="30" ry="62" stroke="white" strokeWidth="1.5" opacity="0.35"/>
      <ellipse cx="90" cy="90" rx="62" ry="22" stroke="white" strokeWidth="1.5" opacity="0.35"/>
      <ellipse cx="90" cy="90" rx="62" ry="40" stroke="white" strokeWidth="1" opacity="0.2"/>
      <line x1="28" y1="90" x2="152" y2="90" stroke="white" strokeWidth="1.5" opacity="0.35"/>
      <text x="90" y="99" fontFamily="Georgia, serif" fontSize="40" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="-1">WJ</text>
      <path d="M90 28 A62 62 0 0 1 152 90" stroke="#C4855A" strokeWidth="3.5" strokeLinecap="round"/>
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
        <p className="text-sm font-semibold text-gray-800 text-center">Globe + WJ</p>
        <p className="text-xs text-gray-500 text-center">Globe with WJ monogram overlay</p>
      </div>
    </div>
  );
}
