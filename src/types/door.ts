export type DoorMaterial = 'oak' | 'walnut' | 'mahogany' | 'pine' | 'metal' | 'glass' | 'composite';

export type DoorStyle =
  | 'panel-2'
  | 'panel-4'
  | 'panel-6'
  | 'flush'
  | 'glass-full'
  | 'glass-half'
  | 'french'
  | 'barn'
  | 'craftsman';

export type HandleStyle = 'lever' | 'knob' | 'pull' | 'barn-pull' | 'none';
export type HingeType = 'butt' | 'concealed' | 'pivot' | 'barn-track';
export type DoorFinish = 'matte' | 'satin' | 'gloss' | 'natural' | 'distressed';

export interface DoorDimensions {
  width: number;
  height: number;
  thickness: number;
}

export interface DoorHardware {
  handleStyle: HandleStyle;
  handleColor: string;
  hingeType: HingeType;
  hingeColor: string;
  handleSide: 'left' | 'right';
}

export interface DoorColor {
  primary: string;
  secondary: string;
  finish: DoorFinish;
}

export interface DoorConfiguration {
  dimensions: DoorDimensions;
  material: DoorMaterial;
  style: DoorStyle;
  color: DoorColor;
  hardware: DoorHardware;
  hasFrame: boolean;
  frameWidth: number;
}

export interface MaterialInfo {
  id: DoorMaterial;
  name: string;
  description: string;
  defaultColor: string;
  secondaryColor: string;
  priceMultiplier: number;
}

export interface StyleInfo {
  id: DoorStyle;
  name: string;
  description: string;
  compatibleMaterials: DoorMaterial[];
}
