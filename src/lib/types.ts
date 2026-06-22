export type Persona = "factory" | "provider" | "operator";

export type InitiativePath =
  | "transformation"
  | "innovation"
  | "training"
  | "marketplace";

export type JourneyStage =
  | "self_assessment"
  | "consultant_selection"
  | "audited_assessment"
  | "grant_application"
  | "provider_matching"
  | "implementation"
  | "milestones"
  | "lighthouse";

export interface Initiative {
  id: InitiativePath;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  programs: string[];
  icon: string;
}

export interface AssessmentAnswer {
  questionId: string;
  value: string | number | boolean;
}

export interface AIRecommendation {
  path: InitiativePath;
  confidence: number;
  reasons: { ar: string; en: string }[];
  nextSteps: { ar: string; en: string }[];
  eligibleForGrant: boolean;
  trlLevel?: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  nameAr: string;
  solutions: string[];
  modules: string[];
  otIntegration: boolean;
  factoriesServed: number;
  avgROI: number;
  paybackMonths: number;
  readinessScore: number;
  status: "approved" | "pending" | "incomplete";
  contactEmail: string;
  contactPhone: string;
}

export interface FactoryProfile {
  id: string;
  name: string;
  nameAr: string;
  sector: string;
  size: "small" | "medium" | "large";
  readinessScore: number;
  currentStage: JourneyStage;
  badges: string[];
  matchedProviders: string[];
}

export interface OperatorCase {
  id: string;
  type: "exception" | "verification" | "grant_review" | "milestone";
  titleAr: string;
  titleEn: string;
  entity: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_review" | "resolved";
  aiSummary: { ar: string; en: string };
}

export interface TrainingProgram {
  id: string;
  titleAr: string;
  titleEn: string;
  audience: string[];
  duration: string;
  format: "workshop" | "course" | "webinar";
}

export interface ProviderFormData {
  commercialRegistration: string;
  saudiAddress: string;
  solutionType: "erp" | "ot_automation";
  modules: string[];
  otIntegration: boolean;
  invoicesUploaded: number;
  factoryReferences: number;
  avgROI: string;
  paybackPeriod: string;
  contactPhone: string;
  contactEmail: string;
}

export interface ValidationResult {
  field: string;
  status: "valid" | "warning" | "error";
  messageAr: string;
  messageEn: string;
}
