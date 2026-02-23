import type { ReactNode } from 'react';

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="w-[380px] shrink-0 border-r border-door-border bg-white overflow-y-auto">
      {children}
    </aside>
  );
}
