import { useDoorStore } from '../../store/useDoorStore';
import { HARDWARE_COLORS } from '../../constants/colors';
import type { HandleStyle, HingeType } from '../../types/door';

const HANDLE_OPTIONS: { id: HandleStyle; name: string; icon: string }[] = [
  { id: 'lever', name: 'Lever', icon: 'M8 12h8M16 12v-3' },
  { id: 'knob', name: 'Knob', icon: 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0' },
  { id: 'pull', name: 'Pull', icon: 'M12 6v12M10 6h4M10 18h4' },
  { id: 'barn-pull', name: 'Barn Pull', icon: 'M10 4v16M10 4h4v16h-4' },
  { id: 'none', name: 'None', icon: 'M8 8l8 8M16 8l-8 8' },
];

const HINGE_OPTIONS: { id: HingeType; name: string }[] = [
  { id: 'butt', name: 'Butt Hinge' },
  { id: 'concealed', name: 'Concealed' },
  { id: 'pivot', name: 'Pivot' },
  { id: 'barn-track', name: 'Barn Track' },
];

export function HardwareSelector() {
  const hardware = useDoorStore((s) => s.config.hardware);
  const setHardware = useDoorStore((s) => s.setHardware);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Handle Style</label>
        <div className="flex gap-1.5" role="radiogroup" aria-label="Handle style">
          {HANDLE_OPTIONS.map((h) => (
            <button
              key={h.id}
              role="radio"
              aria-checked={hardware.handleStyle === h.id}
              onClick={() => setHardware({ handleStyle: h.id })}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg border-2 transition-all ${
                hardware.handleStyle === h.id
                  ? 'border-door-primary bg-door-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              title={h.name}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d={h.icon} />
              </svg>
              <span className="text-[10px] font-medium text-gray-600">{h.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Handle Color</label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Handle color">
          {HARDWARE_COLORS.map((c) => (
            <button
              key={c.hex}
              role="radio"
              aria-checked={hardware.handleColor === c.hex}
              aria-label={c.name}
              onClick={() => setHardware({ handleColor: c.hex, hingeColor: c.hex })}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                hardware.handleColor === c.hex
                  ? 'border-door-primary scale-110 shadow-md'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Handle Side</label>
        <div className="flex gap-2">
          {(['left', 'right'] as const).map((side) => (
            <button
              key={side}
              onClick={() => setHardware({ handleSide: side })}
              className={`flex-1 py-2 text-sm font-medium rounded-lg border-2 transition-all capitalize ${
                hardware.handleSide === side
                  ? 'border-door-primary bg-door-primary text-white'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {side}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Hinge Type</label>
        <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="Hinge type">
          {HINGE_OPTIONS.map((h) => (
            <button
              key={h.id}
              role="radio"
              aria-checked={hardware.hingeType === h.id}
              onClick={() => setHardware({ hingeType: h.id })}
              className={`py-2 px-3 text-xs font-medium rounded-lg border-2 transition-all ${
                hardware.hingeType === h.id
                  ? 'border-door-primary bg-door-primary/5 text-door-primary'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {h.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
