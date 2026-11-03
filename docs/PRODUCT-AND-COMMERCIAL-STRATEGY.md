# Product and Commercial Strategy

**Working product name:** ZIMRA Intelligence (internal working title only)  
**Product category:** Government and regulated-sector decision-support software  
**Initial market:** Zimbabwe  
**Expansion path:** Southern Africa, then other markets subject to local law and data-hosting requirements  
**Current maturity:** Early concept prototype; not production software and not an official ZIMRA system

## 1. Product thesis

Build an independent hybrid platform that helps authorised institutions make better use of existing systems through secure integration and workflow augmentation. Integrate first; consider replacing a specific module only when the institution requests it and functional, migration, interoperability, security and acceptance evidence supports the change. The platform must not require a big-bang replacement.

The platform's role is to:
- Connect to institution-approved data sources through documented interfaces.
- Validate, standardise and reconcile authorised datasets.
- Identify explainable exceptions and patterns for human review.
- Preserve data lineage, source references, access logs and decision history.
- Provide operational dashboards and management reporting.
- Support institution-specific workflows without taking away statutory decision-making authority.

## 2. Initial product modules

### Revenue intelligence
Reconciliation and exception management across approved fiscalisation, returns, payment and taxpayer datasets. Each exception should show the source records, calculation, rule version, confidence/limitations and recommended verification steps.

### Customs intelligence
Declaration quality checks, HS-code consistency, valuation comparisons and risk triage. Reference values must be sourced, time-stamped, currency-normalised and reviewed by customs specialists. A benchmark alone is never proof of under-valuation.

### Integration gateway
A secure boundary between institution-owned systems and analytics services. It should support approved APIs and controlled file exchange, schema validation, idempotent ingestion, encryption, retries, dead-letter handling, source provenance and auditable data access.

### Case management
A human-led workflow for assigning, reviewing, annotating, escalating, clearing and closing cases. Decisions and changes must be attributable to an authenticated user and recorded in an append-only audit history.

### Analytics and reporting
Operational performance, exception trends, workflow ageing and management reports. Separate measured outcomes from estimates, synthetic examples and model outputs.

Payroll integrity is a separate potential product line and must only be pursued with the explicit mandate of the relevant employer/data owner. It is not automatically a tax-authority dataset.

## 3. Product principles

1. **Hybrid by design.** Integrate and augment first; selectively replace modules only through institution-approved transition gates. Never silently overwrite source-system records.
2. **Guarded automation.** Automate bounded, low-risk and reversible routine tasks only after workflow-specific approval. No autonomous tax assessment, enforcement, payroll suspension, seizure, penalty, refund decision or other adverse statutory action.
3. **Explainability.** Every signal has a readable reason, source, timestamp, calculation and version.
4. **Privacy by design.** Minimise personal data; prefer aggregation, masking, tokenisation and de-identification where possible.
5. **Security by default.** Strong authentication, MFA, least privilege, tenant isolation, encryption, secure secrets and auditable operations.
6. **Evidence before claims.** No unsupported accuracy, recovery, savings, AI, compliance or impact claims.
7. **Interoperability.** Documented APIs and export formats; avoid lock-in to a single source vendor.
8. **Local adaptability.** Configurable tax rules, currencies, calendars, languages and jurisdiction packs.
9. **Resilience.** Backups, tested recovery, monitoring, incident response and controlled releases.
10. **Accessible design.** Clear, low-bandwidth, mobile-friendly interfaces for authorised users.

## 4. Target customers and stakeholders

Potential buyers and users must be validated through discovery; no institutional interest or procurement approval is assumed.

- National revenue and customs authorities.
- Public finance and treasury organisations.
- Other public-sector employers for separately authorised payroll assurance.
- Regional revenue-administration bodies.
- Regulated utilities or large enterprises with reconciliation and compliance needs.

Stakeholders include executive sponsors, operational officers, IT and integration teams, data protection officers, cybersecurity teams, legal/procurement teams, auditors and affected data subjects.

## 5. Commercial model

Prefer transparent enterprise software and services contracts rather than a share of taxes recovered or penalties imposed.

