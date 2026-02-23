import { useDoorStore } from '../store/useDoorStore';
import { MATERIALS } from '../constants/materials';
import {
  BASE_PRICE_PER_SQM,
  HANDLE_PRICES,
  HINGE_PRICES,
  GLASS_SURCHARGE_PER_SQM,
  getGlassAreaFraction,
} from '../constants/pricing';

export function usePriceEstimate(): { low: number; high: number } {
  const config = useDoorStore((s) => s.config);
  const { dimensions, material, style, hardware } = config;

  const areaSqm = (dimensions.width / 1000) * (dimensions.height / 1000);
  const matInfo = MATERIALS.find((m) => m.id === material);
  const multiplier = matInfo?.priceMultiplier ?? 1.0;

  let base = areaSqm * BASE_PRICE_PER_SQM * multiplier;

  const glassFraction = getGlassAreaFraction(style);
  if (glassFraction > 0) {
    base += areaSqm * glassFraction * GLASS_SURCHARGE_PER_SQM;
  }

  base += HANDLE_PRICES[hardware.handleStyle];
  base += HINGE_PRICES[hardware.hingeType] * 3; // 3 hinges

  const low = Math.round(base * 0.9);
  const high = Math.round(base * 1.1);

  return { low, high };
}
