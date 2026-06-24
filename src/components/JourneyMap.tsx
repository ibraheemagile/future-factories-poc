"use client";

import { useState } from "react";
import {
  Award,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  FileBadge,
  Handshake,
  Lock,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { useApp } from "@/lib/context";
import { cn } from "@/lib/cn";

interface Stage {
  id: string;
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  autoAr: string;
  autoEn: string;
  points: number;
}

const STAGES: Stage[] = [
  {
    id: "self_assessment",
    icon: ClipboardCheck,
    titleAr: "التقييم الذاتي",
    titleEn: "Self-Assessment",
    descAr: "يبدأ المصنع بتقييم ذاتي لقياس النضج الرقمي وتحديد نقطة الانطلاق على مؤشر سيري.",
    descEn: "The factory begins with a self-assessment to gauge digital maturity and set its SERI baseline.",
    autoAr: "يملأ النظام البيانات الحكومية تلقائياً عبر التكامل — دون رفع مستندات.",
    autoEn: "Government data auto-fills via integration — no document uploads required.",
    points: 100,
  },
  {
    id: "consultant",
    icon: UserCheck,
    titleAr: "اختيار المستشار",
    titleEn: "Consultant Match",
    descAr: "يقترح النظام أنسب المستشارين المعتمدين بناءً على القطاع ونتيجة التقييم.",
    descEn: "The system recommends the best-fit accredited consultants based on sector and score.",
    autoAr: "مطابقة آلية مع المستشارين بدل البحث اليدوي.",
    autoEn: "Automated consultant matching replaces manual search.",
    points: 150,
  },
  {
    id: "audited",
    icon: FileBadge,
    titleAr: "التقييم المدقق",
    titleEn: "Audited Assessment",
    descAr: "يعتمد المستشار التقييم المدقق ويحدد فجوات التحول وخطة الرقمنة.",
    descEn: "The consultant validates the audited assessment and maps transformation gaps.",
    autoAr: "ربط مباشر بنتيجة سيري المدققة لتوليد خطة التحول.",
    autoEn: "Direct link to audited SERI result auto-generates the roadmap.",
    points: 200,
  },
  {
    id: "grant",
    icon: Target,
    titleAr: "طلب المنحة",
    titleEn: "Grant Application",
    descAr: "للمؤهلين ضمن TRL 4–7 — تمويل حتى 70% بحد أقصى مليوني ريال عبر هيئة الابتكار.",
    descEn: "For TRL 4–7 — up to 70% funding capped at SAR 2M, linked to the Innovation Authority.",
    autoAr: "فحص أهلية آلي وربط مباشر بهيئة الابتكار للتحكيم.",
    autoEn: "Automated eligibility check and direct link to Innovation Authority review.",
    points: 300,
  },
  {
    id: "marketplace",
    icon: Handshake,
    titleAr: "السوق وعروض الأسعار",
    titleEn: "Marketplace & Quotes",
    descAr: "يستقبل المصنع عروض أسعار من مقدمي الحلول المطابقين تلقائياً لاحتياجه.",
    descEn: "The factory receives quotations from providers automatically matched to its needs.",
    autoAr: "مطابقة الحلول وجمع عروض الأسعار في مكان واحد.",
    autoEn: "Solution matching and quote collection in one place.",
    points: 250,
  },
  {
    id: "implementation",
    icon: Rocket,
    titleAr: "تنفيذ الحل",
    titleEn: "Implementation",
    descAr: "يبدأ مقدم الخدمة المعتمد تركيب الحل وفق خطة التحول المعتمدة.",
    descEn: "The approved provider deploys the solution per the agreed transformation plan.",
    autoAr: "متابعة آلية لحالة التنفيذ ضمن لوحة موحدة.",
    autoEn: "Automated implementation tracking in a unified dashboard.",
    points: 300,
  },
  {
    id: "milestones",
    icon: CheckCircle2,
    titleAr: "تقديم المراحل",
    titleEn: "Milestones",
    descAr: "يقدّم المصنع المراحل ويُصرف التمويل تدريجياً عند اعتماد كل مرحلة.",
    descEn: "The factory submits milestones; funding is released as each is approved.",
    autoAr: "تقارير أسبوعية وصرف دفعات مرتبط بإنجاز المراحل.",
    autoEn: "Weekly reports and milestone-linked disbursement.",
    points: 350,
  },
  {
    id: "lighthouse",
    icon: Trophy,
    titleAr: "المنارة الصناعية",
    titleEn: "Industrial Lighthouse",
    descAr: "يصل المصنع إلى مرتبة المنارة الصناعية — نموذج يُحتذى في التحول الرقمي.",
    descEn: "The factory reaches Industrial Lighthouse status — a digital transformation role model.",
    autoAr: "ترشيح آلي للمنارات عند استيفاء معايير النضج.",
    autoEn: "Automatic Lighthouse nomination once maturity criteria are met.",
    points: 500,
  },
];

const CURRENT_INDEX = 4; // marketplace stage — sample live progress

export function JourneyMap() {
  const { t } = useApp();
  const [selected, setSelected] = useState(CURRENT_INDEX);
  const stage = STAGES[selected];
  const Icon = stage.icon;

  const earnedPoints = STAGES.slice(0, CURRENT_INDEX).reduce((sum, s) => sum + s.points, 0);
  const totalPoints = STAGES.reduce((sum, s) => sum + s.points, 0);
  const progressPct = Math.round((CURRENT_INDEX / (STAGES.length - 1)) * 100);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#081828] shadow-hero">
      {/* Header band */}
      <div className="flex flex-col gap-4 border-b border-white/10 bg-gradient-to-l from-white/[0.04] to-transparent px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Sparkles className="size-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-bold text-white md:text-xl">
              {t("رحلة المستثمر الموحدة", "The Unified Investor Journey")}
            </h3>
            <p className="mt-0.5 text-sm text-white/55">
              {t(
                "مسار متصل واحد — من التقييم إلى المنارة الصناعية",
                "One continuous path — from assessment to Industrial Lighthouse"
              )}
            </p>
          </div>
        </div>

        {/* Gamification: points + progress */}
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
              {t("النقاط", "Points")}
            </p>
            <p className="text-lg font-bold tabular-nums text-gold">
              {earnedPoints.toLocaleString()}
            </p>
          </div>
          <div className="h-8 w-px bg-white/10" aria-hidden />
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
              {t("الإنجاز", "Progress")}
            </p>
            <p className="text-lg font-bold tabular-nums text-primary">{progressPct}%</p>
          </div>
        </div>
      </div>

      {/* Stations rail */}
      <div className="px-5 pb-2 pt-7 md:px-8">
        <div className="flex gap-2 overflow-x-auto pb-4 md:gap-0">
          {STAGES.map((s, i) => {
            const StationIcon = s.icon;
            const done = i < CURRENT_INDEX;
            const current = i === CURRENT_INDEX;
            const active = i === selected;
            const last = i === STAGES.length - 1;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={active}
                className="group relative flex min-w-[84px] flex-1 cursor-pointer flex-col items-center gap-2 px-1"
              >
                {/* Connector */}
                {!last && (
                  <span
                    className={cn(
                      "absolute top-6 z-0 h-0.5 w-full",
                      "start-1/2",
                      done ? "bg-primary" : "bg-white/10"
                    )}
                    aria-hidden
                  />
                )}
                {/* Node */}
                <span
                  className={cn(
                    "relative z-10 flex size-12 items-center justify-center rounded-full border-2 transition-all duration-200",
                    done && "border-primary bg-primary/15 text-primary",
                    current && "border-primary bg-primary text-white shadow-[0_0_0_5px_rgba(0,108,53,0.2)]",
                    !done && !current && "border-white/15 bg-white/5 text-white/40",
                    active && !current && "ring-2 ring-gold ring-offset-2 ring-offset-[#081828]"
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="size-5" aria-hidden />
                  ) : !done && !current ? (
                    <span className="relative">
                      <StationIcon className="size-5" aria-hidden />
                      {i > CURRENT_INDEX + 1 && (
                        <Lock className="absolute -bottom-1 -end-1 size-3 text-white/30" aria-hidden />
                      )}
                    </span>
                  ) : (
                    <StationIcon className="size-5" aria-hidden />
                  )}
                </span>
                <span
                  className={cn(
                    "text-center text-[11px] font-medium leading-tight transition-colors duration-200",
                    active ? "text-white" : current ? "text-primary" : done ? "text-white/70" : "text-white/40"
                  )}
                >
                  {t(s.titleAr, s.titleEn)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected stage detail */}
      <div className="border-t border-white/10 bg-white/[0.02] px-5 py-6 md:px-8 md:py-7">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25">
                <Icon className="size-4" aria-hidden />
              </span>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white">{t(stage.titleAr, stage.titleEn)}</h4>
                {selected < CURRENT_INDEX && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary ring-1 ring-primary/25">
                    {t("مكتملة", "Done")}
                  </span>
                )}
                {selected === CURRENT_INDEX && (
                  <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold ring-1 ring-gold/30">
                    {t("الآن", "Now")}
                  </span>
                )}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {t(stage.descAr, stage.descEn)}
            </p>
            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/[0.07] px-3.5 py-2.5">
              <Bot className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <p className="text-xs leading-relaxed text-white/65">
                <span className="font-semibold text-primary">
                  {t("أتمتة: ", "Automated: ")}
                </span>
                {t(stage.autoAr, stage.autoEn)}
              </p>
            </div>
          </div>

          {/* Reward chip */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/20 bg-gold/[0.06] px-4 py-4 md:flex-col md:items-start md:justify-center">
            <div className="flex items-center gap-2.5">
              <Award className="size-5 text-gold" aria-hidden />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                  {t("مكافأة المرحلة", "Stage Reward")}
                </p>
                <p className="text-lg font-bold tabular-nums text-gold">
                  +{stage.points} {t("نقطة", "pts")}
                </p>
              </div>
            </div>
            <p className="hidden text-[11px] leading-relaxed text-white/45 md:block">
              {t(
                "نظام نقاط يحفّز التقدم في الرحلة بدلاً من نموذج حكومي تقليدي.",
                "Points reward progress — engagement, not a traditional gov form."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
