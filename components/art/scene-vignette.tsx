import type { ProjectScene } from '../../content/projects';

/**
 * Distinct architectural inline SVG vignette for each project scene,
 * painted directly with the project's 1–3 swatch hexes, with daylight,
 * shadows and fine Edinburgh architectural detailing.
 */
export function SceneVignette({
  scene,
  hexes,
  title,
  className = '',
}: {
  scene: ProjectScene;
  hexes: readonly string[];
  title: string;
  className?: string;
}) {
  const primary = hexes[0] ?? '#5B2A4F';
  const secondary = hexes[1] ?? '#F5F0E6';
  const tertiary = hexes[2] ?? '#C9A27A';
  const uid = `${scene}-${primary.slice(1)}-${secondary.slice(1)}`;

  return (
    <svg
      role="img"
      aria-label={`Architectural illustration of ${title}`}
      viewBox="0 0 420 260"
      className={`block h-auto w-full ${className}`}
    >
      <defs>
        <pattern id={`stipple-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r="0.6" fill="var(--text)" opacity="0.08" />
          <circle cx="7" cy="8" r="0.55" fill="var(--text)" opacity="0.07" />
        </pattern>
        <linearGradient id={`light-${uid}`} x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%" stopColor="#FFF8E6" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#FFF8E6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8DBE6" />
          <stop offset="100%" stopColor="#EFF2F0" />
        </linearGradient>
      </defs>

      {scene === 'room' ? (
        <g>
          {/* Ceiling + stepped cornice */}
          <rect x="0" y="0" width="420" height="32" fill={secondary} />
          <rect x="0" y="22" width="420" height="10" fill="#000000" opacity="0.06" />
          <line x1="0" y1="32" x2="420" y2="32" stroke="var(--text)" strokeWidth="1.75" />
          {/* Main painted wall + cornice shadow */}
          <rect x="0" y="32" width="420" height="178" fill={primary} />
          <rect x="0" y="32" width="420" height="178" fill={`url(#stipple-${uid})`} />
          <rect x="0" y="32" width="420" height="7" fill="#000000" opacity="0.14" />
          {/* Picture rail */}
          <rect x="0" y="56" width="420" height="6" fill={secondary} stroke="var(--text)" strokeWidth="1.25" />
          <rect x="0" y="62" width="420" height="4" fill="#000000" opacity="0.1" />
          {/* Sash window with folded shutters */}
          <rect x="34" y="76" width="144" height="118" fill="#000000" opacity="0.12" transform="translate(4,4)" />
          <rect x="34" y="76" width="144" height="116" fill={secondary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="40" y="84" width="14" height="100" fill="#000000" opacity="0.06" stroke="var(--text)" strokeWidth="1" />
          <rect x="158" y="84" width="14" height="100" fill="#000000" opacity="0.06" stroke="var(--text)" strokeWidth="1" />
          <rect x="54" y="86" width="104" height="94" fill={`url(#sky-${uid})`} stroke="var(--text)" strokeWidth="1.5" />
          {/* Glass reflection */}
          <polygon points="54,86 112,86 78,180 54,180" fill="#FFFFFF" opacity="0.28" />
          <line x1="106" y1="86" x2="106" y2="180" stroke={secondary} strokeWidth="4.5" />
          <line x1="106" y1="86" x2="106" y2="180" stroke="var(--text)" strokeWidth="1.5" />
          <line x1="54" y1="133" x2="158" y2="133" stroke={secondary} strokeWidth="5.5" />
          <line x1="54" y1="133" x2="158" y2="133" stroke="var(--text)" strokeWidth="1.5" />
          <rect x="28" y="188" width="156" height="9" fill={secondary} stroke="var(--text)" strokeWidth="1.5" />
          {/* Sunlight shaft */}
          <polygon points="158,86 244,148 244,206 158,180" fill={`url(#light-${uid})`} />
          {/* Georgian fireplace & brass fender */}
          <rect x="230" y="138" width="136" height="72" fill="#000000" opacity="0.12" transform="translate(4,4)" />
          <rect x="230" y="138" width="136" height="72" fill={secondary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="220" y="128" width="156" height="12" rx="1" fill={secondary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="260" y="156" width="76" height="54" fill="#2C2A2E" stroke="var(--text)" strokeWidth="1.5" />
          <path d="M276 210v-32a22 22 0 0 1 44 0v32" fill="#3B3F45" stroke="var(--text)" strokeWidth="1.25" />
          <rect x="252" y="204" width="92" height="6" fill="var(--brass)" stroke="var(--text)" strokeWidth="1.1" />
          {/* Framed print above mantel */}
          <rect x="262" y="72" width="72" height="46" fill="#000000" opacity="0.14" transform="translate(3,3)" />
          <rect x="262" y="72" width="72" height="46" fill={tertiary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="271" y="80" width="54" height="30" fill={secondary} stroke="var(--text)" strokeWidth="1.15" />
          {/* Skirting & warm floorboards */}
          <rect x="0" y="206" width="420" height="14" fill={secondary} stroke="var(--text)" strokeWidth="1.5" />
          <rect x="0" y="220" width="420" height="40" fill={tertiary} opacity="0.52" />
          <line x1="0" y1="220" x2="420" y2="220" stroke="var(--text)" strokeWidth="1.75" />
          <line x1="0" y1="238" x2="420" y2="238" stroke="var(--text)" strokeWidth="0.9" opacity="0.22" />
        </g>
      ) : null}

      {scene === 'stair' ? (
        <g>
          {/* Upper lime-washed stairwell wall */}
          <rect x="0" y="0" width="420" height="148" fill={secondary} />
          <rect x="0" y="0" width="420" height="148" fill={`url(#stipple-${uid})`} />
          {/* Cupola skylight daylight cone */}
          <polygon points="56,36 164,36 226,184 18,184" fill={`url(#light-${uid})`} />
          {/* Lower painted dado wall */}
          <rect x="0" y="148" width="420" height="112" fill={primary} />
          <rect x="0" y="148" width="420" height="112" fill={`url(#stipple-${uid})`} />
          {/* Crisp cut-in dado rail with shadow */}
          <rect x="0" y="151" width="420" height="4" fill="#000000" opacity="0.15" />
          <rect x="0" y="142" width="420" height="9" fill={tertiary} stroke="var(--text)" strokeWidth="1.75" />
          {/* Curved stone spiral stair steps descending left to right */}
          <path
            d="M0 245L95 215l55-26 62-34 56-42 46-48 48-65h58v260H0z"
            fill="var(--dust)"
            stroke="var(--text)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Step risers + cast shadow */}
          <path
            d="M42 232h88M96 212h88M150 186h86M206 156h84M258 122h82M306 84h78M348 46h72"
            stroke="var(--text)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Cast-iron balusters */}
          <path
            d="M52 228v-54M94 210v-56M136 188v-58M178 164v-60M220 138v-60M262 110v-58M304 78v-52"
            stroke="var(--text)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Sweeping varnished/ochre handrail with sheen */}
          <path
            d="M16 184C120 162 234 106 346 12"
            fill="none"
            stroke="var(--text)"
            strokeWidth="10.5"
            strokeLinecap="round"
          />
          <path
            d="M16 184C120 162 234 106 346 12"
            fill="none"
            stroke={tertiary}
            strokeWidth="5.8"
            strokeLinecap="round"
          />
          <path
            d="M22 181C122 159 234 104 342 13"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.38"
          />
          {/* Cupola skylight oval */}
          <ellipse cx="110" cy="34" rx="54" ry="15" fill="#FFFFFF" stroke="var(--text)" strokeWidth="1.6" />
          <line x1="56" y1="34" x2="164" y2="34" stroke="var(--text)" strokeWidth="1" opacity="0.45" />
          <line x1="110" y1="19" x2="110" y2="49" stroke="var(--text)" strokeWidth="1" opacity="0.45" />
        </g>
      ) : null}

      {scene === 'facade' ? (
        <g>
          {/* Coastal sky */}
          <rect x="0" y="0" width="420" height="260" fill={`url(#sky-${uid})`} />
          {/* Soft coastal clouds */}
          <path d="M44 42c16-8 38-8 54 0M296 36c18-9 44-9 62 0" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.72" />
          {/* Slate pitched roof with courses & chimneys */}
          <polygon points="34,94 210,22 386,94" fill="#3B3F45" stroke="var(--text)" strokeWidth="1.75" strokeLinejoin="round" />
          <line x1="88" y1="72" x2="332" y2="72" stroke="#FFFFFF" strokeWidth="1" opacity="0.16" />
          <line x1="138" y1="52" x2="282" y2="52" stroke="#FFFFFF" strokeWidth="1" opacity="0.16" />
          <rect x="76" y="32" width="26" height="40" fill={primary} stroke="var(--text)" strokeWidth="1.75" />
          <path d="M82 32v-10M89 32v-11M96 32v-10" stroke="#B4462F" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="318" y="32" width="26" height="40" fill={primary} stroke="var(--text)" strokeWidth="1.75" />
          <path d="M324 32v-10M331 32v-11M338 32v-10" stroke="#B4462F" strokeWidth="2.4" strokeLinecap="round" />
          {/* Rendered / harled elevation with eaves shadow */}
          <rect x="52" y="94" width="316" height="146" fill={primary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="52" y="94" width="316" height="146" fill={`url(#stipple-${uid})`} />
          <rect x="53" y="95" width="314" height="9" fill="#000000" opacity="0.14" />
          {/* Corner sandstone quoins */}
          {[104, 128, 152, 176, 200, 220].map((y, i) => (
            <g key={y} fill="#F5F0E6" stroke="var(--text)" strokeWidth="1" opacity="0.65">
              <rect x="52" y={y} width={i % 2 === 0 ? 14 : 9} height="16" />
              <rect x={368 - (i % 2 === 0 ? 14 : 9)} y={y} width={i % 2 === 0 ? 14 : 9} height="16" />
            </g>
          ))}
          {/* Windows + louvered painted shutters */}
          {[90, 260].map(x => (
            <g key={x}>
              <rect x={x - 17} y="118" width="17" height="62" fill={secondary} stroke="var(--text)" strokeWidth="1.5" />
              <rect x={x + 56} y="118" width="17" height="62" fill={secondary} stroke="var(--text)" strokeWidth="1.5" />
              <rect x={x} y="118" width="56" height="62" fill="#F5F0E6" stroke="var(--text)" strokeWidth="1.75" />
              <rect x={x + 4} y="122" width="48" height="54" fill={`url(#sky-${uid})`} stroke="var(--text)" strokeWidth="1" />
              <line x1={x + 28} y1="122" x2={x + 28} y2="176" stroke="#F5F0E6" strokeWidth="3.5" />
              <line x1={x + 28} y1="122" x2={x + 28} y2="176" stroke="var(--text)" strokeWidth="1.2" />
              <line x1={x + 4} y1="149" x2={x + 52} y2="149" stroke="#F5F0E6" strokeWidth="3.5" />
              <line x1={x + 4} y1="149" x2={x + 52} y2="149" stroke="var(--text)" strokeWidth="1.2" />
              <rect x={x - 5} y="178" width="66" height="7" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.4" />
            </g>
          ))}
          {/* Central entrance door + fanlight */}
          <rect x="184" y="142" width="52" height="98" fill={secondary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="190" y="148" width="40" height="14" fill="#DCE4E8" stroke="var(--text)" strokeWidth="1.2" />
          <rect x="192" y="168" width="15" height="26" fill="none" stroke="var(--text)" strokeWidth="1.25" />
          <rect x="213" y="168" width="15" height="26" fill="none" stroke="var(--text)" strokeWidth="1.25" />
          <circle cx="228" cy="204" r="2.6" fill="var(--brass)" stroke="var(--text)" strokeWidth="1" />
          {/* Pavement */}
          <rect x="0" y="240" width="420" height="20" fill="var(--dust)" />
          <line x1="16" y1="240" x2="404" y2="240" stroke="var(--text)" strokeWidth="1.75" />
        </g>
      ) : null}

      {scene === 'shopfront' ? (
        <g>
          {/* Sandstone upper masonry */}
          <rect x="0" y="0" width="420" height="260" fill="var(--dust)" />
          {/* Main painted shopfront joinery */}
          <rect x="24" y="22" width="372" height="218" fill={primary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="24" y="22" width="372" height="218" fill={`url(#stipple-${uid})`} />
          {/* Cornice & signwritten fascia board */}
          <rect x="18" y="18" width="384" height="10" fill={secondary} stroke="var(--text)" strokeWidth="1.6" />
          <rect x="44" y="38" width="332" height="40" fill={primary} stroke={secondary} strokeWidth="2.5" />
          <rect x="50" y="44" width="320" height="28" fill="none" stroke={secondary} strokeWidth="1" opacity="0.65" />
          <line x1="88" y1="58" x2="332" y2="58" stroke={secondary} strokeWidth="2.6" strokeDasharray="28 10" strokeLinecap="round" />
          {/* Transom bar */}
          <rect x="44" y="88" width="332" height="10" fill={secondary} stroke="var(--text)" strokeWidth="1.5" />
          {/* Warmly lit bookshop display window */}
          <rect x="48" y="106" width="212" height="96" fill="#FDF7E8" stroke="var(--text)" strokeWidth="1.75" />
          {/* Warm interior pendant glow */}
          <polygon points="154,118 112,202 196,202" fill="#E9D9A6" opacity="0.34" />
          <line x1="154" y1="106" x2="154" y2="122" stroke="var(--text)" strokeWidth="1.3" />
          <path d="M142 128a12 8 0 0 1 24 0z" fill={secondary} stroke="var(--text)" strokeWidth="1.2" />
          <line x1="118" y1="106" x2="118" y2="202" stroke="var(--text)" strokeWidth="1.6" />
          <line x1="188" y1="106" x2="188" y2="202" stroke="var(--text)" strokeWidth="1.6" />
          {/* Book silhouettes on display ledge */}
          <rect x="60" y="168" width="14" height="34" fill={secondary} stroke="var(--text)" strokeWidth="1.25" />
          <rect x="78" y="174" width="13" height="28" fill={primary} stroke="var(--text)" strokeWidth="1.25" />
          <rect x="95" y="170" width="12" height="32" fill="#A23B3B" stroke="var(--text)" strokeWidth="1.25" />
          <rect x="132" y="170" width="16" height="32" fill={tertiary} stroke="var(--text)" strokeWidth="1.25" />
          <rect x="152" y="175" width="14" height="27" fill={primary} stroke="var(--text)" strokeWidth="1.25" />
          <rect x="204" y="166" width="18" height="36" fill={secondary} stroke="var(--text)" strokeWidth="1.25" />
          <rect x="226" y="172" width="16" height="30" fill={primary} stroke="var(--text)" strokeWidth="1.25" />
          {/* Panelled stall risers */}
          <rect x="48" y="202" width="212" height="38" fill={primary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="62" y="210" width="84" height="22" fill="none" stroke={secondary} strokeWidth="1.5" />
          <rect x="160" y="210" width="86" height="22" fill="none" stroke={secondary} strokeWidth="1.5" />
          {/* Recessed entrance door with brass kickplate */}
          <rect x="282" y="106" width="86" height="134" fill={primary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="296" y="120" width="58" height="62" fill="#FDF7E8" stroke="var(--text)" strokeWidth="1.5" />
          <circle cx="352" cy="196" r="3.8" fill="var(--brass)" stroke="var(--text)" strokeWidth="1.25" />
          <rect x="286" y="228" width="78" height="10" fill="var(--brass)" opacity="0.85" stroke="var(--text)" strokeWidth="1" />
          <line x1="10" y1="240" x2="410" y2="240" stroke="var(--text)" strokeWidth="1.75" />
        </g>
      ) : null}

      {scene === 'office' ? (
        <g>
          {/* Main studio wall */}
          <rect x="0" y="0" width="420" height="206" fill={primary} />
          <rect x="0" y="0" width="420" height="206" fill={`url(#stipple-${uid})`} />
          {/* Crisp vertical feature wall panel on right */}
          <rect x="236" y="0" width="184" height="206" fill={secondary} />
          <rect x="236" y="0" width="184" height="206" fill={`url(#stipple-${uid})`} />
          <line x1="236" y1="0" x2="236" y2="206" stroke="var(--text)" strokeWidth="1.75" />
          {/* Pendant light with warm glow cone */}
          <polygon points="150,84 82,206 218,206" fill={`url(#light-${uid})`} />
          <line x1="150" y1="0" x2="150" y2="62" stroke="var(--text)" strokeWidth="1.75" />
          <path d="M126 84c0-14 10-22 24-22s24 8 24 22z" fill={tertiary} stroke="var(--text)" strokeWidth="1.75" strokeLinejoin="round" />
          {/* Pin-up architectural boards with masking-tape corners */}
          <g>
            <rect x="262" y="42" width="56" height="76" fill="#000000" opacity="0.12" transform="translate(3,3)" />
            <rect x="262" y="42" width="56" height="76" fill="#FAF7F2" stroke="var(--text)" strokeWidth="1.5" />
            <path d="M272 62h36M272 74h26M272 88h36v18h-36z" stroke="var(--text)" strokeWidth="1" opacity="0.55" fill="none" />
            <rect x="280" y="38" width="20" height="7" fill="var(--tape)" stroke="var(--text)" strokeWidth="0.9" />

            <rect x="332" y="42" width="60" height="48" fill="#FAF7F2" stroke="var(--text)" strokeWidth="1.5" />
            <rect x="352" y="38" width="20" height="7" fill="var(--tape)" stroke="var(--text)" strokeWidth="0.9" />
            <rect x="332" y="102" width="60" height="38" fill="#FAF7F2" stroke="var(--text)" strokeWidth="1.5" />
          </g>
          {/* Studio drafting desk & monitor */}
          <rect x="58" y="152" width="198" height="10" fill="#FAF7F2" stroke="var(--text)" strokeWidth="1.75" />
          <line x1="76" y1="162" x2="76" y2="220" stroke="var(--text)" strokeWidth="2.5" />
          <line x1="238" y1="162" x2="238" y2="220" stroke="var(--text)" strokeWidth="2.5" />
          <rect x="114" y="106" width="68" height="38" rx="2" fill={tertiary} stroke="var(--text)" strokeWidth="1.75" />
          <rect x="120" y="112" width="56" height="26" fill="#DCE4E8" opacity="0.3" />
          <line x1="148" y1="144" x2="148" y2="152" stroke="var(--text)" strokeWidth="2" />
          {/* Skirting & floor */}
          <rect x="0" y="206" width="420" height="14" fill={tertiary} stroke="var(--text)" strokeWidth="1.5" />
          <rect x="0" y="220" width="420" height="40" fill="var(--dust)" />
        </g>
      ) : null}

      {scene === 'door' ? (
        <g>
          {/* Warm Edinburgh Craigleith sandstone wall */}
          <rect x="0" y="0" width="420" height="260" fill="#C9A27A" opacity="0.44" />
          {/* Classical stone doorcase + pilasters */}
          <rect x="108" y="14" width="204" height="14" fill="#F5F0E6" stroke="var(--text)" strokeWidth="1.75" />
          <rect x="116" y="28" width="188" height="216" fill="#F5F0E6" stroke="var(--text)" strokeWidth="1.75" />
          {/* Semi-circular Georgian radial fanlight */}
          <path d="M138 92a72 60 0 0 1 144 0z" fill={`url(#sky-${uid})`} stroke="var(--text)" strokeWidth="1.75" />
          <path d="M210 92V32M210 92l-52-36M210 92l52-36M168 92a42 35 0 0 1 84 0" fill="none" stroke="var(--text)" strokeWidth="1.4" />
          {/* Gloss-painted panelled front door */}
          <rect x="138" y="92" width="144" height="152" fill={primary} stroke="var(--text)" strokeWidth="1.75" />
          <polygon points="138,92 220,92 178,244 138,244" fill="#FFFFFF" opacity="0.1" />
          <rect x="154" y="108" width="46" height="54" fill="none" stroke="var(--text)" strokeWidth="1.5" />
          <rect x="159" y="113" width="36" height="44" fill="none" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.24" />
          <rect x="220" y="108" width="46" height="54" fill="none" stroke="var(--text)" strokeWidth="1.5" />
          <rect x="225" y="113" width="36" height="44" fill="none" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.24" />
          <rect x="154" y="176" width="46" height="52" fill="none" stroke="var(--text)" strokeWidth="1.5" />
          <rect x="220" y="176" width="46" height="52" fill="none" stroke="var(--text)" strokeWidth="1.5" />
          {/* Brass letterbox & knocker */}
          <rect x="194" y="166" width="32" height="7" rx="1" fill="var(--brass)" stroke="var(--text)" strokeWidth="1.25" />
          <circle cx="210" cy="136" r="6" fill="var(--brass)" stroke="var(--text)" strokeWidth="1.25" />
          {/* Cast-iron spearhead railings on both sides */}
          <g stroke={secondary} strokeWidth="3.5" strokeLinecap="round">
            <line x1="16" y1="154" x2="106" y2="154" />
            <line x1="16" y1="238" x2="106" y2="238" />
            <line x1="314" y1="154" x2="404" y2="154" />
            <line x1="314" y1="238" x2="404" y2="238" />
            {[30, 52, 74, 96, 326, 348, 370, 392].map(x => (
              <g key={x}>
                <line x1={x} y1="142" x2={x} y2="238" />
                <circle cx={x} cy="140" r="2.2" fill={secondary} stroke="none" />
              </g>
            ))}
          </g>
          {/* Stone steps */}
          <rect x="92" y="242" width="236" height="14" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.75" />
        </g>
      ) : null}
    </svg>
  );
}
