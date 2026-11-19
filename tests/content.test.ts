import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { colours, validateColours, type Colour } from '../content/colours.ts';
import { processSteps } from '../content/process.ts';
import { coloursUsedInProjects, projects, validateProjects, type Project } from '../content/projects.ts';
import { formatFromPrice, services, validateServices, type Service } from '../content/services.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'timeZone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.serviceArea.length >= 10, 'business.serviceArea: list service areas');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 5, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.equal(processSteps.length, 4, 'processSteps: expected four steps');
});

test('colour library validates unique IDs, codes, hex, families and exactly six seasonal colours', () => {
  assert.doesNotThrow(() => validateColours(colours));

  // Duplicate ID names the item
  assert.throws(
    () => validateColours([...colours, { ...colours[0], code: 'BC-999', seasonal: false }]),
    /calton-chalk/,
  );

  // Duplicate code names the item
  assert.throws(
    () => validateColours([...colours, { ...colours[0], id: 'extra-chalk', seasonal: false }]),
    /extra-chalk/,
  );

  // Invalid hex names the item
  assert.throws(
    () => validateColours(colours.map(c => (c.id === 'haar-grey' ? { ...c, hex: '#FFF' } : c))),
    /haar-grey/,
  );

  // Invalid family names the item
  assert.throws(
    () => validateColours(colours.map(c => (c.id === 'leith-harbour' ? { ...c, family: 'neon' as Colour['family'] } : c))),
    /leith-harbour/,
  );

  // Seasonal count must be exactly six
  assert.throws(
    () => validateColours(colours.map(c => (c.id === 'haar-grey' ? { ...c, seasonal: false } : c))),
    /expected exactly 6 seasonal/,
  );
});

test('services validate categories, positive whole fromPrice, ordered typicalDays and swatch references', () => {
  assert.doesNotThrow(() => validateServices(services));

  // Invalid category
  assert.throws(
    () => validateServices(services.map(s => (s.id === 'single-room' ? { ...s, category: 'roofing' as Service['category'] } : s))),
    /single-room/,
  );

  // fromPrice <= 0 or decimal
  assert.throws(
    () => validateServices(services.map(s => (s.id === 'office' ? { ...s, fromPrice: 0 } : s))),
    /office/,
  );
  assert.throws(
    () => validateServices(services.map(s => (s.id === 'office' ? { ...s, fromPrice: 18.5 } : s))),
    /office/,
  );

  // Unordered typicalDays
  assert.throws(
    () => validateServices(services.map(s => (s.id === 'whole-home' ? { ...s, typicalDays: [10, 5] } : s))),
    /whole-home/,
  );

  // Unknown swatch reference
  assert.throws(
    () => validateServices(services.map(s => (s.id === 'shopfront' ? { ...s, swatch: 'missing-blue' } : s))),
    /shopfront/,
  );
});

test('price formatting matches guide-price convention', () => {
  assert.equal(formatFromPrice({ fromPrice: 380, unit: 'per room' }), 'From £380 per room');
  assert.equal(formatFromPrice({ fromPrice: 18, unit: 'per m² of floor' }), 'From £18 per m² of floor');
});

test('projects validate colour references (1-3), areas, scenes, year range and exactly three featured', () => {
  assert.doesNotThrow(() => validateProjects(projects));

  // Unknown colour reference
  assert.throws(
    () => validateProjects(projects.map(p => (p.id === 'leith-stair' ? { ...p, colours: ['unknown-shade'] } : p))),
    /leith-stair/,
  );

  // Too many or zero colours
  assert.throws(
    () => validateProjects(projects.map(p => (p.id === 'bruntsfield-door' ? { ...p, colours: [] } : p))),
    /bruntsfield-door/,
  );
  assert.throws(
    () =>
      validateProjects(
        projects.map(p =>
          p.id === 'bruntsfield-door'
            ? { ...p, colours: ['rowan-berry', 'slate-roof', 'calton-chalk', 'haar-grey'] }
            : p,
        ),
      ),
    /bruntsfield-door/,
  );

  // Area outside serviceArea
  assert.throws(
    () => validateProjects(projects.map(p => (p.id === 'portobello-villa' ? { ...p, area: 'Glasgow' } : p))),
    /portobello-villa/,
  );

  // Invalid scene
  assert.throws(
    () => validateProjects(projects.map(p => (p.id === 'morningside-bookshop' ? { ...p, scene: 'roof' as Project['scene'] } : p))),
    /morningside-bookshop/,
  );

  // Year out of range
  assert.throws(
    () => validateProjects(projects.map(p => (p.id === 'stockbridge-kitchen' ? { ...p, year: 2018 } : p))),
    /stockbridge-kitchen/,
  );

  // Featured count !== 3
  assert.throws(
    () => validateProjects(projects.map(p => (p.id === 'leith-stair' ? { ...p, featured: false } : p))),
    /expected exactly 3 featured/,
  );
});

test('adding a valid owner project updates colour usage cleanly', () => {
  const added: Project = {
    id: 'dalkeith-hallway',
    title: 'Georgian hallway refresh',
    category: 'interior',
    area: 'Dalkeith',
    year: 2026,
    scene: 'room',
    colours: ['thistle-bloom', 'linen-press'],
    days: 3,
    summary: 'Lining paper patched and sanded cleanly across two landings. Finished in Thistle Bloom with Linen Press woodwork.',
    featured: false,
  };
  const next = [...projects, added];
  assert.doesNotThrow(() => validateProjects(next));
  const used = coloursUsedInProjects(next);
  const thistle = used.find(entry => entry.colourId === 'thistle-bloom');
  const linen = used.find(entry => entry.colourId === 'linen-press');
  assert.ok(thistle?.projects.some(p => p.id === 'dalkeith-hallway'));
  assert.ok(linen?.projects.some(p => p.id === 'dalkeith-hallway'));
});

test('structured data emits HousePainter derived from content and escapes JSON-LD', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'HousePainter');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.priceRange, '££');
  assert.deepEqual(schema.areaServed, [...business.serviceArea]);
  assert.equal(schema.openingHoursSpecification.length, 6);

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
