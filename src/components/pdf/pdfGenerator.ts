import jsPDF from 'jspdf';
import type { DoorConfiguration } from '../../types/door';
import { MATERIALS } from '../../constants/materials';
import { STYLES } from '../../constants/styles';
import { captureCanvasScreenshot } from '../../utils/screenshot';
import {
  BASE_PRICE_PER_SQM,
  HANDLE_PRICES,
  HINGE_PRICES,
  GLASS_SURCHARGE_PER_SQM,
  getGlassAreaFraction,
} from '../../constants/pricing';

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function computePrice(config: DoorConfiguration): { low: number; high: number } {
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
  base += HINGE_PRICES[hardware.hingeType] * 3;
  return { low: Math.round(base * 0.9), high: Math.round(base * 1.1) };
}

export async function generateDoorPdf(config: DoorConfiguration): Promise<void> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  let y = margin;

  // Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 95);
  doc.text('Door Specification Sheet', margin, y + 8);
  y += 14;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, y);
  y += 8;

  doc.setDrawColor(210, 205, 200);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // 3D Preview
  const screenshot = captureCanvasScreenshot();
  if (screenshot) {
    const imgWidth = contentWidth;
    const imgHeight = imgWidth * 0.55;
    doc.addImage(screenshot, 'JPEG', margin, y, imgWidth, imgHeight);
    y += imgHeight + 8;
  }

  // Section helper
  const sectionTitle = (title: string) => {
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 95);
    doc.text(title, margin, y);
    y += 6;
  };

  const row = (label: string, value: string) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(label, margin + 4, y);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text(value, margin + contentWidth, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    y += 5.5;
  };

  // Dimensions
  sectionTitle('Dimensions');
  const d = config.dimensions;
  row('Width', `${d.width} mm (${(d.width / 25.4).toFixed(1)}")`);
  row('Height', `${d.height} mm (${(d.height / 25.4).toFixed(1)}")`);
  row('Thickness', `${d.thickness} mm (${(d.thickness / 25.4).toFixed(1)}")`);
  if (config.hasFrame) {
    row('Frame Width', `${config.frameWidth} mm`);
  }
  y += 4;

  // Material
  sectionTitle('Material & Finish');
  const matInfo = MATERIALS.find((m) => m.id === config.material);
  row('Material', matInfo?.name ?? config.material);
  row('Finish', config.color.finish.charAt(0).toUpperCase() + config.color.finish.slice(1));
  y += 4;

  // Style
  sectionTitle('Style');
  const styleInfo = STYLES.find((s) => s.id === config.style);
  row('Door Style', styleInfo?.name ?? config.style);
  y += 4;

  // Hardware
  sectionTitle('Hardware');
  row('Handle', config.hardware.handleStyle.charAt(0).toUpperCase() + config.hardware.handleStyle.slice(1));
  row('Handle Side', config.hardware.handleSide.charAt(0).toUpperCase() + config.hardware.handleSide.slice(1));
  row('Hinge Type', config.hardware.hingeType.charAt(0).toUpperCase() + config.hardware.hingeType.slice(1));
  y += 4;

  // Colors
  sectionTitle('Colors');
  y += 2;
  const [pr, pg, pb] = hexToRgb(config.color.primary);
  doc.setFillColor(pr, pg, pb);
  doc.roundedRect(margin + 4, y - 4, 8, 8, 1, 1, 'F');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text(`Primary: ${config.color.primary}`, margin + 16, y + 1);
  y += 10;

  const [sr, sg, sb] = hexToRgb(config.color.secondary);
  doc.setFillColor(sr, sg, sb);
  doc.roundedRect(margin + 4, y - 4, 8, 8, 1, 1, 'F');
  doc.text(`Accent: ${config.color.secondary}`, margin + 16, y + 1);
  y += 12;

  // Price estimate
  const { low, high } = computePrice(config);
  sectionTitle('Price Estimate');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 95);
  doc.text(`$${low} – $${high}`, margin + 4, y + 1);
  y += 6;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text('Estimate only — contact supplier for exact pricing.', margin + 4, y);

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(170, 170, 170);
  doc.text('Generated by Door Configurator. This specification sheet is for reference only.', margin, pageHeight - 8);

  doc.save(`door-specification-${Date.now()}.pdf`);
}
