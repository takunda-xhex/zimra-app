# Implementation Roadmap

**Chosen direction:** Hybrid integration and selective modular replacement.
**Chosen automation model:** Guarded AI automation.
**Current maturity:** Early concept prototype using synthetic demonstration data.
**Planning status:** Indicative sequence. Dates, budget, staffing and acceptance criteria must be agreed with the institution and delivery team.

## Guiding decisions

- Integrate with existing systems before considering replacement.
- Keep institution-owned systems of record authoritative unless a specific module is formally approved for transition.
- Build shared security, identity, audit, data governance and policy foundations before live integrations or AI agents.
- Automate repetitive, reversible work first. Require authorised human approval for consequential statutory or adverse decisions.
- Never use live government or taxpayer data without written authority and an approved environment.
- Measure outcomes against a customer-agreed baseline. Do not equate flagged exposure with tax due or revenue recovered.

## Phase 0: Stabilise the prototype and prove the product story

**Goal:** Turn the current UI into a coherent, testable demonstration.

### Build
- Keep the current dashboard, synthetic revenue-risk view, Reconciliation Lab and payroll demonstration clearly labelled.
- Add an architecture overview that explains the hybrid integration model.
- Add a capability register distinguishing implemented, simulated and proposed features.
- Standardise demo data and add repeatable test fixtures.
- Add automated lint/build checks and basic tests for CSV parsing, calculations, filters and exports.
- Add accessibility, responsive-layout and error-state checks.

### Exit gates
- A clean production build succeeds.
- Demonstration data is clearly marked synthetic.
- No page implies a live government connection or validated AI capability.
- A reviewer can follow one exception from source row through calculation, explanation and review outcome.

## Phase 1: Security and application foundations

**Goal:** Establish the minimum trustworthy foundation before introducing institutional data.

### Build
- Select a production database and deployment model with customer input; do not reuse unrelated projects or credentials.
- Implement institution-ready identity integration, MFA, role-based and attribute-based access, and separation of duties.
- Add tenant and environment isolation.
- Add server-side validation, secure session handling, rate limits and secure file processing.
- Create append-only audit events for login, viewing, export, edits, approvals and administrative changes.
- Implement encryption, secret management, retention/deletion workflows, backups and restore tests.
- Add threat model, data inventory, privacy impact assessment and incident-response plan.

### Exit gates
- Security architecture reviewed.
- Roles and permissions tested, including negative tests.
- Audit events are attributable and tamper-evident.
- Backup restoration and incident exercises are documented.
- No real data is enabled until written data-owner authority and legal/privacy approvals exist.

## Phase 2: Hybrid integration foundation

**Goal:** Connect safely without replacing systems of record.

### Build
- Connector registry with owner, purpose, schema, permissions and health status.
- API gateway and controlled file-exchange pipeline.
- Schema validation, normalisation, idempotency, replay protection, retries and dead-letter handling.
- Source provenance, data quality checks and reconciliation reports.
- Read-only connector pattern first, with sandbox simulators for testing.
- Documented data contracts and connector conformance tests.
- Exportable review findings with source references, not silent source-system updates.

### Exit gates
- A sandbox connector can ingest, validate, reconcile and trace sample records end to end.
- Duplicate/replayed files do not create duplicate business events.
- Failed records are quarantined with actionable error messages.
- Connector permissions and audit records pass security review.
- Any institution-specific integration has written approval and a named system owner.

## Phase 3: Case management and guarded workflow automation

**Goal:** Move from browser-local demonstration state to accountable operational workflows.

### Build
- Persistent case records, assignment, status history, comments and evidence references.
- Review queues, reason codes, escalation and correction workflows.
- Approval service with maker-checker controls for sensitive actions.
- Workflow engine for bounded routine tasks: task routing, reminders, missing-document requests and approved internal notifications.
- Policy-based execution: allowed action, actor, scope, data class, time limit and rollback behaviour.
- Manual fallback and emergency stop.

### Exit gates
- Every case change has an authenticated actor and audit event.
- High-impact actions cannot be executed by a single unapproved automation path.
- Routine automation is reversible or has a documented recovery path.
- Users can see why a task was routed and how to override or correct it.

## Phase 4: Governed AI foundation

**Goal:** Add AI capabilities without allowing free-form model output to become an authority.

### Build
- Approved model gateway with provider/model allowlist, data-handling controls and usage limits.
- Retrieval system over institution-approved, versioned knowledge with source citations and effective dates.
- Deterministic rules engine for statutory calculations and formal thresholds.
- Bounded agents for document extraction, classification, reconciliation assistance, case summaries and draft communications.
- Policy engine that checks user permissions, tool permissions, data classification and required approvals before every tool call.
- AI audit records: model/version, prompt/template version, retrieved source IDs, rule version, tool calls, output, limitations, reviewer and final disposition.
- Evaluation datasets and monitoring for groundedness, extraction accuracy, false positives/negatives, drift, bias, latency and cost.

