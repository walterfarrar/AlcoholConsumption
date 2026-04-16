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
    // BEER & CIDER
    case 'lightBeer':
      return (
        <BeerBottle amber="#e3b54a" highlight="#f7d987" labelColor="#eef3f8" labelText="LITE" />
      );
    case 'beer':
      return (
        <BeerBottle amber="#c97f23" highlight="#f4b860" labelColor="#f8f4e8" labelText="ALE" />
      );
    case 'lightBeerCan':
      return <LightBeerCan />;
    case 'beerCan':
      return <BeerCan />;
    case 'tallboy':
      return <Tallboy />;
    case 'ipa':
      return <PintGlass />;
    case 'seltzer':
      return <SeltzerCan />;
    case 'cider':
      return <CiderBottle />;

    // WINE
    case 'wineRed':
      return <StemGlass liquidColor="#7a1326" liquidOpacity={0.92} />;
    case 'wineWhite':
      return <StemGlass liquidColor="#e8d57a" liquidOpacity={0.85} />;
    case 'champagne':
      return <ChampagneFlute />;
    case 'wineBottleRed':
      return (
        <WineBottleSvg
          glassColor="#1f3a25"
          highlightColor="#3e6b4a"
          capColor="#7a0e1a"
          labelColor="#f4e9c8"
          labelText="ROUGE"
          labelStroke="#7a5a14"
          labelTextColor="#5a3e0e"
        />
      );
    case 'wineBottleWhite':
      return (
        <WineBottleSvg
          glassColor="#c5d8c2"
          highlightColor="#e8f0e6"
          capColor="#c9a747"
          labelColor="#f4e9c8"
          labelText="BLANC"
          labelStroke="#7a5a14"
          labelTextColor="#5a3e0e"
        />
      );
    case 'champagneBottle':
      return <ChampagneBottle />;

    // LIQUOR
    case 'shot':
      return <ShotGlassSvg liquidColor="#c98a2a" />;
    case 'whiskeyNeat':
      return <RocksGlass />;
    case 'cordial':
      return <CordialGlass />;

    // COCKTAILS
    case 'lightCocktail':
      return <SpritzGlass />;
    case 'mixed':
      return <MixedDrink />;
    case 'martini':
      return <MartiniGlass />;
    case 'tropical':
      return <TropicalDrink />;
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
      <rect x="16" y="10" width="8" height="4" rx="1" fill="#3a3a3a" />
      <rect x="17" y="14" width="6" height="10" fill={amber} />
      <path d="M17 24 Q12 28 12 36 L12 84 Q12 88 16 88 L24 88 Q28 88 28 84 L28 36 Q28 28 23 24 Z" fill={amber} />
      <rect x="14" y="38" width="2" height="44" rx="1" fill={highlight} opacity="0.7" />
      <rect x="13" y="50" width="14" height="22" fill={labelColor} stroke="#7a4a14" strokeWidth="0.4" />
      <text x="20" y="64" textAnchor="middle" fontSize="6" fontWeight="700" fill="#7a4a14" fontFamily="ui-sans-serif, system-ui">
        {labelText}
      </text>
    </>
  );
}

/** Standard 12oz light beer can - silver body, blue "LITE" band (Bud Light / Coors Light vibe). */
function LightBeerCan() {
  return (
    <>
      <ellipse cx="20" cy="42" rx="11" ry="1.6" fill="#9aa3ad" />
      <rect x="17.5" y="40" width="5" height="2.5" rx="0.5" fill="#bcc4cc" />
      <rect x="9" y="42" width="22" height="44" rx="1.5" fill="#e6ecf2" />
      {/* blue label band */}
      <rect x="9" y="56" width="22" height="18" fill="#1d6bb5" />
      <text x="20" y="69" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#eef3f8" fontFamily="ui-sans-serif, system-ui">
        LITE
      </text>
      <rect x="9" y="54.5" width="22" height="1.5" fill="#9aa3ad" />
      <rect x="9" y="74" width="22" height="1.5" fill="#9aa3ad" />
      <ellipse cx="20" cy="86" rx="11" ry="1.6" fill="#9aa3ad" />
      <rect x="11.5" y="44" width="1.6" height="40" rx="0.6" fill="#ffffff" opacity="0.7" />
    </>
  );
}

