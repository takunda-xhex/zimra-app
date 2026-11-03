# Meeting Brief: Operational Assurance and Revenue Intelligence

**Status:** Meeting discussion proposal, not an approved ZIMRA project.
**Product direction:** Hybrid integration and selective modular replacement.
**Automation approach:** Guarded AI; human accountability for consequential decisions.
**Demonstration:** Synthetic records only. No ZIMRA systems, staff, taxpayers or internal findings are accessed.

## 1. Executive proposition

Propose an **Operational Assurance Workbench**: a secure intelligence and workflow layer that connects operational exceptions to the controls that should have operated, the accountable owner, the evidence required, and an independent closure check.

The core idea is not another dashboard, chatbot or tax portal. It is a control-to-outcome system: every important operational signal becomes a traceable, reviewable work item that can be resolved and evidenced.

It would initially complement existing systems and processes. It would not replace TaRMS, FDMS, ASYCUDA, the data warehouse, internal audit tools or other systems of record. Any later module replacement would require a separate institution-led business case and approval.

## 2. Why this is relevant to ZIMRA's published direction

The following are published facts, not assumptions about undisclosed internal problems:

- ZIMRA's 2026–2030 strategy prioritises revenue mobilisation, tax-base expansion, trade facilitation, digital transformation, data-driven insights, plugging revenue leakages and governance/risk management.
- The strategy identifies Domestic Taxes, Customs & Excise and Revenue Assurance. Revenue Assurance's published functions include compliance and fraud mitigation, investigations, data analytics and decision-making, debt management and economic analysis.
- The strategy describes integration of systems and upgrading the data warehouse for AI-driven tax intelligence and analytics. It also identifies data warehouse reliability, data exchange cooperation, specialist skills and cyber risk as matters in its planning assumptions and risk context.
- The 2025 annual report says internal audit reviewed IT, operational, financial, governance, compliance and risk domains and identified control weaknesses and high-risk areas requiring management attention. It describes follow-up audits, agile audit practices, systematic follow-up of findings and increased use of technology and analytics as future focus areas.
- The 2025 annual report says ZIMRA generated 62 data-driven intelligence reports shared with Revenue Assurance, Domestic Taxes, and Customs & Excise.
- The 2025 annual report reports NIST cybersecurity maturity at 85% and server, application and network uptime above 96%. Therefore, this proposal should not claim ZIMRA has weak cybersecurity or unreliable core systems. It should explore complementary assurance, evidence, workflow and cross-system visibility needs.

Sources:
1. ZIMRA Strategic Plan 2026–2030: https://www.zimra.co.zw/about-us/strategic-plan?download=4508%3Azimra-strategic-plan-2026-2030-final
2. ZIMRA Annual Report 2025: https://www.zimra.co.zw/vacancies/category/2-annual-reports?download=4517%3Azimra-2025-annual-report

## 3. The distinctive product idea: a control-to-outcome graph

A typical dashboard displays a metric or red alert. This workbench connects six objects:

1. **Operational event:** a timestamped event from an approved system or process.
2. **Control objective:** the policy or procedure that should govern that event.
3. **Exception:** the observable deviation, missing event, duplicate, delay or unresolved mismatch.
4. **Accountable owner:** the role responsible for reviewing the exception.
5. **Evidence bundle:** source references, timestamps, documents, approvals and calculation/rule versions.
6. **Closure verification:** an independent check that the issue was resolved and the control now operates as intended.

This forms an auditable chain from signal to verified outcome. Missing evidence creates a review task; it does not prove wrongdoing.

## 4. Beyond-the-obvious capabilities

### A. Control graph and evidence ledger
Map each approved control to its triggering event, required evidence, owner, exception path and closure test. Preserve source provenance and a tamper-evident history.

### B. Process friction radar
Use event timestamps and workflow metadata to find repeated hand-offs, queues, rework loops, stalled approvals and recurring missing-document patterns. Show where time is spent, not just how many cases exist. Do not monitor staff productivity at an individual level without an explicit lawful mandate and consultation.

### C. Exception fingerprinting
Group recurring exceptions by root-cause signature: source-system delay, schema change, missing reference, duplicate event, policy ambiguity, incomplete evidence or training gap. This helps fix the process rather than repeatedly chase symptoms.

### D. Audit action closure loop
Track audit recommendations from finding to agreed action, accountable owner, due date, implementation evidence, independent validation and closure. Keep Internal Audit independent: management owns remediation; Internal Audit owns independent assurance.

### E. Counterfactual replay
Before changing a rule, connector or workflow, replay it against approved historical or synthetic events in a sandbox. Compare how many cases would be flagged, missed or delayed. No live action is taken by the replay engine.

### F. Revenue and service impact lens
Show potential operational exposure separately from confirmed liabilities or collections. Pair revenue assurance indicators with service measures such as turnaround time, queue ageing and rework so that revenue protection does not undermine fair treatment or trade facilitation.

