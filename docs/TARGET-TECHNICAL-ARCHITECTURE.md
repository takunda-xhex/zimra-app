# Target Technical Architecture

**Status:** Proposed target architecture. Not implemented in production.
**Chosen product direction:** Hybrid integration and selective modular replacement.
**Chosen AI approach:** Guarded automation with explicit policy boundaries and human approval for consequential actions.

## 1. Architecture objective

Build a modular revenue and customs intelligence platform that can operate in three modes:

1. **Integrate:** connect to approved existing systems and add intelligence, reconciliation, workflow and security capabilities without replacing their systems of record.
2. **Augment:** improve selected workflows through governed automation, evidence preparation, exception routing and operational analytics.
3. **Replace selectively:** replace a specific module only when the institution requests it, the current module's limitations are evidenced, migration and interoperability are proven, and formal acceptance gates are passed.

The platform must not require a big-bang replacement. Existing systems remain authoritative until the customer explicitly approves a controlled transition. The platform must never silently overwrite a source system.

## 2. Logical architecture

```text
Institution users and authorised service channels
        |
        v
Identity, access and policy enforcement
  - institution identity provider / SSO
  - MFA, roles, attributes and separation of duties
  - session and device risk controls
        |
        v
Experience and workflow layer
  - command dashboards
  - reconciliation and exception workbenches
  - case review and approvals
  - operational reporting
        |
        +-------------------------------+
        |                               |
        v                               v
Integration and data plane         Governed AI control plane
  - API gateway                    - model gateway / approved models
  - secure file exchange           - retrieval over approved knowledge
  - connector registry             - deterministic rules engine
  - schema validation              - agent/workflow orchestrator
  - idempotency and replay          - prompt/model/version registry
  - provenance and quality          - policy and tool-permission checks
        |                               |
        v                               v
Controlled data services <------> Explainable decision support
  - staging and minimisation        - anomaly and pattern suggestions
  - normalisation                   - summaries with source citations
  - jurisdiction configuration     - document extraction/checking
  - approved retention              - forecast and scenario support
  - tenant separation               - confidence and limitation display
        |                               |
        +---------------+---------------+
                        |
                        v
Case, event and evidence services
  - human assignment and review
  - approval queues and reason codes
  - append-only audit events
  - source references and evidence integrity
  - correction, escalation and appeal pathways
                        |
                        v
Institution-owned systems of record
  - TaRMS / FDMS / ASYCUDA / other approved systems
  - write-back only through explicitly authorised,
    tested and customer-approved interfaces
```

## 3. Hybrid integration and replacement model

### Mode A: Read-only intelligence first
- Start with synthetic data, then institution-approved masked data.
- Prefer read-only APIs or controlled file exchange.
- Reconcile and compare records without changing the source.
- Return review leads and evidence references to authorised officers.

### Mode B: Approved workflow augmentation
- Add case queues, document checks, notifications, task routing and draft summaries.
- Write-back is disabled by default.
- Where permitted, each write action uses a documented connector contract, a scoped service identity, idempotency key, validation, approval and audit event.

### Mode C: Selective module replacement
A module can be considered for replacement only after:
- the institution identifies the target workflow and system owner;
- functional, legal, security, performance and data migration requirements are documented;
- compatibility and coexistence tests pass;
- historical records, reconciliation and rollback are proven;
- users are trained and the institution signs acceptance;
- the previous system's authoritative status and decommissioning responsibilities are explicitly agreed.

No platform-wide replacement claim should be made before these gates are satisfied.

## 4. Guarded AI control plane

AI is a controlled assistant to institutional processes, not an independent statutory authority.

### Shared AI services
- **Model gateway:** approved model catalogue, routing, cost limits, availability controls and data-handling restrictions.
- **Knowledge retrieval:** versioned approved laws, regulations, procedures, tariff references and internal guidance. Every answer must show its source, effective date and version.
- **Deterministic rules engine:** authoritative calculations, thresholds and statutory logic must be implemented as versioned, tested rules, not left to free-form language-model output.
- **Agent orchestrator:** specialised task agents may perform bounded tasks such as document classification, extraction, reconciliation assistance, case summarisation and draft correspondence.
- **Policy engine:** checks user permissions, data classification, allowed tools, action scope and approval requirements before an agent can act.
- **Evaluation and monitoring:** test sets, output quality, drift, hallucination, false-positive/negative rates, latency, cost and user feedback.
- **AI audit ledger:** records model and prompt version, retrieved sources, rule version, inputs or secure references, output, confidence/limitations, tool calls, approver and final action.

### Automation tiers

