import type { Metadata } from 'next';
import { MailIcon, MapPinIcon, PhoneIcon, TickIcon } from '../../components/art/icons';
import { MiniSwatchFan } from '../../components/art/swatch-chip';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { PhoneHoursTable, PhonesOpenBadge } from '../../components/phone-hours-table';
import { business } from '../../content/business';
import { getColour } from '../../content/colours';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

const contactFanColours = [
  getColour('aubergine-close'),
  getColour('water-of-leith'),
  getColour('tenement-ochre'),
];

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <>
      <PageHead
        eyebrow="Quote-visit enquiry"
        title={business.enquiries.title}
        aside={<MiniSwatchFan colours={contactFanColours} className="ml-4 scale-125 md:ml-0" />}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap pb-18">
        {/* On mobile, surface direct email right above the form */}
        <div className="mb-8 rounded-ui border border-line bg-surface p-4 md:hidden">
          <p className="eyebrow">Direct email</p>
          <a className="text-link mt-1.5 block wrap-anywhere font-medium" href={`mailto:${business.email}`}>
            {business.email}
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-12">
          {/* Left column: hosted form or email fallback inside a decorator's quote docket */}
          <section aria-label="Enquiry form" className="md:col-span-7">
            <div className="swatch-chip relative overflow-hidden p-6 pt-9 sm:p-8 sm:pt-11">
              {/* Masking-tape strip across the top of the quote docket */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 left-0 h-4"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--tape) 90%, transparent)',
                  borderBottom: '1px solid var(--tape-edge)',
                }}
              />
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div>
                  <h2 className="font-serif text-3xl text-ink">Write to us directly</h2>
                  <p className="mt-3 text-base text-muted">
                    The online enquiry form is not connected on this preview. Send your job details
                    straight to{' '}
                    <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>{' '}
                    and we&rsquo;ll reply to arrange a quote visit.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right column: email, phone, phone hours, useful to include, service area */}
          <aside aria-label="Contact details" className="grid content-start gap-8 md:col-span-5">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-ink">Email &amp; phone</h2>
              <div className="flex items-center gap-2.5">
                <MailIcon className="h-5 w-5 shrink-0 text-accent-ink" />
                <a className="text-link wrap-anywhere font-medium" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>
              <div className="flex items-center gap-2.5 pt-2">
                <PhoneIcon className="h-5 w-5 shrink-0 text-accent-ink" />
                <a className="text-link font-mono text-base font-medium" href={telHref}>
                  {business.phone}
                </a>
              </div>
              <div className="pt-1">
                <PhonesOpenBadge />
              </div>
              <div className="pt-2">
                <PhoneHoursTable />
              </div>
            </div>

            <div className="border-t border-line pt-6">
              <h2 className="font-serif text-3xl text-ink">Useful to include</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <TickIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-6">
              <h2 className="flex items-center gap-2 font-serif text-3xl text-ink">
                <MapPinIcon className="h-5 w-5 text-accent-ink" />
                <span>Service area</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {business.serviceArea.join(' · ')}
              </p>
              <p className="mt-2 font-mono text-xs text-muted">{business.locationNote}</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
