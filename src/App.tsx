import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { BottlePalette } from './components/BottlePalette';
import { WeekGrid } from './components/WeekGrid';
import { WeeklySummary } from './components/WeeklySummary';
import { Bottle } from './components/Bottle';
import { useWeekState } from './state';
import type { DayId, DrinkTypeId } from './types';

export default function App() {
  const [week, dispatch] = useWeekState();
  const [activeType, setActiveType] = useState<DrinkTypeId | null>(null);

  // Mouse: small distance prevents click-to-remove being interpreted as drag.
  // Touch: short delay so scrolling the page still works on mobile.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
  );

  function handleDragStart(e: DragStartEvent) {
    const data = e.active.data.current as { source?: string; type?: DrinkTypeId } | undefined;
    if (data?.type) setActiveType(data.type);
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveType(null);
    const { active, over } = e;
    if (!over) return;
    const sourceData = active.data.current as { source?: string; type?: DrinkTypeId } | undefined;
    const targetData = over.data.current as { day?: DayId } | undefined;
    if (sourceData?.source === 'palette' && sourceData.type && targetData?.day) {
      dispatch({ kind: 'add', day: targetData.day, drink: sourceData.type });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveType(null)}
    >
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 pb-10">
        <header className="mx-auto max-w-6xl px-4 pt-6 sm:pt-10">
          <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
            How much do you drink in a typical week?
          </h1>
          <p className="mt-1 text-sm text-stone-600 sm:text-base">
            Drag a bottle from the palette onto each day. Tap a bottle on a shelf to remove it.
          </p>
        </header>

        <main className="mx-auto mt-6 max-w-6xl space-y-4 px-4">
          <BottlePalette />
          <WeekGrid week={week} dispatch={dispatch} />
          <WeeklySummary week={week} dispatch={dispatch} />
        </main>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeType ? (
          <div className="pointer-events-none">
            <Bottle type={activeType} size={72} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
