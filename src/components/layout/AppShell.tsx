import { Suspense, lazy } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomSheet } from './BottomSheet';
import { ConfigPanel } from '../configurator/ConfigPanel';
import { useIsMobile } from '../../hooks/useIsMobile';

const DoorCanvas = lazy(() =>
  import('../viewer/DoorCanvas').then((m) => ({ default: m.DoorCanvas }))
);

export function AppShell() {
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex flex-col bg-door-surface">
      <Header />
      <div className="flex-1 flex relative overflow-hidden">
        {!isMobile && (
          <Sidebar>
            <ConfigPanel />
          </Sidebar>
        )}
        <main className="flex-1 relative">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Loading 3D viewer...
              </div>
            }
          >
            <DoorCanvas />
          </Suspense>
        </main>
        {isMobile && (
          <BottomSheet>
            <ConfigPanel />
          </BottomSheet>
        )}
      </div>
    </div>
  );
}
