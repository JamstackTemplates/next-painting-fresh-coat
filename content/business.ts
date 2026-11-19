import type { OpeningHours } from '../lib/hours.ts';

/** Core business details and shared enquiry copy for Brushstroke & Co. Painters. */
export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short wordmark name displayed in the header and footer. */
  shortName: string;
  /** Short headline for the home page and OG metadata. */
  tagline: string;
  /** Plain-text introduction used by the home page and fallback metadata. */
  introduction: string;
  /** Public contact email address (always visible). */
  email: string;
  /** Public telephone number (Edinburgh Ofcom drama range in this sample). */
  phone: string;
  /** IANA time zone for phone hours; keep aligned with site.config.json. */
  timeZone: string;
  /** Footer location note (no public premises or street address). */
  locationNote: string;
  /** Relative price indicator for schema.org HousePainter metadata. */
  priceRange: string;
  /** Seven weekly phone-hours entries (Monday through Sunday, no overnight spans). */
  phoneHours: readonly OpeningHours[];
  /** Neutral static copy rendered before hydration and when JavaScript is off. */
  phoneHoursStaticLabel: string;
  /** Areas covered across Edinburgh and the Lothians; referenced by projects and JSON-LD. */
  serviceArea: readonly string[];
  /** Owner-edited lead time note shown on a tape strip on Home; leave blank to hide. */
  leadTime: string;
  /** Contact copy; the hosted Jamstacks form supports name, email and message only. */
  enquiries: {
    /** Contact page heading and primary call to action label. */
    title: string;
    /** Plain-language explanation: visits are enquiries, never auto-confirmed. */
    introduction: string;
    /** Helpful prompts for the message field (not extra form inputs). */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Brushstroke & Co. Painters',
  shortName: 'Brushstroke & Co.',
  tagline: 'Fresh coats, clean lines, tidy rooms.',
  introduction:
    'Interior, exterior and commercial painting across Edinburgh and the Lothians, from one sash window to a whole tenement stair.',
  email: 'hello@brushstrokeandco.example',
  phone: '0131 496 0742',
  timeZone: 'Europe/London',
  locationNote: 'Based near Calton Hill, Edinburgh',
  priceRange: '££',
  phoneHours: [
    { day: 'Monday', opens: '08:00', closes: '17:30' },
    { day: 'Tuesday', opens: '08:00', closes: '17:30' },
    { day: 'Wednesday', opens: '08:00', closes: '17:30' },
    { day: 'Thursday', opens: '08:00', closes: '17:30' },
    { day: 'Friday', opens: '08:00', closes: '17:30' },
    { day: 'Saturday', opens: '09:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  phoneHoursStaticLabel: 'Phone hours: Mon–Fri 8:00–17:30, Sat 9:00–12:00',
  serviceArea: [
    'Leith',
    'Stockbridge',
    'Marchmont',
    'Morningside',
    'Portobello',
    'Bruntsfield',
    'New Town',
    'Corstorphine',
    'Musselburgh',
    'Dalkeith',
    'South Queensferry',
    'Linlithgow',
  ],
  leadTime: 'Interior work is currently booking about three weeks out.',
  enquiries: {
    title: 'Ask for a quote visit',
    introduction:
      "Tell us about the job and we'll reply by email to arrange a visit. A visit time is only confirmed once we've replied.",
    usefulToInclude: [
      'which rooms or surfaces, and roughly how big',
      'interior, exterior or commercial',
      'the area or postcode district (for example EH6)',
      'the current condition: flaking, damp, new plaster',
      "colours you have in mind, with BC codes if you've picked from our swatches",
      "the timing you'd like",
      "the best phone number, if you'd like a call back",
    ],
  },
};
