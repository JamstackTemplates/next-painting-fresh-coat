import { NotFoundArt } from '../components/art/not-found-art';
import { SwatchChip } from '../components/art/swatch-chip';
import { SiteLink } from '../components/site-link';
import { getColour } from '../content/colours';

const chipLinks = [
  { href: '/', label: 'Home', colour: getColour('aubergine-close') },
  { href: '/services/', label: 'Services', colour: getColour('water-of-leith') },
  { href: '/projects/', label: 'Projects', colour: getColour('tenement-ochre') },
] as const;

export default function NotFound() {
  return (
    <section className="wrap py-16 text-center lg:py-22">
      <NotFoundArt />
      <p className="eyebrow mt-8">404 · Page not found</p>
      <h1 className="mt-3 font-serif text-[clamp(2.8rem,6vw,4.5rem)] leading-none text-ink">
        This wall&rsquo;s still bare.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base text-muted">
        We couldn&rsquo;t find the page you asked for. Pick a swatch below to head back to freshly
        painted ground.
      </p>

      <nav aria-label="Recovery links" className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
        {chipLinks.map(item => (
          <SiteLink
            key={item.href}
            href={item.href}
            className="block no-underline transition-transform hover:-translate-y-1 hover:no-underline"
          >
            <SwatchChip
              colour={item.colour}
              size="md"
              note={`Go to ${item.label}`}
            />
          </SiteLink>
        ))}
      </nav>
    </section>
  );
}
