export const DIMENSION_CONSTRAINTS = {
  width: { min: 600, max: 1200, step: 10, default: 900, unit: 'mm' as const },
  height: { min: 1800, max: 2400, step: 10, default: 2100, unit: 'mm' as const },
  thickness: { min: 35, max: 55, step: 1, default: 44, unit: 'mm' as const },
  frameWidth: { min: 50, max: 120, step: 5, default: 70, unit: 'mm' as const },
};
