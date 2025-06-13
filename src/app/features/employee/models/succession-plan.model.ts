export interface SuccessionPlan {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  operations: string;
  manager: string;
  potential: 'High Potential' | 'Potential to Watch' | 'Lateral Potential' | 'At Potential';
  criticalTalent: boolean;
  readinessLevel: 'Ready Now' | 'Ready in 1-2 Years' | 'Ready in 3-5 Years' | 'Not Ready';
  developmentNeeds: string;
  targetedInterventions: string;
  comments: string;
  lastUpdated: Date;
  createdBy: string;
} 