/** Standard 12oz aluminum can - shorter and fatter than a tallboy. */
function BeerCan() {
  return (
    <>
      <ellipse cx="20" cy="42" rx="11" ry="1.6" fill="#9aa3ad" />
      <rect x="17.5" y="40" width="5" height="2.5" rx="0.5" fill="#bcc4cc" />
      <rect x="9" y="42" width="22" height="44" rx="1.5" fill="#dcc593" />
      {/* main label band */}
      <rect x="9" y="56" width="22" height="18" fill="#8b2818" />
      <text x="20" y="69" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#f4e9c8" fontFamily="ui-sans-serif, system-ui">
        ALE
      </text>
      <rect x="9" y="54.5" width="22" height="1.5" fill="#c9a747" />
      <rect x="9" y="74" width="22" height="1.5" fill="#c9a747" />
      <ellipse cx="20" cy="86" rx="11" ry="1.6" fill="#9aa3ad" />
      <rect x="11.5" y="44" width="1.6" height="40" rx="0.6" fill="#ffffff" opacity="0.6" />
    </>
  );
}

/** 16oz tallboy - taller, slimmer, blue-and-gold colorway to distinguish from BeerCan. */
function Tallboy() {
  return (
    <>
      <ellipse cx="20" cy="22" rx="10" ry="1.6" fill="#9aa3ad" />
      <rect x="17.5" y="20" width="5" height="2.5" rx="0.5" fill="#bcc4cc" />
      <rect x="10" y="22" width="20" height="64" rx="1.5" fill="#1d3a6b" />
      {/* gold band with text */}
      <rect x="10" y="44" width="20" height="22" fill="#d9b13f" />
      <text x="20" y="58" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#1d3a6b" fontFamily="ui-sans-serif, system-ui">
        16oz
      </text>
      <rect x="10" y="42" width="20" height="2" fill="#a37828" />
      <rect x="10" y="66" width="20" height="2" fill="#a37828" />
      <ellipse cx="20" cy="86" rx="10" ry="1.6" fill="#9aa3ad" />
      <rect x="12" y="24" width="1.6" height="60" rx="0.6" fill="#ffffff" opacity="0.6" />
    </>
  );
}

function CiderBottle() {
  return (
    <>
      <rect x="16" y="10" width="8" height="4" rx="1" fill="#3a3a3a" />
      <rect x="17" y="14" width="6" height="10" fill="#cae0a8" />
      <path d="M17 24 Q12 28 12 36 L12 84 Q12 88 16 88 L24 88 Q28 88 28 84 L28 36 Q28 28 23 24 Z" fill="#cae0a8" />
      <rect x="14" y="38" width="2" height="44" rx="1" fill="#e6f0c8" opacity="0.85" />
      {/* yellow-green label with red apple */}
      <rect x="13" y="50" width="14" height="22" fill="#f4ec9a" stroke="#7a5a14" strokeWidth="0.4" />
      <circle cx="20" cy="59" r="2.6" fill="#d4322a" stroke="#7a141a" strokeWidth="0.3" />
      <path d="M20 56.5 L20 55" stroke="#3d2418" strokeWidth="0.5" />
      <ellipse cx="21.5" cy="55.5" rx="1.2" ry="0.6" fill="#5ca548" transform="rotate(30 21.5 55.5)" />
      <text x="20" y="69" textAnchor="middle" fontSize="5" fontWeight="700" fill="#5a3e0e" fontFamily="ui-sans-serif, system-ui">
        CIDER
      </text>
    </>
  );
}

