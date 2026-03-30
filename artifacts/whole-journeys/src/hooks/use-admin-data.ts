import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

// ─── SITE CONTENT (About page) ────────────────────────────────────────────────

export function useSiteContent() {
  return useQuery<Record<string, string>>({
    queryKey: ["site-content"],
    queryFn: async () => {
      const res = await fetch(`${API}/content`);
      return res.json();
    },
    staleTime: 30_000,
  });
}

export function useSaveContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const res = await fetch(`${API}/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-content"] }),
  });
}

// ─── PICKS: HOTELS ────────────────────────────────────────────────────────────

export interface PicksHotel {
  id?: number;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  bookUrl: string;
  perk1: string;
  perk2: string;
  perk3: string;
  sortOrder: number;
  active: boolean;
}

export function usePicksHotels() {
  return useQuery<PicksHotel[]>({
    queryKey: ["picks-hotels"],
    queryFn: async () => {
      const res = await fetch(`${API}/picks/hotels`);
      return res.json();
    },
  });
}

export function useSaveHotel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (hotel: PicksHotel) => {
      const method = hotel.id ? "PUT" : "POST";
      const url = hotel.id ? `${API}/picks/hotels/${hotel.id}` : `${API}/picks/hotels`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotel),
      });
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["picks-hotels"] }),
  });
}

export function useDeleteHotel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`${API}/picks/hotels/${id}`, { method: "DELETE" });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["picks-hotels"] }),
  });
}

// ─── PICKS: ARTICLES ──────────────────────────────────────────────────────────

export interface PicksArticle {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  url: string;
  readTime: string;
  sortOrder: number;
  active: boolean;
}

export function usePicksArticles() {
  return useQuery<PicksArticle[]>({
    queryKey: ["picks-articles"],
    queryFn: async () => {
      const res = await fetch(`${API}/picks/articles`);
      return res.json();
    },
  });
}

export function useSaveArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (article: PicksArticle) => {
      const method = article.id ? "PUT" : "POST";
      const url = article.id ? `${API}/picks/articles/${article.id}` : `${API}/picks/articles`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["picks-articles"] }),
  });
}

export function useDeleteArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`${API}/picks/articles/${id}`, { method: "DELETE" });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["picks-articles"] }),
  });
}

// ─── TOUR CONTENT (description + highlights) ──────────────────────────────────

export interface TourContent {
  description: string | null;
  highlights: string[];
}

export function useTourContent() {
  return useQuery<Record<string, TourContent>>({
    queryKey: ["tour-content"],
    queryFn: async () => {
      const res = await fetch(`${API}/tours/content`);
      return res.json();
    },
    staleTime: 30_000,
  });
}

export function useSaveTourContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ tourId, description, highlights }: { tourId: string } & TourContent) => {
      const res = await fetch(`${API}/tours/content/${tourId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, highlights }),
      });
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tour-content"] });
      qc.invalidateQueries({ queryKey: ["tours"] });
    },
  });
}

// ─── PICKS: TRIPS ─────────────────────────────────────────────────────────────

export interface PicksTrip { tourId: string; sortOrder: number; active: boolean; customUrl: string; }

export function usePicksTrips() {
  return useQuery<PicksTrip[]>({
    queryKey: ["picks-trips"],
    queryFn: async () => {
      const res = await fetch(`${API}/picks/trips`);
      return res.json();
    },
  });
}

export function useSavePicksTrips() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (trips: PicksTrip[]) => {
      await fetch(`${API}/picks/trips`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trips }),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["picks-trips"] }),
  });
}
