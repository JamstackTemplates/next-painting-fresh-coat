import type { ProcessStepId } from '../../content/process';

/** Four bespoke process drawings hung from the masking-tape line on Home. */
export function ProcessArt({ step, className = '' }: { step: ProcessStepId; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 96"
      className={`h-24 w-28 ${className}`}
      fill="none"
      stroke="var(--text)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {step === 'survey' ? (
        /* Tape measure & clipboard */
        <g>
          <rect x="20" y="16" width="54" height="68" rx="3" fill="var(--surface)" />
          <rect x="36" y="10" width="22" height="11" rx="2" fill="var(--brass)" />
          <line x1="30" y1="36" x2="62" y2="36" />
          <line x1="30" y1="48" x2="58" y2="48" />
          <line x1="30" y1="60" x2="52" y2="60" />
          {/* Yellow/ochre tape measure */}
          <circle cx="84" cy="64" r="18" fill="#D49A3A" />
          <circle cx="84" cy="64" r="6" fill="var(--surface)" />
          <path d="M84 82h26v-9H98" fill="var(--tape)" />
          <path d="M96 76v6M102 78v4" strokeWidth="1.25" />
        </g>
      ) : null}

      {step === 'quote' ? (
        /* Itemised decorator's docket & pencil */
        <g>
          <path d="M22 14h62v68l-8-5-8 5-7-5-8 5-8-5-7 5-8-5-8 5V14z" fill="var(--surface)" />
          <rect x="30" y="22" width="46" height="8" fill="var(--tape)" stroke="none" />
          <line x1="30" y1="40" x2="62" y2="40" />
          <line x1="68" y1="40" x2="76" y2="40" />
          <line x1="30" y1="51" x2="58" y2="51" />
          <line x1="68" y1="51" x2="76" y2="51" />
          <line x1="30" y1="64" x2="76" y2="64" strokeWidth="2" />
          {/* Carpenter's pencil */}
          <path d="M88 22l12-8 6 9-12 8-10 2z" fill="#5B2A4F" />
        </g>
      ) : null}

      {step === 'paint' ? (
        /* Roller on tray */
        <g>
          <path d="M18 54h78l10 24H10z" fill="var(--dust)" />
          <path d="M58 58h34l6 14H54z" fill="#5B2A4F" />
          <rect x="26" y="24" width="44" height="16" rx="5" fill="#7FA6A0" />
          <path d="M70 32h12v14l-26 6v16" />
          <rect x="50" y="66" width="12" height="18" rx="3" fill="#C9A27A" />
        </g>
      ) : null}

      {step === 'walkround' ? (
        /* Clean room corner with a tick on a masking-tape strip */
        <g>
          <rect x="16" y="14" width="88" height="68" rx="3" fill="var(--surface)" />
          <rect x="16" y="14" width="54" height="54" fill="#EEE8DC" />
          <rect x="70" y="14" width="34" height="54" fill="#6F7D58" />
          <line x1="70" y1="14" x2="70" y2="68" />
          <line x1="16" y1="68" x2="104" y2="68" />
          {/* Tape strip with tick */}
          <rect x="34" y="34" width="52" height="22" fill="var(--tape)" />
          <path d="M49 45l7 7 15-14" strokeWidth="2.4" />
        </g>
      ) : null}
    </svg>
  );
}

/** Paint tin and brush illustration for the Services page head. */
export function PaintTinBrushArt({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 140"
      className={`h-auto w-40 sm:w-44 ${className}`}
      fill="none"
      stroke="var(--text)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Open paint tin */}
      <path d="M34 46v68c0 9 20 15 44 15s44-6 44-15V46" fill="var(--surface)" />
      <rect x="34" y="68" width="88" height="32" fill="#5B2A4F" />
      <ellipse cx="78" cy="46" rx="44" ry="13" fill="var(--dust)" />
      <ellipse cx="78" cy="46" rx="34" ry="9" fill="#5B2A4F" />
      {/* Wire handle */}
      <path d="M34 56c-12 6-14 26 8 40" />
      {/* Resting decorator's brush */}
      <path d="M84 36l58-16 6 12-56 18z" fill="#C9A27A" />
      <path d="M68 41l18-5 6 14-18 5z" fill="#B9BDB8" />
      <path d="M52 46l16-5 6 14-16 6z" fill="#5B2A4F" />
      {/* Drip on tin rim */}
      <path d="M60 58v12c0 3 2 5 4 5s4-2 4-5V58" fill="#5B2A4F" />
    </svg>
  );
}
