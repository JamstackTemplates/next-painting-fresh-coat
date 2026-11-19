import type { Metadata } from 'next';
import {
  AreaAndHours,
  ClosingCta,
  FeaturedWork,
  HomeHero,
  ProcessBand,
  SeasonalPalette,
  ServicesStrip,
} from '../components/home-sections';
import { business } from '../content/business';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <HomeHero>
        <HomeHero.Copy>
          <HomeHero.Heading>
            Fresh coats, <em>clean</em> lines, tidy rooms.
          </HomeHero.Heading>
          <HomeHero.Introduction>{business.introduction}</HomeHero.Introduction>
          <HomeHero.Actions>
            <HomeHero.PrimaryAction>{business.enquiries.title}</HomeHero.PrimaryAction>
            <HomeHero.SecondaryAction>See our projects</HomeHero.SecondaryAction>
          </HomeHero.Actions>
          <HomeHero.PhoneRow />
        </HomeHero.Copy>
        <HomeHero.Scene />
      </HomeHero>

      <ServicesStrip>
        <ServicesStrip.Header>
          <ServicesStrip.Heading>Interior, exterior &amp; commercial</ServicesStrip.Heading>
          <ServicesStrip.Lede>
            Honest guide prices up front, followed by a written fixed quote after we measure up on site.
          </ServicesStrip.Lede>
        </ServicesStrip.Header>
        <ServicesStrip.Cards />
      </ServicesStrip>

      <ProcessBand>
        <ProcessBand.Heading>Four steps from first look to clean floor</ProcessBand.Heading>
        <ProcessBand.Timeline />
      </ProcessBand>

      <FeaturedWork>
        <FeaturedWork.Header>
          <FeaturedWork.Heading>Finished rooms, facades &amp; stairs</FeaturedWork.Heading>
          <FeaturedWork.Link>See all projects</FeaturedWork.Link>
        </FeaturedWork.Header>
        <FeaturedWork.Grid />
      </FeaturedWork>

      <SeasonalPalette>
        <SeasonalPalette.Header>
          <SeasonalPalette.Heading>This season&rsquo;s colours</SeasonalPalette.Heading>
          <SeasonalPalette.Lede>
            Six shades mixed for Edinburgh light — hover or focus a chip to read where each colour sits best.
          </SeasonalPalette.Lede>
        </SeasonalPalette.Header>
        <SeasonalPalette.Deck />
      </SeasonalPalette>

      <AreaAndHours>
        <AreaAndHours.AreaColumn>
          <AreaAndHours.AreaHeading>Where we paint · Edinburgh &amp; the Lothians</AreaAndHours.AreaHeading>
        </AreaAndHours.AreaColumn>
        <AreaAndHours.HoursColumn>
          <AreaAndHours.HoursHeading>Phone hours</AreaAndHours.HoursHeading>
        </AreaAndHours.HoursColumn>
      </AreaAndHours>

      <ClosingCta>
        <div>
          <ClosingCta.Heading>Got a wall in mind?</ClosingCta.Heading>
          <ClosingCta.Body>
            Tell us a little about the room, stair or frontage and we&rsquo;ll reply by email to arrange a quote visit.
          </ClosingCta.Body>
        </div>
        <ClosingCta.Action>{business.enquiries.title}</ClosingCta.Action>
      </ClosingCta>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
