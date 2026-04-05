import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, RotateCcw, Lock, Pencil, Trash2, Plus, X, Save, Link as LinkIcon, Loader2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { useTours, useUpdateTourTags, ALL_CATEGORIES, ALL_REGIONS, TRAVEFY_TOURS } from "@/hooks/use-tours";
import { CATEGORY_COLORS } from "@/components/TourCard";
import {
  useSiteContent, useSaveContent,
  usePicksHotels, useSaveHotel, useDeleteHotel, type PicksHotel,
  usePicksArticles, useSaveArticle, useDeleteArticle, type PicksArticle,
  usePicksTrips, useSavePicksTrips,
  useTourContent, useSaveTourContent,
  useCustomTours, useSaveCustomTour, useDeleteCustomTour, fetchUrlMeta, type CustomTour,
} from "@/hooks/use-admin-data";

const SESSION_KEY = "wj_admin_auth";
const CORRECT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "";

// ─── PASSWORD GATE ─────────────────────────────────────────────────────────────

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
          {error && <p className="text-sm text-red-600 text-center">Incorrect password. Try again.</p>}
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">Enter</button>
        </form>
      </div>
    </div>
  );
}

// ─── TAG CHIP STYLES ───────────────────────────────────────────────────────────

const CATEGORY_ACTIVE: Record<string, string> = {
  "Adventure":           "bg-orange-500 text-white border-orange-500",
  "Biking":              "bg-lime-600 text-white border-lime-600",
  "Country Estates":     "bg-amber-700 text-white border-amber-700",
  "Cruise/Sail":         "bg-cyan-600 text-white border-cyan-600",
  "Culinary":            "bg-red-600 text-white border-red-600",
  "Culture":             "bg-violet-600 text-white border-violet-600",
  "Family":              "bg-sky-500 text-white border-sky-500",
  "Long Distance Walks": "bg-yellow-600 text-white border-yellow-600",
  "Self-Drive":          "bg-slate-600 text-white border-slate-600",
  "Self-Guided":         "bg-teal-600 text-white border-teal-600",
  "Ski & Snow":          "bg-blue-500 text-white border-blue-500",
  "Walk/Hike":           "bg-green-600 text-white border-green-600",
  "Wellness":            "bg-rose-500 text-white border-rose-500",
  "Wildlife":            "bg-emerald-600 text-white border-emerald-600",
  "Women's":             "bg-pink-500 text-white border-pink-500",
};
const CATEGORY_INACTIVE: Record<string, string> = {
  "Adventure":           "border-orange-400 text-orange-600 hover:bg-orange-50",
  "Biking":              "border-lime-500 text-lime-700 hover:bg-lime-50",
  "Country Estates":     "border-amber-600 text-amber-700 hover:bg-amber-50",
  "Cruise/Sail":         "border-cyan-400 text-cyan-600 hover:bg-cyan-50",
  "Culinary":            "border-red-400 text-red-600 hover:bg-red-50",
  "Culture":             "border-violet-400 text-violet-600 hover:bg-violet-50",
  "Family":              "border-sky-400 text-sky-600 hover:bg-sky-50",
  "Long Distance Walks": "border-yellow-500 text-yellow-700 hover:bg-yellow-50",
  "Self-Drive":          "border-slate-400 text-slate-600 hover:bg-slate-50",
  "Self-Guided":         "border-teal-400 text-teal-600 hover:bg-teal-50",
  "Ski & Snow":          "border-blue-400 text-blue-600 hover:bg-blue-50",
  "Walk/Hike":           "border-green-500 text-green-700 hover:bg-green-50",
  "Wellness":            "border-rose-400 text-rose-600 hover:bg-rose-50",
  "Wildlife":            "border-emerald-500 text-emerald-700 hover:bg-emerald-50",
  "Women's":             "border-pink-400 text-pink-600 hover:bg-pink-50",
};

// ─── SHARED INPUT ──────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20";
const textareaCls = `${inputCls} resize-none`;

// ─── ABOUT KATHY TAB ──────────────────────────────────────────────────────────

const ABOUT_DEFAULTS: Record<string, string> = {
  about_subtitle: "Since 1998, Kathy Dragon has been crafting life-changing journeys for curious travelers — from Bhutan to Belize, Patagonia to Provence, Kerala to Kilimanjaro.",
  about_bio_1: "My journey in the travel industry began in 1987, when I started leading bike trips in New England. That early work eventually grew into running all of North American Tours for the company that is now VBT. From there I moved into student programs, developing Rainforest Workshops in Costa Rica and immersive cultural programs for high school students in Peru and Ecuador — experiences designed to go well beyond typical tourism.",
  about_bio_1b: "In 1995 I became one of the first employees at Country Walkers, where I helped build the company from the ground up, creating and leading trips across the globe.",
  about_bio_1c: "Three years later, in 1998, I founded my own company, The Dragon's Path, offering cultural walking vacations worldwide. During that period I also created ActiveWomen.com and began speaking publicly on the influence and importance of what I called \"Prime Time Women\" — women between 50 and 70 — and their forceful influence on the travel industry.",
  about_bio_2: "Around 2008, I consulted for EONS.com, an ambitious platform competing with AARP and Facebook to become the go-to lifestyle destination for the 50+ market. I built and led their travel division, curating partnerships with operators I knew and trusted. I later took over the site and relaunched it as TravelDragon.com — a robust platform that still hosts 400+ companies and 5,000+ tours — though it's currently more of a legacy asset than an active venture. During this period I also consulted for the World Bank on projects in Tajikistan and Grenada, focusing on the intersection of agriculture and tourism — a space I find endlessly interesting.",
  about_photo_url: "http://s3.amazonaws.com/whole-journeys-assets/production/page-images/kathy.jpg",
};