function PintGlass() {
  return (
    <>
      <ellipse cx="20" cy="86" rx="11" ry="1.6" fill="#cfd8e0" opacity="0.7" />
      <path d="M9 22 L11 86 L29 86 L31 22 Z" fill="#f4f3ee" stroke="#9aa3ad" strokeWidth="0.7" />
      <path d="M10 32 L11 86 L29 86 L30 32 Z" fill="#d4951f" opacity="0.92" />
      <path
        d="M9.4 23 Q12 18 14.5 22 Q17 18 19.5 22 Q22 18 24.5 22 Q27 18 30.5 22 L30 32 L10 32 Z"
        fill="#fefbf4"
        stroke="#e6dfc8"
        strokeWidth="0.4"
      />
      <path d="M13 36 L14 80" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" />
    </>
  );
}

function WineBottleSvg({
  glassColor,
  highlightColor,
  capColor,
  labelColor,
  labelText,
  labelStroke,
  labelTextColor,
}: {
  glassColor: string;
  highlightColor: string;
  capColor: string;
  labelColor: string;
  labelText: string;
  labelStroke: string;
  labelTextColor: string;
}) {
  return (
    <>
      <rect x="17" y="6" width="6" height="6" fill={capColor} />
      <rect x="17" y="12" width="6" height="16" fill={glassColor} />
      <path d="M17 28 Q10 32 10 44 L10 84 Q10 88 14 88 L26 88 Q30 88 30 84 L30 44 Q30 32 23 28 Z" fill={glassColor} />
      <rect x="12" y="46" width="2" height="38" rx="1" fill={highlightColor} opacity="0.8" />
      <rect x="11" y="56" width="18" height="20" fill={labelColor} stroke={labelStroke} strokeWidth="0.4" />
      <text x="20" y="68" textAnchor="middle" fontSize="4.5" fontWeight="700" fill={labelTextColor} fontFamily="ui-sans-serif, system-ui">
        {labelText}
      </text>
    </>
  );
}

/** Champagne bottle - longer gold foil, more sloped shoulders, fatter body than a wine bottle. */
function ChampagneBottle() {
  return (
    <>
      {/* gold foil covering cork + neck */}
      <rect x="16" y="6" width="8" height="14" fill="#d9b13f" />
      <rect x="16" y="20" width="8" height="2" fill="#a37828" />
      {/* short neck */}
      <rect x="17" y="22" width="6" height="12" fill="#1f3a25" />
      {/* sloped shoulder + fatter body */}
      <path d="M17 34 Q9 38 8 50 L8 84 Q8 88 12 88 L28 88 Q32 88 32 84 L32 50 Q31 38 23 34 Z" fill="#1f3a25" />
      <rect x="11" y="52" width="2" height="34" rx="1" fill="#3e6b4a" opacity="0.75" />
      {/* gold label */}
      <rect x="10" y="58" width="20" height="22" fill="#f4d574" stroke="#7a5a14" strokeWidth="0.4" />
      <text x="20" y="71" textAnchor="middle" fontSize="4" fontWeight="800" fill="#5a3e0e" fontFamily="ui-sans-serif, system-ui">
        BRUT
      </text>
    </>
  );
}

function StemGlass({
  liquidColor,
  liquidOpacity = 0.9,
}: {
  liquidColor: string;
  liquidOpacity?: number;
}) {
  return (
    <>
      <ellipse cx="20" cy="86" rx="11" ry="2" fill="#cfd8e0" />
      <rect x="19.2" y="58" width="1.6" height="28" fill="#cfd8e0" />
      <path d="M8 30 Q8 56 20 60 Q32 56 32 30 Z" fill="#f6f3ec" stroke="#bcc4cc" strokeWidth="0.6" />
      <path d="M10.5 38 Q12 56 20 58 Q28 56 29.5 38 Z" fill={liquidColor} opacity={liquidOpacity} />
      <path d="M11 34 Q11 44 14 50" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
    </>
  );
}

function ShotGlassSvg({
  liquidColor,
  liquidOpacity = 0.9,
}: {
  liquidColor: string;
  liquidOpacity?: number;
}) {
  return (
    <>
      <ellipse cx="20" cy="86" rx="10" ry="1.6" fill="#cfd8e0" opacity="0.7" />
      <path d="M11 50 L13 86 L27 86 L29 50 Z" fill="#f1efe9" stroke="#9aa3ad" strokeWidth="0.7" />
      <path d="M12.4 60 L13 86 L27 86 L27.6 60 Z" fill={liquidColor} opacity={liquidOpacity} />
      <path d="M14 54 L15 78" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" />
    </>
  );
}

