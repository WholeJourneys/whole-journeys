import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, RotateCcw, Lock } from "lucide-react";
import { useTours, useUpdateTourTags, ALL_CATEGORIES, TRAVEFY_TOURS } from "@/hooks/use-tours";
import { CATEGORY_COLORS } from "@/components/TourCard";

const SESSION_KEY = "wj_admin_auth";
const CORRECT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "";

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().toUpperCase() === CORRECT_PASSWORD.toUpperCase()) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError(true);
      setValue("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className={`w-full px-4 py-3 rounded-xl border text-center text-lg tracking-widest font-medium bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
              error ? "border-red-400 bg-red-50" : "border-border"
            }`}
          />
          {error && (
            <p className="text-sm text-red-600 text-center">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

const CATEGORY_ACTIVE: Record<string, string> = {
  "Adventure":       "bg-orange-500 text-white border-orange-500",
  "Country Estates": "bg-amber-700 text-white border-amber-700",
  "Culture":         "bg-violet-600 text-white border-violet-600",
  "Family":          "bg-sky-500 text-white border-sky-500",
  "Self-Drive":      "bg-lime-600 text-white border-lime-600",
  "Self-Guided":     "bg-teal-600 text-white border-teal-600",
  "Ski & Snow":      "bg-blue-500 text-white border-blue-500",
  "Wellness":        "bg-rose-500 text-white border-rose-500",
  "Wildlife":        "bg-green-600 text-white border-green-600",
  "Women's":         "bg-pink-500 text-white border-pink-500",
};

const CATEGORY_INACTIVE: Record<string, string> = {
  "Adventure":       "border-orange-400 text-orange-600 hover:bg-orange-50",
  "Country Estates": "border-amber-600 text-amber-700 hover:bg-amber-50",
  "Culture":         "border-violet-400 text-violet-600 hover:bg-violet-50",
  "Family":          "border-sky-400 text-sky-600 hover:bg-sky-50",
  "Self-Drive":      "border-lime-500 text-lime-700 hover:bg-lime-50",
  "Self-Guided":     "border-teal-400 text-teal-600 hover:bg-teal-50",
  "Ski & Snow":      "border-blue-400 text-blue-600 hover:bg-blue-50",
  "Wellness":        "border-rose-400 text-rose-600 hover:bg-rose-50",
  "Wildlife":        "border-green-500 text-green-700 hover:bg-green-50",
  "Women's":         "border-pink-400 text-pink-600 hover:bg-pink-50",
};

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const { data: tours } = useTours();
  const updateTags = useUpdateTourTags();
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  function toggleTag(tourId: string, cat: string, current: string[]) {
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    updateTags.mutate({ tourId, categories: next });
    setSaved((s) => ({ ...s, [tourId]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [tourId]: false })), 1500);
  }

  function resetTags(tourId: string) {
    const defaults = TRAVEFY_TOURS.find((t) => t.id === tourId)?.categories ?? [];
    updateTags.mutate({ tourId, categories: defaults });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
          <h1 className="text-3xl font-display font-semibold text-foreground">Tour Tag Manager</h1>
          <p className="text-muted-foreground mt-2">
            Click tags to toggle them on or off for each tour. Changes are saved instantly and persist across sessions.
          </p>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <strong>Tip:</strong> Tags you set here control what appears when visitors filter tours on the public site. You can apply multiple tags to the same tour (e.g. a trip can be both "Women's" and "Adventure").
          </div>
        </div>

        {/* Category Legend */}
        <div className="mb-8 p-5 bg-card border border-border rounded-xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Category Colors</div>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <span key={cat} className={`px-2.5 py-1 text-xs font-semibold rounded-full ${CATEGORY_COLORS[cat]}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Tour List */}
        <div className="space-y-4">
          {(tours ?? []).map((tour) => (
            <div key={tour.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <div
                  className="w-24 h-20 flex-shrink-0 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${tour.imageUrl})` }}
                />

                {/* Tour info & tags */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h2 className="font-semibold text-foreground text-sm leading-snug">{tour.name}</h2>
                      <div className="text-xs text-muted-foreground mt-0.5">{tour.destination} · {tour.country.join(", ")}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {saved[tour.id] && (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Saved
                        </span>
                      )}
                      <button
                        onClick={() => resetTags(tour.id)}
                        title="Reset to defaults"
                        className="text-muted-foreground hover:text-foreground p-1 rounded"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_CATEGORIES.map((cat) => {
                      const isActive = tour.categories.includes(cat);
                      return (
                        <button
                          key={cat}
                          onClick={() => toggleTag(tour.id, cat, tour.categories)}
                          className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border transition-all duration-100 ${
                            isActive ? CATEGORY_ACTIVE[cat] : CATEGORY_INACTIVE[cat]
                          }`}
                        >
                          {isActive && <span className="mr-1">✓</span>}
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
