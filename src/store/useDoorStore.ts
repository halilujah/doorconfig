import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  DoorConfiguration,
  DoorDimensions,
  DoorMaterial,
  DoorStyle,
  DoorColor,
  DoorHardware,
} from '../types/door';
import { MATERIALS } from '../constants/materials';

type ActiveSection = 'dimensions' | 'material' | 'style' | 'color' | 'hardware';

interface DoorStore {
  config: DoorConfiguration;
  activeSection: ActiveSection;
  isGeneratingPdf: boolean;

  setDimensions: (dims: Partial<DoorDimensions>) => void;
  setMaterial: (material: DoorMaterial) => void;
  setStyle: (style: DoorStyle) => void;
  setColor: (color: Partial<DoorColor>) => void;
  setHardware: (hardware: Partial<DoorHardware>) => void;
  setHasFrame: (hasFrame: boolean) => void;
  setFrameWidth: (width: number) => void;
  setActiveSection: (section: ActiveSection) => void;
  setIsGeneratingPdf: (generating: boolean) => void;
  resetConfig: () => void;
}

const DEFAULT_CONFIG: DoorConfiguration = {
  dimensions: { width: 900, height: 2100, thickness: 44 },
  material: 'oak',
  style: 'panel-4',
  color: { primary: '#8B6914', secondary: '#A0782C', finish: 'satin' },
  hardware: {
    handleStyle: 'lever',
    handleColor: '#C0C0C0',
    hingeType: 'butt',
    hingeColor: '#C0C0C0',
    handleSide: 'right',
  },
  hasFrame: true,
  frameWidth: 70,
};

export const useDoorStore = create<DoorStore>()(
  subscribeWithSelector((set) => ({
    config: DEFAULT_CONFIG,
    activeSection: 'dimensions',
    isGeneratingPdf: false,

    setDimensions: (dims) =>
      set((state) => ({
        config: {
          ...state.config,
          dimensions: { ...state.config.dimensions, ...dims },
        },
      })),

    setMaterial: (material) =>
      set((state) => {
        const matInfo = MATERIALS.find((m) => m.id === material);
        return {
          config: {
            ...state.config,
            material,
            color: {
              ...state.config.color,
              primary: matInfo?.defaultColor ?? state.config.color.primary,
              secondary: matInfo?.secondaryColor ?? state.config.color.secondary,
            },
          },
        };
      }),

    setStyle: (style) =>
      set((state) => ({
        config: { ...state.config, style },
      })),

    setColor: (color) =>
      set((state) => ({
        config: {
          ...state.config,
          color: { ...state.config.color, ...color },
        },
      })),

    setHardware: (hardware) =>
      set((state) => ({
        config: {
          ...state.config,
          hardware: { ...state.config.hardware, ...hardware },
        },
      })),

    setHasFrame: (hasFrame) =>
      set((state) => ({ config: { ...state.config, hasFrame } })),

    setFrameWidth: (width) =>
      set((state) => ({ config: { ...state.config, frameWidth: width } })),

    setActiveSection: (activeSection) => set({ activeSection }),
    setIsGeneratingPdf: (isGeneratingPdf) => set({ isGeneratingPdf }),
    resetConfig: () => set({ config: DEFAULT_CONFIG, activeSection: 'dimensions' }),
  }))
);
