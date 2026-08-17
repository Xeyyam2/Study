import { Link } from "@/i18n/navigation";

// Localized 404 for every route under /[locale] (unknown URLs, unknown
// university/blog/country slugs). Renders inside the [locale] root layout so
// it returns a proper 404 (a layout-less global not-found made every 404 a
// 500). Non-locale 404s use src/app/(root)/not-found.tsx.
export default function LocaleNotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        background: "#f9f9ff",
        color: "#151c27",
      }}
    >
      <p
        style={{
          fontSize: "4rem",
          fontWeight: 700,
          color: "#003d9b",
          margin: 0,
        }}
      >
        404
      </p>
      <h1 style={{ fontSize: "1.75rem", marginTop: "1rem" }}>Page not found</h1>
      <p style={{ color: "#434654", marginTop: "0.75rem", maxWidth: 420 }}>
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "1.5rem",
          display: "inline-block",
          background: "#fb7800",
          color: "#fff",
          borderRadius: "0.5rem",
          padding: "0.75rem 1.5rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Go home
      </Link>
    </div>
  );
}