### Automation policy
- AI may observe, summarise, classify, compare, recommend and prepare drafts.
- AI may execute only pre-approved, low-risk, bounded and reversible routine tasks after a workflow-specific validation and approval.
- AI must not independently issue tax assessments, penalties, enforcement actions, seizures, refunds, account restrictions or other consequential statutory outcomes.
- AI must not make final legal interpretations; it can retrieve and explain approved sources for authorised review.
- Uncertain, conflicting or unsupported outputs must be labelled and escalated, not silently completed.

### Exit gates
- Evaluation results meet institution-agreed thresholds on representative test data.
- Source citations and version history are visible for knowledge-grounded outputs.
- Prompt-injection, data-leakage and unsafe-tool-use tests pass.
- Human approval, audit and emergency-stop paths are demonstrated.
- No model is described as accurate or production-ready beyond measured evidence.

## Phase 5: Controlled proof of concept

**Goal:** Validate one narrow use case with an institution, not launch a broad replacement programme.

### Candidate first use case
Revenue reconciliation and exception triage across one approved dataset pair, using read-only access and a small number of named users.

### Required controls
- Written sponsor and data-owner authority.
- Signed scope, purpose, data fields, duration, users, hosting and exit plan.
- Approved masked/de-identified data unless the institution explicitly authorises otherwise.
- Privacy and security assessments.
- Named operational owner and human reviewers.
- Independent security testing proportionate to risk.
- Agreed baseline, success measures, incident process and stop/rollback procedure.

### Measures
- Ingestion completeness and data-quality error rate.
- Reconciliation accuracy against independently verified examples.
- Time to identify and explain an exception.
- Officer review time per case.
- False-positive and false-negative rates.
- Percentage of cases with complete provenance and audit history.
- Availability, latency and recovery performance.
- User feedback and correction rates.

### Exit gates
The institution signs off the results, risks, residual limitations and next-step decision. A flagged amount is never reported as a tax liability or recovered revenue.

## Phase 6: Selective module replacement, only where justified

**Goal:** Replace a specific module only when the customer chooses and the evidence supports it.

### Required sequence
1. Document the target module's functional and non-functional requirements.
2. Complete gap analysis against the existing module and institutional standards.
3. Prove data migration, historical record integrity and reconciliation.
4. Test interoperability with systems that remain in place.
5. Run parallel operation and compare outputs.
6. Complete security, privacy, resilience, performance and user-acceptance testing.
7. Agree cutover, rollback, support, records retention and decommissioning responsibilities.
8. Obtain formal institutional acceptance before production cutover.

No full-system replacement should be proposed as the default. Modular coexistence remains supported.

## Phase 7: Regional and global expansion

**Goal:** Reuse the secure platform core while adapting law, data and integrations locally.

### Build
- Jurisdiction-pack framework with effective-dated laws, rules, currencies, calendars, languages and reporting.
- Country-specific connector catalogue and conformance tests.
- Data residency and cross-border transfer configuration.
- Local support, procurement, incident notification and service-level requirements.
- Independent local legal, privacy, cybersecurity and domain review.

### Exit gates
- Local subject-matter experts validate the jurisdiction pack.
- Each connector and dataset has local authority and a signed contract.
- Security and privacy requirements are assessed afresh for that jurisdiction.
- Local acceptance and operational support are documented.

## Priority order

| Priority | Workstream | Why it comes here |
|---|---|---|
| P0 | Prototype quality and truthful capability labels | Makes the current product credible and testable |
| P1 | Identity, security, privacy and audit foundations | Required before sensitive data or multi-user operations |
| P2 | Read-only integration and data quality | Delivers hybrid value without disrupting systems of record |
| P3 | Persistent case management and bounded workflows | Makes review and routine automation accountable |
| P4 | Governed AI foundation | Adds AI after permissions, evidence and audit exist |
| P5 | Narrow controlled proof of concept | Tests measurable value with institutional authority |
| P6 | Selective module replacement | Higher-risk option, justified only by evidence |
| P7 | Regional/global jurisdiction packs | Expansion after repeatable local delivery is proven |

## Current repository status against this roadmap

| Area | Current state |
|---|---|
| Dashboard and navigation | Implemented demonstration UI |
| Revenue-risk scoring | Deterministic synthetic demonstration rules |
| Reconciliation Lab | Browser-only CSV prototype |
| Payroll workflow | Synthetic demonstration only |
| Case explanation | Deterministic rule-based text, not an LLM |
| Production identity and MFA | Not implemented |
| Persistent case database | Not implemented |
| Tamper-evident audit | Not implemented |
| Secure integration gateway | Not implemented |
| Governed AI control plane | Not implemented |
| Validated machine-learning models | Not implemented |
| Live government integrations | Not implemented or authorised |
| Production institutional deployment | Not approved or configured |

## Immediate next build sequence

1. Update the dashboard and documentation so the hybrid model and guarded AI boundaries are explicit.
2. Add tests and validation around the current synthetic reconciliation workflow.
3. Design the identity, roles, audit-event schema and data classification before selecting production data storage.
4. Build a simulated read-only connector and data-contract format using synthetic data.
5. Add persistent case workflow only after access control and audit foundations are designed.
6. Add AI-assisted summarisation only after approved-source retrieval, policy checks and audit capture exist.

This roadmap is a design plan, not a delivery commitment or evidence of institutional approval.
