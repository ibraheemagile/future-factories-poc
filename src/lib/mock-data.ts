import type {
  FactoryProfile,
  Initiative,
  OperatorCase,
  ServiceProvider,
  TrainingProgram,
} from "./types";

export const VISION = {
  titleAr: "بوابة مركز القدرات الصناعية",
  titleEn: "Industrial Capabilities Center Portal",
  subtitleAr:
    "منصة موحدة لبرامج التحول الصناعي — مصانع المستقبل، منح الابتكار، الدورات، ومقدمي الحلول",
  subtitleEn:
    "Unified platform for industrial transformation — Future Factories, innovation grants, training, and solution providers",
  planningNoteAr: "نموذج أولي — مرحلة التخطيط",
  planningNoteEn: "Prototype — Planning Phase",
};

export const portalStats = {
  registeredFactories: 847,
  activeProviders: 156,
  transformationProjects: 312,
  pendingReviews: 23,
};

export const initiatives: Initiative[] = [
  {
    id: "transformation",
    titleAr: "مسار التحول الصناعي",
    titleEn: "Industrial Transformation Path",
    descriptionAr:
      "مصانع المستقبل، التقييم الذاتي، التقييم المدقق، المنح، والمنارات الصناعية",
    descriptionEn:
      "Future Factories, self-assessment, audited assessment, grants, and Lighthouse progression",
    programs: [
      "مصانع المستقبل",
      "ثورة صناعية رابعة",
      "المنارات الصناعية",
    ],
    icon: "factory",
  },
  {
    id: "innovation",
    titleAr: "مسار الابتكار الصناعي",
    titleEn: "Industrial Innovation Path",
    descriptionAr:
      "منح المصانع الابتكارية — TRL 4-7، تمويل حتى 70% بحد أقصى 2 مليون ريال",
    descriptionEn:
      "Innovation factory grants — TRL 4-7, up to 70% funding capped at SAR 2M",
    programs: ["منح المصانع الابتكارية", "برنامج رافد"],
    icon: "lightbulb",
  },
  {
    id: "training",
    titleAr: "الدورات وورش العمل",
    titleEn: "Training & Workshops",
    descriptionAr:
      "برامج تدريبية للمصانع والمستثمرين ومقدمي الخدمات",
    descriptionEn:
      "Training programs for factories, investors, and service providers",
    programs: ["ورش النضج الرقمي", "مؤشر سيري", "الثورة الصناعية الرابعة"],
    icon: "graduation",
  },
  {
    id: "marketplace",
    titleAr: "سوق مقدمي الخدمات",
    titleEn: "Service Provider Marketplace",
    descriptionAr:
      "تسجيل الموردين، التحقق الآلي، ومطابقة الحلول مع المصانع",
    descriptionEn:
      "Provider registration, automated verification, and solution matching",
    programs: ["ERP/SCM/CRM", "أتمتة OT", "تكامل IT-OT"],
    icon: "store",
  },
];

export const journeyStages = [
  {
    id: "self_assessment" as const,
    titleAr: "التقييم الذاتي",
    titleEn: "Self-Assessment",
    order: 1,
  },
  {
    id: "consultant_selection" as const,
    titleAr: "اختيار المستشار",
    titleEn: "Consultant Selection",
    order: 2,
  },
  {
    id: "audited_assessment" as const,
    titleAr: "التقييم المدقق",
    titleEn: "Audited Assessment",
    order: 3,
  },
  {
    id: "grant_application" as const,
    titleAr: "طلب المنحة",
    titleEn: "Grant Application",
    order: 4,
  },
  {
    id: "provider_matching" as const,
    titleAr: "مطابقة مقدمي الخدمات",
    titleEn: "Provider Matching",
    order: 5,
  },
  {
    id: "implementation" as const,
    titleAr: "تنفيذ الحل",
    titleEn: "Solution Implementation",
    order: 6,
  },
  {
    id: "milestones" as const,
    titleAr: "تقديم المراحل",
    titleEn: "Milestone Submission",
    order: 7,
  },
  {
    id: "lighthouse" as const,
    titleAr: "المنارة الصناعية",
    titleEn: "Industrial Lighthouse",
    order: 8,
  },
];