function RocksGlass() {
  return (
    <>
      <ellipse cx="20" cy="86" rx="12" ry="1.6" fill="#cfd8e0" opacity="0.7" />
      <path d="M8 46 L9 86 L31 86 L32 46 Z" fill="#f1efe9" stroke="#9aa3ad" strokeWidth="0.7" />
      <path d="M9.5 56 L10 86 L30 86 L30.5 56 Z" fill="#b8722a" opacity="0.9" />
      <rect x="12" y="58" width="6.5" height="6.5" rx="0.6" fill="#ffffff" opacity="0.55" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="0.4" />
      <rect x="20" y="64" width="5.5" height="5.5" rx="0.6" fill="#ffffff" opacity="0.55" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="0.4" />
      <path d="M11 50 L12 80" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" fill="none" />
    </>
  );
}

function CordialGlass() {
  return (
    <>
      <ellipse cx="20" cy="86" rx="8" ry="1.6" fill="#cfd8e0" />
      <rect x="19.4" y="62" width="1.2" height="24" fill="#cfd8e0" />
      <path d="M13 50 Q13 64 20 66 Q27 64 27 50 Z" fill="#f6f3ec" stroke="#bcc4cc" strokeWidth="0.5" />
      <path d="M14 56 Q14.5 64 20 65 Q25.5 64 26 56 Z" fill="#d8b87a" opacity="0.95" />
      <path d="M15 52 L15.5 62" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.7" fill="none" />
    </>
  );
}

function MixedDrink() {
  return (
    <>
      <ellipse cx="20" cy="86" rx="11" ry="1.8" fill="#cfd8e0" opacity="0.8" />
      <path d="M10 30 L12 86 L28 86 L30 30 Z" fill="#f4f3ee" stroke="#9aa3ad" strokeWidth="0.7" />
      <path d="M11.4 44 L12 86 L28 86 L28.6 44 Z" fill="#e25b8a" opacity="0.85" />
      <circle cx="27" cy="30" r="4" fill="#f5c542" stroke="#b88a14" strokeWidth="0.4" />
      <path d="M27 30 L27 26 M27 30 L31 30 M27 30 L24 33" stroke="#b88a14" strokeWidth="0.5" />
      <rect x="22" y="22" width="1.6" height="40" rx="0.5" fill="#e74c3c" transform="rotate(8 22 22)" />
      <path d="M13 36 L13 78" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" />
    </>
  );
}

/** Aperol Spritz-style icon: stem glass with bright orange liquid + ice + orange slice on rim. */
function SpritzGlass() {
  return (
    <>
      <ellipse cx="20" cy="86" rx="11" ry="2" fill="#cfd8e0" />
      <rect x="19.2" y="58" width="1.6" height="28" fill="#cfd8e0" />
      <path d="M8 30 Q8 56 20 60 Q32 56 32 30 Z" fill="#f6f3ec" stroke="#bcc4cc" strokeWidth="0.6" />
      {/* sunset-orange Aperol liquid */}
      <path d="M10.5 38 Q12 56 20 58 Q28 56 29.5 38 Z" fill="#f08c4a" opacity="0.9" />
      {/* ice cubes floating */}
      <rect x="13.5" y="42" width="4.5" height="4.5" rx="0.6" fill="#ffffff" opacity="0.6" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="0.4" />
      <rect x="20" y="46" width="4" height="4" rx="0.6" fill="#ffffff" opacity="0.6" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="0.4" />
      {/* orange slice on rim */}
      <circle cx="29" cy="30" r="3.5" fill="#f5a542" stroke="#b86a14" strokeWidth="0.4" />
      <path d="M29 30 L29 26.5 M29 30 L32.5 30 M29 30 L26.5 32.5 M29 30 L31.5 32.5" stroke="#b86a14" strokeWidth="0.4" />
      <path d="M11 34 Q11 44 14 50" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
    </>
  );
}

