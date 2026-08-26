// Static (non-interactive) recreation of the in-cabin rider display's
// Immersive view, built directly against the "In-Cabin Rider Experience —
// Multi-View" eng spec (§1 tokens, §2 typography, §3 layout, §4 view
// switchers, §5 control buttons, §11 iconography). Dark surface only.
//
// Rendered at the spec's fixed 1923×1083 design canvas and scaled down by
// the caller (via CSS transform) to fit whatever screen rect it's placed
// into — every size below is a literal spec value in canvas units, so
// proportions stay exact regardless of how small the final mockup is.

const UI_WIDTH = 1923
const UI_HEIGHT = 1083

// §1 — dark-surface tokens, the ones this static Immersive frame uses.
const T = {
  heading: '#FFFFFF',
  greeting: '#B2B2B2',
  cPrimary: '#FFFFFF',
  cSecondary: '#E5E5E5',
  insetBg: '#060709',
  etaScrimTop: 'rgba(0,0,0,.58)',
  edgeFill: 'rgba(255,255,255,.06)',
  edgeBorder: '#4D4D4D',
  edgeChevron: 'rgba(255,255,255,.25)',
}

const FONT = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

// §3 — inset frame.
const INSET_PAD = 16
const STRIP_H = 104 // 16 + 72 + 16
const SCENE_RADIUS = 22

// Real Remix Icon (MIT) path data — arrow-{left,right}-s-line and
// function-add-line are the exact icons the spec names (§11); music-2-line /
// temp-cold-line / customer-service-2-line stand in for the spec's
// undelivered custom brand glyphs (music-note / climate / headset) with real
// Remix vectors rather than a hand-drawn approximation.
const ICON_PATHS = {
  'arrow-left-s-line': 'M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z',
  'arrow-right-s-line': 'M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z',
  'music-2-line': 'M20 3V17C20 19.2091 18.2091 21 16 21C13.7909 21 12 19.2091 12 17C12 14.7909 13.7909 13 16 13C16.7286 13 17.4117 13.1948 18 13.5351V5H9V17C9 19.2091 7.20914 21 5 21C2.79086 21 1 19.2091 1 17C1 14.7909 2.79086 13 5 13C5.72857 13 6.41165 13.1948 7 13.5351V3H20ZM5 19C6.10457 19 7 18.1046 7 17C7 15.8954 6.10457 15 5 15C3.89543 15 3 15.8954 3 17C3 18.1046 3.89543 19 5 19ZM16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z',
  'temp-cold-line': 'M8 5C8 2.79086 9.79086 1 12 1C14.2091 1 16 2.79086 16 5V10.2547C17.8135 11.5196 19 13.6213 19 16C19 19.866 15.866 23 12 23C8.13401 23 5 19.866 5 16C5 13.6213 6.18652 11.5196 8 10.2547V5ZM9.1442 11.8951C7.80943 12.8261 7 14.3432 7 16C7 18.7614 9.23858 21 12 21C14.7614 21 17 18.7614 17 16C17 14.3432 16.1906 12.8261 14.8558 11.8951L14 11.2981V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V11.2981L9.1442 11.8951ZM8 16H16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16Z',
  'customer-service-2-line': 'M19.9381 8H21C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8ZM3 10V14H4V10H3ZM20 10V14H21V10H20ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z',
  'function-add-line': 'M4 3C3.44772 3 3 3.44772 3 4V10C3 10.5523 3.44772 11 4 11H10C10.5523 11 11 10.5523 11 10V4C11 3.44772 10.5523 3 10 3H4ZM4 13C3.44772 13 3 13.4477 3 14V20C3 20.5523 3.44772 21 4 21H10C10.5523 21 11 20.5523 11 20V14C11 13.4477 10.5523 13 10 13H4ZM14 13C13.4477 13 13 13.4477 13 14V20C13 20.5523 13.4477 21 14 21H20C20.5523 21 21 20.5523 21 20V14C21 13.4477 20.5523 13 20 13H14ZM15 19V15H19V19H15ZM5 9V5H9V9H5ZM5 19V15H9V19H5ZM16 11V8H13V6H16V3H18V6H21V8H18V11H16Z',
}

function Icon({ name, size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

// §4 — edge view-switcher: 72×128, flush to the inset frame edge, square
// outer corner with no border on the edge-facing side, inner corners
// radius 20, 0.5px edgeBorder on top/inner/bottom. Chevron: Remix
// arrow-{left,right}-s-line at 64px, edgeChevron.
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
        borderTop: `0.5px solid ${T.edgeBorder}`,
        borderBottom: `0.5px solid ${T.edgeBorder}`,
        ...(isLeft
          ? { borderRight: `0.5px solid ${T.edgeBorder}`, borderTopRightRadius: 20, borderBottomRightRadius: 20 }
          : { borderLeft: `0.5px solid ${T.edgeBorder}`, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }),
      }}
    >
      <Icon name={isLeft ? 'arrow-left-s-line' : 'arrow-right-s-line'} size={64} color={T.edgeChevron} />
    </div>
  )
}

const BUTTONS = {
  music: { icon: 'music-2-line', label: 'Music' },
  climate: { icon: 'temp-cold-line', label: '72°F' },
  support: { icon: 'customer-service-2-line', label: 'Support' },
  settings: { icon: 'function-add-line', label: 'Settings' },
}
const BUTTON_GROUPS = [['music', 'climate'], ['support', 'settings']]

// §5 — control button: 56 tall, radius 28 pill, padding 0 28, icon 32,
// gap 10, label 24/300/34. Support = cPrimary, the rest cSecondary.
function ControlButton({ id }) {
  const { icon, label } = BUTTONS[id]
  const color = id === 'support' ? T.cPrimary : T.cSecondary
  return (
    <div
      style={{
        height: 56,
        borderRadius: 28,
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        whiteSpace: 'nowrap',
      }}
    >
      <Icon name={icon} size={32} color={color} />
      <span style={{ color, fontSize: 24, fontWeight: 300, lineHeight: '34px', fontFamily: FONT }}>{label}</span>
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

        {/* etaScrimTop gradient so the pinned header reads over bright footage */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: `linear-gradient(to bottom, ${T.etaScrimTop}, rgba(0,0,0,0))`,
            pointerEvents: 'none',
          }}
        />

        {/* Pinned ETA header. §2 pairs "ETA heading" (30/500/38/0) with
            "ETA time (hero)" (86/600/98/-1.5) — the ~2.87x ratio between
            those two matches this pinned header's greeting/time-line ratio
            in the reference screenshot almost exactly, confirming the
            pairing. But applied literally at the 1923-canvas scale, 86px
            spans 60% of frame width where the reference shows 39% — so the
            reference is rendering this pair scaled down from the raw table
            values. Using the scaled sizes (measured directly off the
            reference screenshot) rather than the literal ones so this
            matches what's actually shipping; flagged to Gabe in case
            there's a scale factor this spec excerpt doesn't capture. */}
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 500, lineHeight: '25px', letterSpacing: 0, color: T.greeting, marginBottom: 6 }}>
            Heading to {destination}
          </div>
          <div style={{ fontSize: 56, fontWeight: 600, lineHeight: '64px', letterSpacing: '-1px', color: T.heading }}>
            Arriving in {etaMinutes} min at {etaTime}
          </div>
        </div>

        <EdgeSwitcher side="left" />
        <EdgeSwitcher side="right" />
      </div>

      {/* Bottom control strip (§5): two pairs, within-pair gap 32, between-pair gap 112, centered */}
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
            {group.map((id) => (
              <ControlButton key={id} id={id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export { UI_WIDTH, UI_HEIGHT }
