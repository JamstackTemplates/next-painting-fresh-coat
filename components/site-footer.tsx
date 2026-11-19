import { business } from '../content/business';
import { seasonalColours } from '../content/colours';
import { MailIcon, MapPinIcon, PhoneIcon } from './art/icons';
import { Wordmark } from './art/rules';
import { SwatchChip } from './art/swatch-chip';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="dust-band border-t border-line py-14">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SiteLink href="/" className="inline-block no-underline hover:no-underline" aria-label={business.name}>
              <Wordmark />
            </SiteLink>
            <p className="mt-4 max-w-sm text-sm text-muted">{business.introduction}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink">
              <MapPinIcon className="h-4 w-4 shrink-0 text-accent-ink" />
              <span>{business.locationNote}</span>
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">Direct contact</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-accent-ink" />
                <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-accent-ink" />
                <a className="text-link font-mono" href={telHref}>
                  {business.phone}
                </a>
              </li>
            </ul>
            <p className="mt-3 font-mono text-xs text-muted">{business.phoneHoursStaticLabel}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow">Pages</p>
            <ul className="mt-3 space-y-2 font-mono text-xs uppercase tracking-wider">
              <li>
                <SiteLink href="/" className="text-ink hover:text-accent-ink">Home</SiteLink>
              </li>
              <li>
                <SiteLink href="/services/" className="text-ink hover:text-accent-ink">Services</SiteLink>
              </li>
              <li>
                <SiteLink href="/projects/" className="text-ink hover:text-accent-ink">Projects</SiteLink>
              </li>
              <li>
                <SiteLink href="/contact/" className="text-ink hover:text-accent-ink">Contact</SiteLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Six seasonal swatch chips as a painter's sign-off */}
        <div className="mt-10 border-t border-line pt-8">
          <p className="eyebrow mb-3">House swatches</p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {seasonalColours.map(colour => (
              <SwatchChip key={colour.id} colour={colour} size="sm" />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted">
          <p>{business.name} · {business.locationNote}</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="no-underline hover:text-accent-ink hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
