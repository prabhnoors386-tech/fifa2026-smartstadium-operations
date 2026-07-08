export interface ICrowdMetrics {
  stadiumZone: 'Zone-A' | 'Zone-B' | 'Zone-C' | 'Zone-D';
  currentDensity: number; 
  gateFlowRate: number; 
  activeIncidents: string[];
}

export interface IAIOperationalResponse {
  actionRequired: boolean;
  optimizedRoute: string;
  staffAlertMultilingual: {
    en: string;
    es: string;
    fr: string;
  };
  sustainabilityNote: string;
}
