import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, color: '#22c55e', margin: '0 0 8px' }}>404</h1>
          <p style={{ color: '#888', marginBottom: '24px' }}>Page not found</p>
          <Link href="/en" style={{ background: '#22c55e', color: '#000', padding: '10px 24px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '13px' }}>
            Go home
          </Link>
        </div>
      </body>
    </html>
  )
}