export const assessmentQuestions = [
  {
    id: "user_type",
    questionAr: "ما نوع منشأتك؟",
    questionEn: "What type of entity are you?",
    options: [
      { value: "factory", labelAr: "مصنع قائم", labelEn: "Established Factory" },
      { value: "investor", labelAr: "مستثمر", labelEn: "Investor" },
      { value: "entrepreneur", labelAr: "رائد أعمال", labelEn: "Entrepreneur" },
    ],
  },
  {
    id: "sector",
    questionAr: "ما القطاع الصناعي؟",
    questionEn: "What is your industrial sector?",
    options: [
      { value: "food", labelAr: "الأغذية", labelEn: "Food & Beverage" },
      { value: "metals", labelAr: "المعادن", labelEn: "Metals" },
      { value: "chemicals", labelAr: "الكيماويات", labelEn: "Chemicals" },
      { value: "plastics", labelAr: "البلاستيك", labelEn: "Plastics" },
    ],
  },
  {
    id: "digital_maturity",
    questionAr: "ما مستوى النضج الرقمي الحالي؟",
    questionEn: "What is your current digital maturity level?",
    options: [
      { value: "low", labelAr: "مبتدئ", labelEn: "Beginner" },
      { value: "medium", labelAr: "متوسط", labelEn: "Intermediate" },
      { value: "high", labelAr: "متقدم", labelEn: "Advanced" },
    ],
  },
  {
    id: "has_prototype",
    questionAr: "هل لديك نموذج أولي (Prototype)؟",
    questionEn: "Do you have a working prototype?",
    options: [
      { value: "yes", labelAr: "نعم", labelEn: "Yes" },
      { value: "no", labelAr: "لا", labelEn: "No" },
    ],
  },
  {
    id: "trl_level",
    questionAr: "ما مستوى الجاهزية التقنية (TRL)؟",
    questionEn: "What is your Technology Readiness Level (TRL)?",
    options: [
      { value: "3", labelAr: "TRL 3 — مفهوم مثبت", labelEn: "TRL 3 — Proof of Concept" },
      { value: "4", labelAr: "TRL 4 — نموذج مختبري", labelEn: "TRL 4 — Lab Validated" },
      { value: "5", labelAr: "TRL 5 — نموذج أولي", labelEn: "TRL 5 — Prototype" },
      { value: "6", labelAr: "TRL 6 — نموذج تشغيلي", labelEn: "TRL 6 — Operational Prototype" },
      { value: "7", labelAr: "TRL 7 — نظام تشغيلي", labelEn: "TRL 7 — Operational System" },
    ],
  },
  {
    id: "primary_need",
    questionAr: "ما احتياجك الأساسي؟",
    questionEn: "What is your primary need?",
    options: [
      {
        value: "transformation",
        labelAr: "التحول الرقمي للمصنع",
        labelEn: "Factory Digital Transformation",
      },
      {
        value: "innovation",
        labelAr: "تمويل ابتكار صناعي",
        labelEn: "Industrial Innovation Funding",
      },
      {
        value: "training",
        labelAr: "تدريب وورش عمل",
        labelEn: "Training & Workshops",
      },
      {
        value: "provider",
        labelAr: "تسجيل كمقدم خدمات",
        labelEn: "Register as Service Provider",
      },
    ],
  },
];

