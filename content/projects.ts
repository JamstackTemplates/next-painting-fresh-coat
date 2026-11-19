import { business } from './business.ts';
import { colourMap } from './colours.ts';
import { SERVICE_CATEGORIES, type ServiceCategory } from './services.ts';

export const PROJECT_SCENES = ['room', 'stair', 'facade', 'shopfront', 'office', 'door'] as const;
export type ProjectScene = (typeof PROJECT_SCENES)[number];

export interface Project {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Short project title shown in Instrument Serif. */
  title: string;
  /** Matches the Projects filter tabs and Services categories. */
  category: ServiceCategory;
  /** Must match an entry in business.serviceArea. */
  area: string;
  /** Completion year (2019 to current year). */
  year: number;
  /** Illustration vignette type rendered on the project card. */
  scene: ProjectScene;
  /** 1 to 3 colour IDs from content/colours.ts; the first is the main wall/surface colour. */
  colours: readonly string[];
  /** Number of working days on site (integer >= 1). */
  days: number;
  /** Two-sentence summary naming the prep work and finish. */
  summary: string;
  /** Exactly three projects are featured on Home. */
  featured: boolean;
}

export const projects: readonly Project[] = [
  {
    id: 'marchmont-sitting-room',
    title: 'Bay-window sitting room',
    category: 'interior',
    area: 'Marchmont',
    year: 2025,
    scene: 'room',
    colours: ['aubergine-close', 'linen-press', 'sandstone-lintel'],
    days: 3,
    summary:
      'Old lining paper stripped back, hairline plaster cracks raked out and filled, and the deep cornice cleaned of build-up. Finished in two coats of Aubergine Close with Linen Press satinwood on the bay shutters.',
    featured: true,
  },
  {
    id: 'stockbridge-kitchen',
    title: 'Kitchen and hall repaint',
    category: 'interior',
    area: 'Stockbridge',
    year: 2024,
    scene: 'room',
    colours: ['pentland-moss', 'calton-chalk'],
    days: 4,
    summary:
      'Cooking-grease marks degreased and stain-blocked before filling and sanding the hall woodwork. Repainted in scrubbable Pentland Moss across the lower walls with Calton Chalk above the picture rail.',
    featured: false,
  },
  {
    id: 'new-town-sashes',
    title: 'Twelve Georgian sashes',
    category: 'interior',
    area: 'New Town',
    year: 2025,
    scene: 'room',
    colours: ['linen-press', 'slate-roof'],
    days: 6,
    summary:
      'Twelve tall timber sashes scraped back where old gloss had blistered, spliced with resin filler and sanded with dust extraction. Primed and finished in Linen Press satinwood, with every sash eased to slide freely.',
    featured: false,
  },
  {
    id: 'portobello-villa',
    title: 'Seafront villa render',
    category: 'exterior',
    area: 'Portobello',
    year: 2024,
    scene: 'facade',
    colours: ['haar-grey', 'leith-harbour'],
    days: 7,
    summary:
      'Salt-weathered render washed down, treated for algae and patched with lime-friendly mortar around the upper cills. Sealed in two breathable coats of Haar Grey with Leith Harbour on the timber storm shutters.',
    featured: true,
  },
  {
    id: 'bruntsfield-door',
    title: 'Front door and railings',
    category: 'exterior',
    area: 'Bruntsfield',
    year: 2025,
    scene: 'door',
    colours: ['rowan-berry', 'slate-roof'],
    days: 2,
    summary:
      'Six-panel pine front door stripped of weathered varnish, knotted and primed, while the cast-iron railings were wire-brushed and rust-primed. Finished in glossy Rowan Berry against crisp Slate Roof ironwork.',
    featured: false,
  },
  {
    id: 'musselburgh-cottage',
    title: 'Harled cottage and shutters',
    category: 'exterior',
    area: 'Musselburgh',
    year: 2023,
    scene: 'facade',
    colours: ['calton-chalk', 'water-of-leith'],
    days: 5,
    summary:
      'Loose harling chips consolidated and brushed clean before a stabilising coat across both gable walls. Finished in bright Calton Chalk masonry paint with Water of Leith on the timber shutters and fascia.',
    featured: false,
  },
  {
    id: 'leith-stair',
    title: 'Common stair, 1890s tenement',
    category: 'commercial',
    area: 'Leith',
    year: 2025,
    scene: 'stair',
    colours: ['water-of-leith', 'calton-chalk', 'tenement-ochre'],
    days: 5,
    summary:
      "Four floors of lime-washed walls cleaned, stabilised and repainted for the residents' factor. Handrails and spindles brought back to a deep ochre.",
    featured: true,
  },
  {
    id: 'morningside-bookshop',
    title: 'Bookshop frontage',
    category: 'commercial',
    area: 'Morningside',
    year: 2024,
    scene: 'shopfront',
    colours: ['leith-harbour', 'tenement-ochre'],
    days: 3,
    summary:
      'Weathered fascia boards and stall risers sanded back, epoxy-repaired at the lower joints and undercoated over two early mornings. Top-coated in Leith Harbour gloss with Tenement Ochre trim around the transom.',
    featured: false,
  },
  {
    id: 'corstorphine-studio',
    title: "Architects' studio",
    category: 'commercial',
    area: 'Corstorphine',
    year: 2023,
    scene: 'office',
    colours: ['haar-grey', 'thistle-bloom', 'slate-roof'],
    days: 6,
    summary:
      'Partition joints taped, skimmed smooth and primed over a quiet weekend shutdown so drawing desks stayed clear on Monday. Finished in low-odour Haar Grey with a Thistle Bloom critique wall and Slate Roof skirting.',
    featured: false,
  },
];

