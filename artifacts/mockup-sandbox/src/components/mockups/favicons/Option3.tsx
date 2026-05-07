export function Option3() {
  const svg = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="36" fill="#1B4D6E"/>
      <circle cx="90" cy="92" r="58" fill="#1A6B8A" stroke="#4ABFB0" strokeWidth="2.5"/>
      <ellipse cx="90" cy="92" rx="28" ry="58" stroke="white" strokeWidth="1" opacity="0.25"/>
      <ellipse cx="90" cy="92" rx="58" ry="20" stroke="white" strokeWidth="1" opacity="0.25"/>
      <ellipse cx="90" cy="92" rx="58" ry="38" stroke="white" strokeWidth="1" opacity="0.15"/>
      <line x1="32" y1="92" x2="148" y2="92" stroke="white" strokeWidth="1" opacity="0.25"/>
      <line x1="90" y1="34" x2="90" y2="150" stroke="white" strokeWidth="1" opacity="0.25"/>
      <polygon points="90,22 83,44 90,40 97,44" fill="#3DD68C"/>
      <line x1="90" y1="22" x2="90" y2="40" stroke="#3DD68C" strokeWidth="2.5"/>
      <text x="90" y="105" fontFamily="Georgia, serif" fontSize="34" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="-0.5">WJ</text>
    </svg>
  );
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-5">
        {svg(280)}
        <div className="bg-gray-200 rounded px-2 py-1 flex items-center gap-1.5 text-xs text-gray-600">
          {svg(16)}<span>Whole Journeys</span>
        </div>
        <p className="text-base font-semibold text-gray-800 text-center">Globe Pointing North</p>
        <p className="text-xs text-gray-500 text-center">Blue globe · green north arrow · WJ</p>
      </div>
    </div>
  );
}
