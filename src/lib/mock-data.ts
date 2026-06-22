import type {
  FactoryProfile,
  Initiative,
  OperatorCase,
  ServiceProvider,
  TrainingProgram,
} from "./types";

export const VISION = {
  titleAr: "منصة المبادرات الصناعية الذكية",
  titleEn: "AI-Guided Industrial Initiatives Platform",
  subtitleAr:
    "طبقة تشغيل رقمية موحدة لمركز القدرات الصناعية — توحيد المبادرات، أتمتة الرحلة، وتقليل التدخل البشري",
  subtitleEn:
    "A unified digital operating layer for the Industrial Capabilities Center — consolidate initiatives, automate journeys, minimize human intervention",
  planningNoteAr:
    "هذا العرض التوضيحي يمثل رؤية مستقبلية — المشروع حالياً في مرحلة التخطيط",
  planningNoteEn:
    "This POC represents a future-state concept — the project is currently in the planning phase",
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
    name: "Digital Factory Solutions",
    nameAr: "حلول المصانع الرقمية",
    solutions: ["ERP", "SCM", "CRM", "APS", "WMS", "PLM"],
    modules: ["ERP", "SCM", "CRM", "APS", "WMS", "PLM"],
    otIntegration: true,
    factoriesServed: 47,
    avgROI: 28,
    paybackMonths: 18,
    readinessScore: 94,
    status: "approved",
    contactEmail: "info@dfs.sa",
    contactPhone: "+966 11 234 5678",
  },
  {
    id: "sp-2",
    name: "OT Connect Arabia",
    nameAr: "أوتي كونكت العربية",
    solutions: ["OT Automation", "Machine Connectivity", "Shopfloor Data"],
    modules: ["SCADA", "MES", "IIoT Gateway"],
    otIntegration: true,
    factoriesServed: 32,
    avgROI: 35,
    paybackMonths: 14,
    readinessScore: 88,
    status: "approved",
    contactEmail: "contact@otconnect.sa",
    contactPhone: "+966 12 345 6789",
  },
  {
    id: "sp-3",
    name: "Smart Industry Hub",
    nameAr: "مركز الصناعة الذكية",
    solutions: ["ERP", "WMS", "IT-OT Integration"],
    modules: ["ERP", "WMS", "CRM"],
    otIntegration: true,
    factoriesServed: 21,
    avgROI: 22,
    paybackMonths: 22,
    readinessScore: 76,
    status: "pending",
    contactEmail: "hello@smarthub.sa",
    contactPhone: "+966 13 456 7890",
  },
];

export const demoFactory: FactoryProfile = {
  id: "f-001",
  name: "Al-Riyadh Plastics Factory",
  nameAr: "مصنع الرياض للبلاستيك",
  sector: "Plastics",
  size: "medium",
  readinessScore: 62,
  currentStage: "provider_matching",
  badges: ["profile_verified", "assessment_complete", "consultant_matched"],
  matchedProviders: ["sp-1", "sp-2"],
};

export const operatorCases: OperatorCase[] = [
  {
    id: "op-1",
    type: "verification",
    titleAr: "تحقق من فواتير مقدم خدمات — Smart Industry Hub",
    titleEn: "Verify provider invoices — Smart Industry Hub",
    entity: "Smart Industry Hub",
    priority: "high",
    status: "pending",
    aiSummary: {
      ar: "الذكاء الاصطناعي: فاتورتان من 3 مطلوبة — ناقص فاتورة واحدة. المراجع: 2/3 مصانع.",
      en: "AI: 2 of 3 required invoices uploaded — 1 missing. References: 2/3 factories.",
    },
  },
  {
    id: "op-2",
    type: "grant_review",
    titleAr: "مراجعة منحة ابتكار — TRL 5 — مصنع الرياض للبلاستيك",
    titleEn: "Innovation grant review — TRL 5 — Al-Riyadh Plastics",
    entity: "Al-Riyadh Plastics Factory",
    priority: "medium",
    status: "in_review",
    aiSummary: {
      ar: "الذكاء الاصطناعي: مؤهل للمنحة — TRL 5 ضمن النطاق 4-7. التمويل المقترح: 70% حتى 1.4M ريال.",
      en: "AI: Grant eligible — TRL 5 within 4-7 range. Suggested funding: 70% up to SAR 1.4M.",
    },
  },
  {
    id: "op-3",
    type: "milestone",
    titleAr: "مرحلة تنفيذ — Digital Factory Solutions × مصنع جدة للمعادن",
    titleEn: "Implementation milestone — Digital Factory Solutions × Jeddah Metals",
    entity: "Jeddah Metals Factory",
    priority: "low",
    status: "pending",
    aiSummary: {
      ar: "الذكاء الاصطناعي: المرحلة 2/4 مكتملة — ERP مُركّب، SCM قيد التنفيذ.",
      en: "AI: Milestone 2/4 complete — ERP deployed, SCM in progress.",
    },
  },
  {
    id: "op-4",
    type: "exception",
    titleAr: "استثناء — عدم تطابق بيانات السجل التجاري",
    titleEn: "Exception — Commercial registration mismatch",
    entity: "New Provider Application #1042",
    priority: "high",
    status: "pending",
    aiSummary: {
      ar: "الذكاء الاصطناعي: رقم السجل التجاري لا يتطابق مع بيانات وزارة التجارة — يتطلب مراجعة يدوية.",
      en: "AI: CR number mismatch with Ministry of Commerce data — requires manual review.",
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
