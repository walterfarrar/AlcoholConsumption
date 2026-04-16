import type { DrinkTypeId } from '../types';

interface Props {
  type: DrinkTypeId;
  /** Pixel height of the rendered bottle. Width scales proportionally. */
  size?: number;
  /** Subtle hover/active state styling. */
  interactive?: boolean;
  className?: string;
}

/**
 * SVG glassware/bottle for each drink type. Each icon is drawn inside a
 * 40x90 viewBox with the base of the vessel resting at y=88, so multiple
 * bottles line up flat on a shelf regardless of type.
 */
export function Bottle({ type, size = 72, interactive = false, className = '' }: Props) {
  const w = (size * 40) / 90;
  return (
    <svg
      viewBox="0 0 40 90"
      width={w}
      height={size}
      className={`${interactive ? 'transition-transform hover:-translate-y-0.5 active:translate-y-0' : ''} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id={`shadow-${type}`} x="-20%" y="-10%" width="140%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter={`url(#shadow-${type})`}>{renderIcon(type)}</g>
    </svg>
  );
}

function renderIcon(type: DrinkTypeId) {
  switch (type) {
    case 'beer':
      return <BeerBottle amber="#c97f23" highlight="#f4b860" labelColor="#f8f4e8" labelText="ALE" />;
    case 'lightBeer':
      return <BeerBottle amber="#e3b54a" highlight="#f7d987" labelColor="#eef3f8" labelText="LITE" />;
    case 'wineGlass':
      return <WineGlass />;
    case 'wineBottle':
      return <WineBottle />;
    case 'shot':
      return <ShotGlass />;
    case 'mixed':
      return <MixedDrink />;
    case 'seltzer':
      return <SeltzerCan />;
    case 'champagne':
      return <ChampagneFlute />;
  }
}

function BeerBottle({
  amber,
  highlight,
  labelColor,
  labelText,
}: {
  amber: string;
  highlight: string;
  labelColor: string;
  labelText: string;
}) {
  return (
    <>
      {/* cap */}
      <rect x="16" y="10" width="8" height="4" rx="1" fill="#3a3a3a" />
      {/* neck */}
      <rect x="17" y="14" width="6" height="10" fill={amber} />
      {/* shoulder */}
      <path d="M17 24 Q12 28 12 36 L12 84 Q12 88 16 88 L24 88 Q28 88 28 84 L28 36 Q28 28 23 24 Z" fill={amber} />
      {/* highlight */}
      <rect x="14" y="38" width="2" height="44" rx="1" fill={highlight} opacity="0.7" />
      {/* label */}
      <rect x="13" y="50" width="14" height="22" fill={labelColor} stroke="#7a4a14" strokeWidth="0.4" />
      <text x="20" y="64" textAnchor="middle" fontSize="6" fontWeight="700" fill="#7a4a14" fontFamily="ui-sans-serif, system-ui">
        {labelText}
      </text>
    </>
  );
}

function WineBottle() {
  return (
    <>
      {/* foil cap */}
      <rect x="17" y="6" width="6" height="6" fill="#7a0e1a" />
      {/* neck */}
      <rect x="17" y="12" width="6" height="16" fill="#1f3a25" />
      {/* shoulder + body */}
      <path d="M17 28 Q10 32 10 44 L10 84 Q10 88 14 88 L26 88 Q30 88 30 84 L30 44 Q30 32 23 28 Z" fill="#1f3a25" />
      {/* highlight */}
      <rect x="12" y="46" width="2" height="38" rx="1" fill="#3e6b4a" opacity="0.7" />
      {/* label */}
      <rect x="11" y="56" width="18" height="20" fill="#f4e9c8" stroke="#7a5a14" strokeWidth="0.4" />
      <text x="20" y="68" textAnchor="middle" fontSize="5" fontWeight="700" fill="#5a3e0e" fontFamily="ui-sans-serif, system-ui">
        VIN
      </text>
    </>
  );
}

function WineGlass() {
  return (
    <>
      {/* base */}
      <ellipse cx="20" cy="86" rx="11" ry="2" fill="#cfd8e0" />
      <rect x="19.2" y="58" width="1.6" height="28" fill="#cfd8e0" />
      {/* bowl */}
      <path
        d="M8 30 Q8 56 20 60 Q32 56 32 30 Z"
        fill="#f6f3ec"
        stroke="#bcc4cc"
        strokeWidth="0.6"
      />
      {/* wine */}
      <path d="M10.5 38 Q12 56 20 58 Q28 56 29.5 38 Z" fill="#7a1326" opacity="0.92" />
      {/* shine */}
      <path d="M11 34 Q11 44 14 50" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
    </>
  );
}

function ShotGlass() {
  return (
    <>
      {/* base shadow */}
      <ellipse cx="20" cy="86" rx="10" ry="1.6" fill="#cfd8e0" opacity="0.7" />
      {/* glass */}
      <path
        d="M11 50 L13 86 L27 86 L29 50 Z"
        fill="#f1efe9"
        stroke="#9aa3ad"
        strokeWidth="0.7"
      />
      {/* liquor */}
      <path d="M12.4 60 L13 86 L27 86 L27.6 60 Z" fill="#c98a2a" opacity="0.85" />
      {/* shine */}
      <path d="M14 54 L15 78" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" />
    </>
  );
}

function MixedDrink() {
  return (
    <>
      {/* base */}
      <ellipse cx="20" cy="86" rx="11" ry="1.8" fill="#cfd8e0" opacity="0.8" />
      {/* highball glass */}
      <path
        d="M10 30 L12 86 L28 86 L30 30 Z"
        fill="#f4f3ee"
        stroke="#9aa3ad"
        strokeWidth="0.7"
      />
      {/* liquid */}
      <path d="M11.4 44 L12 86 L28 86 L28.6 44 Z" fill="#e25b8a" opacity="0.85" />
      {/* citrus wedge on rim */}
      <circle cx="27" cy="30" r="4" fill="#f5c542" stroke="#b88a14" strokeWidth="0.4" />
      <path d="M27 30 L27 26 M27 30 L31 30 M27 30 L24 33" stroke="#b88a14" strokeWidth="0.5" />
      {/* straw */}
      <rect x="22" y="22" width="1.6" height="40" rx="0.5" fill="#e74c3c" transform="rotate(8 22 22)" />
      {/* shine */}
      <path d="M13 36 L13 78" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" />
    </>
  );
}

function SeltzerCan() {
  return (
    <>
      {/* top rim */}
      <ellipse cx="20" cy="14" rx="9" ry="1.6" fill="#9aa3ad" />
      {/* body */}
      <rect x="11" y="14" width="18" height="72" rx="1.5" fill="#e8f1f7" />
      {/* color band */}
      <rect x="11" y="34" width="18" height="22" fill="#5ec0c9" />
      <text x="20" y="48" textAnchor="middle" fontSize="6" fontWeight="800" fill="#0c4a55" fontFamily="ui-sans-serif, system-ui">
        SLZ
      </text>
      {/* bottom rim */}
      <ellipse cx="20" cy="86" rx="9" ry="1.6" fill="#9aa3ad" />
      {/* shine */}
      <rect x="13" y="16" width="1.6" height="68" rx="0.6" fill="#ffffff" opacity="0.55" />
    </>
  );
}

function ChampagneFlute() {
  return (
    <>
      {/* base */}
      <ellipse cx="20" cy="86" rx="9" ry="1.8" fill="#cfd8e0" />
      <rect x="19.2" y="56" width="1.6" height="30" fill="#cfd8e0" />
      {/* flute */}
      <path
        d="M14 16 L15 56 L25 56 L26 16 Z"
        fill="#f6f3ec"
        stroke="#bcc4cc"
        strokeWidth="0.6"
      />
      {/* bubbly */}
      <path d="M14.6 24 L15 56 L25 56 L25.4 24 Z" fill="#f3d574" opacity="0.85" />
      {/* bubbles */}
      <circle cx="18" cy="34" r="0.7" fill="#ffffff" opacity="0.9" />
      <circle cx="21" cy="42" r="0.5" fill="#ffffff" opacity="0.9" />
      <circle cx="19" cy="50" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="22" cy="28" r="0.4" fill="#ffffff" opacity="0.9" />
      {/* shine */}
      <path d="M16 22 L16.5 54" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.8" fill="none" />
    </>
  );
}
