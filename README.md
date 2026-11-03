# Revenue Intelligence Platform (Independent Concept Prototype)

A Zimbabwe-born, regionally extensible concept for an explainable intelligence layer that works alongside institution-owned systems. The chosen product direction is hybrid: integrate with existing systems first, augment selected workflows, and replace individual modules only when the institution requests it and evidence, migration, security and acceptance gates are satisfied. AI automation is guarded: it may assist and prepare work, while consequential statutory decisions remain with authorised human officers. The initial market focus is Zimbabwe, followed by Southern Africa and other regions through country-specific adaptations.

> **Important:** This is an independent concept prototype. It is not an official ZIMRA system, is not endorsed or operated by the Zimbabwe Revenue Authority, and is not connected to live government systems. "ZIMRA" is a working repository/product label only; obtain legal advice on naming, trademark and institutional-affiliation risks before public commercial use. All dashboard records and figures are synthetic demonstration examples unless explicitly documented otherwise.

## Current demonstration

- **Overview:** Enterprise-style workspace with a platform snapshot and module navigation.
- **Operational Assurance Workbench (`/assurance`):** Synthetic exception-to-outcome workflow linking control objectives, owners, evidence checklists and closure verification. Local demonstration state only.
- **Revenue risk:** Synthetic reconciliation examples, explainable deterministic scoring, local case status controls, case explanation API and CSV export.
- **Reconciliation Lab (`/reconciliation`):** Browser-only CSV analysis for fiscalised sales, declared sales and optional payments; flags variances and duplicate business-period rows, then exports an exception report. No uploaded file is sent to a server by this page.
- **Customs:** Illustrative HS-code and import-valuation workflow examples.
- **Integrations:** Proposed integration gateway and source-system connector catalogue. No live connections exist.
- **Governance:** Pilot-readiness gates and required security, privacy and operational controls.
- **Payroll integrity:** Separate synthetic demonstration at `/payroll`; any real use requires authorisation from the relevant employer and data owner.

## What is implemented vs proposed

| Capability | Current state |
|---|---|
| Responsive dashboard and navigation | Implemented |
| Synthetic revenue-risk calculations | Implemented as demonstration rules |
| Browser-only CSV reconciliation and exception report | Implemented for the documented CSV format |
| Case explanation endpoint | Implemented as deterministic rule-based text |
| Local demo case status and CSV export | Implemented in browser state |
| Customs workflow example | Illustrative UI only |
| Integration gateway and FDMS/TaRMS/ASYCUDA adapters | Not implemented |
| Production identity, MFA and role-based access | Not implemented |
| Persistent case database and tamper-evident audit trail | Not implemented |
| Validated machine-learning models | Not implemented |
| Production hosting and live government data | Not authorised or configured |

## Technology

- Next.js 15 App Router
- React 19
- Vercel deployment

The current app uses synthetic in-code examples. There is no confirmed ZIMRA Supabase project or production database integration. Do not connect live taxpayer, customs, employee, identity, banking or biometric data until the relevant data owners have approved the legal basis, architecture, security controls and pilot scope in writing.

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

## Internal Audit flagship module\n\nThe first dedicated internal workflow is available at `/audit-actions`. It demonstrates an audit finding lifecycle: finding and recommendation, management response and action plan, evidence references, independent validation, verified closure and activity history. The role switcher is a demonstration only, not authentication or access control. Records are synthetic and held in browser memory; evidence files are not uploaded. It is not connected to ZIMRA systems or an authoritative audit register.\n\n## Product and governance documentation

- [Regional pilot and deployment readiness](docs/REGIONAL-PILOT-READINESS.md)
- [Product and commercial strategy](docs/PRODUCT-AND-COMMERCIAL-STRATEGY.md)
- [Target technical architecture](docs/TARGET-TECHNICAL-ARCHITECTURE.md)
- [Implementation roadmap](docs/IMPLEMENTATION-ROADMAP.md)
- [Meeting-ready product brief](docs/MEETING-READY-PRODUCT-BRIEF.md)

## Before a controlled pilot

1. Confirm the legal entity, intellectual-property ownership, accountable product owners and institutional sponsors.
2. Confirm the correct authority and lawful basis for every proposed dataset and use case.
3. Complete privacy impact and security threat assessments.
4. Agree approved hosting, data residency, cross-border transfer and data-processing terms.
5. Implement strong identity, least-privilege access, audit logging, encryption, retention, deletion, backup and incident response.
6. Validate all calculations, rules, reference values and model thresholds with domain experts.
7. Test false positives, false negatives, bias, explainability and human-review procedures.
8. Complete independent security testing and a documented remediation process.
9. Define pilot success measures, accountable owners, budget, support and a stop/rollback plan.

A risk score is a triage signal, not evidence of wrongdoing. A flagged amount is not a tax liability or recovered revenue. No adverse action should be taken solely on an automated output.
