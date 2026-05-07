export function Option5() {
  const svgLarge = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="36" fill="#1E3A5C"/>
      <text x="90" y="96" fontFamily="Georgia, serif" fontSize="52" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="-1">WJ</text>
      <line x1="30" y1="112" x2="150" y2="112" stroke="#C4855A" stroke-width="2.5"/>
      <path d="M30 125 Q90 108 150 125" stroke="#C4855A" stroke-width="2" fill="none" opacity="0.5"/>
      <path d="M38 138 Q90 116 142 138" stroke="#C4855A" stroke-width="1.5" fill="none" opacity="0.3"/>
      <path d="M25 100 Q90 60 155 100" stroke="white" stroke-width="1.5" fill="none" opacity="0.2"/>
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
        <p className="text-sm font-semibold text-gray-800 text-center">WJ with Horizon Lines</p>
        <p className="text-xs text-gray-500 text-center">Monogram with landscape horizon</p>
      </div>
    </div>
  );
}
