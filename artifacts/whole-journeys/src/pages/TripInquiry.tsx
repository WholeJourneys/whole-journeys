import { useEffect, useRef } from "react";
import SEO from "@/components/SEO";
import { useSiteContent } from "@/hooks/use-admin-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function EmbedContent({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !html) return;

    el.innerHTML = "";

    const template = document.createElement("div");
    template.innerHTML = html;

    Array.from(template.childNodes).forEach((node) => {
      if (node instanceof HTMLElement && node.tagName === "SCRIPT") {
        const script = document.createElement("script");
        if (node.src) script.src = node.src;
        if (node.async) script.async = true;
        if (node.defer) script.defer = true;
        if (!node.src) script.textContent = node.textContent;
        Array.from(node.attributes).forEach((attr) => {
          if (!["src", "async", "defer"].includes(attr.name)) {
            script.setAttribute(attr.name, attr.value);
          }
        });
        el.appendChild(script);
      } else {
        el.appendChild(node.cloneNode(true));
      }
    });
  }, [html]);

  return <div ref={containerRef} />;
}

export default function TripInquiry() {
  const { data: content, isLoading } = useSiteContent();
  const html = content?.["trip_inquiry_form"] ?? "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Plan Your Journey"
        description="Ready to travel? Tell Kathy Dragon about your dream trip and she'll personally design an extraordinary journey tailored just for you."
        path="/inquiry"
        noIndex={false}
      />
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-semibold text-foreground mb-3">Plan Your Journey</h1>
            <p className="text-muted-foreground text-lg">
              Tell us about your dream trip and Kathy will be in touch.
            </p>
          </div>
          {isLoading ? (
            <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">Loading…</div>
          ) : html ? (
            <EmbedContent html={html} />
          ) : (
            <p className="text-center text-muted-foreground">Inquiry form coming soon.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
