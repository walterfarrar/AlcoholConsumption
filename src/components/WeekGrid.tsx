import type { Dispatch } from 'react';
import type { WeekState } from '../types';
import type { WeekAction } from '../state';
import { DAYS } from '../data/drinks';
import { DayCell } from './DayCell';

interface Props {
  week: WeekState;
  dispatch: Dispatch<WeekAction>;
}

export function WeekGrid({ week, dispatch }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
      {DAYS.map((day) => (
        <DayCell
          key={day.id}
          day={day}
          entries={week[day.id]}
          onRemove={(entryId) => dispatch({ kind: 'remove', day: day.id, entryId })}
        />
      ))}
    </div>
  );
}
