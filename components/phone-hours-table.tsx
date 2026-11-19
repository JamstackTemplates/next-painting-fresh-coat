import { business } from '../content/business';
import { PHONE_HOURS_OPTIONS } from '../lib/hours';
import { OpenBadge } from './open-badge';

/** Live phones-open badge with neutral static fallback and Europe/London updates every minute. */
export function PhonesOpenBadge({
  variant = 'surface',
  className = '',
}: {
  variant?: 'surface' | 'on-dark';
  className?: string;
}) {
  const styles =
    variant === 'on-dark'
      ? 'border-white/30 bg-white/10 text-white'
      : 'border-line bg-surface text-ink';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-ui border px-3 py-1.5 font-mono text-xs tracking-wide ${styles} ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: variant === 'on-dark' ? '#E9D9A6' : '#6F7D58' }}
      />
      <OpenBadge
        hours={business.phoneHours}
        timeZone={business.timeZone}
        openPrefix={PHONE_HOURS_OPTIONS.openPrefix}
        closedPrefix={PHONE_HOURS_OPTIONS.closedPrefix}
        fallback={business.phoneHoursStaticLabel}
      />
    </span>
  );
}

/** Semantic mono table of weekly phone hours (Monday–Sunday). */
export function PhoneHoursTable({
  variant = 'surface',
  className = '',
}: {
  variant?: 'surface' | 'on-dark';
  className?: string;
}) {
  const rowBorder = variant === 'on-dark' ? 'border-white/20' : 'border-line';
  const mutedText = variant === 'on-dark' ? 'text-white/75' : 'text-muted';

  return (
    <table className={`w-full border-collapse font-mono text-xs sm:text-[0.82rem] ${className}`}>
      <caption className="sr-only">Telephone hours in Edinburgh (Europe/London)</caption>
      <thead>
        <tr className={`border-b ${rowBorder} text-left`}>
          <th scope="col" className={`pb-2 font-medium uppercase tracking-wider ${mutedText}`}>
            Day
          </th>
          <th scope="col" className={`pb-2 text-right font-medium uppercase tracking-wider ${mutedText}`}>
            Hours
          </th>
        </tr>
      </thead>
      <tbody>
        {business.phoneHours.map(entry => (
          <tr key={entry.day} className={`border-b ${rowBorder}`}>
            <th scope="row" className="py-2 text-left font-normal">
              {entry.day}
            </th>
            <td className={`py-2 text-right ${entry.opens ? '' : mutedText}`}>
              {entry.opens && entry.closes ? `${entry.opens}–${entry.closes}` : 'Closed'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
