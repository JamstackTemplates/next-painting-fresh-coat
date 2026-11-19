import type { ReactNode } from 'react';
import { BrushstrokeDivider, TapeRule } from './art/rules';

/** Themed inner-page heading block: masking-tape eyebrow, Instrument Serif title, lede and optional side art. */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  aside,
  showBrushstroke = true,
  below,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  aside?: ReactNode;
  showBrushstroke?: boolean;
  below?: ReactNode;
}) {
  return (
    <header className="wrap pt-[clamp(2.5rem,5vw,4.5rem)] pb-[clamp(2rem,4vw,3rem)]">
      <div className="grid items-end gap-8 md:grid-cols-12">
        <div className={aside ? 'md:col-span-8' : 'md:col-span-10'}>
          <TapeRule label={eyebrow} className="mb-5 max-w-md" />
          <h1
            id={id}
            className="font-serif text-[clamp(2.85rem,6.5vw,5rem)] leading-[0.98] tracking-[-0.02em] text-ink"
          >
            {title}
          </h1>
          {showBrushstroke ? <BrushstrokeDivider className="mt-4" /> : null}
          {children ? (
            <div className="mt-5 max-w-(--measure) text-[clamp(1.05rem,1.5vw,1.2rem)] text-muted">
              {children}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="flex justify-start md:col-span-4 md:justify-end">
            {aside}
          </div>
        ) : null}
      </div>
      {below ? <div className="mt-8">{below}</div> : null}
    </header>
  );
}
