import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

export interface FeaturedSpecial {
  id: number;
  title: string;
  badge: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  referralTag: string;
  sortOrder: number;
  active: boolean;
  updatedAt: string;
}

/** Appends referralTag query params to a URL, handling existing ? correctly. */
export function buildSpecialUrl(linkUrl: string, referralTag?: string | null): string {
  if (!linkUrl) return "#";
  if (!referralTag?.trim()) return linkUrl;
  const sep = linkUrl.includes("?") ? "&" : "?";
  return `${linkUrl}${sep}${referralTag.trim()}`;
}

export function useSpecials() {
  return useQuery<FeaturedSpecial[]>({
    queryKey: ["specials"],
    queryFn: async () => {
      const res = await fetch(`${API}/specials`);
      if (!res.ok) throw new Error("Failed to load specials");
      return res.json();
    },
  });
}

export function useActiveSpecials() {
  const { data, ...rest } = useSpecials();
  return { data: data?.filter((s) => s.active) ?? [], ...rest };
}

export function useUpdateSpecial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...body }: Partial<FeaturedSpecial> & { id: number }) => {
      const res = await fetch(`${API}/specials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["specials"] }),
  });
}

export function useCreateSpecial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: Omit<FeaturedSpecial, "id" | "updatedAt">) => {
      const res = await fetch(`${API}/specials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to create");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["specials"] }),
  });
}

export function useDeleteSpecial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API}/specials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["specials"] }),
  });
}