export const serviceProviders: ServiceProvider[] = [
  {
    id: "sp-1",
    name: "SAP Arabia (Partner: Tamkeen Technologies)",
    nameAr: "ساب العربية — شريك: تقنية تمكين",
    solutions: ["ERP", "SCM", "CRM", "APS", "WMS", "PLM"],
    modules: ["ERP", "SCM", "CRM", "APS", "WMS", "PLM"],
    otIntegration: true,
    factoriesServed: 38,
    avgROI: 24,
    paybackMonths: 20,
    readinessScore: 96,
    status: "approved",
    contactEmail: "futurefactories@tamkeen.com.sa",
    contactPhone: "920000000",
  },
  {
    id: "sp-2",
    name: "Schneider Electric Saudi Arabia",
    nameAr: "シュناider إلكتريك السعودية",
    solutions: ["MES", "SCADA", "IIoT", "IT-OT Integration"],
    modules: ["SCADA", "MES", "IIoT Gateway"],
    otIntegration: true,
    factoriesServed: 52,
    avgROI: 31,
    paybackMonths: 16,
    readinessScore: 91,
    status: "approved",
    contactEmail: "industry@se.com",
    contactPhone: "8001249999",
  },
  {
    id: "sp-3",
    name: "Lean Business Services",
    nameAr: "لين لخدمات الأعمال",
    solutions: ["ERP", "WMS", "CRM"],
    modules: ["ERP", "WMS", "CRM"],
    otIntegration: false,
    factoriesServed: 19,
    avgROI: 19,
    paybackMonths: 24,
    readinessScore: 68,
    status: "pending",
    contactEmail: "mim@lean.sa",
    contactPhone: "920033385",
  },
];

export const demoFactory: FactoryProfile = {
  id: "f-001",
  name: "National Plastic Industries Co.",
  nameAr: "شركة الصناعات البلاستيكية الوطنية",
  sector: "Plastics",
  size: "medium",
  readinessScore: 58,
  currentStage: "provider_matching",
  badges: ["profile_verified", "assessment_complete", "consultant_matched"],
  matchedProviders: ["sp-1", "sp-2"],
};

export const factoryDetails = {
  crNumber: "4030127891",
  city: "الدمام — المدينة الصناعية الثانية",
  monshaatSize: "متوسطة (50–249 موظف)",
  seriLevel: "2.4",
  applicationRef: "FF-2025-0847",
  consultant: "م. خالد العتيبي — مستشار معتمد",
  program: "مصانع المستقبل — مسار الرقمنة الأساسية",
};

export const operatorCases: OperatorCase[] = [
  {
    id: "op-1",
    type: "verification",
    titleAr: "اعتماد مقدم خدمة — لين لخدمات الأعمال",
    titleEn: "Provider approval — Lean Business Services",
    entity: "SP-2025-0194",
    priority: "high",
    status: "pending",
    aiSummary: {
      ar: "فاتورتان من 3 — ناقصة فاتورة واحدة. مصانع مرجعية: 2/3. مطلوب متابعة قبل الاعتماد.",
      en: "2 of 3 invoices — 1 missing. Factory references: 2/3. Follow-up required before approval.",
    },
  },
  {
    id: "op-2",
    type: "grant_review",
    titleAr: "طلب منحة ابتكار — TRL 5 — شركة التقنية المتقدمة",
    titleEn: "Innovation grant — TRL 5 — Advanced Tech Co.",
    entity: "IG-2025-0312",
    priority: "medium",
    status: "in_review",
    aiSummary: {
      ar: "مؤهل ضمن TRL 4–7. التمويل المقترح: 70% بحد أقصى 1,400,000 ريال. بانتظار ربط هيئة الابتكار.",
      en: "Eligible TRL 4–7. Suggested funding: 70% up to SAR 1,400,000. Pending Innovation Authority link.",
    },
  },
  {
    id: "op-3",
    type: "milestone",
    titleAr: "مرحلة تنفيذ — تمكين × مصنع حديد وطني",
    titleEn: "Milestone — Tamkeen × National Steel Factory",
    entity: "FF-2025-0618",
    priority: "low",
    status: "pending",
    aiSummary: {
      ar: "المرحلة 2/4 — ERP مُفعّل، SCM قيد التركيب. التقرير الأسبوعي مستحق يوم الأحد.",
      en: "Milestone 2/4 — ERP live, SCM in progress. Weekly report due Sunday.",
    },
  },
  {
    id: "op-4",
    type: "exception",
    titleAr: "عدم تطابق السجل التجاري — طلب SP-2025-0201",
    titleEn: "CR mismatch — Application SP-2025-0201",
    entity: "SP-2025-0201",
    priority: "high",
    status: "pending",
    aiSummary: {
      ar: "رقم السجل 4030891234 لا يطابق سجل وزارة التجارة. يتطلب مراجعة يدوية.",
      en: "CR 4030891234 does not match Ministry of Commerce records. Manual review required.",
    },
  },
];

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "tr-1",
    titleAr: "مؤشر سيري — تقييم النضج الرقمي",
    titleEn: "SERI Index — Digital Maturity Assessment",
    audience: ["Factories", "Investors"],
    duration: "2 days",
    format: "workshop",
  },
  {
    id: "tr-2",
    titleAr: "الثورة الصناعية الرابعة — أساسيات",
    titleEn: "Industry 4.0 Fundamentals",
    audience: ["Factories", "Service Providers"],
    duration: "3 days",
    format: "course",
  },
  {
    id: "tr-3",
    titleAr: "تكامل IT-OT في المصانع",
    titleEn: "IT-OT Integration in Factories",
    audience: ["Factories", "Engineers"],
    duration: "1 day",
    format: "webinar",
  },
];

