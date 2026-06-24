"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { providerRequirements } from "@/lib/mock-data";
import { validateProviderForm } from "@/lib/ai-engine";
import type { ProviderFormData } from "@/lib/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  PageShell,
  ProgressLine,
  RequirementChecklist,
  StatusBadge,
} from "@/components/ui";

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

  const checklistItems = req.fields.map((f) => {
    let status: "done" | "pending" | "warning" = "pending";
    if (f.id === "cr" && form.commercialRegistration.length >= 10) status = "done";
    if (f.id === "address" && form.saudiAddress.length > 5) status = "done";
    if (f.id === "modules" && form.modules.length >= 4) status = "done";
    if (f.id === "ot_link" && form.otIntegration) status = "done";
    if (f.id === "invoices") {
      status = form.invoicesUploaded >= 3 ? "done" : form.invoicesUploaded > 0 ? "warning" : "pending";
    }
    if (f.id === "references") {
      status = form.factoryReferences >= 3 ? "done" : form.factoryReferences > 0 ? "warning" : "pending";
    }
    if (f.id === "irr" && form.avgROI) status = "done";
    if (f.id === "payback" && form.paybackPeriod) status = "done";
    return { label: t(f.labelAr, f.labelEn), status };
  });

  const statusTone = (s: string) =>
    s === "valid" ? "success" : s === "warning" ? "warning" : "danger";

  return (
    <PageShell
      eyebrow={t("سوق مقدمي الخدمات", "Provider Marketplace")}
      title={t("طلب اعتماد مقدم خدمة", "Service Provider Approval Request")}
      subtitle={t(
        "متطلبات برنامج مصانع المستقبل — مسار الرقمنة الأساسية",
        "Future Factories Program — Basic Digitization Path requirements"
      )}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {(["erp", "ot_automation"] as const).map((type) => (
          <Button
            key={type}
            variant={solutionType === type ? "secondary" : "outline"}
            onClick={() => {
              setSolutionType(type);
              update("solutionType", type);
            }}
          >
            {type === "erp" ? t("أنظمة ERP", "ERP Systems") : t("أتمتة OT", "OT Automation")}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Application form */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          <Card>
            <CardHeader title={t(req.titleAr, req.titleEn)} />
            <CardBody className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cr" className="mb-1.5 block text-xs font-medium text-muted">
                    {t("رقم السجل التجاري", "Commercial Registration No.")}
                  </label>
                  <input
                    id="cr"
                    type="text"
                    value={form.commercialRegistration}
                    onChange={(e) => update("commercialRegistration", e.target.value)}
                    placeholder="4030127891"
                    className="w-full min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors duration-200 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="mb-1.5 block text-xs font-medium text-muted">
                    {t("المدينة — عنوان المقر", "City — HQ Address")}
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={form.saudiAddress}
                    onChange={(e) => update("saudiAddress", e.target.value)}
                    placeholder={t("الرياض", "Riyadh")}
                    className="w-full min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors duration-200 focus:border-primary"
                  />
                </div>
              </div>

              {solutionType === "erp" && (
                <div>
                  <p className="mb-2 text-xs font-medium text-muted">
                    {t("الأنظمة الفرعية المطلوبة", "Required Sub-modules")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ERP_MODULES.map((mod) => (
                      <button
                        key={mod}
                        type="button"
                        onClick={() => toggleModule(mod)}
                        className={`min-h-11 cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                          form.modules.includes(mod)
                            ? "bg-navy text-white"
                            : "border border-border text-muted hover:border-navy/30"
                        }`}
                      >
                        {mod}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.otIntegration}
                  onChange={(e) => update("otIntegration", e.target.checked)}
                  className="size-4"
                />
                {t("النظام قابل للربط مع أنظمة OT", "Supports OT system integration")}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="irr" className="mb-1.5 block text-xs font-medium text-muted">
                    IRR %
                  </label>
                  <input
                    id="irr"
                    type="text"
                    value={form.avgROI}
                    onChange={(e) => update("avgROI", e.target.value)}
                    className="w-full min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors duration-200 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="payback" className="mb-1.5 block text-xs font-medium text-muted">
                    {t("فترة الاسترداد (شهر)", "Payback (months)")}
                  </label>
                  <input
                    id="payback"
                    type="text"
                    value={form.paybackPeriod}
                    onChange={(e) => update("paybackPeriod", e.target.value)}
                    className="w-full min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors duration-200 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
                    {t("البريد الإلكتروني", "Email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    className="w-full min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors duration-200 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-muted">
                    {t("رقم التواصل", "Phone")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    className="w-full min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors duration-200 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => update("invoicesUploaded", Math.min(form.invoicesUploaded + 1, 3))}
                  className="min-h-11 cursor-pointer rounded-md border border-dashed border-border px-4 py-3 text-start text-sm text-muted transition-colors duration-200 hover:border-primary"
                >
                  <span className="font-medium text-navy">
                    {t(`فواتير ضريبية (${form.invoicesUploaded}/3)`, `Tax invoices (${form.invoicesUploaded}/3)`)}
                  </span>
                  <span className="mt-1 block text-xs">{t("اضغط لإرفاق", "Click to attach")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => update("factoryReferences", Math.min(form.factoryReferences + 1, 3))}
                  className="min-h-11 cursor-pointer rounded-md border border-dashed border-border px-4 py-3 text-start text-sm text-muted transition-colors duration-200 hover:border-primary"
                >
                  <span className="font-medium text-navy">
                    {t(`مصانع مرجعية (${form.factoryReferences}/3)`, `Factory refs (${form.factoryReferences}/3)`)}
                  </span>
                  <span className="mt-1 block text-xs">{t("حد أدنى 3 مصانع", "Minimum 3 factories")}</span>
                </button>
              </div>

              <Button variant="primary" className="w-full" onClick={() => setValidated(true)}>
                {t("التحقق من اكتمال الطلب", "Validate Application")}
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Checklist & validation */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card className="sticky top-24">
            <CardHeader
              title={t("قائمة الاكتمال", "Completeness Checklist")}
              subtitle={t("حسب البريد الرسمي", "Per official requirements")}
            />
            <CardBody>
              <RequirementChecklist items={checklistItems} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={t("نتيجة التحقق", "Validation Result")} />
            <CardBody>
              {!validation ? (
                <p className="text-sm text-muted">
                  {t("أكمل النموذج واضغط التحقق", "Complete the form and validate")}
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  <ProgressLine
                    value={validation.readinessScore}
                    label={t("نسبة الاكتمال", "Completion Rate")}
                  />
                  <ul className="flex flex-col gap-2">
                    {validation.results.map((r, i) => (
                      <li key={i} className="flex items-start justify-between gap-2 text-sm">
                        <span className="text-secondary">{t(r.messageAr, r.messageEn)}</span>
                        <StatusBadge tone={statusTone(r.status)}>
                          {r.status === "valid" ? "✓" : r.status === "warning" ? "!" : "✗"}
                        </StatusBadge>
                      </li>
                    ))}
                  </ul>
                  {validation.readinessScore >= 80 ? (
                    <StatusBadge tone="success">{t("جاهز للاعتماد", "Ready for Approval")}</StatusBadge>
                  ) : validation.readinessScore >= 50 ? (
                    <StatusBadge tone="warning">
                      {t("ناقص — يتطلب استكمال", "Incomplete — Action Required")}
                    </StatusBadge>
                  ) : (
                    <StatusBadge tone="danger">{t("غير مكتمل", "Incomplete")}</StatusBadge>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
