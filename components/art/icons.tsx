import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function RollerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3.5" width="14" height="5.5" rx="1.5" />
      <path d="M17 6.25h2.25A1.75 1.75 0 0 1 21 8v2a1.75 1.75 0 0 1-1.75 1.75H12v2.75" />
      <rect x="10.25" y="14.5" width="3.5" height="6.25" rx="1.2" />
    </svg>
  );
}

export function BrushIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h14v5.5H5z" />
      <path d="M5 9.5h14v2.5H5z" />
      <path d="M9.5 12l.75 7.25a1.75 1.75 0 0 0 3.5 0L14.5 12" />
      <path d="M8.5 4v3M12 4v3.5M15.5 4v2.5" />
    </svg>
  );
}

export function FillerKnifeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 4.5l15 2-4.5 6.5-6-4z" />
      <path d="M11.5 11.25L8 18.5a1.6 1.6 0 0 1-2.85-1.45L9 10" />
    </svg>
  );
}

export function StepladderIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 20.5L10.5 3.5h3L19 20.5" />
      <path d="M8.5 9.5h7M7.2 14h9.6M6 18.2h12" />
    </svg>
  );
}

export function PaintTinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6.5" rx="7" ry="2.25" />
      <path d="M5 6.5v11.25c0 1.24 3.13 2.25 7 2.25s7-1.01 7-2.25V6.5" />
      <path d="M5 10.5c2 1.2 4.5 1.5 7 1.5s5-.3 7-1.5" />
      <path d="M19 9.5c1.6.5 2 1.8 2 3.25" />
    </svg>
  );
}

export function DustSheetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7.5C6.5 5 9.5 6.5 12 6.5s5.5-1.5 8.5 1v10.5c-3-1.5-5.5-.5-8.5-.5s-5.5-1-8.5.5V7.5z" />
      <path d="M8.5 7v10M15.5 7v10" strokeDasharray="2 2.5" />
    </svg>
  );
}

export function TapeRollIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="12" r="7" />
      <circle cx="10.5" cy="12" r="3" />
      <path d="M10.5 19h10v-3.5h-4.2" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 4.5h3.25l1.5 4-2 1.5a11.2 11.2 0 0 0 5.75 5.75l1.5-2 4 1.5v3.25a1.75 1.75 0 0 1-1.9 1.74A15.5 15.5 0 0 1 3.76 6.4 1.75 1.75 0 0 1 5.5 4.5z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.75" />
      <path d="M3.5 6.5l8.5 6.25 8.5-6.25" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.5s6.5-5.4 6.5-10.5a6.5 6.5 0 1 0-13 0c0 5.1 6.5 10.5 6.5 10.5z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

export function TickIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5l4.25 4.25L19 7.5" />
    </svg>
  );
}
