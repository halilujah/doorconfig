import { useDoorStore } from '../../store/useDoorStore';
import { generateDoorPdf } from './pdfGenerator';

export function GeneratePdfButton() {
  const config = useDoorStore((s) => s.config);
  const isGenerating = useDoorStore((s) => s.isGeneratingPdf);
  const setIsGenerating = useDoorStore((s) => s.setIsGeneratingPdf);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateDoorPdf(config);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className="w-full bg-door-primary hover:bg-door-primary/90 text-white font-medium
                 py-3 px-4 rounded-lg transition-colors disabled:opacity-50
                 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      aria-label="Download specification PDF"
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating...
        </>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Spec PDF
        </>
      )}
    </button>
  );
}
