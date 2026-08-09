import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        background: '#f9f9ff',
        color: '#151c27',
      }}
    >
      <p style={{ fontSize: '4rem', fontWeight: 700, color: '#003d9b', margin: 0 }}>
        404
      </p>
      <h1 style={{ fontSize: '1.75rem', marginTop: '1rem' }}>
        Page not found
      </h1>
      <p style={{ color: '#434654', marginTop: '0.75rem', maxWidth: 420 }}>
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/en" style={{ marginTop: '1.5rem' }}>
        <button
          style={{
            background: '#fb7800',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Go home
        </button>
      </Link>
    </div>
  );
}