export const providerRequirements = {
  erp: {
    titleAr: "أنظمة إدارة الموارد (ERP)",
    titleEn: "Enterprise Resource Planning (ERP)",
    fields: [
      { id: "cr", labelAr: "السجل التجاري", labelEn: "Commercial Registration" },
      { id: "address", labelAr: "عنوان المقر في السعودية", labelEn: "Saudi HQ Address" },
      { id: "screenshots", labelAr: "صور النظام", labelEn: "System Screenshots" },
      { id: "install_cost", labelAr: "تكلفة التركيب / سحابي", labelEn: "Installation Cost / Cloud" },
      { id: "modules", labelAr: "الأنظمة الفرعية (ERP, SCM, CRM, APS, WMS, PLM)", labelEn: "Sub-modules (ERP, SCM, CRM, APS, WMS, PLM)" },
      { id: "ot_link", labelAr: "الربط مع أنظمة OT", labelEn: "OT Systems Integration" },
      { id: "invoices", labelAr: "3 فواتير ضريبية", labelEn: "3 Tax Invoices" },
      { id: "references", labelAr: "3 مصانع مرجعية (حد أدنى)", labelEn: "3 Factory References (minimum)" },
      { id: "commitment", labelAr: "نموذج التعهد والإقرار", labelEn: "Commitment & Declaration Form" },
    ],
  },
  ot: {
    titleAr: "أتمتة العمليات التشغيلية (OT)",
    titleEn: "Operational Technology Automation",
    fields: [
      { id: "brand", labelAr: "نوع الأنظمة والعلامة التجارية", labelEn: "System Type & Brand" },
      { id: "technical", labelAr: "معلومات فنية وتقنية", labelEn: "Technical Information" },
      { id: "brochure", labelAr: "ملف تعريفي للحل", labelEn: "Solution Brochure" },
      { id: "factories_count", labelAr: "عدد المصانع المُركّب لها", labelEn: "Factories Served Count" },
      { id: "avg_cost", labelAr: "متوسط تكلفة التركيب", labelEn: "Average Installation Cost" },
      { id: "irr", labelAr: "متوسط العائد على الاستثمار (IRR%)", labelEn: "Average IRR %" },
      { id: "payback", labelAr: "متوسط فترة الاسترداد", labelEn: "Average Payback Period" },
      { id: "invoices", labelAr: "3 فواتير ضريبية", labelEn: "3 Tax Invoices" },
      { id: "references", labelAr: "3 مصانع مرجعية", labelEn: "3 Factory References" },
    ],
  },
};

export const badges = [
  { id: "profile_verified", labelAr: "الملف موثّق", labelEn: "Profile Verified" },
  { id: "assessment_complete", labelAr: "التقييم مكتمل", labelEn: "Assessment Complete" },
  { id: "consultant_matched", labelAr: "مستشار مُعيّن", labelEn: "Consultant Matched" },
  { id: "grant_approved", labelAr: "المنحة مُعتمدة", labelEn: "Grant Approved" },
  { id: "provider_matched", labelAr: "مقدم خدمات مُطابق", labelEn: "Provider Matched" },
  { id: "milestone_1", labelAr: "المرحلة الأولى", labelEn: "Milestone 1" },
  { id: "lighthouse", labelAr: "منارة صناعية", labelEn: "Industrial Lighthouse" },
];
