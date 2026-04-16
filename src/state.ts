import { useEffect, useReducer } from 'react';
import type { DayId, DrinkTypeId, WeekState } from './types';
import { EMPTY_WEEK } from './data/drinks';

// v4: re-collapsed spirit shots to generic shot, bucketed cocktails by strength,
//      added tallboy/cider/champagneBottle/lightCocktail
const STORAGE_KEY = 'weekly-drinks-v4';

export type WeekAction =
  | { kind: 'add'; day: DayId; drink: DrinkTypeId }
  | { kind: 'remove'; day: DayId; entryId: string }
  | { kind: 'clear' };

function reducer(state: WeekState, action: WeekAction): WeekState {
  switch (action.kind) {
    case 'add': {
      const entryId =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      return {
        ...state,
        [action.day]: [...state[action.day], { id: entryId, type: action.drink }],
      };
    }
    case 'remove':
      return {
        ...state,
        [action.day]: state[action.day].filter((e) => e.id !== action.entryId),
      };
    case 'clear':
      return EMPTY_WEEK;
  }
}

function loadInitial(): WeekState {
  if (typeof window === 'undefined') return EMPTY_WEEK;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_WEEK;
    const parsed = JSON.parse(raw) as Partial<WeekState>;
    return { ...EMPTY_WEEK, ...parsed };
  } catch {
    return EMPTY_WEEK;
  }
}

export function useWeekState() {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage may be disabled (private mode); silently ignore
    }
  }, [state]);

  return [state, dispatch] as const;
}
