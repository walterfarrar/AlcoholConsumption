import { useDroppable } from '@dnd-kit/core';
import type { DayId, DrinkEntry } from '../types';
import { Bottle } from './Bottle';
import { Shelf } from './Shelf';

interface Props {
  day: { id: DayId; label: string; short: string };
  entries: DrinkEntry[];
  onRemove: (entryId: string) => void;
}

const BOTTLE_SIZE = 64;
const BOTTLES_PER_SHELF = 5;
const MAX_SHELVES = 3;

export function DayCell({ day, entries, onRemove }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: `day-${day.id}`, data: { day: day.id } });

  // Split entries into rows of BOTTLES_PER_SHELF, oldest at the bottom shelf,
  // newer drinks stacking onto upper shelves.
  const rows: DrinkEntry[][] = [];
  for (let i = 0; i < entries.length; i += BOTTLES_PER_SHELF) {
    rows.push(entries.slice(i, i + BOTTLES_PER_SHELF));
  }
  const visibleRows = rows.slice(0, MAX_SHELVES);
  const hiddenCount = entries.length - visibleRows.flat().length;

  return (
    <div
      ref={setNodeRef}
      className={`relative flex h-full min-h-[220px] flex-col rounded-xl border-2 bg-gradient-to-b from-amber-50 to-amber-100/50 p-2 transition ${
        isOver ? 'border-wood-500 shadow-lg ring-2 ring-wood-300' : 'border-wood-200'
      }`}
    >
      <div className="mb-1 flex items-baseline justify-between px-1">
        <span className="text-sm font-semibold text-wood-700 sm:text-xs lg:text-sm">
          {day.short}
        </span>
        {entries.length > 0 && (
          <span className="rounded-full bg-wood-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {entries.length}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col-reverse justify-start gap-3 px-1 pb-1">
        {/* Render visibleRows bottom-up. flex-col-reverse means index 0 -> bottom shelf. */}
        {Array.from({ length: MAX_SHELVES }).map((_, shelfIdx) => {
          const row = visibleRows[shelfIdx] ?? [];
          // Show empty shelves only if there's a row above them with content.
          const showEmpty = shelfIdx === 0 || visibleRows.length > shelfIdx;
          if (!showEmpty) return null;
          return (
            <div key={shelfIdx} className="flex flex-col items-stretch">
              <div className="flex min-h-[64px] items-end justify-center gap-0.5 px-1">
                {row.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => onRemove(entry.id)}
                    aria-label="Remove this drink"
                    title="Tap to remove"
                    className="group relative -mb-[2px] inline-flex items-end rounded-md px-0.5 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    <Bottle type={entry.type} size={BOTTLE_SIZE} />
                    <span className="pointer-events-none absolute inset-x-0 top-0 hidden text-center text-[10px] font-bold text-rose-600 group-hover:block">
                      ×
                    </span>
                  </button>
                ))}
              </div>
              <Shelf />
            </div>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="absolute right-2 top-2 rounded-md bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700">
          +{hiddenCount} more
        </div>
      )}

      {entries.length === 0 && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 text-center text-xs text-wood-500/70">
          Drag a bottle here
        </div>
      )}
    </div>
  );
}
