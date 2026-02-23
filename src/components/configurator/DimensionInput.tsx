import { useDoorStore } from '../../store/useDoorStore';
import { DIMENSION_CONSTRAINTS } from '../../constants/dimensions';

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v >= min && v <= max) onChange(v);
            }}
            className="w-16 text-right text-sm border border-gray-300 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-door-primary"
            aria-label={`${label} value`}
          />
          <span className="text-xs text-gray-500 w-6">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

export function DimensionInput() {
  const dimensions = useDoorStore((s) => s.config.dimensions);
  const hasFrame = useDoorStore((s) => s.config.hasFrame);
  const frameWidth = useDoorStore((s) => s.config.frameWidth);
  const setDimensions = useDoorStore((s) => s.setDimensions);
  const setHasFrame = useDoorStore((s) => s.setHasFrame);
  const setFrameWidth = useDoorStore((s) => s.setFrameWidth);

  const c = DIMENSION_CONSTRAINTS;

  return (
    <div className="space-y-4">
      <Slider
        label="Width"
        value={dimensions.width}
        min={c.width.min}
        max={c.width.max}
        step={c.width.step}
        unit="mm"
        onChange={(v) => setDimensions({ width: v })}
      />
      <Slider
        label="Height"
        value={dimensions.height}
        min={c.height.min}
        max={c.height.max}
        step={c.height.step}
        unit="mm"
        onChange={(v) => setDimensions({ height: v })}
      />
      <Slider
        label="Thickness"
        value={dimensions.thickness}
        min={c.thickness.min}
        max={c.thickness.max}
        step={c.thickness.step}
        unit="mm"
        onChange={(v) => setDimensions({ thickness: v })}
      />
      <div className="pt-2 border-t border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasFrame}
            onChange={(e) => setHasFrame(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-door-primary focus:ring-door-primary"
          />
          <span className="text-sm font-medium text-gray-700">Include Frame</span>
        </label>
        {hasFrame && (
          <div className="mt-3">
            <Slider
              label="Frame Width"
              value={frameWidth}
              min={c.frameWidth.min}
              max={c.frameWidth.max}
              step={c.frameWidth.step}
              unit="mm"
              onChange={setFrameWidth}
            />
          </div>
        )}
      </div>
    </div>
  );
}
