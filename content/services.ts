import { colourMap } from './colours.ts';

export const SERVICE_CATEGORIES = ['interior', 'exterior', 'commercial'] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export interface Service {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Service group matching /services/#<category> and project categories. */
  category: ServiceCategory;
  /** Display title on the Services docket and Home strip. */
  name: string;
  /** Concrete description of prep, materials and finish. */
  summary: string;
  /** Two to four specific inclusions shown as a ticked list. */
  includes: readonly string[];
  /** Whole-pound GBP guide starting price (must be > 0). */
  fromPrice: number;
  /** Unit wording following the price, e.g. "per room". */
  unit: string;
  /** Typical duration in working days as [min, max] integers (min <= max). */
  typicalDays: readonly [number, number];
  /** Colour ID from content/colours.ts for the service's swatch chip. */
  swatch: string;
}

export interface ServiceCategoryMeta {
  id: ServiceCategory;
  title: string;
  shortNote: string;
  swatch: string;
}

export const serviceCategories: readonly ServiceCategoryMeta[] = [
  {
    id: 'interior',
    title: 'Interior',
    shortNote: 'Rooms, whole homes, Georgian woodwork and colour advice.',
    swatch: 'aubergine-close',
  },
  {
    id: 'exterior',
    title: 'Exterior',
    shortNote: 'Breathable render, lime harling, panelled doors and railings.',
    swatch: 'sandstone-lintel',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    shortNote: 'Tenement common stairs, independent shopfronts and studios.',
    swatch: 'leith-harbour',
  },
];

export const services: readonly Service[] = [
  {
    id: 'single-room',
    category: 'interior',
    name: 'Single room refresh',
    summary:
      'Walls, ceiling and skirting prepared, filled and finished in two full coats of trade matte or eggshell with crisp cut-in edges around cornices.',
    includes: [
      'Dust sheets over furniture and floors, masked sockets and switches',
      'Fine filling of hairline cracks, nail pops and sanding between coats',
      'Two coats of low-VOC trade emulsion on ceiling and walls',
    ],
    fromPrice: 380,
    unit: 'per room',
    typicalDays: [1, 2],
    swatch: 'calton-chalk',
  },
  {
    id: 'whole-home',
    category: 'interior',
    name: 'Whole-home repaint',
    summary:
      'Room-by-room redecoration for occupied or vacant flats and houses, sequenced so you always keep clean living space while we work.',
    includes: [
      'Full plaster patching, stain blocking and caulking of gaps',
      'Ceilings, walls and woodwork across every room and hall',
      'End-of-day tidy-up and vacuuming before we lock up',
      'Sample boards brushed out on site before tinting full tins',
    ],
    fromPrice: 2400,
    unit: 'per flat or house',
    typicalDays: [5, 10],
    swatch: 'haar-grey',
  },
  {
    id: 'woodwork-sash',
    category: 'interior',
    name: 'Woodwork and sash windows',
    summary:
      'Strip flaking paint, fill and sand, then prime and apply two coats of satinwood. Sashes are eased so they still open.',
    includes: [
      'Careful scraping and dust-extracted sanding of astragals and cills',
      'Flexible timber filler and knotting primer on bare wood',
      'Two coats of durable water-based satinwood or eggshell',
    ],
    fromPrice: 140,
    unit: 'per window',
    typicalDays: [1, 1],
    swatch: 'linen-press',
  },
  {
    id: 'feature-walls',
    category: 'interior',
    name: 'Feature walls and colour advice',
    summary:
      'Deep or bold tones cut in razor-sharp against cornices and alcoves, paired with a morning visit to test real painted cards in your light.',
    includes: [
      'Colour consultation with hand-painted A4 brush-out sheets',
      'Tinted undercoat so deep colours reach even coverage in two coats',
      'Low-tack masking along picture rails and fireplace surrounds',
    ],
    fromPrice: 220,
    unit: 'per wall',
    typicalDays: [1, 1],
    swatch: 'aubergine-close',
  },
  {
    id: 'render-harling',
    category: 'exterior',
    name: 'Render and harling',
    summary:
      'Fungicidal wash, stabilising primer and two weather-shielding coats of breathable masonry paint built for coastal wind and rain.',
    includes: [
      'Gentle wash-down, moss treatment and hairline crack repair',
      'Masked stonework lintels, cills, downpipes and paths',
      'Two coats of microporous masonry or mineral silicate paint',
    ],
    fromPrice: 1800,
    unit: 'per elevation',
    typicalDays: [3, 6],
    swatch: 'sandstone-lintel',
  },
  {
    id: 'doors-railings',
    category: 'exterior',
    name: 'Front doors and railings',
    summary:
      'Panelled timber doors stripped back where needed and finished in rich exterior gloss, alongside wire-brushed and primed cast-iron railings.',
    includes: [
      'Hardware removed or masked cleanly, timber rubbed down and primed',
      'Rust-inhibiting primer and metal-grade finish on railings and gates',
      'Weather-checked exterior gloss or satin for a lasting kerbside finish',
    ],
    fromPrice: 260,
    unit: 'per door',
    typicalDays: [1, 2],
    swatch: 'rowan-berry',
  },
  {
    id: 'stairwell',
    category: 'commercial',
    name: 'Tenement stairwells',
    summary:
      'Hard-wearing scrubbable emulsions, dado lines and glossed handrails for shared closes, scheduled cleanly with factors and residents.',
    includes: [
      'Clear resident notices and dust-sheeted landings kept passable',
      'Stabilisation of old lime-wash and repair of knocked plaster corners',
      'Scrub-resistant wall finish with traditional gloss dado and banister',
    ],
    fromPrice: 1600,
    unit: 'per common stair',
    typicalDays: [3, 5],
    swatch: 'water-of-leith',
  },
  {
    id: 'shopfront',
    category: 'commercial',
    name: 'Shopfronts and signs',
    summary:
      'Crisp fascias, stall risers, mullions and entrance doors prepared and painted around trading hours so your street presence stays sharp.',
    includes: [
      'Early-morning or closed-day scheduling to keep the doorway clear',
      'Exterior timber repair, undercoating and two weatherproof coats',
      'Clean cut-in around glazing, brass plates and existing signwriting',
    ],
    fromPrice: 950,
    unit: 'per frontage',
    typicalDays: [2, 4],
    swatch: 'leith-harbour',
  },
  {
    id: 'office',
    category: 'commercial',
    name: 'Offices and studios',
    summary:
      'Low-odour, fast-drying coatings for workspaces, meeting rooms and creative studios, planned in quiet phases or over weekends.',
    includes: [
      'Zero-odour trade emulsions safe for immediate next-day use',
      'Desks, monitors and flooring sheeted and left spotless each shift',
      'Scuff-resistant matte on corridors and meeting-room walls',
    ],
    fromPrice: 18,
    unit: 'per m² of floor',
    typicalDays: [3, 8],
    swatch: 'slate-roof',
  },
];

