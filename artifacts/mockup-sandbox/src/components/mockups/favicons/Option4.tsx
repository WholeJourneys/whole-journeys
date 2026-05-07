export function Option4() {
  const svg = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="36" fill="#C4855A"/>
      <path d="M40 130 Q55 80 75 90 Q95 100 105 60 Q115 30 140 50" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <circle cx="40" cy="130" r="8" fill="white"/>
      <circle cx="140" cy="50" r="8" fill="white"/>
      <circle cx="140" cy="50" r="4" fill="#C4855A"/>
    </svg>
  );
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-5">
        {svg(280)}
        <div className="bg-gray-200 rounded px-2 py-1 flex items-center gap-1.5 text-xs text-gray-600">
          {svg(16)}<span>Whole Journeys</span>
        </div>
        <p className="text-base font-semibold text-gray-800 text-center">Journey Path</p>
        <p className="text-xs text-gray-500 text-center">Winding trail on terracotta</p>
      </div>
    </div>
  );
}
