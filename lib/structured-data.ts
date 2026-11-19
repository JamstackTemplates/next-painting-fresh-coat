import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';
import { site } from './site.ts';

/** HousePainter schema.org structured data derived from typed business content. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = business.phoneHours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.day,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'HousePainter',
    name: business.name,
    description: site.description || business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    priceRange: business.priceRange,
    areaServed: [...business.serviceArea],
    openingHoursSpecification,
    ...(url ? { url } : {}),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