export const featuredProjects: readonly Project[] = projects.filter(p => p.featured);

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Validate project collection integrity with item-specific errors. */
export function validateProjects(
  list: readonly Project[],
  validColourIds: ReadonlySet<string> = new Set(colourMap.keys()),
  validAreas: ReadonlySet<string> = new Set(business.serviceArea),
  maxYear: number = new Date().getFullYear(),
): void {
  const seenIds = new Set<string>();
  let featuredCount = 0;

  for (const item of list) {
    const label = item.id || item.title || '(unnamed project)';
    if (!ID_PATTERN.test(item.id)) {
      throw new Error(`project "${label}": id must be URL-safe lowercase kebab-case`);
    }
    if (seenIds.has(item.id)) {
      throw new Error(`project "${item.id}": duplicate project id`);
    }
    seenIds.add(item.id);

    if (!item.title.trim()) {
      throw new Error(`project "${item.id}": title is required`);
    }
    if (!SERVICE_CATEGORIES.includes(item.category)) {
      throw new Error(`project "${item.id}": invalid category "${item.category}"`);
    }
    if (!validAreas.has(item.area)) {
      throw new Error(`project "${item.id}": area "${item.area}" is not in business.serviceArea`);
    }
    if (!Number.isInteger(item.year) || item.year < 2019 || item.year > maxYear) {
      throw new Error(`project "${item.id}": year ${item.year} must be an integer between 2019 and ${maxYear}`);
    }
    if (!PROJECT_SCENES.includes(item.scene)) {
      throw new Error(`project "${item.id}": invalid scene "${item.scene}"`);
    }
    if (item.colours.length < 1 || item.colours.length > 3) {
      throw new Error(`project "${item.id}": must list 1 to 3 colour IDs`);
    }
    for (const colourId of item.colours) {
      if (!validColourIds.has(colourId)) {
        throw new Error(`project "${item.id}": unknown colour "${colourId}"`);
      }
    }
    if (!Number.isInteger(item.days) || item.days < 1) {
      throw new Error(`project "${item.id}": days must be an integer of 1 or more`);
    }
    if (!item.summary.trim()) {
      throw new Error(`project "${item.id}": summary is required`);
    }
    if (item.featured) featuredCount += 1;
  }

  if (featuredCount !== 3) {
    throw new Error(`projects: expected exactly 3 featured projects, found ${featuredCount}`);
  }
}

/** Map every colour ID referenced by projects to the projects that used it (in library order). */
export function coloursUsedInProjects(list: readonly Project[] = projects): Array<{ colourId: string; projects: Project[] }> {
  const usage = new Map<string, Project[]>();
  for (const project of list) {
    for (const colourId of project.colours) {
      const bucket = usage.get(colourId) ?? [];
      if (!bucket.some(p => p.id === project.id)) bucket.push(project);
      usage.set(colourId, bucket);
    }
  }
  return Array.from(usage.entries()).map(([colourId, usedBy]) => ({ colourId, projects: usedBy }));
}
