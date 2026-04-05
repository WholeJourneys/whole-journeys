export function IconOptions() {
  const variants = [
    {
      id: "with-icon",
      label: "With compass icon",
      showIcon: true,
    },
    {
      id: "no-icon",
      label: "Without icon — wordmark only",
      showIcon: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col gap-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">
        Navbar Icon Comparison
      </p>

      {variants.map((v) => (
        <div key={v.id} className="flex flex-col gap-2">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-500 px-1">
            {v.label}
          </div>

          {/* Scrolled / light background */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-3 flex items-center gap-3">
            {v.showIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a2e4a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            )}
            <div className="flex flex-col leading-none">
              <span
                style={{ fontFamily: "'Great Vibes', cursive", color: "#1a2e4a" }}
                className="text-4xl font-normal"
              >
                Whole Journeys
              </span>
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.22em" }}
                className="text-[9px] font-medium uppercase text-gray-400 mt-0.5"
              >
                by Kathy Dragon
              </span>
            </div>
          </div>

          {/* Hero / dark background */}
          <div
            className="rounded-lg px-6 py-3 flex items-center gap-3"
            style={{ background: "#1a2e4a" }}
          >
            {v.showIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            )}
            <div className="flex flex-col leading-none">
              <span
                style={{ fontFamily: "'Great Vibes', cursive", color: "rgba(255,255,255,0.95)" }}
                className="text-4xl font-normal"
              >
                Whole Journeys
              </span>
              <span
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.22em" }}
                className="text-[9px] font-medium uppercase text-white/50 mt-0.5"
              >
                by Kathy Dragon
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
