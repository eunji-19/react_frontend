export interface Model {
  statusMessage: StatusMessage;
}

export interface StatusMessage {
  succeed: boolean;
  models: ModelElement[];
  error?: string;
  errorCode?: number;
  description?: string;
}

export interface ModelElement {
  id: string;
  label: Expertise;
  expertise: Expertise;
  imgPath: string;
  clothes: Clothe[];
  language: string[];
  gpuType: string;
}

export interface Clothe {
  id: string;
  label: Expertise;
  imgPath: string;
  intro: string;
}

export interface Expertise {
  en: string;
  ko: string;
  zh: string;
}

export interface ModelInfo {
  imgUrl: string;
  name: string;
  language: string[];
  expertise: string;
  clothes: Clothe[];
  modelId: string;
}