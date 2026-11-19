import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { Wordmark } from './art/rules';
import { SiteLink } from './site-link';

const navLinks = [
  { href: '/services/', label: 'Services' },
  { href: '/projects/', label: 'Projects' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur-sm">
      <div className="wrap flex min-h-20 items-center justify-between gap-3 py-3">
        <SiteLink href="/" className="shrink-0 no-underline hover:no-underline" aria-label={business.name}>
          <Wordmark />
        </SiteLink>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Primary" className="flex items-center gap-6">
            {navLinks.map(item => (
              <SiteLink
                key={item.href}
                href={item.href}
                markCurrent="section"
                className="mono-label text-ink hover:text-accent-ink"
              >
                {item.label}
              </SiteLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <SiteLink href="/contact/" className="button header-cta text-sm">
              {business.enquiries.title}
            </SiteLink>
          </div>
        </div>

        {/* Mobile bar: primary CTA stays visible + native disclosure menu */}
        <div className="flex items-center gap-2 md:hidden">
          <SiteLink href="/contact/" className="button header-cta min-h-10 px-3 py-1.5 text-xs">
            Quote visit
          </SiteLink>
          <DarkModeToggle />
          <details className="mobile-nav-details relative">
            <summary
              aria-label="Toggle navigation menu"
              className="flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-ui border border-line bg-surface px-2.5 font-mono text-xs uppercase tracking-wider text-ink"
            >
              Menu
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-[calc(100%+0.6rem)] z-50 w-56 rounded-ui border border-line bg-surface p-4 shadow-lg"
            >
              <ul className="space-y-3">
                <li>
                  <SiteLink href="/" markCurrent="page" className="mono-label block py-1 text-ink">
                    Home
                  </SiteLink>
                </li>
                {navLinks.map(item => (
                  <li key={item.href}>
                    <SiteLink href={item.href} markCurrent="section" className="mono-label block py-1 text-ink">
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-line pt-3">
                <SiteLink href="/contact/" className="button w-full text-sm">
                  {business.enquiries.title}
                </SiteLink>
              </div>
            </nav>
          </details>
        </div>
      </div>
      <div aria-hidden="true" className="header-tape-seam" />
    </header>
  );
}
