import { ContactShadows, Environment } from '@react-three/drei';
import { DoorModel } from './DoorModel';
import { CameraControls } from './CameraControls';

export function DoorScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[2, 3, 2]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-1.5, 2, 1]} intensity={0.3} />
      <Environment preset="apartment" />
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.4}
        scale={5}
        blur={2}
        far={3}
      />
      <DoorModel />
      <CameraControls />

      {/* Ground plane for context */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0ece6" roughness={0.9} />
      </mesh>
    </>
  );
}
