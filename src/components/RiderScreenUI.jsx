// Static (non-interactive) recreation of the in-cabin rider display's
// Immersive view, built against the "In-Cabin Rider Experience — Multi-View"
// eng spec (§1 tokens, §5 control buttons, §11 iconography).
//
// The dark surround (insetBg) IS part of the UI — it's the display's own
// bottom-level surface that the video scene and control strip render on
// top of, matching the real product chrome. This whole unit — surround
// included — sits entirely BEHIND the bezel photo mockup in
// DeviceHeroVideo (painted first, with the photo's alpha-cutout painted on
// top of it), so only what falls inside the cutout's rectangle ever shows;
// nothing here should bleed past that hole onto the visible photo.
// No edge view-switchers here — this hero-card context doesn't need them.
//
// Rendered at a fixed 1923×1083 canvas and scaled down by the caller (via
// CSS transform) to fit whatever screen rect it's placed into.

const UI_WIDTH = 1923
const UI_HEIGHT = 1083

// Reserved layout: 16px inset margin around the video scene, 104px bottom
// strip for controls, 22px scene corner radius — mirrors the real display's
// own screen-within-bezel framing.
const INSET_PAD = 16
const STRIP_H = 104
const SCENE_RADIUS = 22

// §1 — dark-surface tokens this frame uses.
const T = {
  insetBg: '#060709',
  heading: '#FFFFFF',
  greeting: '#B2B2B2',
  cPrimary: '#FFFFFF',
  cSecondary: '#E5E5E5',
  etaScrimTop: 'rgba(0,0,0,.58)',
  pillBg: 'rgba(255,255,255,.06)',
  pillBorder: '#333333',
  divider: '#333333',
}

const FONT = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

// Real Remix Icon (MIT) path data — music-2-line / temp-cold-line /
// customer-service-2-line / function-add-line stand in for the spec's
// custom brand glyphs (music-note / climate / headset / settings), pulled
// from the actual remixicon package rather than hand-drawn.
const ICON_PATHS = {
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

const BUTTONS = {
  music: { icon: 'music-2-line', label: 'Music' },
  climate: { icon: 'temp-cold-line', label: '72°F' },
  support: { icon: 'customer-service-2-line', label: 'Support' },
  settings: { icon: 'function-add-line', label: 'Settings' },
}
const BUTTON_GROUPS = [['music', 'climate'], ['support', 'settings']]

// §5 — control button: exaggerated ~1.3x over spec (70 tall, radius 35,
// icon 40, label 30/300) so it stays legible at hero-card scale. Default no
// fill — the visible fill/border lives one level up, on the cluster pill.
// Support = cPrimary, the rest cSecondary.
function ControlButton({ id }) {
  const { icon, label } = BUTTONS[id]
  const color = id === 'support' ? T.cPrimary : T.cSecondary
  return (
    <div
      style={{
        height: 70,
        borderRadius: 35,
        padding: '0 34px',
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        whiteSpace: 'nowrap',
      }}
    >
      <Icon name={icon} size={40} color={color} />
      <span style={{ color, fontSize: 30, fontWeight: 300, lineHeight: '42px', fontFamily: FONT }}>{label}</span>
    </div>
  )
}

// §5 — cluster pill wrapping each button pair: pillBg + pillBorder fill,
// divider between the two buttons. Scaled up to match the enlarged buttons.
function ClusterPill({ ids }) {
  return (
    <div
      style={{
        height: 90,
        padding: 10,
        borderRadius: 45,
        background: T.pillBg,
        border: `0.5px solid ${T.pillBorder}`,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ControlButton id={ids[0]} />
      <div style={{ width: 0.5, height: 50, background: T.divider, margin: '0 10px' }} />
      <ControlButton id={ids[1]} />
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
        fontFamily: FONT,
        overflow: 'hidden',
        background: T.insetBg,
      }}
    >
      {/* Inset video scene — the display's own dark surround (this
          component's outer background) frames it on all sides except the
          bottom, which is reserved for the control strip below. */}
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
            height: '42%',
            background: `linear-gradient(to bottom, ${T.etaScrimTop}, rgba(0,0,0,0))`,
            pointerEvents: 'none',
          }}
        />

        {/* Pinned ETA header — sizes exaggerated over the raw spec values
            (literal 30/86 overwhelmed the frame; measuring Gabe's reference
            screenshot landed on 20/56; this pass bumps that up further
            ~1.25x for legibility at hero-card scale). */}
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ fontSize: 25, fontWeight: 500, lineHeight: '31px', letterSpacing: 0, color: T.greeting, marginBottom: 8 }}>
            Heading to {destination}
          </div>
          <div style={{ fontSize: 70, fontWeight: 600, lineHeight: '80px', letterSpacing: '-1.25px', color: T.heading }}>
            Arriving in {etaMinutes} min at {etaTime}
          </div>
        </div>
      </div>

      {/* Bottom control strip (§5): two cluster pills, centered, sitting
          directly on the insetBg surface. */}
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
          gap: 120,
        }}
      >
        {BUTTON_GROUPS.map((group, gi) => (
          <ClusterPill key={gi} ids={group} />
        ))}
      </div>
    </div>
  )
}

export { UI_WIDTH, UI_HEIGHT }