function AboutTab() {
  const { data: content } = useSiteContent();
  const saveContent = useSaveContent();
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  function val(key: string) {
    return draft[key] ?? content?.[key] ?? ABOUT_DEFAULTS[key] ?? "";
  }

  function set(key: string, value: string) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function save(key: string) {
    await saveContent.mutateAsync({ key, value: val(key) });
    setSaved((s) => ({ ...s, [key]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000);
  }

  function SaveBtn({ k }: { k: string }) {
    return (
      <button
        onClick={() => save(k)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        {saved[k] ? <><Check className="w-3 h-3" /> Saved</> : <><Save className="w-3 h-3" /> Save</>}
      </button>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Edit the content that appears on the Our Philosophy page. Each field saves independently.</p>

      <div className="bg-card border border-border rounded-xl p-5 space-y-5">
        <h3 className="font-semibold text-foreground">Page Header</h3>
        <Field label="Page Subtitle">
          <textarea rows={2} className={textareaCls} value={val("about_subtitle")} onChange={(e) => set("about_subtitle", e.target.value)} />
          <div className="flex justify-end pt-1"><SaveBtn k="about_subtitle" /></div>
        </Field>
        <Field label="Kathy's Photo URL">
          <input className={inputCls} value={val("about_photo_url")} onChange={(e) => set("about_photo_url", e.target.value)} />
          {val("about_photo_url") && (
            <img src={val("about_photo_url")} alt="Preview" className="mt-2 h-24 w-20 object-cover rounded-lg border border-border" />
          )}
          <div className="flex justify-end pt-1"><SaveBtn k="about_photo_url" /></div>
        </Field>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-5">
        <h3 className="font-semibold text-foreground">Bio — A Life Spent Exploring</h3>
        <p className="text-xs text-muted-foreground -mt-2">These four paragraphs appear under "A Life Spent Exploring" on the About page, in order.</p>
        {([
          { key: "about_bio_1", label: "Paragraph 1 — Early career (1987 – VBT, Costa Rica, Ecuador)" },
          { key: "about_bio_1b", label: "Paragraph 2 — Country Walkers (1995)" },
          { key: "about_bio_1c", label: "Paragraph 3 — The Dragon's Path & ActiveWomen.com (1998)" },
          { key: "about_bio_2", label: "Paragraph 4 — EONS / TravelDragon / World Bank (2008+)" },
        ] as const).map(({ key, label }) => (
          <Field key={key} label={label}>
            <textarea rows={4} className={textareaCls} value={val(key)} onChange={(e) => set(key, e.target.value)} />
            <div className="flex justify-end pt-1"><SaveBtn k={key} /></div>
          </Field>
        ))}
      </div>
    </div>
  );
}

// ─── HOTEL FORM ───────────────────────────────────────────────────────────────

const BLANK_HOTEL: PicksHotel = { name: "", location: "", description: "", imageUrl: "", bookUrl: "https://travelpro365.com/consumer/wholejourneys", perk1: "", perk2: "", perk3: "", sortOrder: 0, active: true };

function HotelForm({ initial, onSave, onCancel }: { initial: PicksHotel; onSave: (h: PicksHotel) => void; onCancel: () => void }) {
  const [h, setH] = useState(initial);
  const set = (k: keyof PicksHotel, v: string | number | boolean) => setH((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-muted/40 border border-border rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Hotel Name"><input className={inputCls} value={h.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Location"><input className={inputCls} value={h.location} onChange={(e) => set("location", e.target.value)} /></Field>
      </div>
      <Field label="Description"><textarea rows={3} className={textareaCls} value={h.description} onChange={(e) => set("description", e.target.value)} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Image URL"><input className={inputCls} placeholder="https://..." value={h.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} /></Field>
        <Field label="Book URL"><input className={inputCls} value={h.bookUrl} onChange={(e) => set("bookUrl", e.target.value)} /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Virtuoso Perk 1"><input className={inputCls} value={h.perk1} onChange={(e) => set("perk1", e.target.value)} /></Field>
        <Field label="Virtuoso Perk 2"><input className={inputCls} value={h.perk2} onChange={(e) => set("perk2", e.target.value)} /></Field>
        <Field label="Virtuoso Perk 3"><input className={inputCls} value={h.perk3} onChange={(e) => set("perk3", e.target.value)} /></Field>
      </div>
      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={h.active} onChange={(e) => set("active", e.target.checked)} className="rounded" />
          Show on Kathy's Picks
        </label>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors">Cancel</button>
          <button onClick={() => onSave(h)} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">Save Hotel</button>
        </div>
      </div>
    </div>
  );
}

function HotelsTab() {
  const { data: hotels = [] } = usePicksHotels();
  const saveHotel = useSaveHotel();
  const deleteHotel = useDeleteHotel();
  const [editing, setEditing] = useState<PicksHotel | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage the hotels shown on Kathy's Picks page.</p>
        <button onClick={() => { setAdding(true); setEditing(null); }} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Hotel
        </button>
      </div>

      {adding && (
        <HotelForm
          initial={BLANK_HOTEL}
          onSave={async (h) => { await saveHotel.mutateAsync(h); setAdding(false); }}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="space-y-3">
        {hotels.length === 0 && !adding && (
          <div className="text-center py-12 text-muted-foreground text-sm border border-dashed border-border rounded-xl">
            No hotels yet. Click "Add Hotel" to get started.
          </div>
        )}
        {hotels.map((hotel) => (
          <div key={hotel.id}>
            {editing?.id === hotel.id ? (
              <HotelForm
                initial={hotel}
                onSave={async (h) => { await saveHotel.mutateAsync(h); setEditing(null); }}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="bg-card border border-border rounded-xl p-4 flex gap-4">
                {hotel.imageUrl && (
                  <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-cover bg-center border border-border/50" style={{ backgroundImage: `url(${hotel.imageUrl})` }} />
                )}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm text-foreground">{hotel.name}</div>
                      <div className="text-xs text-muted-foreground">{hotel.location}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!hotel.active && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Hidden</span>}
                      <button onClick={() => { setEditing(hotel); setAdding(false); }} className="p-1.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => hotel.id && deleteHotel.mutate(hotel.id)} className="p-1.5 text-muted-foreground hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{hotel.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {[hotel.perk1, hotel.perk2, hotel.perk3].filter(Boolean).map((p) => (
                      <span key={p} className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">✦ {p}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ARTICLE FORM ─────────────────────────────────────────────────────────────

const BLANK_ARTICLE: PicksArticle = { title: "", excerpt: "", category: "", imageUrl: "", url: "", readTime: "", sortOrder: 0, active: true };

function ArticleForm({ initial, onSave, onCancel }: { initial: PicksArticle; onSave: (a: PicksArticle) => void; onCancel: () => void }) {
  const [a, setA] = useState(initial);
  const set = (k: keyof PicksArticle, v: string | number | boolean) => setA((p) => ({ ...p, [k]: v }));

  return (
    <div className="bg-muted/40 border border-border rounded-xl p-5 space-y-4">
      <Field label="Title"><input className={inputCls} value={a.title} onChange={(e) => set("title", e.target.value)} /></Field>
      <Field label="Excerpt / Teaser"><textarea rows={3} className={textareaCls} value={a.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Category Tag"><input className={inputCls} placeholder="e.g. Gear & Planning" value={a.category} onChange={(e) => set("category", e.target.value)} /></Field>
        <Field label="Read Time"><input className={inputCls} placeholder="e.g. 6 min read" value={a.readTime} onChange={(e) => set("readTime", e.target.value)} /></Field>
        <Field label="Article URL (Substack)"><input className={inputCls} placeholder="https://..." value={a.url} onChange={(e) => set("url", e.target.value)} /></Field>
      </div>
      <Field label="Cover Image URL"><input className={inputCls} placeholder="https://..." value={a.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} /></Field>
      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={a.active} onChange={(e) => set("active", e.target.checked)} className="rounded" />
          Show on Kathy's Picks
        </label>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors">Cancel</button>
          <button onClick={() => onSave(a)} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">Save Article</button>
        </div>
      </div>
    </div>
  );
}

function ArticlesTab() {
  const { data: articles = [] } = usePicksArticles();
  const saveArticle = useSaveArticle();
  const deleteArticle = useDeleteArticle();
  const [editing, setEditing] = useState<PicksArticle | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Manage blog posts and Substack articles shown on Kathy's Picks.</p>
        <button onClick={() => { setAdding(true); setEditing(null); }} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Article
        </button>
      </div>

      {adding && (
        <ArticleForm
          initial={BLANK_ARTICLE}
          onSave={async (a) => { await saveArticle.mutateAsync(a); setAdding(false); }}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="space-y-3">
        {articles.length === 0 && !adding && (
          <div className="text-center py-12 text-muted-foreground text-sm border border-dashed border-border rounded-xl">
            No articles yet. Click "Add Article" to get started.
          </div>
        )}
        {articles.map((article) => (
          <div key={article.id}>
            {editing?.id === article.id ? (
              <ArticleForm
                initial={article}
                onSave={async (a) => { await saveArticle.mutateAsync(a); setEditing(null); }}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="bg-card border border-border rounded-xl p-4 flex gap-4">
                {article.imageUrl && (
                  <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-cover bg-center border border-border/50" style={{ backgroundImage: `url(${article.imageUrl})` }} />
                )}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm text-foreground line-clamp-1">{article.title}</div>
                      <div className="text-xs text-muted-foreground">{article.category} · {article.readTime}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!article.active && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Hidden</span>}
                      <button onClick={() => { setEditing(article); setAdding(false); }} className="p-1.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => article.id && deleteArticle.mutate(article.id)} className="p-1.5 text-muted-foreground hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{article.excerpt}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FEATURED TRIPS TAB ───────────────────────────────────────────────────────

function FeaturedTripsTab() {
  const { data: picksTrips = [] } = usePicksTrips();
  const saveTrips = useSavePicksTrips();
  const [selected, setSelected] = useState<Set<string> | null>(null);
  const [customUrls, setCustomUrls] = useState<Record<string, string> | null>(null);
  const [saved, setSaved] = useState(false);

  const effectiveSelected = selected ?? new Set(picksTrips.filter((t) => t.active).map((t) => t.tourId));
  const effectiveUrls: Record<string, string> = customUrls ?? Object.fromEntries(picksTrips.map((t) => [t.tourId, t.customUrl ?? ""]));

  function toggle(tourId: string) {
    const next = new Set(effectiveSelected);
    if (next.has(tourId)) next.delete(tourId);
    else next.add(tourId);
    setSelected(next);
  }

  function setUrl(tourId: string, url: string) {
    setCustomUrls((prev) => ({ ...(prev ?? effectiveUrls), [tourId]: url }));
  }

  async function handleSave() {
    const trips = Array.from(effectiveSelected).map((tourId, i) => ({
      tourId,
      sortOrder: i,
      active: true,
      customUrl: effectiveUrls[tourId] ?? "",
    }));
    await saveTrips.mutateAsync(trips);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Select which tours appear in the "Trips I'm Excited About" section of Kathy's Picks.
          <span className="ml-1 text-secondary font-medium">{effectiveSelected.size} selected</span>
        </p>
        <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Selection</>}
        </button>
      </div>

      <div className="space-y-2">
        {TRAVEFY_TOURS.map((tour) => {
          const on = effectiveSelected.has(tour.id);
          return (
            <div key={tour.id} className={`rounded-xl border transition-all ${on ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
              <label className="flex items-center gap-4 p-3 cursor-pointer hover:bg-muted/20 rounded-xl">
                <input type="checkbox" checked={on} onChange={() => toggle(tour.id)} className="rounded accent-primary w-4 h-4 flex-shrink-0" />
                <div className="w-14 h-10 flex-shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${tour.imageUrl})` }} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground leading-snug line-clamp-1">{tour.name}</div>
                  <div className="text-xs text-muted-foreground">{tour.destination}</div>
                </div>
                {on && <span className="ml-auto text-xs text-primary font-semibold flex-shrink-0">✓ Featured</span>}
              </label>
              {on && (
                <div className="px-4 pb-3 flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="url"
                    placeholder={`Optional custom URL (defaults to Travefy itinerary)`}
                    value={effectiveUrls[tour.id] ?? ""}
                    onChange={(e) => setUrl(tour.id, e.target.value)}
                    onClick={(e) => e.preventDefault()}
                    className="flex-1 text-xs px-2.5 py-1.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/30 text-muted-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TOUR TAGS TAB ────────────────────────────────────────────────────────────

function TourTagsTab() {
  const { data: tours } = useTours();
  const updateTags = useUpdateTourTags();
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  function toggleTag(tourId: string, cat: string, current: string[]) {
    const next = current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat];
    updateTags.mutate({ tourId, categories: next });
    setSaved((s) => ({ ...s, [tourId]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [tourId]: false })), 1500);
  }

  function resetTags(tourId: string) {
    const defaults = TRAVEFY_TOURS.find((t) => t.id === tourId)?.categories ?? [];
    updateTags.mutate({ tourId, categories: defaults });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {ALL_CATEGORIES.map((cat) => (
          <span key={cat} className={`px-2.5 py-1 text-xs font-semibold rounded-full ${CATEGORY_COLORS[cat]}`}>{cat}</span>
        ))}
      </div>
      {(tours ?? []).map((tour) => (
        <div key={tour.id} className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex gap-4 p-4">
            <div className="w-24 h-20 flex-shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${tour.imageUrl})` }} />
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h2 className="font-semibold text-foreground text-sm leading-snug">{tour.name}</h2>
                  <div className="text-xs text-muted-foreground mt-0.5">{tour.destination} · {tour.country.join(", ")}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {saved[tour.id] && <span className="text-xs text-green-600 font-medium flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Saved</span>}
                  <button onClick={() => resetTags(tour.id)} title="Reset to defaults" className="text-muted-foreground hover:text-foreground p-1 rounded"><RotateCcw className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_CATEGORIES.map((cat) => {
                  const isActive = tour.categories.includes(cat);
                  return (
                    <button key={cat} onClick={() => toggleTag(tour.id, cat, tour.categories)}
                      className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border transition-all duration-100 ${isActive ? CATEGORY_ACTIVE[cat] : CATEGORY_INACTIVE[cat]}`}>
                      {isActive && <span className="mr-1">✓</span>}{cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TOUR CONTENT TAB ─────────────────────────────────────────────────────────

function TourContentTab() {
  const { data: tours } = useTours();
  const { data: rawCustomTours = [] } = useCustomTours();
  const { data: dbContent = {} } = useTourContent();
  const saveTourContent = useSaveTourContent();
  const saveCustomTour = useSaveCustomTour();

  // ── Travefy tour state (description + highlights) ──────────────────────────
  const [drafts, setDrafts] = useState<Record<string, { description: string; highlights: string[] }>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [newHighlight, setNewHighlight] = useState<Record<string, string>>({});

  // ── Custom tour state (full form) ─────────────────────────────────────────
  const [customDrafts, setCustomDrafts] = useState<Record<string, CustomTour>>({});
  const [fetching, setFetching] = useState<Record<string, boolean>>({});
  const [fetchError, setFetchError] = useState<Record<string, string>>({});
  const [newHighlightCustom, setNewHighlightCustom] = useState<Record<string, string>>({});

  function isCustom(tourId: string) { return tourId.startsWith("custom-"); }
  function getDbId(tourId: string) { return parseInt(tourId.replace("custom-", ""), 10); }

  function getCustomDraft(tourId: string): CustomTour {
    if (customDrafts[tourId]) return customDrafts[tourId];
    const dbId = getDbId(tourId);
    const ct = rawCustomTours.find((c) => c.id === dbId);
    return ct ?? { name: "", destination: "", region: "Europe", country: [], groupSize: "Private departures for 2+", categories: [], description: "", highlights: [], imageUrl: "", galleryImages: [], itineraryUrl: "", sortOrder: 0, active: true };
  }

  function setCustomField<K extends keyof CustomTour>(tourId: string, key: K, value: CustomTour[K]) {
    setCustomDrafts((d) => ({ ...d, [tourId]: { ...getCustomDraft(tourId), [key]: value } }));
  }

  async function handleAutoFill(tourId: string) {
    const draft = getCustomDraft(tourId);
    if (!draft.itineraryUrl) return;
    setFetching((f) => ({ ...f, [tourId]: true }));
    setFetchError((e) => ({ ...e, [tourId]: "" }));
    try {
      const meta = await fetchUrlMeta(draft.itineraryUrl);
      if (meta.title) setCustomField(tourId, "name", meta.title);
      if (meta.imageUrl) setCustomField(tourId, "imageUrl", meta.imageUrl);
      if (!meta.title && !meta.imageUrl) setFetchError((e) => ({ ...e, [tourId]: "Couldn't find title or image at that URL." }));
    } catch {
      setFetchError((e) => ({ ...e, [tourId]: "Failed to fetch URL." }));
    } finally {
      setFetching((f) => ({ ...f, [tourId]: false }));
    }
  }

  function toggleCategory(tourId: string, cat: string) {
    const current = getCustomDraft(tourId).categories;
    setCustomField(tourId, "categories", current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat]);
  }

  function addCustomHighlight(tourId: string) {
    const text = (newHighlightCustom[tourId] ?? "").trim();
    if (!text) return;
    setCustomField(tourId, "highlights", [...getCustomDraft(tourId).highlights, text]);
    setNewHighlightCustom((h) => ({ ...h, [tourId]: "" }));
  }

  function removeCustomHighlight(tourId: string, idx: number) {
    setCustomField(tourId, "highlights", getCustomDraft(tourId).highlights.filter((_, i) => i !== idx));
  }

  function saveCustom(tourId: string) {
    saveCustomTour.mutate(getCustomDraft(tourId), {
      onSuccess: () => {
        setSaved((s) => ({ ...s, [tourId]: true }));
        setTimeout(() => setSaved((s) => ({ ...s, [tourId]: false })), 2000);
      },
    });
  }

  // ── Travefy tour helpers ───────────────────────────────────────────────────
  function getDraft(tour: { id: string; description: string; highlights: string[] }) {
    if (drafts[tour.id]) return drafts[tour.id];
    const db = dbContent[tour.id];
    return {
      description: db?.description ?? tour.description,
      highlights: db?.highlights?.length ? db.highlights : tour.highlights,
    };
  }

  function getDraftById(tourId: string) {
    const tour = tours?.find((t) => t.id === tourId);
    if (!tour) return { description: "", highlights: [] };
    return getDraft(tour);
  }

  function setDescription(tourId: string, value: string) {
    setDrafts((d) => ({ ...d, [tourId]: { ...getDraftById(tourId), description: value } }));
  }

  function addHighlight(tourId: string) {
    const text = (newHighlight[tourId] ?? "").trim();
    if (!text) return;
    const current = getDraftById(tourId);
    setDrafts((d) => ({ ...d, [tourId]: { ...current, highlights: [...current.highlights, text] } }));
    setNewHighlight((h) => ({ ...h, [tourId]: "" }));
  }

  function removeHighlight(tourId: string, idx: number) {
    const current = getDraftById(tourId);
    setDrafts((d) => ({ ...d, [tourId]: { ...current, highlights: current.highlights.filter((_, i) => i !== idx) } }));
  }

  function save(tourId: string) {
    const draft = getDraftById(tourId);
    saveTourContent.mutate(
      { tourId, description: draft.description, highlights: draft.highlights },
      {
        onSuccess: () => {
          setSaved((s) => ({ ...s, [tourId]: true }));
          setTimeout(() => setSaved((s) => ({ ...s, [tourId]: false })), 2000);
        },
      }
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Custom tours show the full editing form. Pre-loaded tours let you override the description and highlights.
      </p>
      {(tours ?? []).map((tour) => {
        if (isCustom(tour.id)) {
          const ct = getCustomDraft(tour.id);
          return (
            <div key={tour.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex gap-4 p-4 border-b border-border/50">
                <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${ct.imageUrl})` }} />
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-sm leading-snug">{ct.name || tour.name}</h2>
                      <div className="text-xs text-muted-foreground mt-0.5">{ct.destination || tour.destination}</div>
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary/10 text-secondary">Custom Tour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {saved[tour.id] && <span className="text-xs text-green-600 font-medium flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Saved</span>}
                      <button onClick={() => saveCustom(tour.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Full form */}
              <div className="p-4 space-y-5">
                {/* Itinerary URL */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-1.5">
                    Itinerary URL <span className="normal-case font-normal">(Travefy or any trip page)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      className={`${inputCls} flex-grow`}
                      placeholder="https://trips.wholejourneys.com/..."
                      value={ct.itineraryUrl}
                      onChange={(e) => setCustomField(tour.id, "itineraryUrl", e.target.value)}
                    />
                    <button
                      onClick={() => handleAutoFill(tour.id)}
                      disabled={!ct.itineraryUrl || fetching[tour.id]}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-secondary text-white rounded-lg hover:bg-secondary/90 disabled:opacity-50 transition-colors whitespace-nowrap"
                    >
                      {fetching[tour.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <LinkIcon className="w-4 h-4" />}
                      {fetching[tour.id] ? "Fetching…" : "Auto-Fill"}
                    </button>
                  </div>
                  {fetchError[tour.id] && <p className="text-xs text-red-500 mt-1">{fetchError[tour.id]}</p>}
                </div>

                {/* Name */}
                <Field label="Trip Name">
                  <input className={inputCls} value={ct.name} onChange={(e) => setCustomField(tour.id, "name", e.target.value)} placeholder="e.g. Spain: The Basque Country" />
                </Field>

                {/* Destination + Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Destination Display Name">
                    <input className={inputCls} value={ct.destination} onChange={(e) => setCustomField(tour.id, "destination", e.target.value)} placeholder="e.g. Basque Country, Spain" />
                  </Field>
                  <Field label="Region">
                    <select className={inputCls} value={ct.region} onChange={(e) => setCustomField(tour.id, "region", e.target.value)}>
                      {ALL_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Country */}
                <Field label="Country / Countries">
                  <input
                    className={inputCls}
                    value={ct.country.join(", ")}
                    onChange={(e) => setCustomField(tour.id, "country", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                    placeholder="e.g. Spain  or  Slovenia, Croatia"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separate multiple countries with commas.</p>
                </Field>

                {/* Hero Image */}
                <Field label="Hero Image URL">
                  <input className={inputCls} placeholder="https://..." value={ct.imageUrl} onChange={(e) => setCustomField(tour.id, "imageUrl", e.target.value)} />
                  {ct.imageUrl && <img src={ct.imageUrl} alt="Preview" className="mt-2 h-24 rounded-lg border border-border object-cover w-full max-w-xs" />}
                </Field>

                {/* Gallery Images */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-1.5">
                    Additional Photos <span className="normal-case font-normal">(slideshow in pop-up — optional)</span>
                  </label>
                  <div className="space-y-2 mb-2">
                    {(ct.galleryImages ?? []).map((url, i) => (
                      <div key={i} className="flex items-center gap-2 group">
                        {url && <img src={url} alt="" className="w-12 h-8 object-cover rounded border border-border flex-shrink-0" />}
                        <input
                          className={`${inputCls} flex-grow text-xs`}
                          value={url}
                          onChange={(e) => {
                            const updated = [...(ct.galleryImages ?? [])];
                            updated[i] = e.target.value;
                            setCustomField(tour.id, "galleryImages", updated);
                          }}
                          placeholder="https://..."
                        />
                        <button onClick={() => setCustomField(tour.id, "galleryImages", (ct.galleryImages ?? []).filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive flex-shrink-0 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setCustomField(tour.id, "galleryImages", [...(ct.galleryImages ?? []), ""])}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-dashed border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Photo URL
                  </button>
                </div>

                {/* Description */}
                <Field label="Description">
                  <textarea rows={3} className={textareaCls} value={ct.description} onChange={(e) => setCustomField(tour.id, "description", e.target.value)} placeholder="A 2–3 sentence summary shown in the tour card pop-up…" />
                </Field>

                {/* Highlights */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-1.5">Highlights</label>
                  <div className="space-y-1.5 mb-2">
                    {ct.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 group">
                        <span className="text-secondary text-xs">✦</span>
                        <span className="text-sm flex-grow">{h}</span>
                        <button onClick={() => removeCustomHighlight(tour.id, i)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newHighlightCustom[tour.id] ?? ""}
                      onChange={(e) => setNewHighlightCustom((h) => ({ ...h, [tour.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && addCustomHighlight(tour.id)}
                      placeholder="Add a highlight and press Enter…"
                      className="flex-grow text-sm border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button onClick={() => addCustomHighlight(tour.id)} className="px-3 py-1.5 text-xs font-semibold bg-muted border border-border rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-2">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(tour.id, cat)}
                        className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${ct.categories.includes(cat) ? CATEGORY_ACTIVE[cat] : CATEGORY_INACTIVE[cat]}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Group Size */}
                <Field label="Group Size">
                  <input className={inputCls} value={ct.groupSize} onChange={(e) => setCustomField(tour.id, "groupSize", e.target.value)} />
                </Field>

                {/* Active toggle */}
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={ct.active} onChange={(e) => setCustomField(tour.id, "active", e.target.checked)} className="rounded" />
                  Show on Tours page
                </label>
              </div>
            </div>
          );
        }

        // Pre-loaded Travefy tours — description + highlights only
        const draft = getDraft(tour);
        return (
          <div key={tour.id} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex gap-4 p-4 border-b border-border/50">
              <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${tour.imageUrl})` }} />
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-semibold text-sm leading-snug">{tour.name}</h2>
                    <div className="text-xs text-muted-foreground mt-0.5">{tour.destination}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {saved[tour.id] && <span className="text-xs text-green-600 font-medium flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Saved</span>}
                    <button
                      onClick={() => save(tour.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Description</label>
                <textarea
                  rows={3}
                  value={draft.description}
                  onChange={(e) => setDescription(tour.id, e.target.value)}
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Describe this tour for guests…"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">Highlights</label>
                <div className="space-y-1.5 mb-2">
                  {draft.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                      <span className="text-secondary text-xs">✦</span>
                      <span className="text-sm flex-grow">{h}</span>
                      <button onClick={() => removeHighlight(tour.id, i)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight[tour.id] ?? ""}
                    onChange={(e) => setNewHighlight((h) => ({ ...h, [tour.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && addHighlight(tour.id)}
                    placeholder="Add a highlight…"
                    className="flex-grow text-sm border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={() => addHighlight(tour.id)}
                    className="px-3 py-1.5 text-xs font-semibold bg-muted border border-border rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CUSTOM TOUR FORM ─────────────────────────────────────────────────────────

const BLANK_CUSTOM_TOUR: CustomTour = {
  name: "",
  destination: "",
  region: "Europe",
  country: [],
  groupSize: "Private departures for 2+",
  categories: [],
  description: "",
  highlights: [],
  imageUrl: "",
  galleryImages: [],
  itineraryUrl: "",
  sortOrder: 0,
  active: true,
};

function CustomTourForm({ initial, onSave, onCancel }: { initial: CustomTour; onSave: (t: CustomTour) => void; onCancel: () => void }) {
  const [t, setT] = useState({ ...initial, galleryImages: initial.galleryImages ?? [] });
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [newHighlight, setNewHighlight] = useState("");

  const set = <K extends keyof CustomTour>(k: K, v: CustomTour[K]) => setT((p) => ({ ...p, [k]: v }));

  async function handleFetch() {
    if (!t.itineraryUrl) return;
    setFetching(true);
    setFetchError("");
    try {
      const meta = await fetchUrlMeta(t.itineraryUrl);
      if (meta.title) set("name", meta.title);
      if (meta.imageUrl) set("imageUrl", meta.imageUrl);
      if (!meta.title && !meta.imageUrl) setFetchError("Couldn't find title or image at that URL.");
    } catch {
      setFetchError("Failed to fetch URL.");
    } finally {
      setFetching(false);
    }
  }

  function toggleCategory(cat: string) {
    const current = t.categories;
    set("categories", current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat]);
  }

  function addHighlight() {
    if (!newHighlight.trim()) return;
    set("highlights", [...t.highlights, newHighlight.trim()]);
    setNewHighlight("");
  }

  function removeHighlight(i: number) {
    set("highlights", t.highlights.filter((_, idx) => idx !== i));
  }

  return (
    <div className="bg-muted/40 border border-border rounded-xl p-5 space-y-5">

      {/* Itinerary URL + auto-fetch */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-1.5">
          Itinerary URL <span className="normal-case font-normal">(Travefy link or any page with the trip details)</span>
        </label>
        <div className="flex gap-2">
          <input
            className={`${inputCls} flex-grow`}
            placeholder="https://trips.wholejourneys.com/discover/trip/..."
            value={t.itineraryUrl}
            onChange={(e) => set("itineraryUrl", e.target.value)}
          />
          <button
            onClick={handleFetch}
            disabled={!t.itineraryUrl || fetching}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-secondary text-white rounded-lg hover:bg-secondary/90 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <LinkIcon className="w-4 h-4" />}
            {fetching ? "Fetching…" : "Auto-Fill"}
          </button>
        </div>
        {fetchError && <p className="text-xs text-red-500 mt-1">{fetchError}</p>}
        <p className="text-xs text-muted-foreground mt-1">Paste the URL and click Auto-Fill to pull in the trip title and hero image automatically.</p>
      </div>

      {/* Name */}
      <Field label="Trip Name">
        <input className={inputCls} value={t.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Spain: The Basque Country" />
      </Field>

      {/* Destination + Region */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label='Destination Display Name'>
          <input className={inputCls} value={t.destination} onChange={(e) => set("destination", e.target.value)} placeholder='e.g. Spain: The Basque Country' />
          <p className="text-xs text-muted-foreground mt-1">Shown on the tour card. Can be as specific as you like.</p>
        </Field>
        <Field label="Region">
          <select className={inputCls} value={t.region} onChange={(e) => set("region", e.target.value)}>
            {ALL_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
      </div>

      {/* Country */}
      <Field label="Country / Countries">
        <input
          className={inputCls}
          value={t.country.join(", ")}
          onChange={(e) => set("country", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          placeholder="e.g. Spain  or  Slovenia, Croatia"
        />
        <p className="text-xs text-muted-foreground mt-1">Separate multiple countries with commas. Used for filtering.</p>
      </Field>

      {/* Image URL */}
      <Field label="Hero Image URL">
        <input className={inputCls} placeholder="https://..." value={t.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} />
        {t.imageUrl && (
          <img src={t.imageUrl} alt="Preview" className="mt-2 h-24 rounded-lg border border-border object-cover w-full max-w-xs" />
        )}
      </Field>

      {/* Gallery Images */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-1.5">
          Additional Photos <span className="normal-case font-normal">(slideshow in the pop-up — optional)</span>
        </label>
        <div className="space-y-2 mb-2">
          {t.galleryImages.map((url, i) => (
            <div key={i} className="flex items-center gap-2 group">
              {url && <img src={url} alt="" className="w-12 h-8 object-cover rounded border border-border flex-shrink-0" />}
              <input
                className={`${inputCls} flex-grow text-xs`}
                value={url}
                onChange={(e) => {
                  const updated = [...t.galleryImages];
                  updated[i] = e.target.value;
                  set("galleryImages", updated);
                }}
                placeholder="https://..."
              />
              <button
                onClick={() => set("galleryImages", t.galleryImages.filter((_, idx) => idx !== i))}
                className="text-muted-foreground hover:text-destructive flex-shrink-0 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => set("galleryImages", [...t.galleryImages, ""])}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-dashed border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground"
        >
          <Plus className="w-3.5 h-3.5" /> Add Photo URL
        </button>
        <p className="text-xs text-muted-foreground mt-1.5">These appear in a slideshow alongside the main hero image. Paste image URLs from Travefy or anywhere else.</p>
      </div>

      {/* Description */}
      <Field label="Description">
        <textarea rows={3} className={textareaCls} value={t.description} onChange={(e) => set("description", e.target.value)} placeholder="A 2–3 sentence summary shown in the tour card pop-up…" />
      </Field>

      {/* Highlights */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-1.5">Highlights</label>
        <div className="space-y-1.5 mb-2">
          {t.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 group">
              <span className="text-secondary text-xs">✦</span>
              <span className="text-sm flex-grow">{h}</span>
              <button onClick={() => removeHighlight(i)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHighlight()}
            placeholder="Add a highlight and press Enter…"
            className="flex-grow text-sm border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button onClick={addHighlight} className="px-3 py-1.5 text-xs font-semibold bg-muted border border-border rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-2">Categories</label>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
                t.categories.includes(cat) ? CATEGORY_ACTIVE[cat] : CATEGORY_INACTIVE[cat]
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Group Size */}
      <Field label="Group Size">
        <input className={inputCls} value={t.groupSize} onChange={(e) => set("groupSize", e.target.value)} />
      </Field>

      {/* Active + Actions */}
      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={t.active} onChange={(e) => set("active", e.target.checked)} className="rounded" />
          Show on Tours page
        </label>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors">Cancel</button>
          <button onClick={() => onSave(t)} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">Save Trip</button>
        </div>
      </div>
    </div>
  );
}

function CustomToursTab() {
  const { data: tours = [] } = useCustomTours();
  const saveTour = useSaveCustomTour();
  const deleteTour = useDeleteCustomTour();
  const [editing, setEditing] = useState<CustomTour | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Add trips from Travefy or any source. Paste the itinerary URL and click Auto-Fill to pull in the title and image.</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditing(null); }}
          className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Trip
        </button>
      </div>

      {adding && (
        <CustomTourForm
          initial={BLANK_CUSTOM_TOUR}
          onSave={async (t) => { await saveTour.mutateAsync(t); setAdding(false); }}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="space-y-3">
        {tours.length === 0 && !adding && (
          <div className="text-center py-12 text-muted-foreground text-sm border border-dashed border-border rounded-xl">
            No custom trips yet. Click "Add Trip" to get started.
          </div>
        )}
        {tours.map((tour) => (
          <div key={tour.id}>
            {editing?.id === tour.id ? (
              <CustomTourForm
                initial={tour}
                onSave={async (t) => { await saveTour.mutateAsync(t); setEditing(null); }}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="bg-card border border-border rounded-xl p-4 flex gap-4">
                {tour.imageUrl && (
                  <div
                    className="w-20 h-16 flex-shrink-0 rounded-lg bg-cover bg-center border border-border/50"
                    style={{ backgroundImage: `url(${tour.imageUrl})` }}
                  />
                )}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm text-foreground">{tour.name}</div>
                      <div className="text-xs text-muted-foreground">{tour.destination} · {tour.region}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!tour.active && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Hidden</span>}
                      <button
                        onClick={() => { setEditing(tour); setAdding(false); }}
                        className="p-1.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => tour.id && deleteTour.mutate(tour.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{tour.description}</p>
                  {tour.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tour.categories.map((c) => (
                        <span key={c} className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGES TAB ────────────────────────────────────────────────────────────────

function PagesTab() {
  const { data: content } = useSiteContent();
  const saveContent = useSaveContent();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  function val(key: string) {
    return drafts[key] ?? content?.[key] ?? "";
  }
  function set(key: string, value: string) {
    setDrafts((d) => ({ ...d, [key]: value }));
  }
  async function save(key: string) {
    await saveContent.mutateAsync({ key, value: val(key) });
    setSaved((s) => ({ ...s, [key]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000);
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">Manage the Terms &amp; Conditions page and the Trip Inquiry embed. Each section saves independently.</p>

      {/* Terms & Conditions — rich text editor */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">Terms &amp; Conditions</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Paste or type your terms here. Use the toolbar to add headings, bold, underline, lists, etc. Appears at /terms.</p>
          </div>
          <button
            onClick={() => save("terms_and_conditions")}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {saved["terms_and_conditions"] ? <><Check className="w-3 h-3" /> Saved</> : <><Save className="w-3 h-3" /> Save</>}
          </button>
        </div>
        {content !== undefined && (
          <RichTextEditor
            value={val("terms_and_conditions")}
            onChange={(html) => set("terms_and_conditions", html)}
          />
        )}
      </div>

      {/* Trip Inquiry Form — embed code textarea */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">Trip Inquiry Form</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Paste your Travefy inquiry form embed code here (iframe or script tag). It will appear at /inquiry.</p>
          </div>
          <button
            onClick={() => save("trip_inquiry_form")}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {saved["trip_inquiry_form"] ? <><Check className="w-3 h-3" /> Saved</> : <><Save className="w-3 h-3" /> Save</>}
          </button>
        </div>
        <textarea
          rows={10}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={val("trip_inquiry_form")}
          onChange={(e) => set("trip_inquiry_form", e.target.value)}
          placeholder="Paste embed code here…"
        />
      </div>
    </div>
  );
}

// ─── MAIN ADMIN ───────────────────────────────────────────────────────────────

const TABS = [
  { id: "add-trips", label: "Add Trips" },
  { id: "tags", label: "Tour Tags" },
  { id: "content", label: "Tour Descriptions" },
  { id: "about", label: "About Kathy" },
  { id: "trips", label: "Featured Trips" },
  { id: "hotels", label: "Featured Hotels" },
  { id: "articles", label: "Journal Articles" },
  { id: "pages", label: "Pages" },
] as const;
type TabId = typeof TABS[number]["id"];

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [tab, setTab] = useState<TabId>("add-trips");

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
          <h1 className="text-3xl font-display font-semibold text-foreground">Site Admin</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage content, tours, hotels, and articles across the site.</p>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 bg-muted p-1 rounded-xl mb-8 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                tab === t.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "add-trips" && <CustomToursTab />}
        {tab === "tags" && <TourTagsTab />}
        {tab === "content" && <TourContentTab />}
        {tab === "about" && <AboutTab />}
        {tab === "trips" && <FeaturedTripsTab />}
        {tab === "hotels" && <HotelsTab />}
        {tab === "articles" && <ArticlesTab />}
        {tab === "pages" && <PagesTab />}

      </div>
    </div>
  );
}
