import { Helmet } from "react-helmet-async";

const SITE_NAME = "Whole Journeys by Kathy Dragon";
const SITE_URL = "https://new.wholejourneys.com";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

export default function SEO({ title, description, image, path = "", noIndex = false }: SEOProps) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageDesc = description ?? "Thoughtfully designed extraordinary journeys for curious travelers. Signature walking tours in Europe and beyond, personally curated by Kathy Dragon.";
  const pageImage = image || DEFAULT_IMAGE;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
    </Helmet>
  );
}
