export function FontComparison() {
  const sections = [
    {
      heading: "Your Favourites",
      accent: "#b45309",
      fonts: [
        {
          name: "Dancing Script",
          label: "Dancing Script",
          description: "Flowing handwritten script",
          style: { fontFamily: "'Dancing Script', cursive", fontWeight: 600 },
          size: "text-3xl",
        },
        {
          name: "Pacifico",
          label: "Pacifico",
          description: "Casual, friendly retro script",
          style: { fontFamily: "'Pacifico', cursive" },
          size: "text-2xl",
        },
      ],
    },
    {
      heading: "More Scripts",
      accent: "#2563eb",
      fonts: [
        {
          name: "Great Vibes",
          label: "Great Vibes",
          description: "Elegant flowing calligraphy",
          style: { fontFamily: "'Great Vibes', cursive" },
          size: "text-4xl",
        },
        {
          name: "Sacramento",
          label: "Sacramento",
          description: "Thin, delicate italic script",
          style: { fontFamily: "'Sacramento', cursive" },
          size: "text-4xl",
        },
        {
          name: "Satisfy",
          label: "Satisfy",
          description: "Refined everyday script",
          style: { fontFamily: "'Satisfy', cursive" },
          size: "text-3xl",
        },
      ],
    },
    {
      heading: "Other Options",
      accent: "#6b7280",
      fonts: [
        {
          name: "Cinzel",
          label: "Cinzel ← current",
          description: "Classical Roman small-caps",
          style: { fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" },
          size: "text-xl font-semibold",
        },
        {
          name: "Playfair Display",
          label: "Playfair Display",
          description: "Editorial high-contrast serif",
          style: { fontFamily: "'Playfair Display', serif" },
          size: "text-2xl font-semibold",
        },
        {
          name: "Cormorant Garamond",
          label: "Cormorant Garamond",
          description: "Luxurious, delicate display serif",
          style: { fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.04em" },
          size: "text-2xl font-semibold",
        },
        {
          name: "Raleway",
          label: "Raleway",
          description: "Thin elegant geometric sans",
          style: { fontFamily: "'Raleway', sans-serif", letterSpacing: "0.15em", fontWeight: 300 },
          size: "text-xl uppercase",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <h1 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6 text-center">
        Wordmark Font Options — Whole Journeys
      </h1>
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.heading}>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-2 px-1"
              style={{ color: section.accent }}
            >
              {section.heading}
            </div>
            <div className="flex flex-col gap-2">
              {section.fonts.map((font) => (
                <div
                  key={font.name}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c9a84c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                      </svg>
                      <div className="flex flex-col leading-tight">
                        <span
                          style={{ color: "#1a2e4a", ...font.style }}
                          className={font.size}
                        >
                          Whole Journeys
                        </span>
                        <span
                          style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.18em" }}
                          className="text-[9px] font-medium uppercase text-gray-400 mt-0.5"
                        >
                          by Kathy Dragon
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-gray-700">{font.label}</div>
                      <div className="text-xs text-gray-400">{font.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
