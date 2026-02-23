import { OrbitControls } from '@react-three/drei';

export function CameraControls() {
  return (
    <OrbitControls
      target={[0, 1.05, 0]}
      minDistance={1.5}
      maxDistance={5}
      minPolarAngle={Math.PI * 0.2}
      maxPolarAngle={Math.PI * 0.8}
      enablePan={false}
      makeDefault
    />
  );
}
