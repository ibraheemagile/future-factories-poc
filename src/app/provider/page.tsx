"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { providerRequirements } from "@/lib/mock-data";
import { validateProviderForm } from "@/lib/ai-engine";
import type { ProviderFormData } from "@/lib/types";
import { Panel, Tag, ProgressLine, SectionTitle } from "@/components/ui";

const ERP_MODULES = ["ERP", "SCM", "CRM", "APS", "WMS", "PLM"];

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

  const statusTone = (s: string) =>
    s === "valid" ? "green" : s === "warning" ? "amber" : "red";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SectionTitle
        title={t("طلب اعتماد مقدم خدمة", "Service Provider Approval Request")}
        subtitle={t(
          "متطلبات برنامج مصانع المستقبل — مسار الرقمنة الأساسية (Future Factories)",
          "Future Factories Program requirements — Basic Digitization Path"
        )}
      />

      <div className="mb-6 flex gap-2">
        {(["erp", "ot_automation"] as const).map((type) => (
          <button
            key={type}
            onClick={() => { setSolutionType(type); update("solutionType", type); }}
            className={`px-4 py-2 text-sm font-medium ${
              solutionType === type
                ? "bg-[var(--navy)] text-white"
                : "border border-[var(--border)] bg-white text-[var(--muted)]"
            }`}
          >
            {type === "erp"
              ? t("أنظمة ERP", "ERP Systems")
              : t("أتمتة OT", "OT Automation")}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Panel title={t(req.titleAr, req.titleEn)}>
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                    {t("رقم السجل التجاري", "Commercial Registration No.")}
                  </label>
                  <input
                    type="text"
                    value={form.commercialRegistration}
                    onChange={(e) => update("commercialRegistration", e.target.value)}
                    placeholder="4030127891"
                    className="w-full border border-[var(--border)] px-3 py-2 text-sm focus:border-[var(--navy)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                    {t("المدينة — عنوان المقر", "City — HQ Address")}
                  </label>
                  <input
                    type="text"
                    value={form.saudiAddress}
                    onChange={(e) => update("saudiAddress", e.target.value)}
                    placeholder={t("الرياض", "Riyadh")}
                    className="w-full border border-[var(--border)] px-3 py-2 text-sm focus:border-[var(--navy)] focus:outline-none"
                  />
                </div>
              </div>

              {solutionType === "erp" && (
                <div>
                  <label className="mb-2 block text-xs font-medium text-[var(--muted)]">
                    {t("الأنظمة الفرعية المطلوبة", "Required Sub-modules")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ERP_MODULES.map((mod) => (
                      <button
                        key={mod}
                        onClick={() => toggleModule(mod)}
                        className={`px-3 py-1.5 text-xs font-medium ${
                          form.modules.includes(mod)
                            ? "bg-[var(--navy)] text-white"
                            : "border border-[var(--border)] text-[var(--muted)]"
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
                />
                {t("النظام قابل للربط مع أنظمة OT", "Supports OT system integration")}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--muted)]">IRR %</label>
                  <input
                    type="text"
                    value={form.avgROI}
                    onChange={(e) => update("avgROI", e.target.value)}
                    className="w-full border border-[var(--border)] px-3 py-2 text-sm focus:border-[var(--navy)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                    {t("فترة الاسترداد (شهر)", "Payback (months)")}
                  </label>
                  <input
                    type="text"
                    value={form.paybackPeriod}
                    onChange={(e) => update("paybackPeriod", e.target.value)}
                    className="w-full border border-[var(--border)] px-3 py-2 text-sm focus:border-[var(--navy)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                    {t("البريد الإلكتروني", "Email")}
                  </label>
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    className="w-full border border-[var(--border)] px-3 py-2 text-sm focus:border-[var(--navy)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                    {t("رقم التواصل", "Phone")}
                  </label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    className="w-full border border-[var(--border)] px-3 py-2 text-sm focus:border-[var(--navy)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => update("invoicesUploaded", Math.min(form.invoicesUploaded + 1, 3))}
                  className="border border-dashed border-[var(--border)] px-4 py-3 text-start text-sm text-[var(--muted)] hover:border-[var(--navy)]"
                >
                  {t(`فواتير ضريبية (${form.invoicesUploaded}/3)`, `Tax invoices (${form.invoicesUploaded}/3)`)}
                  <span className="mt-1 block text-xs">{t("اضغط لإرفاق", "Click to attach")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => update("factoryReferences", Math.min(form.factoryReferences + 1, 3))}
                  className="border border-dashed border-[var(--border)] px-4 py-3 text-start text-sm text-[var(--muted)] hover:border-[var(--navy)]"
                >
                  {t(`مصانع مرجعية (${form.factoryReferences}/3)`, `Factory refs (${form.factoryReferences}/3)`)}
                  <span className="mt-1 block text-xs">{t("حد أدنى 3 مصانع", "Minimum 3 factories")}</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setValidated(true)}
              className="mt-6 w-full bg-[var(--navy)] py-3 text-sm font-semibold text-white hover:bg-[var(--navy-light)]"
            >
              {t("التحقق من اكتمال الطلب", "Validate Application")}
            </button>
          </Panel>
        </div>

        <div className="lg:col-span-2">
          <Panel
            title={t("نتيجة التحقق", "Validation Result")}
            className="sticky top-24"
          >
            {!validation ? (
              <p className="text-sm text-[var(--muted)]">
                {t("أكمل النموذج واضغط التحقق", "Complete the form and validate")}
              </p>
            ) : (
              <div className="space-y-4">
                <ProgressLine
                  value={validation.readinessScore}
                  label={t("نسبة الاكتمال", "Completion Rate")}
                />
                <ul className="space-y-2">
                  {validation.results.map((r, i) => (
                    <li key={i} className="flex items-start justify-between gap-2 text-sm">
                      <span className="text-[var(--foreground)]">{t(r.messageAr, r.messageEn)}</span>
                      <Tag tone={statusTone(r.status) as "green" | "amber" | "red"}>
                        {r.status === "valid" ? "✓" : r.status === "warning" ? "!" : "✗"}
                      </Tag>
                    </li>
                  ))}
                </ul>
                {validation.readinessScore >= 80 ? (
                  <Tag tone="green">{t("جاهز للاعتماد", "Ready for Approval")}</Tag>
                ) : validation.readinessScore >= 50 ? (
                  <Tag tone="amber">{t("ناقص — يتطلب استكمال", "Incomplete — Action Required")}</Tag>
                ) : (
                  <Tag tone="red">{t("غير مكتمل", "Incomplete")}</Tag>
                )}
              </div>
            )}

            <div className="mt-6 border-t border-[var(--border)] pt-4">
              <p className="mb-2 text-xs font-semibold text-[var(--muted)]">
                {t("المتطلبات حسب البريد الرسمي", "Requirements per official email")}
              </p>
              <ul className="space-y-1">
                {req.fields.map((f) => (
                  <li key={f.id} className="text-xs text-[var(--muted)]">
                    · {t(f.labelAr, f.labelEn)}
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
