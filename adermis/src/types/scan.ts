export interface ScanResult {
    condition: string;
    confidence: number;
    severity: 'Low' | 'Medium' | 'High';
    description: string;
    recommendations: string[];
  }
  
  export interface ScanHistoryItem {
    id: number;
    date: string;
    condition: string;
    confidence: number;
    severity: 'Low' | 'Medium' | 'High';
    imageUrl: string;
  }