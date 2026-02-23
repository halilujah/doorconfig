import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { DoorScene } from './DoorScene';

export function DoorCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        frameloop="demand"
        camera={{ position: [0, 1.2, 3], fov: 35, near: 0.01, far: 100 }}
        gl={{ preserveDrawingBuffer: true }}
        aria-label="3D door preview"
      >
        <Suspense fallback={null}>
          <DoorScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
