import { useDoorStore } from '../../store/useDoorStore';
import { MATERIALS } from '../../constants/materials';
import { STYLES } from '../../constants/styles';
import { usePriceEstimate } from '../../hooks/usePriceEstimate';

export function SummaryCard() {
  const config = useDoorStore((s) => s.config);
  const { low, high } = usePriceEstimate();

  const matName = MATERIALS.find((m) => m.id === config.material)?.name ?? config.material;
  const styleName = STYLES.find((s) => s.id === config.style)?.name ?? config.style;
  const { width, height, thickness } = config.dimensions;

  return (
    <div className="bg-door-surface rounded-lg p-3 space-y-2">
      <h3 className="text-sm font-semibold text-gray-800">Summary</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className="text-gray-500">Dimensions</span>
        <span className="text-gray-800 font-medium text-right">{width} x {height} x {thickness} mm</span>
        <span className="text-gray-500">Material</span>
        <span className="text-gray-800 font-medium text-right">{matName}</span>
        <span className="text-gray-500">Style</span>
        <span className="text-gray-800 font-medium text-right">{styleName}</span>
        <span className="text-gray-500">Finish</span>
        <span className="text-gray-800 font-medium text-right capitalize">{config.color.finish}</span>
        <span className="text-gray-500">Handle</span>
        <span className="text-gray-800 font-medium text-right capitalize">{config.hardware.handleStyle}</span>
        <span className="text-gray-500">Frame</span>
        <span className="text-gray-800 font-medium text-right">{config.hasFrame ? `Yes (${config.frameWidth}mm)` : 'No'}</span>
      </div>
      <div className="pt-2 border-t border-door-border">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-gray-500">Est. Price</span>
          <span className="text-lg font-bold text-door-primary">${low} – ${high}</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5">Estimate only — contact supplier for exact pricing</p>
      </div>
    </div>
  );
}
