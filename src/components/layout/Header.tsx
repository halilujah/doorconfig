import { useDoorStore } from '../../store/useDoorStore';

export function Header() {
  const resetConfig = useDoorStore((s) => s.resetConfig);

  return (
    <header className="h-14 bg-door-primary text-white flex items-center justify-between px-4 shrink-0 z-20">
      <div className="flex items-center gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
          <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
          <circle cx="15" cy="11" r="1" />
        </svg>
        <h1 className="text-lg font-semibold tracking-tight">Door Configurator</h1>
      </div>
      <button
        onClick={resetConfig}
        className="text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded hover:bg-white/10"
        aria-label="Reset configuration to defaults"
      >
        Reset
      </button>
    </header>
  );
}
