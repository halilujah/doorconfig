import { useDoorStore } from '../../store/useDoorStore';
import { WOOD_COLORS, METAL_COLORS, COMPOSITE_COLORS, FINISH_OPTIONS } from '../../constants/colors';
import type { DoorMaterial, DoorFinish } from '../../types/door';

function getColorsForMaterial(material: DoorMaterial) {
  switch (material) {
    case 'metal': return METAL_COLORS;
    case 'composite': return COMPOSITE_COLORS;
    case 'glass': return METAL_COLORS;
    default: return WOOD_COLORS;
  }
}

export function ColorPicker() {
  const material = useDoorStore((s) => s.config.material);
  const color = useDoorStore((s) => s.config.color);
  const setColor = useDoorStore((s) => s.setColor);

  const colors = getColorsForMaterial(material);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Primary Color</label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Primary color">
          {colors.map((c) => (
            <button
              key={c.hex}
              role="radio"
              aria-checked={color.primary === c.hex}
              aria-label={c.name}
              onClick={() => setColor({ primary: c.hex })}
              className={`w-9 h-9 rounded-lg border-2 transition-all ${
                color.primary === c.hex
                  ? 'border-door-primary scale-110 shadow-md'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Accent Color</label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Accent color">
          {colors.map((c) => (
            <button
              key={c.hex}
              role="radio"
              aria-checked={color.secondary === c.hex}
              aria-label={c.name}
              onClick={() => setColor({ secondary: c.hex })}
              className={`w-9 h-9 rounded-lg border-2 transition-all ${
                color.secondary === c.hex
                  ? 'border-door-primary scale-110 shadow-md'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Finish</label>
        <div className="flex gap-1" role="radiogroup" aria-label="Surface finish">
          {FINISH_OPTIONS.map((f) => (
            <button
              key={f.id}
              role="radio"
              aria-checked={color.finish === f.id}
              onClick={() => setColor({ finish: f.id as DoorFinish })}
              className={`flex-1 text-xs font-medium py-2 px-1 rounded-md transition-all ${
                color.finish === f.id
                  ? 'bg-door-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
