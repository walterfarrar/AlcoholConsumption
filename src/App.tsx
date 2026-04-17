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
  // Touch: short delay so vertical page scrolling still works on mobile.
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
      <div
        className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100"
        // pb leaves room for the fixed bottom palette (~110px) plus safe-area
        style={{ paddingBottom: 'calc(140px + env(safe-area-inset-bottom, 0px))' }}
      >
        <header className="mx-auto max-w-3xl px-4 pt-6 sm:pt-10">
          <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
            How much did you drink last week?
          </h1>
          <p className="mt-1 text-sm text-stone-600 sm:text-base">
            Tap a category at the bottom to see drinks, then drag one up onto a day. Tap a bottle
            on a shelf to remove it.
          </p>
        </header>

        <main className="mx-auto mt-5 max-w-3xl space-y-4 px-3 sm:px-4">
          <WeekGrid week={week} dispatch={dispatch} />
          <WeeklySummary week={week} dispatch={dispatch} />
        </main>
      </div>

      <BottlePalette />

      <DragOverlay dropAnimation={null}>
        {activeType ? (
          // Lift the dragged bottle up and scale it slightly so the user's finger
          // doesn't cover it on touch devices. transform-origin keeps the lift
          // anchored to the bottom (near the finger) rather than the center.
          <div
            className="pointer-events-none"
            style={{ transform: 'translateY(-72px) scale(1.15)', transformOrigin: 'bottom center' }}
          >
            <Bottle type={activeType} size={72} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
