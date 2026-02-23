import { useMemo } from 'react';
import { useDoorStore } from '../../store/useDoorStore';
import type { DoorFinish } from '../../types/door';

function useDoorMaterial() {
  const material = useDoorStore((s) => s.config.material);
  const color = useDoorStore((s) => s.config.color);

  return useMemo(() => {
    const props: {
      color: string;
      roughness: number;
      metalness: number;
      transparent?: boolean;
      opacity?: number;
    } = {
      color: color.primary,
      roughness: 0.5,
      metalness: 0,
    };

    const finishRoughness: Record<DoorFinish, number> = {
      gloss: 0.1, satin: 0.3, matte: 0.8, natural: 0.6, distressed: 0.9,
    };
    props.roughness = finishRoughness[color.finish];

    if (material === 'metal') {
      props.metalness = 0.9;
      props.roughness = 0.2;
    }
    if (material === 'glass') {
      props.transparent = true;
      props.opacity = 0.2;
      props.roughness = 0.05;
    }

    return props;
  }, [material, color]);
}

function SolidPanel({ w, h, t }: { w: number; h: number; t: number }) {
  const matProps = useDoorMaterial();
  return (
    <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[w, h, t]} />
      <meshStandardMaterial {...matProps} />
    </mesh>
  );
}

/** Border strips around glass opening */
function BorderStrips({
  w, h, t, border,
}: { w: number; h: number; t: number; border: number }) {
  const matProps = useDoorMaterial();
  return (
    <group>
      {/* Left strip */}
      <mesh position={[-(w / 2 - border / 2), h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[border, h, t]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Right strip */}
      <mesh position={[w / 2 - border / 2, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[border, h, t]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Top strip */}
      <mesh position={[0, h - border / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w - border * 2, border, t]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Bottom strip */}
      <mesh position={[0, border / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w - border * 2, border, t]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
}

/** Bottom solid half + border strips around top glass area */
function HalfGlassPanel({
  w, h, t, border,
}: { w: number; h: number; t: number; border: number }) {
  const matProps = useDoorMaterial();
  const solidHeight = h / 2;
  return (
    <group>
      {/* Solid bottom half */}
      <mesh position={[0, solidHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, solidHeight, t]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Left strip (top half) */}
      <mesh position={[-(w / 2 - border / 2), solidHeight + (h - solidHeight) / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[border, h - solidHeight, t]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Right strip (top half) */}
      <mesh position={[w / 2 - border / 2, solidHeight + (h - solidHeight) / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[border, h - solidHeight, t]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Top strip */}
      <mesh position={[0, h - border / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w - border * 2, border, t]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
}

export function DoorPanel() {
  const dimensions = useDoorStore((s) => s.config.dimensions);
  const style = useDoorStore((s) => s.config.style);

  const w = dimensions.width / 1000;
  const h = dimensions.height / 1000;
  const t = dimensions.thickness / 1000;
  const border = 0.06; // matches DoorGlassPanel border

  switch (style) {
    case 'glass-full':
    case 'french':
      return <BorderStrips w={w} h={h} t={t} border={border} />;
    case 'glass-half':
      return <HalfGlassPanel w={w} h={h} t={t} border={border} />;
    default:
      return <SolidPanel w={w} h={h} t={t} />;
  }
}
