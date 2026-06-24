import type {
  AIRecommendation,
  AssessmentAnswer,
  InitiativePath,
  ProviderFormData,
  ValidationResult,
} from "./types";

export function analyzeAssessment(
  answers: AssessmentAnswer[]
): AIRecommendation {
  const get = (id: string) =>
    answers.find((a) => a.questionId === id)?.value;

  const primaryNeed = get("primary_need") as string;
  const trlLevel = Number(get("trl_level") || 0);
  const hasPrototype = get("has_prototype") === "yes";
  const digitalMaturity = get("digital_maturity") as string;

  let path: InitiativePath = "transformation";
  const reasons: { ar: string; en: string }[] = [];
  const nextSteps: { ar: string; en: string }[] = [];
  let confidence = 75;
  let eligibleForGrant = false;

  if (primaryNeed === "innovation" || (trlLevel >= 4 && trlLevel <= 7 && hasPrototype)) {
    path = "innovation";
    confidence = trlLevel >= 4 && trlLevel <= 7 ? 92 : 65;
    eligibleForGrant = trlLevel >= 4 && trlLevel <= 7;
    reasons.push(
      {
        ar: `مستوى TRL ${trlLevel} ضمن النطاق المؤهل (4-7)`,
        en: `TRL level ${trlLevel} within eligible range (4-7)`,
      },
      {
        ar: "لديك نموذج أولي يدعم طلب المنحة",
        en: "Working prototype supports grant application",
      }
    );
    nextSteps.push(
      {
        ar: "تعبئة متطلبات منحة المصانع الابتكارية",
        en: "Complete innovation factory grant requirements",
      },
      {
        ar: "رفع المستندات وربطها مع هيئة الابتكار",
        en: "Upload documents and link with Innovation Authority",
      }
    );
  } else if (primaryNeed === "training") {
    path = "training";
    confidence = 88;
    reasons.push({
      ar: "احتياجك الأساسي يتوافق مع برامج التدريب والورش",
      en: "Your primary need aligns with training and workshop programs",
    });
    nextSteps.push({
      ar: "استعراض الدورات المتاحة والتسجيل",
      en: "Browse available courses and register",
    });
  } else if (primaryNeed === "provider") {
    path = "marketplace";
    confidence = 90;
    reasons.push({
      ar: "أنت مقدم خدمات — مسار التسجيل والتحقق متاح",
      en: "You are a service provider — registration and verification path available",
    });
    nextSteps.push({
      ar: "بدء تسجيل مقدم الخدمات ورفع المستندات",
      en: "Start service provider registration and upload documents",
    });
  } else {
    path = "transformation";
    confidence = digitalMaturity === "low" ? 85 : 78;
    reasons.push(
      {
        ar: "مصنعك يحتاج مسار التحول الصناعي — مصانع المستقبل",
        en: "Your factory needs the industrial transformation path — Future Factories",
      },
      {
        ar: `مستوى النضج الرقمي: ${digitalMaturity === "low" ? "مبتدئ — يُنصح بالتقييم الذاتي" : digitalMaturity === "medium" ? "متوسط — جاهز للتقييم المدقق" : "متقدم — جاهز لمطابقة مقدمي الخدمات"}`,
        en: `Digital maturity: ${digitalMaturity === "low" ? "Beginner — self-assessment recommended" : digitalMaturity === "medium" ? "Intermediate — ready for audited assessment" : "Advanced — ready for provider matching"}`,
      }
    );
    nextSteps.push(
      {
        ar: "إكمال التقييم الذاتي",
        en: "Complete self-assessment",
      },
      {
        ar: "اختيار مستشار من القائمة المعتمدة",
        en: "Select a consultant from the approved list",
      },
      {
        ar: "مطابقة مقدمي الخدمات المناسبين",
        en: "Match with suitable service providers",
      }
    );
  }

  return { path, confidence, reasons, nextSteps, eligibleForGrant, trlLevel };
}

export function matchProviders(
  sector: string,
  needs: string[]
): { providerId: string; score: number; reasons: string[] }[] {
  const scores: Record<string, { score: number; reasons: string[] }> = {
    "sp-1": { score: 0, reasons: [] },
    "sp-2": { score: 0, reasons: [] },
    "sp-3": { score: 0, reasons: [] },
  };

  if (needs.includes("transformation") || needs.includes("erp")) {
    scores["sp-1"].score += 40;
    scores["sp-1"].reasons.push("Full ERP/SCM/CRM/APS/WMS/PLM coverage");
    scores["sp-3"].score += 25;
    scores["sp-3"].reasons.push("ERP + WMS modules available");
  }

  if (needs.includes("ot") || sector === "metals" || sector === "plastics") {
    scores["sp-2"].score += 45;
    scores["sp-2"].reasons.push("OT automation & shopfloor data expertise");
    scores["sp-1"].score += 20;
    scores["sp-1"].reasons.push("OT integration capability");
  }

  scores["sp-1"].score += 15;
  scores["sp-1"].reasons.push("Highest readiness score (94%)");
  scores["sp-2"].score += 10;
  scores["sp-2"].reasons.push("Strong ROI (35% IRR)");

  return Object.entries(scores)
    .map(([providerId, { score, reasons }]) => ({ providerId, score, reasons }))
    .sort((a, b) => b.score - a.score);
}

