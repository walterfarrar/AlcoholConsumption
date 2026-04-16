import { useDraggable } from '@dnd-kit/core';
import type { DrinkTypeId } from '../types';
import { DRINKS, DRINK_ORDER } from '../data/drinks';
import { Bottle } from './Bottle';

export function BottlePalette() {
  return (
    <div className="rounded-xl border border-wood-200 bg-wood-50/70 p-3 shadow-sm backdrop-blur">
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-wood-700">
          Drink palette
        </h2>
        <span className="text-xs text-wood-600">Drag onto a day</span>
      </div>
      <div className="flex flex-wrap gap-2 overflow-x-auto sm:gap-3">
        {DRINK_ORDER.map((id) => (
          <PaletteBottle key={id} type={id} />
        ))}
      </div>
    </div>
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
      className={`group flex min-w-[68px] flex-col items-center gap-1 rounded-lg border border-transparent bg-white/70 px-2 py-2 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-wood-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-wood-400 ${
        isDragging ? 'opacity-30' : ''
      }`}
      style={{ touchAction: 'none' }}
    >
      <Bottle type={type} size={64} interactive />
      <span className="text-[11px] font-medium text-stone-700">{def.shortLabel}</span>
    </button>
  );
}
