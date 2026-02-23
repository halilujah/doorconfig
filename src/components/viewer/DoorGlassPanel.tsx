import { useMemo } from 'react';
import { useDoorStore } from '../../store/useDoorStore';

export function DoorGlassPanel() {
  const style = useDoorStore((s) => s.config.style);
  const dimensions = useDoorStore((s) => s.config.dimensions);
  const color = useDoorStore((s) => s.config.color);

  const w = dimensions.width / 1000;
  const h = dimensions.height / 1000;
  const t = dimensions.thickness / 1000;

  const border = 0.06; // 60mm border around glass
  const glassThickness = t * 0.3;

  const glassPanes = useMemo(() => {
    if (style === 'glass-full') {
      return [{
        x: 0,
        y: h / 2,
        pw: w - border * 2,
        ph: h - border * 2,
      }];
    }

    if (style === 'glass-half') {
      return [{
        x: 0,
        y: h * 0.75,
        pw: w - border * 2,
        ph: h / 2 - border * 1.5,
      }];
    }

    if (style === 'french') {
      const cols = 3;
      const rows = 4;
      const muntinWidth = 0.02;
      const innerW = w - border * 2;
      const innerH = h - border * 2;
      const paneW = (innerW - muntinWidth * (cols - 1)) / cols;
      const paneH = (innerH - muntinWidth * (rows - 1)) / rows;

      const panes: { x: number; y: number; pw: number; ph: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          panes.push({
            x: -innerW / 2 + paneW / 2 + c * (paneW + muntinWidth),
            y: border + paneH / 2 + r * (paneH + muntinWidth),
            pw: paneW - 0.005,
            ph: paneH - 0.005,
          });
        }
      }
      return panes;
    }

    return [];
  }, [style, w, h]);

  if (glassPanes.length === 0) return null;

  // Muntin grid for French doors
  const muntins = useMemo(() => {
    if (style !== 'french') return [];

    const cols = 3;
    const rows = 4;
    const muntinW = 0.02;
    const innerW = w - border * 2;
    const innerH = h - border * 2;
    const paneW = (innerW - muntinW * (cols - 1)) / cols;
    const paneH = (innerH - muntinW * (rows - 1)) / rows;

    const bars: { x: number; y: number; bw: number; bh: number; key: string }[] = [];

    // Vertical muntins
    for (let c = 1; c < cols; c++) {
      bars.push({
        x: -innerW / 2 + c * paneW + (c - 0.5) * muntinW,
        y: h / 2,
        bw: muntinW,
        bh: innerH,
        key: `v-${c}`,
      });
    }

    // Horizontal muntins
    for (let r = 1; r < rows; r++) {
      bars.push({
        x: 0,
        y: border + r * paneH + (r - 0.5) * muntinW,
        bw: innerW,
        bh: muntinW,
        key: `h-${r}`,
      });
    }

    return bars;
  }, [style, w, h]);

  return (
    <group>
      {glassPanes.map((pane, i) => (
        <mesh key={i} position={[pane.x, pane.y, 0]}>
          <boxGeometry args={[pane.pw, pane.ph, glassThickness]} />
          <meshStandardMaterial
            transparent
            opacity={0.25}
            roughness={0.05}
            metalness={0.1}
            color="#dae8f0"
          />
        </mesh>
      ))}

      {muntins.map((bar) => (
        <group key={bar.key}>
          <mesh position={[bar.x, bar.y, t / 2 + 0.001]}>
            <boxGeometry args={[bar.bw, bar.bh, 0.008]} />
            <meshStandardMaterial color={color.primary} roughness={0.4} />
          </mesh>
          <mesh position={[bar.x, bar.y, -(t / 2 + 0.001)]}>
            <boxGeometry args={[bar.bw, bar.bh, 0.008]} />
            <meshStandardMaterial color={color.primary} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
