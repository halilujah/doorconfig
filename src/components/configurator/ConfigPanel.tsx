import { useDoorStore } from '../../store/useDoorStore';
import { DimensionInput } from './DimensionInput';
import { MaterialSelector } from './MaterialSelector';
import { StyleSelector } from './StyleSelector';
import { ColorPicker } from './ColorPicker';
import { HardwareSelector } from './HardwareSelector';
import { SummaryCard } from './SummaryCard';
import { GeneratePdfButton } from '../pdf/GeneratePdfButton';

type Section = 'dimensions' | 'material' | 'style' | 'color' | 'hardware';

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'material', label: 'Material' },
  { id: 'style', label: 'Style' },
  { id: 'color', label: 'Color & Finish' },
  { id: 'hardware', label: 'Hardware' },
];

function AccordionSection({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-door-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        {label}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export function ConfigPanel() {
  const activeSection = useDoorStore((s) => s.activeSection);
  const setActiveSection = useDoorStore((s) => s.setActiveSection);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {SECTIONS.map((section) => (
          <AccordionSection
            key={section.id}
            label={section.label}
            isOpen={activeSection === section.id}
            onToggle={() => setActiveSection(section.id)}
          >
            {section.id === 'dimensions' && <DimensionInput />}
            {section.id === 'material' && <MaterialSelector />}
            {section.id === 'style' && <StyleSelector />}
            {section.id === 'color' && <ColorPicker />}
            {section.id === 'hardware' && <HardwareSelector />}
          </AccordionSection>
        ))}
        <div className="p-4">
          <SummaryCard />
        </div>
      </div>
      <div className="p-4 border-t border-door-border bg-white">
        <GeneratePdfButton />
      </div>
    </div>
  );
}
