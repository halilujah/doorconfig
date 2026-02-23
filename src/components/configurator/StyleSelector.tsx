import { useDoorStore } from '../../store/useDoorStore';
import { STYLES } from '../../constants/styles';

const STYLE_ICONS: Record<string, string> = {
  'flush': 'M4 3h16v18H4z',
  'panel-2': 'M4 3h16v18H4zM6 5h12v7H6zM6 14h12v5H6z',
  'panel-4': 'M4 3h16v18H4zM6 5h5v7H6zM13 5h5v7H13zM6 14h5v5H6zM13 14h5v5H13z',
  'panel-6': 'M4 3h16v18H4zM6 5h5v4H6zM13 5h5v4H13zM6 11h5v4H6zM13 11h5v4H13zM6 17h5v2H6zM13 17h5v2H13z',
  'glass-full': 'M4 3h16v18H4zM6 5h12v14H6z',
  'glass-half': 'M4 3h16v18H4zM6 5h12v7H6z',
  'french': 'M4 3h16v18H4zM6 5h3.5v4H6zM10.5 5h3v4h-3zM14.5 5h3.5v4h-3.5zM6 11h3.5v4H6zM10.5 11h3v4h-3zM14.5 11h3.5v4h-3.5z',
  'barn': 'M4 3h16v18H4zM4 12h16M4 3l16 18M20 3L4 21',
  'craftsman': 'M4 3h16v18H4zM6 5h12v6H6zM6 13h5v6H6zM13 13h5v6H13z',
};

export function StyleSelector() {
  const selected = useDoorStore((s) => s.config.style);
  const material = useDoorStore((s) => s.config.material);
  const setStyle = useDoorStore((s) => s.setStyle);

  return (
    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Door style">
      {STYLES.map((style) => {
        const isCompatible = style.compatibleMaterials.includes(material);
        return (
          <button
            key={style.id}
            role="radio"
            aria-checked={selected === style.id}
            aria-disabled={!isCompatible}
            onClick={() => isCompatible && setStyle(style.id)}
            className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg border-2 transition-all ${
              !isCompatible
                ? 'border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed'
                : selected === style.id
                ? 'border-door-primary bg-door-primary/5 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 bg-white cursor-pointer'
            }`}
            title={!isCompatible ? `Not available with ${material}` : style.description}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className={selected === style.id ? 'text-door-primary' : 'text-gray-500'}
            >
              <path d={STYLE_ICONS[style.id] ?? 'M4 3h16v18H4z'} />
            </svg>
            <span className="text-xs font-medium text-gray-700 text-center leading-tight">
              {style.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