### G. Resilience and control continuity
When a feed, system or site is unavailable, show which downstream controls are affected, what manual fallback is authorised, what must be reconciled after recovery and who confirms completeness. This is continuity orchestration, not a replacement for existing cyber defence or disaster recovery systems.

## 5. Initial use cases to validate, not presume

| Candidate workflow | Potential value | Evidence to request in discovery |
|---|---|---|
| Audit recommendation follow-up | Faster, more evidenced closure and clearer ownership | An anonymised sample of action-plan fields and closure criteria |
| Payment reconciliation exceptions | Earlier visibility of unmatched or delayed records | Data dictionary, event timestamps, approved aggregate sample |
| Customs release evidence chain | Identify missing/late workflow events and reduce avoidable rework | An anonymised process map and event definitions |
| Cross-system feed failures | Faster root-cause isolation and safe replay | Connector run metadata and error categories |
| Service queue bottlenecks | Find avoidable waiting and repeated hand-offs | Aggregated queue timestamps and service-stage definitions |

These are candidate problems, not claims that these failures currently occur.

## 6. How AI fits, without taking authority

- Deterministic rules calculate statutory values, tolerances and control conditions.
- AI may classify documents, summarise evidence, group similar exceptions and draft review notes.
- Retrieval uses only approved, versioned policies and procedures and cites the source and effective date.
- AI tools have narrowly scoped permissions and cannot grant themselves access.
- Routine low-risk tasks may be automated only after workflow-specific approval, tests, monitoring and rollback design.
- No autonomous tax assessments, penalties, enforcement, seizures, refunds, account restrictions or adverse statutory decisions.
- Every recommendation and tool action is logged with model/version, source references, rule version, reviewer and final disposition.

## 7. Proposed pilot: one workflow, one owner, one measurable outcome

A practical first pilot candidate is **audit action closure and control evidence tracking**, because it can demonstrate value without starting with taxpayer-level data or requiring a core-system integration.

Suggested sequence:
1. Discovery workshop with Internal Audit, the relevant action owners, ICT, Risk/Governance and Legal/Privacy.
2. Map one existing action-follow-up workflow and agree what constitutes sufficient closure evidence.
3. Configure a synthetic demonstration, then use only approved masked records if a pilot is authorised.
4. Integrate through a controlled import or read-only API if permitted.
5. Run parallel to existing registers; do not replace them during the pilot.
6. Compare baseline and pilot performance.
7. Independent review of security, access, audit trail and evidence integrity.

Potential pilot measures:
- Median days from action assignment to evidence submission.
- Percentage of actions with complete evidence at first review.
- Median time from evidence submission to independent validation.
- Percentage of overdue actions with an assigned owner and current reason.
- Repeat finding rate for the same control objective.
- Percentage of records with complete provenance and audit history.
- User effort and rework per action.

Targets must be set after measuring the baseline. Do not invent savings or promise revenue uplift.

## 8. Meeting questions that show operational seriousness

1. Which internal workflow currently consumes the most avoidable staff time because information must be gathered from multiple systems or registers?
2. Where do exceptions become difficult to trace from source event to accountable owner and final resolution?
3. How are audit recommendations assigned, evidenced, independently validated and closed today?
4. Which cross-division hand-offs create the most rework or delay?
5. What operational data can be shared in aggregate or masked form for a controlled proof of concept?
6. Which systems are authoritative for each data element, and what interfaces are permitted?
7. What must remain read-only, and what routine actions could be safely automated?
8. What would constitute measurable success after 8–12 weeks?
9. Who would own the workflow, data access, security approval and pilot acceptance?
10. What existing programme or supplier must this solution complement rather than duplicate?

## 9. Architecture and safeguards

- Integrate first; read-only by default.
- Institution-controlled identity, MFA, least privilege and separation of duties.
- Tenant/environment isolation, encryption, managed secrets and export controls.
- Append-only or tamper-evident audit records.
- Data minimisation, purpose limitation, retention and deletion.
- Human approval for consequential actions.
- Signed connector contracts and replay protection.
- Security threat modelling, privacy impact assessment, independent testing, backup and recovery exercises.
- Customer-approved hosting and data residency.
- No live data until written authority, lawful basis and institutional approvals are in place.

## 10. What is actually demonstrated today

The current platform includes synthetic revenue-risk examples, a browser-only reconciliation prototype, a synthetic payroll workflow and deterministic case explanations. The new Operational Assurance Workbench is a synthetic workflow demonstration. It does not connect to ZIMRA, TaRMS, FDMS, ASYCUDA, internal audit registers, staff accounts or taxpayer records. It is not a production system and does not contain validated AI models.

## 11. Meeting close

We are not asking ZIMRA to replace its existing platforms or disclose confidential information at an introductory meeting. We are asking to understand one internal workflow where better evidence, cross-system visibility or controlled automation could produce a measurable improvement.

If there is a fit, the next step is a jointly scoped discovery and a controlled proof of concept using synthetic or institution-approved masked data, with named owners, security gates and agreed success measures.
