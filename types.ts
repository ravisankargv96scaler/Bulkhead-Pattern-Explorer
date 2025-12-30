export enum TabId {
  CONCEPT = 'concept',
  PROBLEM = 'problem',
  SOLUTION = 'solution',
  SIMULATION = 'simulation',
  REAL_WORLD = 'real_world',
  QUIZ = 'quiz',
}

export interface RequestDot {
  id: string;
  type: 'fast' | 'slow';
  status: 'pending' | 'processing' | 'rejected' | 'completed';
}

export interface ServiceState {
  id: string;
  name: string;
  latencyMs: number;
  queue: number;
  maxQueue: number;
  status: 'healthy' | 'warning' | 'critical';
}