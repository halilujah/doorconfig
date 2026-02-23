import type { StyleInfo, DoorMaterial } from '../types/door';

const ALL_MATERIALS: DoorMaterial[] = ['oak', 'walnut', 'mahogany', 'pine', 'metal', 'glass', 'composite'];
const WOOD_MATERIALS: DoorMaterial[] = ['oak', 'walnut', 'mahogany', 'pine'];
const SOLID_MATERIALS: DoorMaterial[] = ['oak', 'walnut', 'mahogany', 'pine', 'metal', 'composite'];

export const STYLES: StyleInfo[] = [
  { id: 'flush', name: 'Flush', description: 'Clean, flat surface', compatibleMaterials: ALL_MATERIALS },
  { id: 'panel-2', name: '2-Panel', description: 'Traditional two-panel design', compatibleMaterials: SOLID_MATERIALS },
  { id: 'panel-4', name: '4-Panel', description: 'Classic four-panel design', compatibleMaterials: SOLID_MATERIALS },
  { id: 'panel-6', name: '6-Panel', description: 'Colonial six-panel design', compatibleMaterials: SOLID_MATERIALS },
  { id: 'glass-full', name: 'Full Glass', description: 'Full-length glass panel', compatibleMaterials: ALL_MATERIALS },
  { id: 'glass-half', name: 'Half Glass', description: 'Glass top, solid bottom', compatibleMaterials: SOLID_MATERIALS },
  { id: 'french', name: 'French', description: 'Multiple glass panes with muntins', compatibleMaterials: WOOD_MATERIALS },
  { id: 'barn', name: 'Barn', description: 'Rustic barn-style with cross braces', compatibleMaterials: WOOD_MATERIALS },
  { id: 'craftsman', name: 'Craftsman', description: 'Arts & Crafts style panels', compatibleMaterials: WOOD_MATERIALS },
];
