/** House paint-colour library for Brushstroke & Co. Painters. */
export const COLOUR_FAMILIES = ['neutral', 'warm', 'cool', 'green', 'deep'] as const;
export type ColourFamily = (typeof COLOUR_FAMILIES)[number];

export interface Colour {
  /** Stable, URL-safe unique identifier (e.g. "aubergine-close"). */
  id: string;
  /** Brushstroke's own paint name. */
  name: string;
  /** Unique house swatch code in BC-### format. */
  code: string;
  /** True swatch hex colour (#RRGGBB); unchanged across light and dark themes. */
  hex: string;
  /** Broad colour family used for grouping and validation. */
  family: ColourFamily;
  /** One-line decorator's note shown on the seasonal fan and colour wall. */
  note: string;
  /** Exactly six colours are flagged seasonal for the Home swatch strip. */
  seasonal: boolean;
}

export const colours: readonly Colour[] = [
  {
    id: 'calton-chalk',
    name: 'Calton Chalk',
    code: 'BC-001',
    hex: '#EEE8DC',
    family: 'neutral',
    note: 'A soft limestone white that warms north-facing tenement rooms without turning yellow.',
    seasonal: false,
  },
  {
    id: 'haar-grey',
    name: 'Haar Grey',
    code: 'BC-004',
    hex: '#B9BDB8',
    family: 'cool',
    note: 'Firth-of-Forth mist in a matte emulsion — calm on tall halls and seafront render.',
    seasonal: true,
  },
  {
    id: 'leith-harbour',
    name: 'Leith Harbour',
    code: 'BC-011',
    hex: '#3E5C6B',
    family: 'cool',
    note: 'Weathered dockside slate blue that holds its depth on shopfront joinery and shutters.',
    seasonal: true,
  },
  {
    id: 'pentland-moss',
    name: 'Pentland Moss',
    code: 'BC-017',
    hex: '#6F7D58',
    family: 'green',
    note: 'Quiet hillside green with an earthy undertone for kitchens, pantries and utility rooms.',
    seasonal: true,
  },
  {
    id: 'sandstone-lintel',
    name: 'Sandstone Lintel',
    code: 'BC-022',
    hex: '#C9A27A',
    family: 'warm',
    note: 'Warm Craigleith stone buff that pairs naturally with lime harling and oak floorboards.',
    seasonal: false,
  },
  {
    id: 'tenement-ochre',
    name: 'Tenement Ochre',
    code: 'BC-026',
    hex: '#D49A3A',
    family: 'warm',
    note: 'Traditional stairwell dado ochre — lifts dark landings and catches afternoon light.',
    seasonal: true,
  },
  {
    id: 'rowan-berry',
    name: 'Rowan Berry',
    code: 'BC-031',
    hex: '#A23B3B',
    family: 'warm',
    note: 'Rich gloss-friendly red built for panelled front doors and Georgian fanlight surrounds.',
    seasonal: false,
  },
  {
    id: 'aubergine-close',
    name: 'Aubergine Close',
    code: 'BC-035',
    hex: '#5B2A4F',
    family: 'deep',
    note: 'Deep plum-black with velvet depth behind a bay-window cornice and brass picture rail.',
    seasonal: true,
  },
  {
    id: 'thistle-bloom',
    name: 'Thistle Bloom',
    code: 'BC-038',
    hex: '#9C86B5',
    family: 'cool',
    note: 'Muted heather lilac that softens studio walls and upstairs hallways.',
    seasonal: false,
  },
  {
    id: 'water-of-leith',
    name: 'Water of Leith',
    code: 'BC-042',
    hex: '#7FA6A0',
    family: 'green',
    note: 'Cool river-stone sage favoured by factors for bright, hard-wearing common stairs.',
    seasonal: true,
  },
  {
    id: 'slate-roof',
    name: 'Slate Roof',
    code: 'BC-047',
    hex: '#3B3F45',
    family: 'deep',
    note: 'Charcoal-slate satin for cast-iron railings, window cills and crisp studio skirting.',
    seasonal: false,
  },
  {
    id: 'linen-press',
    name: 'Linen Press',
    code: 'BC-050',
    hex: '#F5F0E6',
    family: 'neutral',
    note: 'Gentle unbleached cream made for sash bars, cornices and four-panel doors.',
    seasonal: false,
  },
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CODE_PATTERN = /^BC-\d{3}$/;
const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

/** Validate colour library integrity with item-specific errors. */
export function validateColours(list: readonly Colour[]): void {
  const seenIds = new Set<string>();
  const seenCodes = new Set<string>();
  let seasonalCount = 0;

  for (const item of list) {
    const label = item.id || item.name || '(unnamed colour)';
    if (!ID_PATTERN.test(item.id)) {
      throw new Error(`colour "${label}": id must be URL-safe lowercase kebab-case`);
    }
    if (seenIds.has(item.id)) {
      throw new Error(`colour "${item.id}": duplicate colour id`);
    }
    seenIds.add(item.id);

    if (!item.name.trim()) {
      throw new Error(`colour "${item.id}": name is required`);
    }
    if (!CODE_PATTERN.test(item.code)) {
      throw new Error(`colour "${item.id}": code "${item.code}" must match BC-###`);
    }
    if (seenCodes.has(item.code)) {
      throw new Error(`colour "${item.id}": duplicate swatch code "${item.code}"`);
    }
    seenCodes.add(item.code);

    if (!HEX_PATTERN.test(item.hex)) {
      throw new Error(`colour "${item.id}": hex "${item.hex}" must match #RRGGBB`);
    }
    if (!COLOUR_FAMILIES.includes(item.family)) {
      throw new Error(`colour "${item.id}": invalid family "${item.family}"`);
    }
    if (!item.note.trim()) {
      throw new Error(`colour "${item.id}": note is required`);
    }
    if (item.seasonal) seasonalCount += 1;
  }

  if (seasonalCount !== 6) {
    throw new Error(`colours: expected exactly 6 seasonal colours, found ${seasonalCount}`);
  }
}

export const colourMap: ReadonlyMap<string, Colour> = new Map(colours.map(c => [c.id, c]));

export function getColour(id: string): Colour {
  const found = colourMap.get(id);
  if (!found) throw new Error(`Unknown colour id: ${id}`);
  return found;
}

export const seasonalColours: readonly Colour[] = colours.filter(c => c.seasonal);

/** Eight chips offered in the interactive Home hero swatch fan (Aubergine Close first). */
export const heroFanColours: readonly Colour[] = [
  getColour('aubergine-close'),
  getColour('water-of-leith'),
  getColour('pentland-moss'),
  getColour('leith-harbour'),
  getColour('tenement-ochre'),
  getColour('haar-grey'),
  getColour('rowan-berry'),
  getColour('calton-chalk'),
];
