import type { HandleStyle, HingeType, DoorStyle } from '../types/door';

export const BASE_PRICE_PER_SQM = 200; // base price per square meter in USD

export const HANDLE_PRICES: Record<HandleStyle, number> = {
  lever: 45,
  knob: 25,
  pull: 55,
  'barn-pull': 65,
  none: 0,
};

export const HINGE_PRICES: Record<HingeType, number> = {
  butt: 15,
  concealed: 30,
  pivot: 50,
  'barn-track': 120,
};

export const GLASS_SURCHARGE_PER_SQM = 150;

export const GLASS_STYLES: DoorStyle[] = ['glass-full', 'glass-half', 'french'];

export function getGlassAreaFraction(style: DoorStyle): number {
  switch (style) {
    case 'glass-full': return 0.75;
    case 'glass-half': return 0.40;
    case 'french': return 0.60;
    default: return 0;
  }
}