Potential revenue streams:
- Annual platform licence, scoped by institution, modules and deployment environment.
- One-time implementation and integration services.
- Annual support, maintenance and service-level agreements.
- Training, administrator enablement and specialist configuration.
- Optional managed hosting only where permitted by the customer's security and data-residency requirements.
- Separately priced enhancements and additional jurisdiction packs.

A pilot should have a fixed scope, deliverables, duration, acceptance criteria, security responsibilities and a clear exit plan. Do not promise a procurement outcome or a specific revenue uplift.

## 6. Indicative packaging (not quotations)

| Package | Intended use | Commercial basis |
|---|---|---|
| Discovery and design | Requirements, data mapping, risk and architecture assessment | Fixed professional-services fee |
| Controlled proof of concept | Synthetic or approved masked data, limited users and use cases | Fixed-scope pilot fee |
| Institutional deployment | Approved production environment, agreed modules and integrations | Annual licence plus implementation |
| Enterprise support | SLA, updates, training and operational support | Annual support contract |

Pricing should only be set after customer interviews, delivery-cost modelling, hosting/security requirements, procurement rules and local tax/legal advice.

## 7. Route to market

### Stage 1: Credible demonstration
Use synthetic data. Validate problem statements and workflows with subject-matter experts. Produce a scripted demo, architecture diagram, data dictionary, limitations register and product roadmap.

### Stage 2: Institutional discovery
Engage potential sponsors and data owners. Ask about existing systems, pain points, procurement routes, data governance, hosting, security standards, integrations and success measures. Do not ask for live data at this stage.

### Stage 3: Controlled proof of concept
Proceed only with a signed scope and written authority. Use synthetic or approved masked data, a segregated environment, named users, time limits and pre-agreed success metrics.

### Stage 4: Independent assurance
Complete privacy impact assessment, threat model, secure code review, penetration testing, resilience testing, model/rule validation and remediation.

### Stage 5: Procurement and deployment
Prepare a formal proposal, service description, implementation plan, support model, SLA, pricing, data-processing terms, exit/portability plan and customer acceptance criteria.

### Stage 6: Regional expansion
Create jurisdiction packs only after local tax, privacy, cybersecurity, hosting and procurement requirements have been researched and validated.

## 8. Pilot success measures

Agree baselines with the customer before a pilot. Potential measures:
- Data ingestion completeness and reconciliation accuracy.
- Time taken to identify and explain an exception.
- Officer review time per case.
- Precision and recall of prioritisation rules on labelled test cases.
- False-positive and false-negative rates.
- Percentage of cases with complete source lineage and audit history.
- System availability, latency and recovery performance.
- User adoption and usability feedback.

Do not use estimated tax exposure as recovered revenue. A flagged amount is not a liability, finding or collection.

## 9. What must be built before a real deployment

- Proper identity provider integration, MFA and role-based permissions.
- Tenant/institution isolation and environment separation.
- Approved database architecture, encryption and managed secrets.
- Secure connector framework with signed-off source contracts.
- Persistent case management and append-only audit events.
- Data provenance, quality checks and retention/deletion controls.
- Rule/model registry, validation datasets, change approval and monitoring.
- Automated tests, CI checks, dependency scanning and release approvals.
- Observability, alerting, backups, disaster recovery and incident response.
- Security and privacy documentation, user training and support processes.

The current web prototype does not yet implement these production capabilities.

## 10. Naming and institutional independence

The working name "ZIMRA" is also the name/acronym of Zimbabwe's revenue authority. Before public marketing, investor outreach or regulatory presentation, obtain legal advice on naming, trademark, affiliation and potential confusion. Clearly disclose that this is an independent team concept and is not endorsed, operated or approved by the authority unless formal written permission says otherwise.

## 11. Immediate team decisions

Before building live integrations, the team should agree:
- Legal entity and ownership of source code, product name and intellectual property.
- Product lead, technical lead, security/privacy lead and domain advisers.
- First customer problem and first module to validate.
- Who can approve data access and pilot scope.
- Whether the team intends to sell software licences, implementation services or both.
- Funding, delivery budget, support commitments and procurement strategy.