function MartiniGlass() {
  return (
    <>
      <ellipse cx="20" cy="86" rx="11" ry="2" fill="#cfd8e0" />
      <rect x="19.2" y="46" width="1.6" height="40" fill="#cfd8e0" />
      <path d="M6 14 L20 46 L34 14 Z" fill="#f6f3ec" stroke="#bcc4cc" strokeWidth="0.7" />
      <path d="M9.5 17 L20 42 L30.5 17 Z" fill="#dfeafb" opacity="0.85" />
      <line x1="22.5" y1="9" x2="25" y2="26" stroke="#9aa3ad" strokeWidth="0.6" />
      <circle cx="25" cy="26" r="2.6" fill="#6b8e2c" stroke="#3d5418" strokeWidth="0.4" />
      <circle cx="25" cy="25.5" r="0.7" fill="#d2362a" />
      <path d="M11 19 L17 32" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" fill="none" />
    </>
  );
}

function TropicalDrink() {
  return (
    <>
      <ellipse cx="20" cy="86" rx="10" ry="1.8" fill="#cfd8e0" />
      <path
        d="M14 26 Q11 40 12 56 Q13 74 16 84 L16 86 L24 86 L24 84 Q27 74 28 56 Q29 40 26 26 Z"
        fill="#f6f3ec"
        stroke="#9aa3ad"
        strokeWidth="0.7"
      />
      <path
        d="M14.5 36 Q11.5 46 12.5 56 Q13.5 74 16.2 84 L16 85 L24 85 L24 84 Q26.7 74 27.5 56 Q28.5 46 25.5 36 Z"
        fill="#f08c4a"
        opacity="0.9"
      />
      <line x1="22" y1="6" x2="23.5" y2="26" stroke="#3d2418" strokeWidth="0.5" />
      <path d="M14 12 Q22 4 30 12 Z" fill="#e25b8a" />
      <path d="M14 12 L22 6 L30 12" stroke="#3d2418" strokeWidth="0.4" fill="none" />
      <path d="M18 12 L22 4 M26 12 L22 4" stroke="#3d2418" strokeWidth="0.3" fill="none" />
      <circle cx="17" cy="20" r="1.8" fill="#c9252a" stroke="#7a141a" strokeWidth="0.3" />
      <path d="M17 18.5 L17 16" stroke="#3d2418" strokeWidth="0.4" />
      <path d="M14 38 L14.5 78" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" />
    </>
  );
}

function SeltzerCan() {
  return (
    <>
      <ellipse cx="20" cy="14" rx="9" ry="1.6" fill="#9aa3ad" />
      <rect x="11" y="14" width="18" height="72" rx="1.5" fill="#e8f1f7" />
      <rect x="11" y="34" width="18" height="22" fill="#5ec0c9" />
      <text x="20" y="48" textAnchor="middle" fontSize="6" fontWeight="800" fill="#0c4a55" fontFamily="ui-sans-serif, system-ui">
        SLZ
      </text>
      <ellipse cx="20" cy="86" rx="9" ry="1.6" fill="#9aa3ad" />
      <rect x="13" y="16" width="1.6" height="68" rx="0.6" fill="#ffffff" opacity="0.55" />
    </>
  );
}

function ChampagneFlute() {
  return (
    <>
      <ellipse cx="20" cy="86" rx="9" ry="1.8" fill="#cfd8e0" />
      <rect x="19.2" y="56" width="1.6" height="30" fill="#cfd8e0" />
      <path d="M14 16 L15 56 L25 56 L26 16 Z" fill="#f6f3ec" stroke="#bcc4cc" strokeWidth="0.6" />
      <path d="M14.6 24 L15 56 L25 56 L25.4 24 Z" fill="#f3d574" opacity="0.85" />
      <circle cx="18" cy="34" r="0.7" fill="#ffffff" opacity="0.9" />
      <circle cx="21" cy="42" r="0.5" fill="#ffffff" opacity="0.9" />
      <circle cx="19" cy="50" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="22" cy="28" r="0.4" fill="#ffffff" opacity="0.9" />
      <path d="M16 22 L16.5 54" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.8" fill="none" />
    </>
  );
}
