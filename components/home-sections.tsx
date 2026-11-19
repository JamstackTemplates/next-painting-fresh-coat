import type { ReactNode } from 'react';
import { business } from '../content/business';
import { getColour, heroFanColours, seasonalColours } from '../content/colours';
import { processSteps } from '../content/process';
import { featuredProjects } from '../content/projects';
import { categoryLowestPrice, formatFromPrice, serviceCategories, services } from '../content/services';
import { PhoneIcon } from './art/icons';
import { ProcessArt } from './art/process-art';
import { CutInEdge, TapeRule } from './art/rules';
import { SceneVignette } from './art/scene-vignette';
import { MiniSwatchFan, SwatchChip } from './art/swatch-chip';
import { HeroSwatchFan } from './hero-swatch-fan';
import { PhoneHoursTable, PhonesOpenBadge } from './phone-hours-table';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

/* 1. HERO: Asymmetric 5/7 split with studio plaster backdrop & sculptural overlapping swatch fan */
function HomeHeroSection({ children }: ChildrenProps) {
  return (
    <section className="hero-studio-backdrop">
      <div className="wrap pt-7 pb-14 lg:pt-12 lg:pb-22">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {children}
        </div>
      </div>
    </section>
  );
}

function HeroCopy({ children }: ChildrenProps) {
  return (
    <div className="min-w-0 lg:col-span-5 lg:pt-3">
      <div className="mb-5 hidden sm:block">
        <span className="tape-pill">Edinburgh &amp; the Lothians</span>
      </div>
      {children}
    </div>
  );
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 className="font-serif text-[clamp(2.95rem,7vw,6.3rem)] leading-[0.93] tracking-[-0.025em] text-ink [&_em]:text-accent-ink">
      {children}
    </h1>
  );
}

function HeroIntroduction({ children }: ChildrenProps) {
  return <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-muted sm:text-lg">{children}</p>;
}

function HeroActions({ children }: ChildrenProps) {
  return <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{children}</div>;
}

function HeroPrimaryAction({ children }: ChildrenProps) {
  return (
    <SiteLink href="/contact/" className="button w-full sm:w-auto">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryAction({ children }: ChildrenProps) {
  return (
    <SiteLink href="/projects/" className="button button-quiet w-full sm:w-auto">
      {children}
    </SiteLink>
  );
}

function HeroPhoneRow() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
      <a
        href={telHref}
        className="inline-flex items-center gap-2 font-mono text-sm font-medium text-ink hover:text-accent-ink"
      >
        <PhoneIcon className="h-4 w-4 text-accent-ink" />
        <span>{business.phone}</span>
      </a>
      <PhonesOpenBadge />
    </div>
  );
}

function HeroScene() {
  return (
    <div className="min-w-0 lg:col-span-7">
      <HeroSwatchFan colours={heroFanColours} />
    </div>
  );
}

export const HomeHero = Object.assign(HomeHeroSection, {
  Copy: HeroCopy,
  Heading: HeroHeading,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
  PhoneRow: HeroPhoneRow,
  Scene: HeroScene,
});

/* 2. SERVICES STRIP: Full-bleed dust-sheet band with three tall multi-chip paint strips */
function ServicesStripSection({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="home-services-heading" className="dust-band border-y border-line py-16 lg:py-22">
      <div className="wrap">{children}</div>
    </section>
  );
}

function ServicesStripHeader({ children }: ChildrenProps) {
  return <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">{children}</div>;
}

function ServicesStripHeading({ children }: ChildrenProps) {
  return (
    <div>
      <p className="eyebrow mb-2">Services &amp; guide prices</p>
      <h2 id="home-services-heading" className="font-serif text-[clamp(2.3rem,4.5vw,3.7rem)] leading-none text-ink">
        {children}
      </h2>
    </div>
  );
}

function ServicesStripLede({ children }: ChildrenProps) {
  return <p className="max-w-md text-sm text-muted sm:text-base">{children}</p>;
}

