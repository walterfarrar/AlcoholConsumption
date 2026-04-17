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

export function DayCell({ day, entries, onRemove }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: `day-${day.id}`, data: { day: day.id } });

  return (
    <div
      ref={setNodeRef}
      className={`flex items-stretch overflow-hidden rounded-xl border-2 bg-gradient-to-r from-amber-50 to-amber-100/60 transition ${
        isOver ? 'border-wood-500 shadow-lg ring-2 ring-wood-300' : 'border-wood-200'
      }`}
    >
      {/* Day label column */}
      <div className="flex w-16 shrink-0 flex-col items-center justify-center gap-1 border-r border-wood-200 bg-wood-50/70 px-2 py-3 sm:w-20">
        <span className="text-sm font-bold uppercase tracking-wide text-wood-700">
          {day.short}
        </span>
        {entries.length > 0 ? (
          <span className="rounded-full bg-wood-600 px-2 py-0.5 text-xs font-bold text-white">
            {entries.length}
          </span>
        ) : (
          <span className="text-[10px] text-wood-500/70">empty</span>
        )}
      </div>

      {/* Shelf area: a horizontally scrolling band of bottles standing on a wood shelf. */}
      <div className="relative min-w-0 flex-1">
        {entries.length === 0 ? (
          <div className="flex h-full min-h-[96px] items-center justify-center px-3 py-2">
            <p className="text-center text-xs text-wood-500/70 sm:text-sm">
              Drag a drink up to {day.label}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full px-2 pt-2">
              <div className="flex min-h-[72px] items-end gap-0.5">
                {entries.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => onRemove(entry.id)}
                    aria-label="Remove this drink"
                    title="Tap to remove"
                    className="group relative -mb-[2px] inline-flex shrink-0 items-end rounded-md px-0.5 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
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
          </div>
        )}
      </div>
    </div>
  );
}
