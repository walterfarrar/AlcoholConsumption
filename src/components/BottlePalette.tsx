import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { DrinkCategory, DrinkTypeId } from '../types';
import { CATEGORIES, DRINKS, DRINKS_BY_CATEGORY } from '../data/drinks';
import { Bottle } from './Bottle';

/** A representative bottle shown as a tiny preview on each collapsed category pill. */
const CATEGORY_PREVIEW: Record<DrinkCategory, DrinkTypeId> = {
  beer: 'beer',
  wine: 'wineRed',
  liquor: 'shot',
  cocktail: 'martini',
};

/**
 * Sticks to the bottom of the viewport. Patients drag a bottle UP onto a day.
 * Categories start collapsed; tap one to reveal its bottles inline. Only one
 * category is open at a time.
 */
export function BottlePalette() {
  const [openCategory, setOpenCategory] = useState<DrinkCategory | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // One ref per category group (button + its drinks). Lets us measure the
  // group's position relative to the scroll container so we can slide the
  // selected category to the left edge after it opens.
  const groupRefs = useRef<Partial<Record<DrinkCategory, HTMLDivElement | null>>>({});

  // When a category opens, scroll horizontally so that category's button is
  // at the left edge of the visible palette. Without this, opening the last
  // category (e.g. Cocktails) hides its drinks off-screen to the right and
  // forces the user to scroll. Runs in a layout effect so the new content
  // width is already measured.
  useLayoutEffect(() => {
    if (!openCategory) return;
    const container = scrollRef.current;
    const group = groupRefs.current[openCategory];
    if (!container || !group) return;
    const containerRect = container.getBoundingClientRect();
    const groupRect = group.getBoundingClientRect();
    // Small left inset so the active category card isn't flush with the edge.
    const inset = 8;
    const targetLeft = container.scrollLeft + (groupRect.left - containerRect.left) - inset;
    const maxLeft = container.scrollWidth - container.clientWidth;
    const clamped = Math.max(0, Math.min(targetLeft, maxLeft));
    container.scrollTo({ left: clamped, behavior: 'smooth' });
  }, [openCategory]);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-wood-300 bg-wood-50/95 shadow-[0_-6px_18px_-8px_rgba(0,0,0,0.25)] backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="px-2 pt-1.5 sm:px-3">
        {/* min-h reserves the expanded-state height so the palette doesn't
            grow/shrink (and the page doesn't jump) when categories open/close.
            The inner w-fit + mx-auto centers content when it fits and falls
            back to left-aligned when content overflows (so scroll still works). */}
        <div ref={scrollRef} className="overflow-x-auto pb-1">
          <div className="mx-auto flex min-h-[84px] w-fit items-stretch gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const open = openCategory === cat.id;
            return (
              <div
                key={cat.id}
                ref={(el) => {
                  groupRefs.current[cat.id] = el;
                }}
                className="flex shrink-0 items-stretch gap-1.5 sm:gap-2"
              >
                <button
                  type="button"
                  onClick={() => setOpenCategory(open ? null : cat.id)}
                  aria-expanded={open}
                  aria-label={`${open ? 'Collapse' : 'Expand'} ${cat.label}`}
                  className={`relative flex shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border px-3 py-1 text-center shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-wood-400 ${
                    open
                      ? 'border-wood-500 bg-wood-200'
                      : 'border-wood-300 bg-wood-100 hover:bg-wood-200/80'
                  }`}
                  style={{ minWidth: 80 }}
                >
                  <span className="absolute right-1.5 top-1 text-wood-700">
                    <Chevron open={open} />
                  </span>
                  <Bottle type={CATEGORY_PREVIEW[cat.id]} size={40} />
                  <span className="text-[11px] font-semibold leading-tight text-wood-800">
                    {cat.label}
                  </span>
                </button>

                {open && (
                  <div className="flex shrink-0 items-stretch gap-1 rounded-lg bg-wood-100/60 p-1 sm:gap-1.5">
                    {DRINKS_BY_CATEGORY[cat.id].map((id) => (
                      <PaletteBottle key={id} type={id} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>
        <ScrollIndicator scrollRef={scrollRef} deps={[openCategory]} />
      </div>
    </div>
  );
}

/**
 * A custom horizontal scroll indicator. Mobile browsers (especially iOS
 * Safari) hide native scrollbars on touch-driven scroll containers, so we
 * render our own thin track + thumb under the palette. The thumb width
 * represents the visible fraction of the content; its left position tracks
 * the current scroll offset. Hidden when the content fits.
 */
function ScrollIndicator({
  scrollRef,
  deps,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  deps: unknown[];
}) {
  const [metrics, setMetrics] = useState({ visible: false, thumbPct: 1, leftPct: 0 });

  function recompute() {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth - clientWidth;
    if (overflow <= 1) {
      setMetrics((m) => (m.visible ? { visible: false, thumbPct: 1, leftPct: 0 } : m));
      return;
    }
    const thumbPct = clientWidth / scrollWidth;
    const leftPct = (scrollLeft / scrollWidth);
    setMetrics({ visible: true, thumbPct, leftPct });
  }

  useLayoutEffect(() => {
    recompute();
    // Recompute when the open category changes (re-layout) and on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => recompute();
    const onResize = () => recompute();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Some content (fonts, async layout) can shift sizes shortly after mount.
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => recompute()) : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="mx-auto mb-1 mt-0.5 h-1 w-[min(92%,420px)] rounded-full bg-wood-200/80"
      style={{ visibility: metrics.visible ? 'visible' : 'hidden' }}
      aria-hidden="true"
    >
      <div
        className="h-full rounded-full bg-wood-500"
        style={{
          width: `${Math.max(metrics.thumbPct * 100, 8)}%`,
          marginLeft: `${metrics.leftPct * 100}%`,
        }}
      />
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className={`shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
      aria-hidden="true"
    >
      <path d="M3 1 L7 5 L3 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PaletteBottle({ type }: { type: DrinkTypeId }) {
  const def = DRINKS[type];
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { source: 'palette', type },
  });

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      type="button"
      aria-label={`Add ${def.label}`}
      title={def.label}
      className={`group flex shrink-0 flex-col items-center gap-0.5 rounded-md border border-transparent bg-white px-1.5 pb-1 pt-1.5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-wood-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-wood-400 ${
        isDragging ? 'opacity-30' : ''
      }`}
      // pan-x lets the browser scroll the palette horizontally on a horizontal
      // swipe; vertical pan is left to dnd-kit's TouchSensor for the drag-up gesture.
      style={{ touchAction: 'pan-x', minWidth: 56 }}
    >
      <Bottle type={type} size={52} interactive />
      <span className="text-[10px] font-medium leading-tight text-stone-700">
        {def.shortLabel}
      </span>
    </button>
  );
}
