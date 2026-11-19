import type { ReactNode } from 'react';

/** Header & footer wordmark: "Brushstroke & Co." in Instrument Serif with a dry-brush stroke under the &. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-serif text-[1.65rem] tracking-[-0.02em] text-ink sm:text-[1.85rem]">
        Brushstroke{' '}
        <span className="relative inline-block italic text-accent-ink">
          &amp;
          <svg
            aria-hidden="true"
            viewBox="0 0 34 8"
            className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-8 -translate-x-1/2 text-accent"
          >
            <path
              d="M2 5.2C9.5 2.4 20.5 2 31.5 3.6c-6.5.9-16.5 1.8-25 2.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>{' '}
        Co.
      </span>
    </span>
  );
}

/** Horizontal masking-tape rule with torn ends, optionally carrying a mono eyebrow label. */
export function TapeRule({
  label,
  className = '',
  align = 'left',
}: {
  label?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${className}`}
    >
      {align === 'center' ? <span aria-hidden="true" className="h-[2px] flex-1 bg-line" /> : null}
      {label ? (
        <span className="tape-pill shrink-0">{label}</span>
      ) : (
        <span aria-hidden="true" className="tape-pill h-3 w-28" />
      )}
      <span aria-hidden="true" className="h-[2px] flex-1 bg-line" />
    </div>
  );
}

/** Dry-brush stroke in primary accent with bristle drag at the tail, used under page heads. */
export function BrushstrokeDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 18"
      preserveAspectRatio="none"
      className={`h-3.5 w-full max-w-md text-accent ${className}`}
    >
      <path
        d="M3 10.5C68 5.2 182 4.6 318 8.2c34 .9 68 1.5 96 .4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.4"
        strokeLinecap="round"
      />
      <path
        d="M12 13.4c74-2.5 198-3.4 338-1.4 24 .3 48 .1 64-1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M342 6.2c24 .2 48-.3 70-2.1M365 13.8c18-.4 35-.9 49-2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** Full-bleed straight cut-in edge with two small paint drips. Used at most once per page. */
export function CutInEdge({
  topFill = 'var(--bg)',
  bottomFill = 'var(--accent)',
  className = '',
}: {
  topFill?: string;
  bottomFill?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: bottomFill }}
    >
      <svg
        viewBox="0 0 1440 38"
        preserveAspectRatio="none"
        className="block h-8 w-full sm:h-10"
      >
        {/* Top band */}
        <rect x="0" y="0" width="1440" height="12" fill={topFill} />
        {/* Crisp cut-in rule */}
        <line x1="0" y1="12" x2="1440" y2="12" stroke="var(--text)" strokeWidth="1.5" opacity="0.22" />
        {/* Two small paint drips descending into the lower band */}
        <path
          d="M286 11.5h14c-1.8 3-2.5 7.5-2.5 14.5 0 4.5-1.8 8-4.5 8s-4.5-3.5-4.5-8c0-7-.7-11.5-2.5-14.5z"
          fill={topFill}
        />
        <path
          d="M1120 11.5h11c-1.4 2.5-2 5.5-2 10.5 0 3.2-1.5 5.5-3.5 5.5s-3.5-2.3-3.5-5.5c0-5-.6-8-2-10.5z"
          fill={topFill}
        />
      </svg>
    </div>
  );
}
