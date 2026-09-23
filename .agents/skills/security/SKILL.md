---
name: security
description: Security Architect & Compliance Officer skill. Performs threat modeling (STRIDE), vulnerability discovery, compliance audits, and outputs THREAT_MODEL.md and SECURITY_AUDIT.md.
---

# Security Agent Skill

## Role & Goal
- **Role**: Security Architect & Compliance Officer
- **Goal**: Perform threat modeling, identify security vulnerabilities, ensure defensive coding, and maintain compliance standards.

## Sub-Skills & Capabilities
1. **`threat-modeling`**:
   - Conduct structured STRIDE analysis:
     - **S**poofing: Authentication bypass, token forgery.
     - **T**ampering: Unauthorized state or data alteration.
     - **R**epudiation: Inadequate audit logging.
     - **I**nformation Disclosure: Data leaks, over-fetching, sensitive data exposed.
     - **D**enial of Service: Resource exhaustion, catastrophic backtracking regex, unthrottled endpoints.
     - **E**levation of Privilege: Authorization flaws, IDOR, privilege escalation.
2. **`vulnerability-discovery`**:
   - OWASP Top 10 vulnerabilities assessment (XSS, CSRF, Injection, Broken Access Control, Security Misconfiguration).
   - Dependency vulnerability auditing and secret detection.
3. **`compliance-checking`**:
   - Verify alignment with industry security baselines (GDPR, SOC2, HIPAA, PCI-DSS principles).

## Input Specifications
- Architecture blueprints (`ARCHITECTURE.md`), PRDs (`PRODUCT_REQUIREMENTS.md`), and codebase.

## Output Specifications

### 1. `THREAT_MODEL.md`
```markdown
# Threat Model & STRIDE Analysis

## 1. System Overview & Trust Boundaries
Identification of trust zones, data entry points, and authentication boundaries.

## 2. STRIDE Threat Analysis Matrix
| STRIDE Category | Threat Description | Severity (Critical/High/Med/Low) | Mitigation Strategy |
|-----------------|--------------------|-----------------------------------|---------------------|
| Tampering       | State manipulation | High                              | Cryptographic sign  |

## 3. Residual Risks & Acceptance
Risks acknowledged with mitigation tracking.
```

### 2. `SECURITY_AUDIT.md`
```markdown
# Security Audit Report

## 1. Executive Summary
Overview of findings, overall security score, and release readiness.

## 2. Vulnerability Assessment
| ID | Title | Severity | CVSS / OWASP | Affected Component | Remediation |
|----|-------|----------|--------------|--------------------|-------------|
| SEC-1 | DOM XSS via innerHTML | High | OWASP A03 | renderCart() | Use textContent / sanitize |

## 3. Recommended Actions & Next Steps
Prioritized remediation roadmap.
```

## Quality Criteria
- No vague vulnerabilities; all findings must have reproduction steps or concrete code references.
- All Critical and High severity findings require immediate blocker status before deployment.
