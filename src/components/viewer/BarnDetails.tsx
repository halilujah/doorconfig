import { useDoorStore } from '../../store/useDoorStore';

export function BarnDetails() {
  const dimensions = useDoorStore((s) => s.config.dimensions);
  const color = useDoorStore((s) => s.config.color);

  const w = dimensions.width / 1000;
  const h = dimensions.height / 1000;
  const t = dimensions.thickness / 1000;

  const braceWidth = 0.05;
  const braceDepth = 0.012;

  // Diagonal length for the X brace
  const diagLen = Math.sqrt(w * w + h * h);
  const angle = Math.atan2(h, w);

  return (
    <group>
      {/* Horizontal center bar */}
      <mesh position={[0, h / 2, t / 2 + braceDepth / 2]}>
        <boxGeometry args={[w - 0.02, braceWidth, braceDepth]} />
        <meshStandardMaterial color={color.secondary} roughness={0.7} />
      </mesh>

      {/* Diagonal brace 1 (bottom-left to top-right) */}
      <mesh
        position={[0, h / 2, t / 2 + braceDepth / 2]}
        rotation={[0, 0, angle]}
      >
        <boxGeometry args={[diagLen * 0.92, braceWidth * 0.8, braceDepth]} />
        <meshStandardMaterial color={color.secondary} roughness={0.7} />
      </mesh>

      {/* Diagonal brace 2 (top-left to bottom-right) */}
      <mesh
        position={[0, h / 2, t / 2 + braceDepth / 2]}
        rotation={[0, 0, -angle]}
      >
        <boxGeometry args={[diagLen * 0.92, braceWidth * 0.8, braceDepth]} />
        <meshStandardMaterial color={color.secondary} roughness={0.7} />
      </mesh>

      {/* Barn track rail above door */}
      <mesh position={[0, h + 0.06, 0.03]}>
        <boxGeometry args={[w * 1.8, 0.04, 0.025]} />
        <meshStandardMaterial color="#444444" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Left wheel */}
      <mesh position={[-w * 0.25, h + 0.06, 0.05]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.012, 24]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Right wheel */}
      <mesh position={[w * 0.25, h + 0.06, 0.05]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.012, 24]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}
