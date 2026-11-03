# ZIMRA Revenue Intelligence Prototype

A Zimbabwe-first, globally extensible prototype exploring explainable analytics for revenue-risk review and payroll-integrity screening.

> **Prototype notice:** This repository is a demonstration only. It is not an official ZIMRA system, is not connected to ZIMRA production systems, and must not be used to make tax, customs, payroll, enforcement, or employment decisions.

## Current modules

- **Revenue Intelligence** (`/`): illustrative fiscal-device/VAT reconciliation signals, customs-risk views, import-valuation examples, synthetic company-link analysis, and a revenue-trend tracker.
- **Payroll Integrity** (`/payroll`): synthetic payroll records used to demonstrate duplicate-identity, shared-account, termination-status, and stale-biometric indicators.
- **Case explanation API** (`POST /api/case`): validates a supplied case payload and returns a deterministic, rule-based explanation. This endpoint is not a live AI model.

## Technology

- Next.js 15 App Router
- React 19
- Vercel deployment

The current prototype does not have a confirmed ZIMRA Supabase project or a production database integration. Do not connect it to live taxpayer, customs, employee, identity, banking, or biometric data until the responsible data owners approve the architecture, legal basis, security controls, and pilot scope.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Build check:

```bash
npm run build
```

## Demo data and interpretation

All taxpayer, border-post, valuation, company-network, and payroll records in the interface are synthetic examples. Any public revenue figures or tax rates shown in the prototype must be independently checked against current primary sources before a formal presentation. The interface should always distinguish:
- verified official data,
- sourced but not yet independently verified data,
- synthetic demonstration data,
- model-generated or rule-derived estimates.

A risk score is a triage signal, not evidence of wrongdoing. A qualified officer must verify source records and applicable law before any action.

## Before a controlled pilot

1. Confirm the sponsoring institution, accountable data owner, business owner, and approved use cases.
2. Obtain written approvals and a documented lawful basis for each dataset.
3. Complete a privacy impact assessment and security threat model.
4. Define role-based access, strong authentication, audit logging, retention, deletion, incident response, backup, and recovery controls.
5. Use masked or synthetic data in demonstrations; use a separately approved secure environment for any real-data pilot.
6. Validate every calculation, tax rate, benchmark, source, and model threshold with domain experts.
7. Test false positives, false negatives, bias, explainability, and human-review procedures.
8. Agree integration interfaces and data-sharing arrangements with each source-system owner.
9. Complete independent security testing before handling sensitive or operational data.

See [POTRAZ and pilot-readiness briefing](docs/POTRAZ-PILOT-READINESS.md) for a discussion document. It is not a regulatory approval or legal opinion.