/** Format a service's guide starting price, e.g. "From £380 per room". */
export function formatFromPrice(service: Pick<Service, 'fromPrice' | 'unit'>): string {
  const formatted = service.fromPrice.toLocaleString('en-GB');
  return `From £${formatted} ${service.unit}`;
}

/** Format typical working days, e.g. "Typically 1–2 days" or "Typically 1 day". */
export function formatTypicalDays([min, max]: readonly [number, number]): string {
  if (min === max) return min === 1 ? 'Typically 1 day' : `Typically ${min} days`;
  return `Typically ${min}–${max} days`;
}

/** Lowest starting price within a service category (used on the Home services strip). */
export function categoryLowestPrice(category: ServiceCategory): Service {
  const inCategory = services.filter(s => s.category === category);
  if (!inCategory.length) throw new Error(`No services in category "${category}"`);
  return inCategory.reduce((lowest, item) => (item.fromPrice < lowest.fromPrice ? item : lowest), inCategory[0]);
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Validate services against category rules, positive whole prices, days and colour IDs. */
export function validateServices(
  list: readonly Service[],
  validColourIds: ReadonlySet<string> = new Set(colourMap.keys()),
): void {
  const seenIds = new Set<string>();

  for (const item of list) {
    const label = item.id || item.name || '(unnamed service)';
    if (!ID_PATTERN.test(item.id)) {
      throw new Error(`service "${label}": id must be URL-safe lowercase kebab-case`);
    }
    if (seenIds.has(item.id)) {
      throw new Error(`service "${item.id}": duplicate service id`);
    }
    seenIds.add(item.id);

    if (!SERVICE_CATEGORIES.includes(item.category)) {
      throw new Error(`service "${item.id}": invalid category "${item.category}"`);
    }
    if (!item.name.trim()) {
      throw new Error(`service "${item.id}": name is required`);
    }
    if (!item.summary.trim()) {
      throw new Error(`service "${item.id}": summary is required`);
    }
    if (!item.unit.trim()) {
      throw new Error(`service "${item.id}": unit is required`);
    }
    if (item.includes.length < 2 || item.includes.length > 4) {
      throw new Error(`service "${item.id}": includes must contain 2 to 4 items`);
    }
    for (const line of item.includes) {
      if (!line.trim()) {
        throw new Error(`service "${item.id}": includes cannot contain empty strings`);
      }
    }
    if (!Number.isInteger(item.fromPrice) || item.fromPrice <= 0) {
      throw new Error(`service "${item.id}": fromPrice must be a whole number greater than 0`);
    }
    const [min, max] = item.typicalDays;
    if (!Number.isInteger(min) || !Number.isInteger(max) || min < 1 || min > max) {
      throw new Error(`service "${item.id}": typicalDays [${min}, ${max}] must be ordered positive integers`);
    }
    if (!validColourIds.has(item.swatch)) {
      throw new Error(`service "${item.id}": unknown swatch colour "${item.swatch}"`);
    }
  }
}
