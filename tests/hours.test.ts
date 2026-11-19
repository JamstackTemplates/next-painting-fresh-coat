import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, PHONE_HOURS_OPTIONS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
const phoneAt = (date: string) => openingLabel(business.phoneHours, 'Europe/London', new Date(date), PHONE_HOURS_OPTIONS);

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('Brushstroke phone-hours boundaries in Europe/London (winter GMT)', () => {
  // Monday 16 Nov 2026 (GMT = UTC+0)
  assert.equal(phoneAt('2026-11-16T07:59:00Z'), 'Phones closed · opens today at 08:00');
  assert.equal(phoneAt('2026-11-16T08:00:00Z'), 'Phones open · until 17:30');
  assert.equal(phoneAt('2026-11-16T17:29:00Z'), 'Phones open · until 17:30');
  assert.equal(phoneAt('2026-11-16T17:30:00Z'), 'Phones closed · opens Tuesday at 08:00');

  // Saturday 21 Nov 2026 (GMT = UTC+0)
  assert.equal(phoneAt('2026-11-21T11:59:00Z'), 'Phones open · until 12:00');
  assert.equal(phoneAt('2026-11-21T12:00:00Z'), 'Phones closed · opens Monday at 08:00');

  // Sunday 22 Nov 2026
  const sunday = phoneAt('2026-11-22T10:00:00Z');
  assert.match(sunday, /^Phones closed/);
  assert.match(sunday, /opens Monday/);
});

test('Europe/London BST transitions preserve Monday 08:00 local opening', () => {
  // Last Sunday in March 2026 is 29 March -> Monday 30 March 2026 is BST (UTC+1)
  assert.equal(phoneAt('2026-03-30T06:59:00Z'), 'Phones closed · opens today at 08:00');
  assert.equal(phoneAt('2026-03-30T07:00:00Z'), 'Phones open · until 17:30');

  // Last Sunday in October 2026 is 25 October -> Monday 26 October 2026 is GMT (UTC+0)
  assert.equal(phoneAt('2026-10-26T07:59:00Z'), 'Phones closed · opens today at 08:00');
  assert.equal(phoneAt('2026-10-26T08:00:00Z'), 'Phones open · until 17:30');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});
