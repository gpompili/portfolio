import { Link } from 'react-router-dom'

export default function WorkingOnIt() {
  return (
    <div
      style={{
        background: '#0d0d0d',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        fontFamily: 'inherit',
      }}
    >
      <a
        href="https://open.spotify.com/track/33T6ABvdB3P2iYOWJnBjsQ"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 'clamp(72px, 14vw, 160px)',
          fontWeight: 900,
          color: '#fff',
          textDecoration: 'none',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          display: 'block',
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#1DB954'}
        onMouseLeave={e => e.currentTarget.style.color = '#fff'}
      >
        workinonit
      </a>

      <iframe
        src="https://open.spotify.com/embed/track/33T6ABvdB3P2iYOWJnBjsQ?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{
          maxWidth: '480px',
          marginTop: '40px',
          borderRadius: '12px',
          border: 'none',
        }}
      />

      <Link
        to="/"
        style={{
          marginTop: '48px',
          fontSize: '13px',
          color: '#555',
          textDecoration: 'none',
          borderBottom: '1px solid #333',
          paddingBottom: '2px',
          transition: 'color 0.15s ease, border-color 0.15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#999'; e.currentTarget.style.borderColor = '#555'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#333'; }}
      >
        ← Back home
      </Link>
    </div>
  )
}
