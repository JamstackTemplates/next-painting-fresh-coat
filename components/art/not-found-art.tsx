/**
 * 404 illustration: a painted wall with a rectangular "missed patch" of bare plaster,
 * a lone brush resting on an open tin, and a tape label reading "Missed a spot".
 */
export function NotFoundArt({ className = '' }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="A freshly painted wall with one rectangular missed patch of bare plaster, an open paint tin with a brush resting on top, and a masking-tape label reading Missed a spot."
      viewBox="0 0 460 280"
      className={`mx-auto block h-auto w-full max-w-md ${className}`}
    >
      <defs>
        <pattern id="notfound-stipple" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.65" fill="var(--text)" opacity="0.09" />
          <circle cx="9" cy="8" r="0.55" fill="var(--text)" opacity="0.08" />
        </pattern>
      </defs>

      {/* Painted wall */}
      <rect x="16" y="16" width="428" height="206" rx="4" fill="#7FA6A0" stroke="var(--text)" strokeWidth="1.75" />
      <rect x="16" y="16" width="428" height="206" rx="4" fill="url(#notfound-stipple)" />

      {/* Rectangular missed patch of bare plaster */}
      <rect x="134" y="54" width="192" height="114" fill="var(--primer)" stroke="var(--text)" strokeWidth="1.75" strokeDasharray="6 4" />
      <path d="M160 88l34-6 12 22-36 8z" fill="var(--dust)" stroke="var(--text)" strokeWidth="1" opacity="0.65" />

      {/* Masking tape corners & "Missed a spot" tape label */}
      <rect x="122" y="46" width="28" height="12" transform="rotate(-14 122 46)" fill="var(--tape)" stroke="var(--text)" strokeWidth="1.25" />
      <rect x="308" y="48" width="28" height="12" transform="rotate(14 308 48)" fill="var(--tape)" stroke="var(--text)" strokeWidth="1.25" />
      <g transform="rotate(-2 230 112)">
        <rect x="164" y="96" width="132" height="30" fill="var(--tape)" stroke="var(--text)" strokeWidth="1.5" />
        <text
          x="230"
          y="115"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11.5"
          letterSpacing="1.2"
          fill="var(--tape-ink)"
        >
          MISSED A SPOT
        </text>
      </g>

      {/* Skirting board */}
      <rect x="16" y="210" width="428" height="18" fill="#F5F0E6" stroke="var(--text)" strokeWidth="1.75" />
      {/* Dust sheet floor */}
      <rect x="16" y="228" width="428" height="36" fill="var(--dust)" stroke="var(--text)" strokeWidth="1.75" />

      {/* Open paint tin + lone brush resting across it */}
      <g transform="translate(310, 178)">
        <path d="M8 22v50c0 6 16 10 34 10s34-4 34-10V22" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.75" />
        <rect x="8" y="38" width="68" height="22" fill="#5B2A4F" stroke="var(--text)" strokeWidth="1.25" />
        <ellipse cx="42" cy="22" rx="34" ry="9" fill="var(--dust)" stroke="var(--text)" strokeWidth="1.5" />
        <ellipse cx="42" cy="22" rx="26" ry="6" fill="#7FA6A0" stroke="var(--text)" strokeWidth="1.25" />
        {/* Lone brush */}
        <path d="M24 16l58-12 4 9-56 12z" fill="#C9A27A" stroke="var(--text)" strokeWidth="1.75" />
        <path d="M12 18l14-3 4 10-14 3z" fill="#B9BDB8" stroke="var(--text)" strokeWidth="1.5" />
        <path d="M0 21l12-3 4 10-12 3z" fill="#7FA6A0" stroke="var(--text)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
