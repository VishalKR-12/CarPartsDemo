import { DetectedPart, DetectionResult } from '../context/DetectionContext';

// Simulated car parts with their typical characteristics
const CAR_PARTS = [
  { name: 'Headlight', color: '#3B82F6', minSize: 0.02, maxSize: 0.08 },
  { name: 'Bumper', color: '#EF4444', minSize: 0.15, maxSize: 0.25 },
  { name: 'Wheel', color: '#10B981', minSize: 0.08, maxSize: 0.15 },
  { name: 'Mirror', color: '#F59E0B', minSize: 0.01, maxSize: 0.03 },
  { name: 'Door Handle', color: '#8B5CF6', minSize: 0.005, maxSize: 0.02 },
  { name: 'License Plate', color: '#06B6D4', minSize: 0.01, maxSize: 0.04 },
  { name: 'Grille', color: '#EC4899', minSize: 0.03, maxSize: 0.08 },
  { name: 'Hood', color: '#84CC16', minSize: 0.12, maxSize: 0.20 },
];

export function simulateDetection(
  imageWidth: number,
  imageHeight: number,
  confidenceThreshold: number = 0.7
): Promise<DetectionResult> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    // Simulate processing delay
    setTimeout(() => {
      const detectedParts: DetectedPart[] = [];
      const numParts = Math.floor(Math.random() * 6) + 3; // 3-8 parts
      
      for (let i = 0; i < numParts; i++) {
        const part = CAR_PARTS[Math.floor(Math.random() * CAR_PARTS.length)];
        const confidence = Math.random() * 0.3 + 0.7; // 0.7-1.0
        
        if (confidence >= confidenceThreshold) {
          const sizeRatio = Math.random() * (part.maxSize - part.minSize) + part.minSize;
          const width = imageWidth * sizeRatio;
          const height = width * (0.5 + Math.random() * 0.5); // Aspect ratio variation
          
          const x = Math.random() * (imageWidth - width);
          const y = Math.random() * (imageHeight - height);
          
          detectedParts.push({
            id: `part_${Date.now()}_${i}`,
            name: part.name,
            confidence: Math.round(confidence * 100) / 100,
            bbox: { x, y, width, height },
            area: width * height,
            color: part.color,
          });
        }
      }
      
      const totalArea = imageWidth * imageHeight;
      const coveredArea = detectedParts.reduce((sum, part) => sum + part.area, 0);
      const coverage = Math.round((coveredArea / totalArea) * 100 * 100) / 100;
      
      const processingTime = Date.now() - startTime;
      const accuracy = Math.round((85 + Math.random() * 10) * 100) / 100; // 85-95%
      
      resolve({
        id: `detection_${Date.now()}`,
        timestamp: new Date(),
        totalParts: detectedParts.length,
        totalCoverage: coverage,
        accuracy,
        processingTime,
        parts: detectedParts,
      });
    }, 500 + Math.random() * 1000); // 0.5-1.5s processing time
  });
}

export function drawDetections(
  canvas: HTMLCanvasElement,
  parts: DetectedPart[],
  showLabels: boolean = true
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  parts.forEach((part) => {
    const { bbox, name, confidence, color } = part;
    
    // Draw bounding box
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
    
    // Draw filled corner indicator
    ctx.fillStyle = color;
    ctx.fillRect(bbox.x, bbox.y, 8, 8);
    
    if (showLabels) {
      // Draw label background
      const labelText = `${name} (${Math.round(confidence * 100)}%)`;
      ctx.font = '14px Inter, system-ui, sans-serif';
      const textMetrics = ctx.measureText(labelText);
      const textWidth = textMetrics.width + 16;
      const textHeight = 24;
      
      const labelX = bbox.x;
      const labelY = bbox.y - textHeight - 4;
      
      ctx.fillStyle = color;
      ctx.fillRect(labelX, labelY, textWidth, textHeight);
      
      // Draw label text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Inter, system-ui, sans-serif';
      ctx.fillText(labelText, labelX + 8, labelY + 16);
    }
  });
}

export function calculateMetrics(parts: DetectedPart[], imageArea: number) {
  const totalCoverage = parts.reduce((sum, part) => sum + part.area, 0) / imageArea * 100;
  const averageConfidence = parts.reduce((sum, part) => sum + part.confidence, 0) / parts.length;
  const partsByType = parts.reduce((acc, part) => {
    acc[part.name] = (acc[part.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalCoverage: Math.round(totalCoverage * 100) / 100,
    averageConfidence: Math.round(averageConfidence * 100) / 100,
    partsByType,
    totalParts: parts.length,
  };
}