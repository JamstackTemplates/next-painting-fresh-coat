import type { CSSProperties } from 'react';

/**
 * HeroRoom: a bright, modern living room caught halfway through a fresh coat.
 * - Most of the wall is "colour-drenched" in var(--wall-colour), with the skirting in the same colour
 *   and an arched alcove in a deeper tone of it. A wet-edge sheen, window glow and roller texture make it read as fresh paint.
 * - The roller is mid-stroke, cutting a wet stripe into bare pink skim plaster where three brushed test
 *   patches sit (one always matches the active colour)
 * - Floor-to-ceiling steel-framed window with a linen sheer, daylight pooling on oak boards
 * - Curved bouclé sofa, round print, globe floor lamp, fiddle-leaf fig, organic rug
 * - Open tin, brush and stacked tins on a dust sheet
 * All wall-colour fills transition via CSS so choosing a swatch repaints the room smoothly.
 */

const fresh = (mix?: string): CSSProperties => ({
  fill: mix ? `color-mix(in oklab, var(--wall-colour, #5B2A4F) ${mix})` : 'var(--wall-colour, #5B2A4F)',
  transition: 'fill 320ms ease',
});

/** Painted region of the back wall with a feathered, slightly wavy roller edge on the right. */
const PAINTED_WALL =
  'M9 23H544l3 18-2 22 4 26-3 30 2 24-4 28 3 30-2 26 4 34-3 28 2 30-3 26 3 22 2 25H9z';

/** Leaves of the fiddle-leaf fig: [cx, cy, rx, ry, rotation, fill] */
const LEAVES: [number, number, number, number, number, string][] = [
  [494, 250, 13, 22, -38, '#5C6B48'],
  [530, 236, 12, 21, 32, '#6F7D58'],
  [506, 214, 12, 20, -12, '#879A6C'],
  [536, 280, 12, 20, 48, '#5C6B48'],
  [488, 296, 12, 21, -56, '#6F7D58'],
  [522, 196, 11, 18, 18, '#5C6B48'],
  [500, 330, 11, 18, -64, '#879A6C'],
  [532, 318, 11, 19, 58, '#879A6C'],
  [514, 262, 10, 17, 6, '#6F7D58'],
];

