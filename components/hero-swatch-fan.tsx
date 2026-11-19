'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import type { Colour } from '../content/colours';
import { HeroRoom } from './art/hero-room';

/**
 * Interactive Home hero room + sculptural 8-chip swatch fan.
 * - Without JS: renders static, readable chips (no inert buttons) and Aubergine Close on the wall.
 * - With JS: chips become buttons with aria-pressed; choosing one repaints the room wall via
 *   --wall-colour and updates a polite live region ("Wall: Pentland Moss, BC-017").
 */
export function HeroSwatchFan({ colours }: { colours: readonly Colour[] }) {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState(colours[0]?.id ?? 'aubergine-close');
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = colours.find(c => c.id === selectedId) ?? colours[0];

  function selectColour(colour: Colour) {
    setSelectedId(colour.id);
    setAnnouncement(`Wall: ${colour.name}, ${colour.code}`);
  }

  return (
    <div
      className="relative"
      style={{ '--wall-colour': active.hex } as CSSProperties}
    >
      {/* Subtle colour-matched ambient offset mat behind the architectural board */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 hidden rounded-md opacity-20 blur-xl transition-colors duration-300 lg:block"
        style={{ backgroundColor: active.hex }}
      />

      {/* Hero room artwork framed like an interior designer's board taped to the studio wall */}
      <div className="relative rounded-ui border border-line bg-surface p-2 shadow-[var(--card-shadow)] sm:p-2.5">
        <span aria-hidden="true" className="tape-corner -top-2.5 -left-3 -rotate-12" />
        <span aria-hidden="true" className="tape-corner -top-2.5 -right-3 rotate-12" />
        <div className="overflow-hidden rounded-[2px]">
          <HeroRoom colourName={active.name} colourCode={active.code} />
        </div>
      </div>

      {/* Desktop fanned swatch deck overlapping the lower-left corner & running past the column divide */}
      <div className="mt-5 lg:mt-0">
        {mounted ? (
          <>
            {/* Desktop sculptural 112-degree interactive fan */}
            <div
              className="fan-deck no-print relative hidden h-52 w-full max-w-[36rem] lg:-ml-20 lg:-mt-32 lg:block"
              role="group"
              aria-label="Try a wall colour from the swatch fan"
            >
              {colours.map((colour, index) => {
                const total = colours.length;
                const angle = -28 + (index * 110) / Math.max(1, total - 1);
                const isSelected = colour.id === active.id;
                return (
                  <button
                    key={colour.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectColour(colour)}
                    className={`fan-blade swatch-chip absolute bottom-4 left-16 flex h-44 w-[5.85rem] flex-col p-1.5 pb-4 text-left ${
                      isSelected ? 'border-accent ring-2 ring-accent/45' : ''
                    }`}
                    style={
                      {
                        '--fan-angle': `${angle}deg`,
                        '--fan-delay': `${index * 32}ms`,
                        zIndex: isSelected ? 24 : index + 1,
                      } as CSSProperties
                    }
                  >
                    <span
                      className="swatch-well block h-24 w-full shrink-0"
                      style={{ backgroundColor: colour.hex }}
                      aria-hidden="true"
                    />
                    <span className="mt-1.5 block pl-3 font-mono text-[0.58rem] uppercase tracking-wider text-muted">
                      {colour.code}
                    </span>
                    <span className="block truncate pl-3 font-serif text-[0.9rem] leading-tight text-ink">
                      {colour.name}
                    </span>
                  </button>
                );
              })}
              {/* Gleaming brass pivot rivet at lower-left corner */}
              <span
                aria-hidden="true"
                className="brass-rivet pointer-events-none absolute bottom-6 left-[4.65rem] z-30 h-4 w-4 rounded-full"
              />
            </div>

            {/* Mobile horizontal scrollable row of interactive chips */}
            <div
              className="no-print flex max-w-full snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 lg:hidden"
              role="group"
              aria-label="Try a wall colour"
            >
              {colours.map(colour => {
                const isSelected = colour.id === active.id;
                return (
                  <button
                    key={colour.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectColour(colour)}
                    className={`swatch-chip flex w-28 shrink-0 snap-start flex-col p-2 text-left transition-transform ${
                      isSelected ? '-translate-y-0.5 border-accent ring-2 ring-accent/40' : ''
                    }`}
                  >
                    <span
                      className="swatch-well block h-14 w-full"
                      style={{ backgroundColor: colour.hex }}
                      aria-hidden="true"
                    />
                    <span className="mt-1.5 block font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                      {colour.code}
                    </span>
                    <span className="block font-serif text-base leading-tight text-ink">
                      {colour.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          /* No-JS / pre-hydration fallback: static readable chips, zero inert buttons */
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-4">
            {colours.map(colour => (
              <li key={colour.id} className="swatch-chip flex flex-col p-1.5">
                <span
                  className="swatch-well block h-10 w-full"
                  style={{ backgroundColor: colour.hex }}
                  aria-hidden="true"
                />
                <span className="mt-1 block font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                  {colour.code}
                </span>
                <span className="block font-serif text-sm leading-tight text-ink">
                  {colour.name}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Active colour caption + polite live region + sample disclaimer */}
        <div className="mt-3 flex flex-col gap-1.5 lg:mt-4 lg:pl-36">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="swatch-well inline-block h-4 w-4 rounded-[1px]"
              style={{ backgroundColor: active.hex }}
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink">
              Try a colour:{' '}
              <span className="font-serif text-lg normal-case tracking-normal text-ink">
                {active.name}
              </span>{' '}
              · {active.code}
            </p>
          </div>
          <p className="text-xs text-muted">
            On-screen colours are approximate. We bring real samples to the quote visit.
          </p>
          <p className="sr-only" role="status" aria-live="polite">
            {announcement}
          </p>
        </div>
      </div>
    </div>
  );
}
