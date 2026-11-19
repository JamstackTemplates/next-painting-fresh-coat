import type { Colour } from '../../content/colours';

/** Universal paint swatch chip: colour well (true hex with thin line border), BC-### code and serif name. */
export function SwatchChip({
  colour,
  size = 'md',
  note,
  className = '',
}: {
  colour: Colour;
  size?: 'sm' | 'md' | 'lg';
  note?: string;
  className?: string;
}) {
  const wellHeight = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-32' : 'h-20';
  const padding = size === 'sm' ? 'p-1.5' : 'p-2.5';

  return (
    <div className={`swatch-chip flex flex-col ${padding} ${className}`}>
      <div
        className={`swatch-well w-full ${wellHeight}`}
        style={{ backgroundColor: colour.hex }}
        aria-hidden="true"
      />
      <div className={size === 'sm' ? 'mt-1.5' : 'mt-2.5 flex flex-1 flex-col'}>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.11em] text-muted">
          {colour.code}
        </p>
        <p
          className={`font-serif leading-tight text-ink ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg'
          }`}
        >
          {colour.name}
        </p>
        {note ? <p className="mt-1.5 text-xs leading-relaxed text-muted">{note}</p> : null}
        {size === 'lg' ? (
          <span
            aria-hidden="true"
            className="mt-auto self-end pt-3"
          >
            <span className="brass-rivet block h-2.5 w-2.5 rounded-full opacity-75" />
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Small static 3-chip swatch fan pinned at one corner by a brass rivet (project cards & Contact head). */
export function MiniSwatchFan({
  colours,
  className = '',
}: {
  colours: readonly Colour[];
  className?: string;
}) {
  const chips = colours.slice(0, 3);
  const angles = chips.length === 1 ? [0] : chips.length === 2 ? [-10, 10] : [-18, 0, 18];

  return (
    <div
      className={`relative inline-flex h-20 w-24 items-end justify-center ${className}`}
      aria-hidden="true"
    >
      {chips.map((colour, index) => (
        <div
          key={colour.id}
          className="swatch-chip absolute bottom-0 left-1/2 w-11 -translate-x-1/2 p-1 pb-3.5 shadow-sm"
          style={{
            transformOrigin: '50% 90%',
            transform: `translateX(-50%) rotate(${angles[index] ?? 0}deg)`,
            zIndex: index + 1,
          }}
        >
          <div
            className="swatch-well h-10 w-full"
            style={{ backgroundColor: colour.hex }}
          />
          <span className="mt-0.5 block truncate text-center font-mono text-[0.48rem] uppercase tracking-wider text-muted">
            {colour.code}
          </span>
        </div>
      ))}
      <span
        className="brass-rivet absolute bottom-1 left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
      />
    </div>
  );
}
