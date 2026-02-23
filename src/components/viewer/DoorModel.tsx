import { useDoorStore } from '../../store/useDoorStore';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { DoorFrame } from './DoorFrame';
import { DoorPanel } from './DoorPanel';
import { DoorGlassPanel } from './DoorGlassPanel';
import { DoorHandle } from './DoorHandle';
import { PanelDetails } from './PanelDetails';
import { BarnDetails } from './BarnDetails';

export function DoorModel() {
  const config = useDoorStore((s) => s.config);
  const invalidate = useThree((s) => s.invalidate);

  // Re-render when config changes (needed with frameloop="demand")
  // Multiple invalidations ensure the scene fully settles after style switches
  useEffect(() => {
    invalidate();
    const id = requestAnimationFrame(() => invalidate());
    return () => cancelAnimationFrame(id);
  }, [config, invalidate]);

  const { style, hasFrame } = config;

  const needsGlass = ['glass-full', 'glass-half', 'french'].includes(style);
  const needsPanels = ['panel-2', 'panel-4', 'panel-6', 'craftsman'].includes(style);
  const needsBarn = style === 'barn';

  // Key forces full remount of the subtree when style changes,
  // ensuring Three.js materials/geometry are cleanly disposed
  return (
    <group key={style}>
      {hasFrame && !needsBarn && <DoorFrame />}
      <DoorPanel />
      {needsGlass && <DoorGlassPanel />}
      {needsPanels && <PanelDetails />}
      {needsBarn && <BarnDetails />}
      <DoorHandle />
    </group>
  );
}
