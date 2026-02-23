import { type ReactNode, useState, useRef, useCallback } from 'react';

type SnapPoint = 'collapsed' | 'half' | 'expanded';

const SNAP_HEIGHTS: Record<SnapPoint, string> = {
  collapsed: 'calc(100% - 80px)',
  half: '50%',
  expanded: '10%',
};

export function BottomSheet({ children }: { children: ReactNode }) {
  const [snap, setSnap] = useState<SnapPoint>('collapsed');
  const dragRef = useRef<{ startY: number; startSnap: SnapPoint } | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragRef.current = { startY: e.clientY, startSnap: snap };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [snap]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const deltaY = e.clientY - dragRef.current.startY;
      const threshold = 60;

      if (deltaY < -threshold) {
        // swiped up
        if (snap === 'collapsed') setSnap('half');
        else if (snap === 'half') setSnap('expanded');
      } else if (deltaY > threshold) {
        // swiped down
        if (snap === 'expanded') setSnap('half');
        else if (snap === 'half') setSnap('collapsed');
      }
      dragRef.current = null;
    },
    [snap]
  );

  return (
    <div
      ref={sheetRef}
      className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.12)] transition-[top] duration-300 ease-out z-30 flex flex-col"
      style={{ top: SNAP_HEIGHTS[snap] }}
    >
      <div
        className="flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label="Drag to resize configuration panel"
        aria-valuetext={snap}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') {
            if (snap === 'collapsed') setSnap('half');
            else if (snap === 'half') setSnap('expanded');
          } else if (e.key === 'ArrowDown') {
            if (snap === 'expanded') setSnap('half');
            else if (snap === 'half') setSnap('collapsed');
          }
        }}
      >
        <div className="w-10 h-1.5 rounded-full bg-gray-300" />
      </div>
      <div className="flex-1 overflow-y-auto px-1">
        {children}
      </div>
    </div>
  );
}
