import type { Dispatch } from 'react';
import type { DrinkTypeId, WeekState } from '../types';
import type { WeekAction } from '../state';
import { DRINKS, DRINK_ORDER } from '../data/drinks';
import { Bottle } from './Bottle';

interface Props {
  week: WeekState;
  dispatch: Dispatch<WeekAction>;
}

export function WeeklySummary({ week, dispatch }: Props) {
  const counts = countByType(week);
  const totalDrinks = Object.values(counts).reduce((a, b) => a + b, 0);
  const standardDrinks = DRINK_ORDER.reduce(
    (sum, id) => sum + (counts[id] ?? 0) * DRINKS[id].standardDrinks,
    0,
  );

  return (
    <div className="rounded-xl border border-wood-200 bg-white/80 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-wood-700">
            Weekly summary
          </h2>
          <p className="mt-1 text-2xl font-bold text-stone-800">
            {totalDrinks} {totalDrinks === 1 ? 'drink' : 'drinks'}
            <span className="ml-2 text-base font-medium text-stone-500">
              (~{formatStandardDrinks(standardDrinks)} standard)
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (totalDrinks === 0) return;
            if (window.confirm('Clear all drinks from the week?')) {
              dispatch({ kind: 'clear' });
            }
          }}
          disabled={totalDrinks === 0}
          className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear week
        </button>
      </div>

      {totalDrinks > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {DRINK_ORDER.filter((id) => (counts[id] ?? 0) > 0).map((id) => (
            <div key={id} className="flex items-center gap-1.5 rounded-lg bg-wood-50 px-2 py-1">
              <Bottle type={id} size={28} />
              <span className="text-sm font-medium text-stone-700">
                {DRINKS[id].shortLabel}
                <span className="ml-1 text-stone-500">×{counts[id]}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-stone-500">
        Standard drinks calculated using NIAAA approximations. This tool is for visualizing
        consumption only and is not medical advice.
      </p>
    </div>
  );
}

function countByType(week: WeekState): Partial<Record<DrinkTypeId, number>> {
  const counts: Partial<Record<DrinkTypeId, number>> = {};
  for (const day of Object.values(week)) {
    for (const entry of day) {
      counts[entry.type] = (counts[entry.type] ?? 0) + 1;
    }
  }
  return counts;
}

function formatStandardDrinks(n: number): string {
  return n % 1 === 0 ? n.toString() : n.toFixed(1);
}
