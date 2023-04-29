export interface PredictionType {
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

export interface SettingsType {
  haptics: boolean;
  sound: boolean;
  music: boolean;
}
