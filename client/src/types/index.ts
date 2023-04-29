interface PredictionType {
  confidence: number;
  disease: string;
  diseaseId: number;
  symptoms: string;
}

export interface ResultType {
  error?: string;
  success: boolean;
  time: number;
  prediction?: PredictionType;
}
