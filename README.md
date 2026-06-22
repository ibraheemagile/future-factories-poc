# AI-Guided Industrial Initiatives Platform — POC

Frontend-only Next.js proof-of-concept for the **Industrial Capabilities Center / Future Factories** platform.

## Vision

A unified digital operating layer that consolidates all center initiatives, automates the investor/factory journey, reduces human intervention, and demonstrates practical AI + gamification.

> This POC represents a **future-state concept** — the project is currently in the **planning phase**.

## Demo Routes

| Route | Description |
|-------|-------------|
| `/` | Unified initiative gateway, vision, persona selection |
| `/advisor` | AI Journey Advisor — eligibility & path recommendation |
| `/factory` | Factory journey map, gamification, provider matching |
| `/provider` | Service provider registration with auto-validation |
| `/operator` | Exception-based operations dashboard |
| `/pitch` | Vision pitch narrative + MVP roadmap |

## Personas

1. **Factory / Investor** — self-assessment → grants → provider matching → milestones → Lighthouse
2. **Service Provider** — registration, document verification, marketplace readiness
3. **Program Operator** — exception-only review, grant tracking, milestone monitoring

## Meeting Alignment

Based on the planning meeting and service-provider registration email:

- Consolidate: Future Factories, industrial transformation, innovation grants, training/workshops, service providers
- Automate: self-assessment, audited assessment, grant applications, provider verification
- Innovation grants: TRL 4-7, 70% funding, SAR 2M cap
- Provider requirements: CR, modules (ERP/SCM/CRM/APS/WMS/PLM), OT integration, invoices, factory references
- Reduce human intervention: AI handles 90%, operators review exceptions only

## Run Locally

```bash
cd poc
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons
- Mock data + rule-based AI simulation (no backend)

## Language

Toggle Arabic (RTL) / English from the header.
