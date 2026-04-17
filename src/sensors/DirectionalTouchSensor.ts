import { TouchSensor } from '@dnd-kit/core';

/**
 * A TouchSensor variant whose activation rule is angle-based instead of pure
 * distance-based.
 *
 * Imagine an X centered on the initial touch point. As soon as the finger has
 * moved past `distance` pixels, we look at where it landed:
 *   - Top or bottom wedge ( |dy| > |dx| )  → activate the drag.
 *   - Left or right wedge ( |dx| >= |dy| ) → cancel; let the browser's native
 *     horizontal pan (granted via `touch-action: pan-x` on the draggable)
 *     handle it as palette scroll.
 *
 * This eliminates the ambiguity that distance-only activation has on touch:
 * a slight upward jitter during a horizontal scroll no longer hijacks the
 * gesture into a drag.
 *
 * Implementation note: we extend the stock TouchSensor and override only the
 * `handleMove` method. The activation lifecycle (handleStart, handleCancel,
 * handlePending) and the activator (onTouchStart) are inherited unchanged.
 * Some private fields of `AbstractPointerSensor` are read at runtime; their
 * shape is captured here in `InternalState` so we have a single, narrow
 * coupling point if dnd-kit ever changes them.
 */

type Coords = { x: number; y: number };

interface InternalState {
  activated: boolean;
  initialCoordinates: Coords | undefined;
  props: {
    onMove(c: Coords): void;
    options: {
      activationConstraint?: {
        distance?: number | { x?: number; y?: number };
        tolerance?: number | { x?: number; y?: number };
        delay?: number;
      };
    };
  };
  handleStart(): void;
  handleCancel(): void;
  handlePending(constraint: unknown, offset?: Coords): void;
}

export class DirectionalTouchSensor extends TouchSensor {}

// `handleMove` is declared `private` on AbstractPointerSensor, so TypeScript
// blocks a normal subclass override. At runtime it's just a prototype method
// bound by the base constructor (`this.handleMove = this.handleMove.bind(this)`),
// which transparently picks up whatever the prototype chain exposes. We patch
// the prototype directly to slot in our angle-aware version without fighting
// the type system.
(DirectionalTouchSensor.prototype as unknown as { handleMove: (e: TouchEvent) => void }).handleMove =
  function (this: InternalState, event: TouchEvent) {
    if (!this.initialCoordinates) return;

    const touch = event.touches[0];
    const coordinates: Coords = touch
      ? { x: touch.clientX, y: touch.clientY }
      : this.initialCoordinates;

    const dx = coordinates.x - this.initialCoordinates.x;
    const dy = coordinates.y - this.initialCoordinates.y;

    if (!this.activated) {
      const constraint = this.props.options.activationConstraint;
      const rawDistance = constraint?.distance;
      const distance = typeof rawDistance === 'number' ? rawDistance : 6;
      const moved = Math.hypot(dx, dy);

      if (moved < distance) {
        this.handlePending(constraint, { x: dx, y: dy });
        return;
      }

      if (Math.abs(dy) > Math.abs(dx)) {
        this.handleStart();
      } else {
        this.handleCancel();
      }
      return;
    }

    if (event.cancelable) event.preventDefault();
    this.props.onMove(coordinates);
  };
