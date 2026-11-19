import type { Metadata } from 'next';
import { PaintTinBrushArt } from '../../components/art/process-art';
import { PageHead } from '../../components/page-head';
import {
  AlwaysIncludedBand,
  PricingGuideBand,
  ServicesCategorySection,
} from '../../components/services-sections';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Interior, exterior and commercial painting services across Edinburgh and the Lothians, with guide prices and what is included on every job.',
  alternates: { canonical: absoluteUrl('/services/') },
};

const GUIDE_NOTE = 'Guide price. Your written quote follows a survey visit.';

const ALWAYS_INCLUDED = [
  {
    icon: 'prep',
    title: 'Thorough prep',
    body: 'Scraping loose flakes, raking out cracks, filling, sanding with dust extraction and priming bare patches.',
  },
  {
    icon: 'protect',
    title: 'Proper protection',
    body: 'Heavy canvas dust sheets over floors and furniture, low-tack tape on woodwork and covered switches.',
  },
  {
    icon: 'coats',
    title: 'Two full coats',
    body: 'Trade-grade emulsions, satinwoods and breathable masonry coatings applied evenly with razor cut-ins.',
  },
  {
    icon: 'tidy',
    title: 'Tidy handover',
    body: 'Tools packed away each evening, tape lifted cleanly and rooms vacuumed before we hand back the keys.',
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHead
        eyebrow="Services & guide prices"
        title={
          <>
            Careful prep, <em>lasting</em> finishes
          </>
        }
        aside={<PaintTinBrushArt />}
      >
        <p>
          Every job starts with sound preparation and clean masking. Browse our interior, exterior
          and commercial work below to see what is covered and where guide prices begin.
        </p>
      </PageHead>

      <ServicesCategorySection category="interior" guideNote={GUIDE_NOTE} />
      <ServicesCategorySection category="exterior" guideNote={GUIDE_NOTE} />
      <ServicesCategorySection category="commercial" guideNote={GUIDE_NOTE} />

      <AlwaysIncludedBand heading="What’s always included" items={ALWAYS_INCLUDED} />

      <PricingGuideBand
        heading="How pricing works"
        pullQuote="Guide prices give you an honest ballpark; the written quote after our visit is the figure you pay."
        ctaLabel={business.enquiries.title}
      >
        <p>
          Two rooms of the same floor area can need very different preparation: a newly skimmed wall
          takes far less time than a Victorian sitting room with cracked lime plaster and painted-shut
          sashes. That is why every figure on this page is a starting guide rather than a quote.
        </p>
        <p>
          During a quote visit we measure the surfaces, check damp or flaking spots, and note any
          access needs such as stairwell staging or exterior scaffolding. You then receive an itemised
          written quote by email showing labour, prep and materials separately.
        </p>
      </PricingGuideBand>
    </>
  );
}
