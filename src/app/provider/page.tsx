"use client";

import { useState } from "react";
import {
  Upload,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Shield,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { providerRequirements } from "@/lib/mock-data";
import { validateProviderForm } from "@/lib/ai-engine";
import type { ProviderFormData } from "@/lib/types";
import { Card, Badge, ProgressBar, SectionTitle } from "@/components/ui";

const ERP_MODULES = ["ERP", "SCM", "CRM", "APS", "WMS", "PLM"];

const statusIcon = {
  valid: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const statusColor = {
  valid: "text-emerald-600",
  warning: "text-amber-600",
  error: "text-red-600",
};

export default function ProviderPage() {
  const { t } = useApp();
  const [solutionType, setSolutionType] = useState<"erp" | "ot_automation">("erp");
  const [form, setForm] = useState<ProviderFormData>({
    commercialRegistration: "",
    saudiAddress: "",
    solutionType: "erp",
    modules: [],
    otIntegration: false,
    invoicesUploaded: 0,
    factoryReferences: 0,
    avgROI: "",
    paybackPeriod: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [validated, setValidated] = useState(false);

  const req = providerRequirements[solutionType === "erp" ? "erp" : "ot"];
  const validation = validated ? validateProviderForm({ ...form, solutionType }) : null;

  const update = (key: keyof ProviderFormData, value: string | number | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setValidated(false);
  };

  const toggleModule = (mod: string) => {
    const mods = form.modules.includes(mod)
      ? form.modules.filter((m) => m !== mod)
      : [...form.modules, mod];
    update("modules", mods);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <SectionTitle
        title={t("تسجيل مقدم الخدمات", "Service Provider Registration")}
        subtitle={t(
          "أتمتة التحقق من المتطلبات — بناءً على متطلبات برنامج مصانع المستقبل",
          "Automated requirement verification — based on Future Factories program requirements"
        )}
      />

      {/* Solution Type Toggle */}
      <div className="mb-6 flex gap-3">
        {(["erp", "ot_automation"] as const).map((type) => (
          <button
            key={type}
            onClick={() => {
              setSolutionType(type);
              update("solutionType", type);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              solutionType === type
                ? "bg-emerald-700 text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {type === "erp"
              ? t("أنظمة إدارة الموارد (ERP)", "ERP Systems")
              : t("أتمتة OT", "OT Automation")}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="space-y-4 lg:col-span-3">
          <Card>
            <h3 className="mb-4 font-bold text-slate-900">
              {t(req.titleAr, req.titleEn)}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t("السجل التجاري", "Commercial Registration")}
                </label>
                <input
                  type="text"
                  value={form.commercialRegistration}
                  onChange={(e) => update("commercialRegistration", e.target.value)}
                  placeholder="1010123456"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t("عنوان المقر في السعودية", "Saudi HQ Address")}
                </label>
                <input
                  type="text"
                  value={form.saudiAddress}
                  onChange={(e) => update("saudiAddress", e.target.value)}
                  placeholder={t("الرياض، حي ...", "Riyadh, district ...")}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              {solutionType === "erp" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    {t("الأنظمة الفرعية", "Sub-modules")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ERP_MODULES.map((mod) => (
                      <button
                        key={mod}
                        onClick={() => toggleModule(mod)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          form.modules.includes(mod)
                            ? "bg-emerald-100 text-emerald-800"
                            : "border border-slate-200 text-slate-500"
                        }`}
                      >
                        {mod}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.otIntegration}
                  onChange={(e) => update("otIntegration", e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600"
                />
                {t("النظام قابل للربط مع أنظمة OT", "System supports OT integration")}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    IRR %
                  </label>
                  <input
                    type="text"
                    value={form.avgROI}
                    onChange={(e) => update("avgROI", e.target.value)}
                    placeholder="28"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t("فترة الاسترداد (شهر)", "Payback (months)")}
                  </label>
                  <input
                    type="text"
                    value={form.paybackPeriod}
                    onChange={(e) => update("paybackPeriod", e.target.value)}
                    placeholder="18"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t("البريد الإلكتروني", "Email")}
                  </label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {t("رقم الجوال", "Phone")}
                  </label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Simulated uploads */}
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() =>
                    update("invoicesUploaded", Math.min(form.invoicesUploaded + 1, 3))
                  }
                  className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-4 text-sm text-slate-500 transition hover:border-emerald-400 hover:text-emerald-700"
                >
                  <Upload className="h-5 w-5" />
                  {t(
                    `فواتير ضريبية (${form.invoicesUploaded}/3)`,
                    `Tax Invoices (${form.invoicesUploaded}/3)`
                  )}
                </button>
                <button
                  onClick={() =>
                    update("factoryReferences", Math.min(form.factoryReferences + 1, 3))
                  }
                  className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-4 text-sm text-slate-500 transition hover:border-emerald-400 hover:text-emerald-700"
                >
                  <Upload className="h-5 w-5" />
                  {t(
                    `مصانع مرجعية (${form.factoryReferences}/3)`,
                    `Factory References (${form.factoryReferences}/3)`
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setValidated(true)}
              className="mt-6 w-full rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              <Shield className="mr-2 inline h-5 w-5" />
              {t("تحقق تلقائي (AI)", "Auto-Validate (AI)")}
            </button>
          </Card>
        </div>

        {/* Validation Results */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24">
            <h3 className="mb-4 font-bold text-slate-900">
              {t("نتائج التحقق", "Validation Results")}
            </h3>

            {!validation ? (
              <p className="text-sm text-slate-400">
                {t(
                  "املأ النموذج واضغط تحقق تلقائي",
                  "Fill the form and click Auto-Validate"
                )}
              </p>
            ) : (
              <div className="space-y-4">
                <ProgressBar
                  value={validation.readinessScore}
                  label={t("جاهزية مقدم الخدمات", "Provider Readiness")}
                />

                <div className="space-y-2">
                  {validation.results.map((r, i) => {
                    const Icon = statusIcon[r.status];
                    return (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Icon
                          className={`mt-0.5 h-4 w-4 shrink-0 ${statusColor[r.status]}`}
                        />
                        <span className="text-slate-600">
                          {t(r.messageAr, r.messageEn)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {validation.readinessScore >= 80 ? (
                  <Badge variant="success">
                    {t("جاهز للاعتماد", "Ready for Approval")}
                  </Badge>
                ) : validation.readinessScore >= 50 ? (
                  <Badge variant="warning">
                    {t("يحتاج استكمال", "Needs Completion")}
                  </Badge>
                ) : (
                  <Badge variant="error">
                    {t("غير مكتمل", "Incomplete")}
                  </Badge>
                )}
              </div>
            )}

            <div className="mt-6 border-t border-slate-100 pt-4">
              <h4 className="mb-2 text-sm font-semibold text-slate-700">
                {t("المتطلبات المطلوبة", "Required Fields")}
              </h4>
              <ul className="space-y-1">
                {req.fields.map((f) => (
                  <li key={f.id} className="text-xs text-slate-500">
                    • {t(f.labelAr, f.labelEn)}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
