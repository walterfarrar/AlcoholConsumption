/**
 * A wood plank rendered with CSS gradients + an inline SVG grain overlay.
 * Sits at the bottom of a DayCell. Bottles render *above* the plank's top edge.
 */
export function Shelf({ height = 14 }: { height?: number }) {
  return (
    <div
      className="relative w-full rounded-sm shadow-[0_3px_0_rgba(0,0,0,0.18)]"
      style={{
        height,
        background:
          'linear-gradient(180deg, #b87a3a 0%, #8b5a2b 45%, #6b4220 80%, #4a2d16 100%)',
      }}
    >
      {/* Grain overlay - thin darker streaks */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grain" x="0" y="0" width="100" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 3 Q25 2 50 3.5 T100 3" stroke="#3a210d" strokeWidth="0.3" fill="none" />
            <path d="M0 7 Q30 6 60 7.5 T100 7" stroke="#3a210d" strokeWidth="0.3" fill="none" />
            <path d="M0 11 Q20 10 55 11.5 T100 11" stroke="#3a210d" strokeWidth="0.3" fill="none" />
          </pattern>
        </defs>
        <rect width="100" height="14" fill="url(#grain)" />
      </svg>
      {/* Top highlight to imply a bevelled front edge */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-wood-100/60" />
    </div>
  );
}
