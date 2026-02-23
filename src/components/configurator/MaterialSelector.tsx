import { useDoorStore } from '../../store/useDoorStore';
import { MATERIALS } from '../../constants/materials';

export function MaterialSelector() {
  const selected = useDoorStore((s) => s.config.material);
  const setMaterial = useDoorStore((s) => s.setMaterial);

  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Door material">
      {MATERIALS.map((mat) => (
        <button
          key={mat.id}
          role="radio"
          aria-checked={selected === mat.id}
          onClick={() => setMaterial(mat.id)}
          className={`flex items-start gap-2.5 p-3 rounded-lg border-2 text-left transition-all ${
            selected === mat.id
              ? 'border-door-primary bg-door-primary/5 shadow-sm'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div
            className="w-8 h-8 rounded-md shrink-0 border border-gray-200"
            style={{ backgroundColor: mat.defaultColor }}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-800 truncate">{mat.name}</div>
            <div className="text-xs text-gray-500 leading-tight">{mat.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
