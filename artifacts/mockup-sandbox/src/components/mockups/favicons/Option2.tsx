export function Option2() {
  const svg = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="36" fill="#1E3A5C"/>
      <path d="M22 148 L55 58 L82 108 L90 82 L98 108 L125 58 L158 148" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 148 L55 58 L82 108 L90 82 L98 108 L125 58 L158 148" stroke="#C4855A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
    </svg>
  );
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-5">
        {svg(280)}
        <div className="bg-gray-200 rounded px-2 py-1 flex items-center gap-1.5 text-xs text-gray-600">
          {svg(16)}<span>Whole Journeys</span>
        </div>
        <p className="text-base font-semibold text-gray-800 text-center">Mountain Peaks W</p>
        <p className="text-xs text-gray-500 text-center">W as twin mountain ridgeline</p>
      </div>
    </div>
  );
}