function ServicesStripCards() {
  return (
    <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
      {serviceCategories.map(cat => {
        const swatch = getColour(cat.swatch);
        const catServices = services.filter(s => s.category === cat.id);
        const companionSwatches = catServices
          .map(s => getColour(s.swatch))
          .filter(c => c.id !== swatch.id)
          .slice(0, 2);
        const lowest = categoryLowestPrice(cat.id);

        return (
          <SiteLink
            key={cat.id}
            href={`/services/#${cat.id}`}
            className="swatch-chip group relative flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden no-underline hover:-translate-y-1.5 hover:border-accent hover:shadow-[var(--card-shadow-hover)] hover:no-underline md:w-auto"
          >
            {/* Stepped paint-deck colour strip at the top */}
            <div className="p-3 pb-0">
              <div
                className="swatch-well flex h-32 flex-col justify-end p-3"
                style={{ backgroundColor: swatch.hex }}
              >
                <span className="inline-block self-start rounded-xs bg-surface/94 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-ink shadow-xs">
                  {swatch.code} · {swatch.name}
                </span>
              </div>
              {companionSwatches.length > 0 ? (
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  {companionSwatches.map(comp => (
                    <div
                      key={comp.id}
                      className="swatch-well h-4"
                      style={{ backgroundColor: comp.hex }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-serif text-4xl leading-none text-ink group-hover:text-accent-ink">
                {cat.title}
              </h3>
              <p className="mt-2.5 text-sm text-muted">{cat.shortNote}</p>

              <ul className="mt-5 space-y-2 border-t border-line pt-4 text-sm text-ink">
                {catServices.slice(0, 3).map(item => (
                  <li key={item.id} className="flex items-baseline justify-between gap-2">
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between border-t border-line pt-4 mt-6">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-accent-ink">
                  {formatFromPrice(lowest)}
                </p>
                {/* Fan-deck brass eyelet corner detail */}
                <span aria-hidden="true" className="brass-rivet h-3 w-3 rounded-full opacity-80" />
              </div>
            </div>
          </SiteLink>
        );
      })}
    </div>
  );
}

export const ServicesStrip = Object.assign(ServicesStripSection, {
  Header: ServicesStripHeader,
  Heading: ServicesStripHeading,
  Lede: ServicesStripLede,
  Cards: ServicesStripCards,
});

/* 3. HOW A JOB RUNS: Single masking-tape line across the page with 01–04 process drawings */
function ProcessBandSection({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="home-process-heading" className="wrap py-18 lg:py-24">
      {children}
    </section>
  );
}

function ProcessBandHeading({ children }: ChildrenProps) {
  return (
    <div className="mb-12">
      <TapeRule label="How a job runs" className="mb-4 max-w-sm" />
      <h2 id="home-process-heading" className="font-serif text-[clamp(2.3rem,4.5vw,3.7rem)] leading-none text-ink">
        {children}
      </h2>
    </div>
  );
}

function ProcessBandTimeline() {
  return (
    <div className="relative">
      {/* Desktop horizontal masking-tape line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-5 right-0 left-0 hidden h-3.5 lg:block"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--tape) 92%, transparent)',
          borderTop: '1px solid var(--tape-edge)',
          borderBottom: '1px solid var(--tape-edge)',
        }}
      />
      {/* Mobile vertical masking-tape line along the left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 left-3 w-2.5 lg:hidden"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--tape) 92%, transparent)',
          borderLeft: '1px solid var(--tape-edge)',
          borderRight: '1px solid var(--tape-edge)',
        }}
      />

      <ol className="grid gap-8 pl-10 lg:grid-cols-4 lg:gap-7 lg:pl-0">
        {processSteps.map((step, idx) => (
          <li key={step.id} className="relative pt-1 lg:pt-11">
            {/* Hanging translucent masking-tape tab */}
            <span
              aria-hidden="true"
              className="absolute -left-8 top-4 h-3.5 w-6 lg:top-2 lg:left-7 lg:h-7 lg:w-4"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--tape) 92%, transparent)',
                border: '1px solid var(--tape-edge)',
                transform: idx % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)',
              }}
            />
            <div className="swatch-chip relative h-full overflow-hidden p-5">
              <div className="flex items-start justify-between gap-2">
                <span className="font-serif text-6xl leading-none italic text-accent-ink/85">
                  {step.stepNumber}
                </span>
                <ProcessArt step={step.id} className="shrink-0" />
              </div>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export const ProcessBand = Object.assign(ProcessBandSection, {
  Heading: ProcessBandHeading,
  Timeline: ProcessBandTimeline,
});

/* 4. FEATURED PROJECTS: Editorial asymmetric 1-large + 2-stacked layout */
function FeaturedWorkSection({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="home-projects-heading" className="wrap pb-18 lg:pb-24">
      {children}
    </section>
  );
}

function FeaturedWorkHeader({ children }: ChildrenProps) {
  return <div className="mb-10 flex flex-wrap items-end justify-between gap-4">{children}</div>;
}

function FeaturedWorkHeading({ children }: ChildrenProps) {
  return (
    <div>
      <p className="eyebrow mb-2">Recent work</p>
      <h2 id="home-projects-heading" className="font-serif text-[clamp(2.3rem,4.5vw,3.7rem)] leading-none text-ink">
        {children}
      </h2>
    </div>
  );
}

function FeaturedWorkLink({ children }: ChildrenProps) {
  return (
    <SiteLink href="/projects/" className="text-link font-mono text-xs uppercase tracking-[0.1em]">
      {children}
    </SiteLink>
  );
}

function FeaturedWorkGrid() {
  const [lead, ...secondary] = featuredProjects;
  if (!lead) return null;

  const leadColours = lead.colours.map(getColour);

  return (
    <div className="grid gap-7 lg:grid-cols-12">
      {/* Large editorial lead project on the left */}
      <article className="swatch-chip flex flex-col overflow-hidden hover:shadow-[var(--card-shadow-hover)] lg:col-span-7">
        <div className="relative border-b border-line bg-dust">
          <SceneVignette
            scene={lead.scene}
            hexes={leadColours.map(c => c.hex)}
            title={lead.title}
          />
          <div className="absolute bottom-3 right-4">
            <MiniSwatchFan colours={leadColours} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            {lead.area} · {lead.year} · {lead.days} days
          </p>
          <h3 className="mt-2 font-serif text-4xl leading-tight text-ink">{lead.title}</h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{lead.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5 border-t border-line pt-5">
            {leadColours.map(colour => (
              <li
                key={colour.id}
                className="flex items-center gap-2 rounded-xs border border-line bg-bg px-2.5 py-1.5"
              >
                <span
                  className="swatch-well h-5 w-5 shrink-0"
                  style={{ backgroundColor: colour.hex }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                  {colour.code}
                </span>
                <span className="font-serif text-base text-ink">{colour.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      {/* Two smaller projects stacked on the right */}
      <div className="grid gap-7 lg:col-span-5">
        {secondary.map(project => {
          const projectColours = project.colours.map(getColour);
          return (
            <article key={project.id} className="swatch-chip flex flex-col overflow-hidden hover:shadow-[var(--card-shadow-hover)]">
              <div className="relative border-b border-line bg-dust">
                <SceneVignette
                  scene={project.scene}
                  hexes={projectColours.map(c => c.hex)}
                  title={project.title}
                  className="max-h-48 object-cover"
                />
                <div className="absolute bottom-2 right-3 scale-90">
                  <MiniSwatchFan colours={projectColours} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted">
                  {project.area} · {project.year}
                </p>
                <h3 className="mt-1.5 font-serif text-2xl leading-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-3">
                  {projectColours.map(colour => (
                    <span
                      key={colour.id}
                      className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted"
                    >
                      <span
                        className="swatch-well inline-block h-3.5 w-3.5"
                        style={{ backgroundColor: colour.hex }}
                        aria-hidden="true"
                      />
                      {colour.code} {colour.name}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export const FeaturedWork = Object.assign(FeaturedWorkSection, {
  Header: FeaturedWorkHeader,
  Heading: FeaturedWorkHeading,
  Link: FeaturedWorkLink,
  Grid: FeaturedWorkGrid,
});

/* 5. THIS SEASON'S COLOURS: Flat fan deck of 6 overlapping paint paddles + CutInEdge divider */
function SeasonalPaletteSection({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="home-colours-heading" className="pt-4">
      <div className="wrap pb-16 lg:pb-22">{children}</div>
      <CutInEdge topFill="var(--bg)" bottomFill="var(--accent)" />
    </section>
  );
}

function SeasonalPaletteHeader({ children }: ChildrenProps) {
  return <div className="mb-10 max-w-2xl">{children}</div>;
}

function SeasonalPaletteHeading({ children }: ChildrenProps) {
  return (
    <>
      <TapeRule label="House palette" className="mb-4 max-w-xs" />
      <h2 id="home-colours-heading" className="font-serif text-[clamp(2.3rem,4.5vw,3.7rem)] leading-none text-ink">
        {children}
      </h2>
    </>
  );
}

function SeasonalPaletteLede({ children }: ChildrenProps) {
  return <p className="mt-3 text-base text-muted">{children}</p>;
}

function SeasonalPaletteDeck() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-0">
      {seasonalColours.map((colour, index) => (
        <li
          key={colour.id}
          className={`season-chip relative lg:flex-1 ${index > 0 ? 'lg:-ml-4' : ''}`}
        >
          <SwatchChip
            colour={colour}
            size="lg"
            note={colour.note}
            className="h-full"
          />
        </li>
      ))}
    </ul>
  );
}

export const SeasonalPalette = Object.assign(SeasonalPaletteSection, {
  Header: SeasonalPaletteHeader,
  Heading: SeasonalPaletteHeading,
  Lede: SeasonalPaletteLede,
  Deck: SeasonalPaletteDeck,
});

/* 6. SERVICE AREA, PHONE HOURS & LEAD TIME: Textured aubergine painted-wall band */
function AreaAndHoursSection({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="home-area-heading" className="painted-accent-band py-16 text-on-accent lg:py-22">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        {children}
      </div>
    </section>
  );
}

function AreaColumn({ children }: ChildrenProps) {
  return (
    <div className="lg:col-span-7">
      {children}
      <p className="mt-6 font-serif text-[clamp(1.85rem,3.2vw,2.65rem)] leading-[1.35] text-on-accent">
        {business.serviceArea.map((area, index) => (
          <span key={area}>
            {area}
            {index < business.serviceArea.length - 1 ? (
              <span aria-hidden="true" className="mx-2.5 inline-block text-tape">
                ·
              </span>
            ) : null}
          </span>
        ))}
      </p>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-on-accent/80">
        {business.locationNote}
      </p>
    </div>
  );
}

function AreaHeading({ children }: ChildrenProps) {
  return (
    <h2 id="home-area-heading" className="font-mono text-xs uppercase tracking-[0.14em] text-tape">
      {children}
    </h2>
  );
}

function HoursColumn({ children }: ChildrenProps) {
  const leadTime = business.leadTime.trim();
  return (
    <div className="lg:col-span-5">
      {children}
      <div className="mt-4">
        <PhonesOpenBadge variant="on-dark" />
      </div>
      <div className="mt-5">
        <PhoneHoursTable variant="on-dark" />
      </div>
      {leadTime ? (
        <div className="mt-6">
          <p className="tape-pill normal-case tracking-normal text-sm font-sans font-medium">
            {leadTime}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function HoursHeading({ children }: ChildrenProps) {
  return (
    <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-tape">
      {children}
    </h3>
  );
}

export const AreaAndHours = Object.assign(AreaAndHoursSection, {
  AreaColumn,
  AreaHeading,
  HoursColumn,
  HoursHeading,
});

/* 7. CLOSING CTA: Half-painted eggshell & primer band split by a masking-tape seam */
function ClosingCtaSection({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="home-cta-heading" className="half-painted-band border-t border-line py-18 lg:py-24">
      <div className="wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        {children}
      </div>
    </section>
  );
}

function ClosingCtaHeading({ children }: ChildrenProps) {
  return (
    <h2 id="home-cta-heading" className="font-serif text-[clamp(2.9rem,6vw,5rem)] leading-none text-ink">
      {children}
    </h2>
  );
}

function ClosingCtaBody({ children }: ChildrenProps) {
  return <p className="mt-3 max-w-lg text-base text-muted">{children}</p>;
}

function ClosingCtaAction({ children }: ChildrenProps) {
  return (
    <SiteLink href="/contact/" className="button shrink-0 text-base">
      {children}
    </SiteLink>
  );
}

export const ClosingCta = Object.assign(ClosingCtaSection, {
  Heading: ClosingCtaHeading,
  Body: ClosingCtaBody,
  Action: ClosingCtaAction,
});
