# ZIMRA Revenue Intelligence: POTRAZ and Pilot-Readiness Brief

**Status:** Discussion draft for stakeholder engagement  
**Product status:** Early prototype  
**Data status:** Synthetic demonstration data only  
**Approval status:** No regulatory, institutional, or production approval is implied

## 1. What the prototype demonstrates

The prototype explores how explainable analytics could help authorised public-sector teams prioritise records for human review. Current demonstration modules are:

- Revenue Intelligence: illustrative reconciliation of fiscal-device sales and VAT declarations, customs-risk indicators, import valuation comparisons, synthetic company-network relationships, and a tracker for published revenue indicators.
- Payroll Integrity: synthetic examples of duplicate identifiers, shared bank-account indicators, stale biometric records, and records marked retired or deceased while payroll remains active.
- Case explanation: a deterministic rule-based summary that lists supplied risk indicators and recommended verification steps.

These are demonstrations of possible workflows, not validated operational capabilities.

## 2. Why engage POTRAZ

POTRAZ regulates Zimbabwe's postal and telecommunications sector and also has responsibilities as Zimbabwe's Data Protection Authority under the Cyber and Data Protection Act [Chapter 12:07]. Its cyber-security and data-protection expertise may be relevant to an early discussion about privacy, cybersecurity, data governance, and safe digital-system design.

That does **not** mean POTRAZ is the owner or approving authority for ZIMRA tax administration, customs operations, or public-service payroll. The team should confirm the correct institutional sponsors and approval path with ZIMRA and every other relevant data owner. POTRAZ engagement should be framed around the aspects within its mandate, not as a request for it to endorse tax decisions or authorise access to another institution's records.

Reference starting points:
- POTRAZ official site: https://www.potraz.gov.zw/
- POTRAZ mandate material: https://www.potraz.gov.zw/wp-content/uploads/2022/02/2017_POTRAZ_ANNUAL_REPORT.pdf
- Cyber and Data Protection Act and current regulations should be checked with qualified Zimbabwean counsel and the relevant authority before a pilot.

## 3. Suggested meeting objective

Request a technical and governance discussion, not approval to deploy. Suggested objectives:

1. Explain the problem statement and the Zimbabwe-first, internationally extensible product vision.
2. Demonstrate the prototype using synthetic data only.
3. Ask which privacy, cybersecurity, data-controller/processor, cross-border hosting, and incident-reporting requirements should be considered.
4. Identify the appropriate ZIMRA, public-sector, and other data-owner stakeholders for any later controlled pilot.
5. Agree what evidence and documentation would be expected before a formal pilot proposal.

## 4. Non-negotiable safeguards before any real-data pilot

- Written sponsorship and authorisation from each data owner.
- A documented lawful basis, purpose limitation, data minimisation, retention schedule, and data-subject rights process.
- A privacy impact assessment and security risk assessment.
- Approved hosting, data residency and cross-border transfer position.
- Strong identity verification, least-privilege role-based access, MFA, session controls, and separation of duties.
- Tamper-evident audit logs for viewing, exporting, changing, and acting on records.
- Encryption in transit and at rest, managed secrets, tested backups, recovery plans, and incident response.
- Independent penetration testing and secure-development review.
- Human review, reason codes, appeal/correction routes, and documented safeguards against automated adverse decisions.
- Accuracy testing, false-positive/false-negative measurement, bias evaluation, and change control for thresholds or models.

## 5. Current prototype limitations to disclose

- All taxpayer, border, valuation, company-network, and payroll examples are synthetic.
- The repository currently has no confirmed production ZIMRA database integration.
- The case explanation endpoint is rule-based, not a live AI model.
- Some public figures, tax rates, and benchmarks embedded in the prototype require verification against current primary sources before external presentation.
- The prototype does not implement production identity management, role-based officer access, persistent case records, tamper-evident audit trails, or a production data-governance layer.
- The payroll demonstration concerns records that would belong to other public-sector data owners and must not be represented as ZIMRA-owned data.

## 6. Recommended pilot sequence

**Stage A: Demonstration**
- Synthetic data only.
- Validate workflows and terminology with subject-matter experts.
- Record feedback and revise the prototype.

**Stage B: Controlled technical proof of concept**
- Use approved, masked or de-identified sample data only.
- Operate in an institutionally approved environment.
- No automated enforcement, collection, employee action, or taxpayer decision.

**Stage C: Limited operational pilot**
- Proceed only after written approvals, legal and privacy review, security testing, operational ownership, and signed data-sharing agreements.
- Human decision-makers retain authority.
- Define success metrics, monitoring, audit, incident response, and a stop/rollback process.

## 7. Evidence pack to prepare for a stakeholder meeting

- Product overview and problem statement.
- Live demonstration script with synthetic data clearly labelled.
- Architecture and data-flow diagram.
- Data inventory and source/owner matrix.
- Privacy impact assessment and threat model.
- Access-control and audit-log design.
- Model/rule explanation, validation results, and error analysis.
- Pilot scope, success metrics, risks, budget, timeline, and accountable owners.
- Written confirmation of what is implemented, simulated, and not yet built.

## 8. Positioning statement

The team is developing a Zimbabwe-first prototype to explore responsible, explainable analytics for public-sector revenue and integrity workflows, with an architecture intended to support future regional and international adaptation. The immediate request is for technical guidance and stakeholder engagement so that any future pilot is lawful, secure, accountable, and aligned with the mandates of the institutions involved.
