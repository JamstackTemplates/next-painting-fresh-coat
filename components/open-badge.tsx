'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours, type OpeningLabelOptions } from '../lib/hours';
import { site } from '../lib/site';

type OpenBadgeProps = {
  hours: readonly OpeningHours[];
  timeZone?: string;
  openPrefix?: string;
  closedPrefix?: string;
  fallback?: string;
  className?: string;
};

/** Neutral static output before hydration; browser refreshes in the business zone every minute. */
export function OpenBadge({
  hours,
  timeZone,
  openPrefix,
  closedPrefix,
  fallback,
  className,
}: OpenBadgeProps) {
  const staticFallback = fallback ?? 'See opening hours';
  const [label, setLabel] = useState(staticFallback);
  const zone = timeZone || site.timeZone;

  useEffect(() => {
    const options: OpeningLabelOptions = { openPrefix, closedPrefix, fallback: staticFallback };
    const update = () => setLabel(openingLabel(hours, zone, new Date(), options));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, zone, openPrefix, closedPrefix, staticFallback]);

  const isOpen = openPrefix ? label.startsWith(openPrefix) : label.startsWith('Open now');

  return (
    <span className={className} data-open={isOpen ? 'true' : 'false'}>
      {label}
    </span>
  );
}
