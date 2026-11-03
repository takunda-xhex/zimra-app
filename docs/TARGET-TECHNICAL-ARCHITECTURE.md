# Target Technical Architecture

**Status:** Proposed architecture, not implemented in production.

## High-level flow

```text
Institution-owned source systems
        |
        | Approved API / secure file exchange
        v
Integration gateway
  - authentication and authorisation
  - schema validation
  - malware/file checks where relevant
  - idempotency and replay protection
  - rate limits and monitoring
        |
        v
Controlled ingestion and staging
  - source provenance
  - data minimisation / masking
  - quality and reconciliation checks
  - retention and deletion policy
        |
        v
Analytics services
  - versioned deterministic rules
  - validated models (only if justified)
  - explainable signals and thresholds
        |
        v
Case and workflow service
  - assignment and review
  - evidence references
  - human decision and reason codes
  - append-only audit events
        |
        v
Role-based web application and reporting
```

## Environment boundaries

- Local development: synthetic fixtures only.
- Preview: synthetic fixtures only, no production credentials.
- Controlled pilot: separate institution-approved environment with explicit data-sharing authority.
- Production: dedicated customer-approved environment, monitored and backed up.

Never copy production taxpayer, employee, identity, customs, banking or biometric records into developer laptops, preview deployments, public issue trackers or general-purpose analytics services.

## Suggested service boundaries

- Identity and access management.
- Connector registry and ingestion workers.
- Data quality and normalisation.
- Rules/model execution.
- Case management.
- Audit/event service.
- Reporting and export.
- Administration and configuration.

## Security requirements

- OIDC/SAML integration with the institution's identity provider where required.
- MFA, short-lived sessions, least-privilege roles and separation of duties.
- Tenant and environment isolation.
- Encryption in transit and at rest, managed key rotation and secret vaulting.
- Server-side validation and parameterised database access.
- CSRF, SSRF, injection, file-upload and abuse protections appropriate to each interface.
- Append-only, integrity-protected audit records.
- Centralised monitoring, security alerts and incident response.
- Tested backup, restore and disaster recovery.
- Independent penetration testing and vulnerability remediation.

## Data contracts

Every connector must have a documented contract including:
- Data owner and controller/processor roles.
- Legal basis, purpose and approved fields.
- Source schema and version.
- Authentication and network boundary.
- Frequency, latency, volume and retry policy.
- Data quality and reconciliation rules.
- Provenance and timestamp requirements.
- Retention, deletion, correction and subject-rights process.
- Error handling, incident notification and change management.

## Current implementation boundary

The repository currently contains a Next.js demonstration UI, a deterministic case explanation endpoint and synthetic examples. It does not yet implement the integration gateway, production identity, tenant isolation, persistent case management, tamper-evident audit storage, validated AI models or approved government-system connections.
