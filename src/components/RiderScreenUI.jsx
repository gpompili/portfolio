// Static (non-interactive) recreation of the in-cabin rider display's
// Immersive view, per the "In-Cabin Rider Experience — Multi-View" eng spec:
// inset scene with rounded corners over a dark surround, top ETA scrim,
// edge view-switchers, and a bottom control strip with four pill buttons.
// Rendered at the spec's fixed 1923×1083 design canvas and scaled down by
// the caller (via CSS transform) to fit whatever screen rect it's placed
// into — this keeps every proportion and font size exactly as specified
// regardless of how small the final device mockup ends up being.

const UI_WIDTH = 1923
const UI_HEIGHT = 1083

// Dark-surface tokens (§1 of the spec) — only the ones this static Immersive
// frame actually uses.
const T = {
  insetBg: '#060709',
  heading: '#FFFFFF',
  muted: '#B2B2B2',
  greeting: '#B2B2B2',
  cPrimary: '#FFFFFF',
  cSecondary: '#E5E5E5',
  etaScrimTop: 'rgba(0,0,0,.58)',
  edgeFill: 'rgba(255,255,255,.06)',
  edgeBorder: '#4D4D4D',
  edgeChevron: 'rgba(255,255,255,.35)',
  edgePressed: 'rgba(255,255,255,.14)',
}

const FONT = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const INSET_PAD = 16
const STRIP_H = 104 // 16 + 72 + 16
const SCENE_RADIUS = 22

function ChevronIcon({ dir }) {
  const d = dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={T.edgeChevron} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

// Edge view-switcher tapper (§4): 72×128, flush to the inset frame edge,
// square outer corner (no border on the edge-facing side), rounded inner
// corners.
function EdgeSwitcher({ side }) {
  const isLeft = side === 'left'
  return (
    <div
      style={{
        position: 'absolute',
        [isLeft ? 'left' : 'right']: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 72,
        height: 128,
        background: T.edgeFill,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: `1px solid ${T.edgeBorder}`,
        borderBottom: `1px solid ${T.edgeBorder}`,
        ...(isLeft
          ? { borderRight: `1px solid ${T.edgeBorder}`, borderTopRightRadius: 20, borderBottomRightRadius: 20 }
          : { borderLeft: `1px solid ${T.edgeBorder}`, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }),
      }}
    >
      <ChevronIcon dir={isLeft ? 'left' : 'right'} />
    </div>
  )
}

// Simple line-icon glyphs standing in for the spec's custom brand icons
// (music-note, climate, headset) plus a settings gear.
function ControlIcon({ type, color }) {
  const common = { width: 30, height: 30, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'music':
      return (
        <svg {...common}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )
    case 'climate':
      return (
        <svg {...common}>
          <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5M2 12h20" />
        </svg>
      )
    case 'support':
      return (
        <svg {...common}>
          <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
          <rect x="2.5" y="14" width="4" height="6" rx="1.5" />
          <rect x="17.5" y="14" width="4" height="6" rx="1.5" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 13a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 5.6 8.09a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V2a2 2 0 1 1 4 0v.09c.02.65.42 1.24 1 1.51.62.26 1.34.14 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V8c.27.58.86.98 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    default:
      return null
  }
}

const BUTTON_GROUPS = [
  [
    { key: 'music', label: 'Music' },
    { key: 'climate', label: '72°F' },
  ],
  [
    { key: 'support', label: 'Support' },
    { key: 'settings', label: 'Settings' },
  ],
]

// Control button (§5): 56 tall, radius 28 pill, icon 32/label 24-300, no fill
// at rest. Support carries cPrimary emphasis, the rest cSecondary.
function ControlButton({ type, label }) {
  const color = type === 'support' ? T.cPrimary : T.cSecondary
  return (
    <div
      style={{
        height: 56,
        borderRadius: 28,
        padding: '0 26px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color,
        fontSize: 22,
        fontWeight: 300,
        fontFamily: FONT,
        whiteSpace: 'nowrap',
      }}
    >
      <ControlIcon type={type} color={color} />
      {label}
    </div>
  )
}

export default function RiderScreenUI({
  mp4,
  poster,
  destination = '1345 Piedmont Ave NE',
  etaMinutes = 16,
  etaTime = '11:13 PM',
}) {
  return (
    <div
      style={{
        width: UI_WIDTH,
        height: UI_HEIGHT,
        position: 'relative',
        background: T.insetBg,
        fontFamily: FONT,
        overflow: 'hidden',
      }}
    >
      {/* Inset scene: full-bleed video, rounded corners, 16px pad on 3 sides */}
      <div
        style={{
          position: 'absolute',
          top: INSET_PAD,
          left: INSET_PAD,
          right: INSET_PAD,
          bottom: STRIP_H,
          borderRadius: SCENE_RADIUS,
          overflow: 'hidden',
        }}
      >
        <video
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          poster={poster}
          src={mp4}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* ETA scrim so the pinned header text reads over bright footage */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '42%',
            background: `linear-gradient(to bottom, ${T.etaScrimTop}, rgba(0,0,0,0))`,
            pointerEvents: 'none',
          }}
        />

        {/* Pinned ETA header */}
        <div style={{ position: 'absolute', top: 34, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 21, fontWeight: 400, color: T.greeting, marginBottom: 6 }}>
            Heading to {destination}
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.5px', color: T.heading }}>
            Arriving in {etaMinutes} min at {etaTime}
          </div>
        </div>

        <EdgeSwitcher side="left" />
        <EdgeSwitcher side="right" />
      </div>

      {/* Bottom control strip (§5): two button pairs, centered, 112 between pairs */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: STRIP_H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 112,
        }}
      >
        {BUTTON_GROUPS.map((group, gi) => (
          <div key={gi} style={{ display: 'flex', gap: 32 }}>
            {group.map((b) => (
              <ControlButton key={b.key} type={b.key} label={b.label} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export { UI_WIDTH, UI_HEIGHT }
