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
    <div className="flex flex-col gap-2 sm:gap-3">
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