export function validateProviderForm(
  data: ProviderFormData
): { results: ValidationResult[]; readinessScore: number } {
  const results: ValidationResult[] = [];
  let score = 0;

  if (data.commercialRegistration.length >= 10) {
    results.push({
      field: "cr",
      status: "valid",
      messageAr: "السجل التجاري — مطابق لسجل وزارة التجارة",
      messageEn: "CR verified against Ministry of Commerce",
    });
    score += 15;
  } else {
    results.push({
      field: "cr",
      status: "error",
      messageAr: "رقم السجل التجاري غير صالح",
      messageEn: "Invalid commercial registration number",
    });
  }

  if (data.saudiAddress.length > 5) {
    results.push({
      field: "address",
      status: "valid",
      messageAr: "عنوان المقر مُسجّل",
      messageEn: "HQ address registered",
    });
    score += 10;
  } else {
    results.push({
      field: "address",
      status: "error",
      messageAr: "عنوان المقر مطلوب",
      messageEn: "HQ address required",
    });
  }

  const requiredModules =
    data.solutionType === "erp"
      ? ["ERP", "SCM", "CRM", "APS", "WMS", "PLM"]
      : [];
  const moduleCoverage =
    requiredModules.length > 0
      ? data.modules.filter((m) => requiredModules.includes(m)).length /
        requiredModules.length
      : 1;

  if (moduleCoverage >= 0.8) {
    results.push({
      field: "modules",
      status: "valid",
      messageAr: `تغطية الأنظمة: ${Math.round(moduleCoverage * 100)}%`,
      messageEn: `Module coverage: ${Math.round(moduleCoverage * 100)}%`,
    });
    score += 20;
  } else if (moduleCoverage >= 0.5) {
    results.push({
      field: "modules",
      status: "warning",
      messageAr: `تغطية جزئية: ${Math.round(moduleCoverage * 100)}% — يُنصح بإضافة المزيد`,
      messageEn: `Partial coverage: ${Math.round(moduleCoverage * 100)}% — add more modules`,
    });
    score += 10;
  } else {
    results.push({
      field: "modules",
      status: "error",
      messageAr: "تغطية الأنظمة غير كافية",
      messageEn: "Insufficient module coverage",
    });
  }

  if (data.otIntegration) {
    results.push({
      field: "ot",
      status: "valid",
      messageAr: "النظام قابل للربط مع أنظمة OT",
      messageEn: "System supports OT integration",
    });
    score += 10;
  }

  if (data.invoicesUploaded >= 3) {
    results.push({
      field: "invoices",
      status: "valid",
      messageAr: "3 فواتير ضريبية مرفقة",
      messageEn: "3 tax invoices uploaded",
    });
    score += 15;
  } else {
    results.push({
      field: "invoices",
      status: "warning",
      messageAr: `${data.invoicesUploaded}/3 فواتير — مطلوب 3`,
      messageEn: `${data.invoicesUploaded}/3 invoices — 3 required`,
    });
    score += data.invoicesUploaded * 3;
  }

  if (data.factoryReferences >= 3) {
    results.push({
      field: "references",
      status: "valid",
      messageAr: "3 مصانع مرجعية مُسجّلة",
      messageEn: "3 factory references registered",
    });
    score += 15;
  } else {
    results.push({
      field: "references",
      status: "warning",
      messageAr: `${data.factoryReferences}/3 مصانع مرجعية`,
      messageEn: `${data.factoryReferences}/3 factory references`,
    });
    score += data.factoryReferences * 3;
  }

  if (data.contactEmail && data.contactPhone) {
    results.push({
      field: "contact",
      status: "valid",
      messageAr: "بيانات التواصل مكتملة",
      messageEn: "Contact details complete",
    });
    score += 10;
  }

  if (data.avgROI && data.paybackPeriod) {
    results.push({
      field: "metrics",
      status: "valid",
      messageAr: `IRR: ${data.avgROI}% | الاسترداد: ${data.paybackPeriod}`,
      messageEn: `IRR: ${data.avgROI}% | Payback: ${data.paybackPeriod}`,
    });
    score += 15;
  }

  return { results, readinessScore: Math.min(score, 100) };
}
