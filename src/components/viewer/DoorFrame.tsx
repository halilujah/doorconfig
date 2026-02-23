import { useMemo } from 'react';
import { useDoorStore } from '../../store/useDoorStore';

export function DoorFrame() {
  const dimensions = useDoorStore((s) => s.config.dimensions);
  const frameWidth = useDoorStore((s) => s.config.frameWidth);
  const color = useDoorStore((s) => s.config.color);

  // Convert mm to meters for Three.js units
  const w = dimensions.width / 1000;
  const h = dimensions.height / 1000;
  const t = dimensions.thickness / 1000;
  const fw = frameWidth / 1000;
  const ft = t + 0.02; // frame is slightly thicker

  const frameColor = useMemo(() => {
    // Darken the primary color slightly for the frame
    const r = parseInt(color.secondary.slice(1, 3), 16);
    const g = parseInt(color.secondary.slice(3, 5), 16);
    const b = parseInt(color.secondary.slice(5, 7), 16);
    return `rgb(${Math.round(r * 0.8)}, ${Math.round(g * 0.8)}, ${Math.round(b * 0.8)})`;
  }, [color.secondary]);

  return (
    <group>
      {/* Top rail */}
      <mesh position={[0, h + fw / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w + fw * 2, fw, ft]} />
        <meshStandardMaterial color={frameColor} roughness={0.6} />
      </mesh>

      {/* Left stile */}
      <mesh position={[-(w / 2 + fw / 2), h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[fw, h, ft]} />
        <meshStandardMaterial color={frameColor} roughness={0.6} />
      </mesh>

      {/* Right stile */}
      <mesh position={[w / 2 + fw / 2, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[fw, h, ft]} />
        <meshStandardMaterial color={frameColor} roughness={0.6} />
      </mesh>

      {/* Threshold */}
      <mesh position={[0, -(fw / 4), 0]} castShadow receiveShadow>
        <boxGeometry args={[w + fw * 2, fw / 2, ft]} />
        <meshStandardMaterial color={frameColor} roughness={0.6} />
      </mesh>
    </group>
  );
}
