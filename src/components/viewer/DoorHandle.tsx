import { useMemo } from 'react';
import { useDoorStore } from '../../store/useDoorStore';
import * as THREE from 'three';

function LeverHandle({ color }: { color: string }) {
  return (
    <group>
      {/* Escutcheon plate */}
      <mesh>
        <cylinderGeometry args={[0.025, 0.025, 0.008, 32]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, 0, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.02, 16]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Lever arm */}
      <mesh position={[0.04, 0, 0.022]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.012, 0.012]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Lever tip (rounded) */}
      <mesh position={[0.08, 0, 0.022]}>
        <sphereGeometry args={[0.007, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

function KnobHandle({ color }: { color: string }) {
  return (
    <group>
      {/* Base plate */}
      <mesh>
        <cylinderGeometry args={[0.025, 0.025, 0.006, 32]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.024, 16]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Knob */}
      <mesh position={[0, 0, 0.03]}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

function PullHandle({ color }: { color: string }) {
  return (
    <group>
      {/* Top standoff */}
      <mesh position={[0, 0.06, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.02, 16]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Bottom standoff */}
      <mesh position={[0, -0.06, 0.012]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.02, 16]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Bar */}
      <mesh position={[0, 0, 0.024]}>
        <cylinderGeometry args={[0.008, 0.008, 0.14, 16]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

function BarnPullHandle({ color }: { color: string }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 0.015;
    const h = 0.10;
    const r = 0.005;
    s.moveTo(-w + r, -h);
    s.lineTo(w - r, -h);
    s.quadraticCurveTo(w, -h, w, -h + r);
    s.lineTo(w, h - r);
    s.quadraticCurveTo(w, h, w - r, h);
    s.lineTo(-w + r, h);
    s.quadraticCurveTo(-w, h, -w, h - r);
    s.lineTo(-w, -h + r);
    s.quadraticCurveTo(-w, -h, -w + r, -h);
    return s;
  }, []);

  return (
    <group>
      {/* Flat handle */}
      <mesh position={[0, 0, 0.015]} rotation={[0, 0, 0]}>
        <extrudeGeometry args={[shape, { depth: 0.008, bevelEnabled: false }]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Top mount */}
      <mesh position={[0, 0.08, 0.005]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.006, 16]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Bottom mount */}
      <mesh position={[0, -0.08, 0.005]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.006, 16]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

export function DoorHandle() {
  const hardware = useDoorStore((s) => s.config.hardware);
  const dimensions = useDoorStore((s) => s.config.dimensions);

  if (hardware.handleStyle === 'none') return null;

  const w = dimensions.width / 1000;
  const h = dimensions.height / 1000;
  const t = dimensions.thickness / 1000;

  const xOffset = hardware.handleSide === 'right' ? w / 2 - 0.06 : -(w / 2 - 0.06);
  const yPos = h * 0.48; // slightly below center

  const HandleComponent = {
    lever: LeverHandle,
    knob: KnobHandle,
    pull: PullHandle,
    'barn-pull': BarnPullHandle,
  }[hardware.handleStyle];

  const mirrorScale = hardware.handleSide === 'left' ? -1 : 1;

  return (
    <group position={[xOffset, yPos, t / 2]}>
      <group scale={[mirrorScale, 1, 1]}>
        <HandleComponent color={hardware.handleColor} />
      </group>
    </group>
  );
}
