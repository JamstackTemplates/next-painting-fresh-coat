import type { ReactNode } from 'react';
import { getColour } from '../content/colours';
import {
  formatFromPrice,
  formatTypicalDays,
  serviceCategories,
  services,
  type ServiceCategory,
} from '../content/services';
import {
  BrushIcon,
  DustSheetIcon,
  FillerKnifeIcon,
  PaintTinIcon,
  RollerIcon,
  StepladderIcon,
  TapeRollIcon,
  TickIcon,
} from './art/icons';
import { SwatchChip } from './art/swatch-chip';
import { SiteLink } from './site-link';

function ServiceIcon({ id }: { id: string }) {
  const cls = 'h-7 w-7 text-accent-ink';
  switch (id) {
    case 'single-room':
      return <RollerIcon className={cls} />;
    case 'whole-home':
      return <StepladderIcon className={cls} />;
    case 'woodwork-sash':
      return <BrushIcon className={cls} />;
    case 'feature-walls':
      return <TapeRollIcon className={cls} />;
    case 'render-harling':
      return <FillerKnifeIcon className={cls} />;
    case 'doors-railings':
      return <PaintTinIcon className={cls} />;
    case 'stairwell':
      return <StepladderIcon className={cls} />;
    case 'shopfront':
      return <BrushIcon className={cls} />;
    default:
      return <DustSheetIcon className={cls} />;
  }
}

/** Category section on /services/ with sticky swatch side-tab and ruled decorator's docket rows. */
export function ServicesCategorySection({
  category,
  guideNote,
}: {
  category: ServiceCategory;
  guideNote: string;
}) {
  const meta = serviceCategories.find(c => c.id === category)!;
  const swatch = getColour(meta.swatch);
  const items = services.filter(s => s.category === category);

  return (
    <section
      id={meta.id}
      aria-labelledby={`category-${meta.id}`}
      className="wrap border-t border-line py-14 lg:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left margin: oversized category name + sticky swatch chip side tab */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id={`category-${meta.id}`}
              className="font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-none text-ink"
            >
              {meta.title}
            </h2>
            <p className="mt-3 max-w-xs text-sm text-muted">{meta.shortNote}</p>
            <div className="mt-6 max-w-52">
              <SwatchChip colour={swatch} size="md" note={swatch.note} />
            </div>
          </div>
        </div>

        {/* Right: ruled decorator's docket rows with alternating icon side */}
        <div className="lg:col-span-8">
          <div className="border-t-2 border-ink/80">
            {items.map((service, index) => {
              const serviceSwatch = getColour(service.swatch);
              const iconRight = index % 2 === 1;
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="border-b border-line py-8"
                >
                  <div className="grid gap-6 sm:grid-cols-12">
                    <div className={`sm:col-span-9 ${iconRight ? 'sm:order-1' : 'sm:order-2'}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-serif text-3xl leading-tight text-ink">
                          {service.name}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 rounded-xs border border-line bg-surface px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                          <span
                            className="swatch-well inline-block h-3 w-3"
                            style={{ backgroundColor: serviceSwatch.hex }}
                            aria-hidden="true"
                          />
                          {serviceSwatch.code} {serviceSwatch.name}
                        </span>
                      </div>

                      <p className="mt-3 text-base leading-relaxed text-muted">{service.summary}</p>

                      <ul className="mt-4 space-y-2 text-sm text-ink">
                        {service.includes.map(line => (
                          <li key={line} className="flex items-start gap-2.5">
                            <TickIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-dashed border-line pt-4 font-mono text-xs uppercase tracking-[0.08em]">
                        <span className="font-semibold text-accent-ink">
                          {formatFromPrice(service)}
                        </span>
                        <span className="text-muted">
                          {formatTypicalDays(service.typicalDays)}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex items-start sm:col-span-3 ${
                        iconRight ? 'sm:order-2 sm:justify-end' : 'sm:order-1 sm:justify-start'
                      }`}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-ui border border-line bg-surface">
                        <ServiceIcon id={service.id} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-4 font-mono text-xs text-muted">{guideNote}</p>
        </div>
      </div>
    </section>
  );
}

/** "What's always included": four icons along a tape strip on a dust-sheet band. */
export function AlwaysIncludedBand({
  heading,
  items,
}: {
  heading: ReactNode;
  items: readonly { icon: 'prep' | 'protect' | 'coats' | 'tidy'; title: string; body: string }[];
}) {
  return (
    <section aria-labelledby="always-included-heading" className="dust-band border-y border-line py-16">
      <div className="wrap">
        <h2
          id="always-included-heading"
          className="font-serif text-[clamp(2.2rem,4vw,3.3rem)] leading-none text-ink"
        >
          {heading}
        </h2>
        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-6 right-0 left-0 hidden h-2.5 md:block"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--tape) 90%, transparent)',
              borderTop: '1px solid var(--tape-edge)',
              borderBottom: '1px solid var(--tape-edge)',
            }}
          />
          <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {items.map(item => (
              <li key={item.title} className="swatch-chip relative p-5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-ui border border-line bg-bg text-accent-ink">
                  {item.icon === 'prep' ? <FillerKnifeIcon className="h-6 w-6" /> : null}
                  {item.icon === 'protect' ? <DustSheetIcon className="h-6 w-6" /> : null}
                  {item.icon === 'coats' ? <RollerIcon className="h-6 w-6" /> : null}
                  {item.icon === 'tidy' ? <BrushIcon className="h-6 w-6" /> : null}
                </div>
                <h3 className="font-serif text-2xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** "How pricing works": narrow prose column with a large italic pull-quote and CTA. */
export function PricingGuideBand({
  heading,
  pullQuote,
  children,
  ctaLabel,
}: {
  heading: ReactNode;
  pullQuote: ReactNode;
  children: ReactNode;
  ctaLabel: ReactNode;
}) {
  return (
    <section aria-labelledby="how-pricing-works-heading" className="wrap-narrow py-16 lg:py-22">
      <h2
        id="how-pricing-works-heading"
        className="font-serif text-[clamp(2.2rem,4vw,3.3rem)] leading-none text-ink"
      >
        {heading}
      </h2>
      <blockquote className="my-8 border-l-4 border-accent pl-6 font-serif text-[clamp(1.65rem,3vw,2.35rem)] leading-snug italic text-ink">
        {pullQuote}
      </blockquote>
      <div className="space-y-4 text-base leading-relaxed text-muted">{children}</div>
      <div className="mt-8">
        <SiteLink href="/contact/" className="button">
          {ctaLabel}
        </SiteLink>
      </div>
    </section>
  );
}
