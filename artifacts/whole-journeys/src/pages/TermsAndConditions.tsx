import { useSiteContent } from "@/hooks/use-admin-data";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
  const { data: content, isLoading } = useSiteContent();
  const html = content?.["terms_and_conditions"] ?? "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Terms & Conditions"
        description="Terms and conditions for Whole Journeys by Kathy Dragon."
        path="/terms"
        noIndex={true}
      />
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-semibold text-foreground mb-8">Terms &amp; Conditions</h1>
          {isLoading ? (
            <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">Loading…</div>
          ) : html ? (
            <div
              className="prose prose-lg prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className="text-muted-foreground">Terms and conditions coming soon.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
