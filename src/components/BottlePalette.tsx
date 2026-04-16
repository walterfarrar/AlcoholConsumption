import { useState } from 'react';
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
        <div className="overflow-x-auto pb-2">
          <div className="mx-auto flex min-h-[84px] w-fit items-stretch gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const open = openCategory === cat.id;
            return (
              <div key={cat.id} className="flex shrink-0 items-stretch gap-1.5 sm:gap-2">
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
      </div>
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
      style={{ touchAction: 'none', minWidth: 56 }}
    >
      <Bottle type={type} size={52} interactive />
      <span className="text-[10px] font-medium leading-tight text-stone-700">
        {def.shortLabel}
      </span>
    </button>
  );
}
