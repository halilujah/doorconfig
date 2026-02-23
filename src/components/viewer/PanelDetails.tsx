import { useMemo } from 'react';
import { useDoorStore } from '../../store/useDoorStore';
import type { DoorStyle } from '../../types/door';

function getPanelLayout(style: DoorStyle): { rows: number; cols: number } {
  switch (style) {
    case 'panel-2': return { rows: 2, cols: 1 };
    case 'panel-4': return { rows: 2, cols: 2 };
    case 'panel-6': return { rows: 3, cols: 2 };
    case 'craftsman': return { rows: 2, cols: 2 };
    default: return { rows: 0, cols: 0 };
  }
}

export function PanelDetails() {
  const style = useDoorStore((s) => s.config.style);
  const dimensions = useDoorStore((s) => s.config.dimensions);
  const color = useDoorStore((s) => s.config.color);

  const w = dimensions.width / 1000;
  const h = dimensions.height / 1000;
  const t = dimensions.thickness / 1000;

  const layout = getPanelLayout(style);

  const panels = useMemo(() => {
    if (layout.rows === 0) return [];

    const railWidth = 0.07; // 70mm rails
    const stileWidth = 0.07;
    const panelDepth = 0.004; // 4mm raised above surface

    const innerWidth = w - stileWidth * 2;
    const innerHeight = h - railWidth * 2;

    const cellWidth = (innerWidth - stileWidth * (layout.cols - 1)) / layout.cols;
    const cellHeight = (innerHeight - railWidth * (layout.rows - 1)) / layout.rows;

    const result: { x: number; y: number; pw: number; ph: number }[] = [];

    for (let row = 0; row < layout.rows; row++) {
      for (let col = 0; col < layout.cols; col++) {
        const x = -w / 2 + stileWidth + col * (cellWidth + stileWidth) + cellWidth / 2;
        const y = h - railWidth - row * (cellHeight + railWidth) - cellHeight / 2;
        result.push({ x, y, pw: cellWidth - 0.01, ph: cellHeight - 0.01 });
      }
    }

    return result.map((p, i) => ({
      ...p,
      key: i,
      depth: panelDepth,
    }));
  }, [w, h, layout]);

  if (panels.length === 0) return null;

  return (
    <group>
      {panels.map((p) => (
        <group key={p.key}>
          {/* Front raised panel */}
          <mesh position={[p.x, p.y, t / 2 + p.depth / 2]}>
            <boxGeometry args={[p.pw, p.ph, p.depth]} />
            <meshStandardMaterial color={color.secondary} roughness={0.4} />
          </mesh>
          {/* Back raised panel */}
          <mesh position={[p.x, p.y, -(t / 2 + p.depth / 2)]}>
            <boxGeometry args={[p.pw, p.ph, p.depth]} />
            <meshStandardMaterial color={color.secondary} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Rail overlays on front face */}
      {layout.cols > 1 && (
        <>
          {/* Center vertical stile (mullion) */}
          <mesh position={[0, h / 2, t / 2 + 0.002]}>
            <boxGeometry args={[0.06, h - 0.14, 0.004]} />
            <meshStandardMaterial color={color.primary} roughness={0.35} />
          </mesh>
          <mesh position={[0, h / 2, -(t / 2 + 0.002)]}>
            <boxGeometry args={[0.06, h - 0.14, 0.004]} />
            <meshStandardMaterial color={color.primary} roughness={0.35} />
          </mesh>
        </>
      )}

      {/* Horizontal mid-rails */}
      {Array.from({ length: layout.rows - 1 }).map((_, i) => {
        const innerHeight = h - 0.14;
        const segmentHeight = innerHeight / layout.rows;
        const railY = h - 0.07 - segmentHeight * (i + 1);
        return (
          <group key={`rail-${i}`}>
            <mesh position={[0, railY, t / 2 + 0.002]}>
              <boxGeometry args={[w - 0.12, 0.06, 0.004]} />
              <meshStandardMaterial color={color.primary} roughness={0.35} />
            </mesh>
            <mesh position={[0, railY, -(t / 2 + 0.002)]}>
              <boxGeometry args={[w - 0.12, 0.06, 0.004]} />
              <meshStandardMaterial color={color.primary} roughness={0.35} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