| Tier | Allowed behaviour | Control |
|---|---|---|
| 0: Observe | Monitor approved operational signals and generate alerts | Access policy and audit |
| 1: Assist | Summarise, classify, extract, compare and recommend | Source grounding and user review |
| 2: Prepare | Draft case notes, letters, reports and workflow actions | Human approval before submission |
| 3: Execute routine tasks | Route work, request missing documents, reconcile non-disputed records, send approved internal notifications | Pre-approved policy, bounded permissions, reversibility and audit |
| 4: Consequential decisions | Assessments, penalties, enforcement, seizures, refunds, account restrictions or other adverse statutory outcomes | Not autonomous; authorised human decision and required legal process |

Tier 3 must be enabled one workflow at a time after testing and customer approval. Emergency stop, rollback and manual fallback are required. AI must not create new permissions for itself or bypass controls.

## 5. Cybersecurity and trust architecture

- Institution-controlled identity integration, MFA, least privilege and separation of duties.
- Tenant, environment and data-domain isolation.
- Encryption in transit and at rest; managed keys, rotation and secrets vault.
- Secure software supply chain, dependency scanning, signed releases and code review.
- API security, rate limiting, input validation, malware scanning and replay protection.
- Central security logging, SIEM integration where authorised, anomaly detection and incident response.
- Immutable or tamper-evident audit storage with independent access controls.
- Backup, restore, disaster recovery and business continuity tests.
- Data loss prevention, export controls and sensitive-data masking.
- Threat modelling, independent penetration testing and vulnerability remediation.
- AI-specific controls for prompt injection, data leakage, model abuse, unsafe tool use and retrieval poisoning.

Design targets may include NIST Cybersecurity Framework 2.0, NIST AI Risk Management Framework and relevant ISO/IEC standards. These are design references, not certifications. No certification claim is permitted without independent assessment.

## 6. Core service boundaries

1. Identity and access service.
2. API gateway and connector registry.
3. Ingestion, validation and data-quality workers.
4. Canonical data and jurisdiction configuration service.
5. Deterministic rules and analytics service.
6. AI model, retrieval and agent orchestration services.
7. Policy and approval service.
8. Case, workflow and evidence service.
9. Audit and security event service.
10. Reporting and export service.
11. Administration, monitoring and release management.

Services should be separated logically first. Avoid premature microservices until scale, team ownership or security boundaries justify independent deployment.

## 7. Data and connector contracts

Each connector requires an approved contract recording:
- data owner, controller/processor roles and authorised purpose;
- legal basis, approved fields, classification and minimisation;
- source system, schema version and data dictionary;
- authentication, network boundary and service identity;
- read/write permissions and approval requirements;
- frequency, latency, volume, retry, idempotency and replay behaviour;
- provenance, timestamps, reconciliation and quality rules;
- retention, deletion, correction and subject-rights handling;
- monitoring, incident notification, change control and exit procedure.

Default to read-only. Do not connect to TaRMS, FDMS, ASYCUDA, banking, identity or other government systems without written authorisation from the relevant institution and data owner.

## 8. Environment and data boundaries

- **Local development:** synthetic fixtures only.
- **Preview:** synthetic fixtures only; no production credentials.
- **Demonstration:** synthetic data with visible labels and no live integrations.
- **Controlled proof of concept:** institution-approved masked or de-identified data in a segregated, customer-approved environment.
- **Operational pilot:** only after legal, privacy, security, procurement and operational approvals.
- **Production:** customer-controlled or explicitly customer-approved hosting, monitoring, backups, support and incident response.

Never copy production taxpayer, employee, identity, customs, banking or biometric records into developer laptops, preview deployments, public issue trackers or general-purpose analytics services.

## 9. Global and regional configuration

Keep jurisdiction-specific behaviour out of shared application logic where possible. A jurisdiction pack should define:
- laws, regulations, rules and effective dates;
- tax and customs categories, tariff references and validation rules;
- currencies, exchange-rate sources, calendars and languages;
- approved identity, payment, customs and revenue-system connectors;
- data residency, privacy, retention and cross-border transfer controls;
- local reporting, accessibility and procurement requirements.

A deployment in one country does not confer authority or compliance in another.

## 10. Current implementation boundary

The repository currently contains a Next.js demonstration UI, synthetic revenue-risk examples, deterministic case explanations, a browser-only CSV reconciliation lab and a synthetic payroll workflow. It does not yet implement production identity, the integration gateway, persistent case management, tamper-evident audit storage, the AI control plane, validated machine-learning models, cybersecurity operations integrations or approved government-system connections.

The implementation roadmap in `docs/IMPLEMENTATION-ROADMAP.md` defines the proposed build sequence and release gates.