export function HeroRoom({
  colourName,
  colourCode,
  className = '',
}: {
  colourName: string;
  colourCode: string;
  className?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={`Modern living room freshly painted in ${colourName} (${colourCode}), with an arched alcove in a deeper tone, steel-framed window, bouclé sofa and a paint roller mid-stroke beside test patches on bare plaster.`}
      viewBox="0 0 720 520"
      className={`block h-auto w-full select-none ${className}`}
    >
      <defs>
        <clipPath id="hr-frame">
          <rect x="9" y="9" width="702" height="502" rx="3" />
        </clipPath>
        <clipPath id="hr-painted">
          <path d={PAINTED_WALL} />
        </clipPath>
        <filter id="hr-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="hr-softer" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        {/* Fine roller-nap stipple on fresh emulsion */}
        <pattern id="hr-nap" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r="0.6" fill="#000" opacity="0.07" />
          <circle cx="7" cy="1.5" r="0.5" fill="#fff" opacity="0.08" />
          <circle cx="5" cy="8" r="0.55" fill="#000" opacity="0.06" />
        </pattern>
        {/* Bouclé loops */}
        <pattern id="hr-boucle" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="none" stroke="#B9AC98" strokeWidth="0.5" opacity="0.55" />
          <circle cx="4.5" cy="4.5" r="1.1" fill="none" stroke="#B9AC98" strokeWidth="0.5" opacity="0.45" />
        </pattern>
        {/* Window daylight spilling across the painted wall */}
        <radialGradient id="hr-glow" cx="120" cy="210" r="330" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF9EC" stopOpacity="0.32" />
          <stop offset="0.55" stopColor="#FFF9EC" stopOpacity="0.08" />
          <stop offset="1" stopColor="#FFF9EC" stopOpacity="0" />
        </radialGradient>
        {/* Diagonal satin sheen */}
        <linearGradient id="hr-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Wet edge: fresh paint reads a touch deeper and glossier near the roller line */}
        <linearGradient id="hr-wet" x1="470" y1="0" x2="552" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.85" stopColor="#000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        {/* Ceiling shadow line */}
        <linearGradient id="hr-ceiling-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B8D3E2" />
          <stop offset="0.6" stopColor="#E3EDEF" />
          <stop offset="1" stopColor="#F3EEE4" />
        </linearGradient>
        <linearGradient id="hr-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C49C6F" />
          <stop offset="1" stopColor="#D8B88E" />
        </linearGradient>
        {/* Roller loading runs out towards the bottom of the stroke */}
        <linearGradient id="hr-stripe-grad" x1="0" y1="166" x2="0" y2="370" gradientUnits="userSpaceOnUse">
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.96" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </linearGradient>
        <mask id="hr-stripe-fade" maskUnits="userSpaceOnUse" x="540" y="160" width="64" height="216">
          <rect x="540" y="160" width="64" height="216" fill="url(#hr-stripe-grad)" />
        </mask>
        <linearGradient id="hr-plaster" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EBD6C8" />
          <stop offset="1" stopColor="#E2C8B7" />
        </linearGradient>
        <linearGradient id="hr-sunpool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF8E8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFF8E8" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="hr-globe" cx="0.4" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#FFFDF5" />
          <stop offset="0.6" stopColor="#FCEFCF" />
          <stop offset="1" stopColor="#EED29A" />
        </radialGradient>
        <radialGradient id="hr-lamp-glow">
          <stop offset="0" stopColor="#FFE9B8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFE9B8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hr-pot" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B5583A" />
          <stop offset="0.45" stopColor="#CF7651" />
          <stop offset="1" stopColor="#A54E33" />
        </linearGradient>
        <linearGradient id="hr-tin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B8BCC0" />
          <stop offset="0.4" stopColor="#ECEEEF" />
          <stop offset="1" stopColor="#A3A8AD" />
        </linearGradient>
      </defs>

      <g clipPath="url(#hr-frame)">
        {/* ── Back wall: bare pink skim plaster everywhere, then fresh paint over most of it ── */}
        <rect x="9" y="9" width="702" height="383" fill="url(#hr-plaster)" />
        <g opacity="0.5" filter="url(#hr-soft)">
          <ellipse cx="610" cy="250" rx="40" ry="26" fill="#DDBFAD" />
          <ellipse cx="680" cy="120" rx="30" ry="40" fill="#F0DED2" />
          <ellipse cx="660" cy="330" rx="36" ry="20" fill="#D9BBA8" />
        </g>

        <path d={PAINTED_WALL} style={fresh()} />
        <g clipPath="url(#hr-painted)">
          {/* Deeper-tone arched alcove */}
          <path d="M258 392V204a112 112 0 0 1 224 0v188z" style={fresh('70%, #1E1410')} />
          <path
            d="M258 392V204a112 112 0 0 1 224 0v188"
            fill="none"
            stroke="#000"
            strokeOpacity="0.12"
            strokeWidth="6"
            filter="url(#hr-soft)"
          />
          {/* Colour-drenched skirting */}
          <rect x="9" y="378" width="560" height="14" style={fresh('88%, #000')} />
          <rect x="9" y="378" width="560" height="1.5" fill="#fff" opacity="0.18" />
          <rect x="9" y="9" width="560" height="383" fill="url(#hr-nap)" />
          <rect x="9" y="9" width="560" height="383" fill="url(#hr-glow)" />
          <rect x="9" y="9" width="560" height="383" fill="url(#hr-sheen)" />
          <rect x="9" y="9" width="560" height="383" fill="url(#hr-wet)" />
        </g>

        {/* Bare-plaster skirting on the unpainted run */}
        <rect x="547" y="378" width="164" height="14" fill="#F1ECE3" />

        {/* Ceiling + shadow gap */}
        <rect x="9" y="9" width="702" height="14" fill="#F7F4EE" />
        <rect x="9" y="23" width="702" height="12" fill="url(#hr-ceiling-shadow)" />

        {/* ── Roller stripe being applied over the plaster: full coat up top, feathering out lower down ── */}
        <g>
          <path
            d="M544 166h54l1 40-2 38 2 36-1 28 1 30-2 32H547l-2-32 1-30-1-30 2-36-2-40z"
            style={fresh()}
            mask="url(#hr-stripe-fade)"
          />
          <path d="M556 172v196M590 172v190" stroke="#fff" strokeOpacity="0.07" strokeWidth="6" />
          <path d="M598 166l1 40-2 38 2 36-1 28" fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="2" />
        </g>

        {/* ── Test patches brushed onto the bare plaster ── */}
        <g>
          <path d="M630 70h38l2 4-1 30-3 2h-36l-2-3 1-31z" fill="#6F7D58" />
          <path d="M630 116h38l2 3-1 31-2 2h-37l-2-4 1-29z" fill="#3E5C6B" />
          <path d="M630 162h38l2 4-1 30-3 2h-36l-2-3 1-31z" style={fresh()} />
          <path d="M633 74h30M633 120h30M633 166h30" stroke="#fff" strokeOpacity="0.14" strokeWidth="2" />
          {/* Pencil notes */}
          <g stroke="#6B5A50" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" fill="none">
            <path d="M678 84h20M678 90h14M678 130h22M678 136h12M678 176h18M678 182h16" />
          </g>
          <path
            d="M678 202l5 5 10-12"
            fill="none"
            stroke="#B5583A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ── Steel-framed floor-to-ceiling window ── */}
        <g>
          <rect x="40" y="48" width="160" height="344" style={fresh('84%, #000')} />
          <rect x="50" y="58" width="140" height="334" fill="url(#hr-sky)" />
          {/* View: soft hills, trees and clouds */}
          <ellipse cx="96" cy="112" rx="24" ry="7" fill="#fff" opacity="0.75" />
          <ellipse cx="160" cy="96" rx="18" ry="5" fill="#fff" opacity="0.6" />
          <path d="M50 300c30-26 64-30 92-18s38 8 48 2v108H50z" fill="#A7B79A" />
          <path d="M50 330c34-14 80-16 140-6v68H50z" fill="#8FA27F" />
          <circle cx="160" cy="292" r="22" fill="#7D9170" />
          <circle cx="176" cy="300" r="16" fill="#6F8463" />
          <rect x="166" y="306" width="4" height="30" fill="#5E5146" />
          {/* Inner reveal shadow */}
          <rect x="50" y="58" width="140" height="8" fill="#000" opacity="0.1" />
          {/* Black steel glazing bars */}
          <g stroke="#262426" strokeWidth="2.5">
            <path d="M96.7 58v334M143.3 58v334M50 142h140M50 226h140M50 310h140" />
          </g>
          <rect x="50" y="58" width="140" height="334" fill="none" stroke="#262426" strokeWidth="5" />
          <rect x="138" y="228" width="10" height="3" rx="1" fill="#B89347" />
        </g>

        {/* Linen sheer on a slim rail */}
        <g>
          <path d="M22 34h196" stroke="#262426" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M24 36h46c-4 60 6 120 2 180s8 120 4 176H22c4-56-6-118-2-176s-4-120 4-180z"
            fill="#F7F2E9"
            opacity="0.92"
          />
          <path
            d="M36 40c-3 70 4 140 0 210s3 100 0 142M52 40c4 64-4 130 2 200s-2 100 2 152M64 40c-2 60 5 120 1 180"
            fill="none"
            stroke="#D9CEBD"
            strokeWidth="2"
            opacity="0.8"
          />
        </g>

        {/* ── Floor ── */}
        <rect x="9" y="392" width="702" height="119" fill="url(#hr-floor)" />
        <g stroke="#7A5C3E" strokeOpacity="0.12" strokeWidth="1">
          <path d="M9 412h702M9 436h702M9 464h702M9 496h702" />
          <path d="M120 392v20M380 392v20M610 392v20M60 412v24M290 412v24M520 412v24M180 436v28M450 436v28M680 436v28M90 464v32M340 464v32M590 464v32" />
        </g>
        <rect x="9" y="392" width="702" height="6" fill="#000" opacity="0.1" />

        {/* Daylight pooling on the boards */}
        <path d="M50 394h140l120 117H130z" fill="url(#hr-sunpool)" />
        <g stroke="#7A5C3E" strokeOpacity="0.12" strokeWidth="3">
          <path d="M97 394l78 117M143 394l100 117" />
        </g>

        {/* Organic rug */}
        <path
          d="M236 420c10-18 262-22 286-4 22 18 4 54-146 58-128 3-156-30-140-54z"
          fill="#EAE0CF"
        />
        <path
          d="M252 424c12-12 240-16 258-2 16 14-2 40-134 43-114 2-136-24-124-41z"
          fill="none"
          stroke="#D6C6AC"
          strokeWidth="1.5"
          strokeDasharray="1 4"
          strokeLinecap="round"
        />

        {/* ── Round print inside the alcove ── */}
        <g>
          <circle cx="374" cy="202" r="44" fill="#000" opacity="0.16" filter="url(#hr-soft)" />
          <circle cx="370" cy="196" r="42" fill="#F6F1E8" stroke="#B89347" strokeWidth="2.5" />
          <clipPath id="hr-print">
            <circle cx="370" cy="196" r="34" />
          </clipPath>
          <g clipPath="url(#hr-print)">
            <rect x="336" y="162" width="68" height="68" fill="#F1E9DC" />
            <circle cx="384" cy="206" r="22" fill="#C2643F" />
            <path d="M330 222c20-14 40-14 60-2s30 10 50 0v20h-110z" fill="#6F7D58" />
            <circle cx="356" cy="182" r="7" style={fresh()} />
          </g>
        </g>

        {/* ── Globe floor lamp ── */}
        <g>
          <circle cx="226" cy="178" r="70" fill="url(#hr-lamp-glow)" />
          <ellipse cx="226" cy="414" rx="20" ry="5" fill="#000" opacity="0.2" filter="url(#hr-soft)" />
          <path d="M226 196v214" stroke="#B89347" strokeWidth="3" />
          <ellipse cx="226" cy="411" rx="14" ry="4" fill="#2E2B2C" />
          <circle cx="226" cy="178" r="19" fill="url(#hr-globe)" />
        </g>

        {/* ── Curved bouclé sofa ── */}
        <g>
          <ellipse cx="370" cy="414" rx="118" ry="10" fill="#000" opacity="0.22" filter="url(#hr-soft)" />
          {/* Oak plinth feet */}
          <rect x="290" y="398" width="10" height="13" rx="2" fill="#9C7650" />
          <rect x="440" y="398" width="10" height="13" rx="2" fill="#9C7650" />
          {/* Back */}
          <path d="M282 352c0-48 22-62 88-62s88 14 88 62z" fill="#EFE8DC" />
          <path d="M282 352c0-48 22-62 88-62s88 14 88 62z" fill="url(#hr-boucle)" />
          {/* Seat */}
          <rect x="278" y="346" width="184" height="54" rx="14" fill="#F4EEE4" />
          <rect x="278" y="346" width="184" height="54" rx="14" fill="url(#hr-boucle)" />
          <path d="M292 372h156" stroke="#D7CCBA" strokeWidth="2" strokeLinecap="round" />
          {/* Rounded arms */}
          <rect x="262" y="322" width="38" height="80" rx="19" fill="#ECE4D7" />
          <rect x="262" y="322" width="38" height="80" rx="19" fill="url(#hr-boucle)" />
          <rect x="440" y="322" width="38" height="80" rx="19" fill="#ECE4D7" />
          <rect x="440" y="322" width="38" height="80" rx="19" fill="url(#hr-boucle)" />
          <path d="M270 330c4-6 10-8 16-8M448 330c4-6 10-8 16-8" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Cushions */}
          <rect x="300" y="312" width="44" height="40" rx="12" transform="rotate(-9 322 332)" fill="#C2643F" />
          <path d="M306 322c10 6 22 8 32 4" stroke="#fff" strokeOpacity="0.2" strokeWidth="2" fill="none" />
          <rect x="394" y="314" width="40" height="38" rx="12" transform="rotate(8 414 333)" fill="#D49A3A" />
          <circle cx="362" cy="338" r="15" style={fresh('70%, #fff')} />
          <circle cx="362" cy="338" r="15" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="2" />
          {/* Draped throw over the right arm */}
          <path d="M442 330c14-6 28-4 36 4l-4 48c-10 4-20 4-30-2z" fill="#7FA6A0" />
          <path d="M448 340l26-2M448 352l26 0M448 364l24 2" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
        </g>

        {/* ── Fiddle-leaf fig in a terracotta pot ── */}
        <g>
          <ellipse cx="512" cy="418" rx="28" ry="6" fill="#000" opacity="0.22" filter="url(#hr-soft)" />
          <path d="M512 372c-2-40 4-90-2-150" fill="none" stroke="#6B553F" strokeWidth="3" strokeLinecap="round" />
          <path d="M510 300c-10-10-14-20-16-34M512 260c10-6 16-14 18-26M511 330c10-4 16-10 20-18" fill="none" stroke="#6B553F" strokeWidth="2" strokeLinecap="round" />
          {LEAVES.map(([cx, cy, rx, ry, rot, fill]) => (
            <g key={`${cx}-${cy}`} transform={`rotate(${rot} ${cx} ${cy})`}>
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />
              <path d={`M${cx} ${cy - ry + 3}v${ry * 2 - 6}`} stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />
            </g>
          ))}
          <path d="M490 370h44l-6 46h-32z" fill="url(#hr-pot)" />
          <rect x="487" y="366" width="50" height="8" rx="2" fill="#C66C49" />
        </g>

        {/* ── Dust sheet, tins and brush (right foreground) ── */}
        <g>
          <path
            d="M548 404c40-6 110-8 163-4v111H530c6-36 4-74 18-107z"
            fill="#F1ECE4"
          />
          <path d="M572 424c30 8 64 2 100 8M560 466c40-8 90 6 150-2" stroke="#DDD4C8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M548 404c40-6 110-8 163-4" stroke="#DDD4C8" strokeWidth="1.5" fill="none" />
          {/* Paint splashes on the sheet */}
          <circle cx="600" cy="492" r="3.5" style={fresh()} />
          <circle cx="612" cy="498" r="2" style={fresh()} />
          <ellipse cx="566" cy="448" rx="4" ry="2" style={fresh()} />

          {/* Stacked tins */}
          <ellipse cx="676" cy="454" rx="30" ry="6" fill="#000" opacity="0.18" filter="url(#hr-soft)" />
          <rect x="650" y="414" width="52" height="38" rx="3" fill="url(#hr-tin)" />
          <rect x="650" y="424" width="52" height="18" fill="#6F7D58" />
          <ellipse cx="676" cy="414" rx="26" ry="5" fill="#D5D8DB" />
          <rect x="656" y="380" width="42" height="32" rx="3" fill="url(#hr-tin)" />
          <rect x="656" y="388" width="42" height="15" fill="#D49A3A" />
          <ellipse cx="677" cy="380" rx="21" ry="4.5" fill="#D5D8DB" />

          {/* Open tin of the active colour */}
          <ellipse cx="606" cy="476" rx="34" ry="7" fill="#000" opacity="0.2" filter="url(#hr-soft)" />
          <rect x="580" y="434" width="52" height="40" rx="3" fill="url(#hr-tin)" />
          <rect x="580" y="444" width="52" height="20" style={fresh()} />
          <ellipse cx="606" cy="434" rx="26" ry="6" fill="#C9CDD1" />
          <ellipse cx="606" cy="434" rx="22" ry="4.5" style={fresh()} />
          <ellipse cx="600" cy="433" rx="8" ry="1.5" fill="#fff" opacity="0.4" />
          <path d="M590 437v10a3 3 0 0 0 6 0v-8z" style={fresh()} />
          {/* Brush resting across the rim */}
          <g transform="rotate(-14 606 428)">
            <rect x="618" y="424" width="44" height="7" rx="3.5" fill="#C9A27A" />
            <rect x="606" y="422" width="14" height="11" rx="1.5" fill="#B89347" />
            <path d="M584 423h22v9h-22a4 4 0 0 1 0-9z" style={fresh()} />
          </g>
          {/* Lid leaning on the stack */}
          <ellipse cx="642" cy="462" rx="5" ry="15" fill="#C9CDD1" stroke="#A3A8AD" strokeWidth="1" />
        </g>

        {/* ── Roller mid-stroke on an extension pole ── */}
        <g>
          <path d="M612 180l66 340" stroke="#000" strokeOpacity="0.12" strokeWidth="8" filter="url(#hr-soft)" />
          <path d="M612 180l66 340" stroke="#A9AEB3" strokeWidth="5" strokeLinecap="round" />
          <path d="M612 180l66 340" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M610 168l4 18" stroke="#2E2B2C" strokeWidth="7" strokeLinecap="round" />
          <path d="M598 156h10v12" fill="none" stroke="#3A3739" strokeWidth="3" strokeLinejoin="round" />
          <rect x="542" y="146" width="58" height="22" rx="9" style={fresh('92%, #000')} />
          <rect x="542" y="146" width="58" height="22" rx="9" fill="url(#hr-nap)" />
          <rect x="548" y="150" width="46" height="4" rx="2" fill="#fff" opacity="0.25" />
        </g>
      </g>

      {/* Frame */}
      <rect x="8.5" y="8.5" width="703" height="503" rx="3.5" fill="none" stroke="var(--line)" strokeWidth="1" />
    </svg>
  );
}
