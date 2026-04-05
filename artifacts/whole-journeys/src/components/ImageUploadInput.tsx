import { useRef, useState } from "react";
import { Upload, Loader2, X } from "lucide-react";

const API = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
  showPreview?: boolean;
}

export default function ImageUploadInput({
  value,
  onChange,
  placeholder = "https://… or upload a file",
  className = "",
  showPreview = true,
}: ImageUploadInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(`${API}/upload-image`, { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.url);
    } catch {
      setError("Upload failed — check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  const inputCls = `w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`;

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          className={`${inputCls} flex-grow`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          title="Upload & auto-compress photo"
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-secondary text-white rounded-lg hover:bg-secondary/90 disabled:opacity-60 transition-colors whitespace-nowrap"
        >
          {uploading ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</>
          ) : (
            <><Upload className="w-3.5 h-3.5" /> Upload</>
          )}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Clear image"
            className="flex-shrink-0 p-2 text-muted-foreground hover:text-destructive rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      {showPreview && value && (
        <img
          src={value}
          alt="Preview"
          className="h-24 rounded-lg border border-border object-cover w-full max-w-xs"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
    </div>
  );
}
