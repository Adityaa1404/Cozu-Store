# Workflow: /security-audit

## Trigger
- **Command**: `/security-audit`
- **Purpose**: Conduct a comprehensive security vulnerability scan, threat model assessment, and architectural security review with guided remediation.

---

## Workflow Execution Steps

### Phase 1: Vulnerability & Threat Assessment
- **Active Agent**: Security Agent
- **Skills Used**: `threat-modeling`, `vulnerability-discovery`, `compliance-checking`
- **Actions**:
  1. Scan codebase for hardcoded secrets, dangerous functions (e.g. `eval`, unsanitized DOM manipulation), and input validation flaws.
  2. Audit third-party packages and dependencies for known CVEs.
  3. Map threat vectors using STRIDE taxonomy across application entry points.
- **Output Artifacts**: `SECURITY_AUDIT.md`, `THREAT_MODEL.md`

---

### Phase 2: Architectural Security Review
- **Active Agent**: Architect Agent
- **Skills Used**: `risk-assessment`, `system-design`, `technical-governance`
- **Actions**:
  1. Evaluate architectural vulnerabilities, authentication flaws, and data exposure paths.
  2. Propose remediation architectures for structural security defects.
- **Output Artifact**: `ARCHITECTURE_SECURITY_REVIEW.md`

---

### 🛑 HITL Checkpoint: Remediation Priority & Scope Approval
- **Required Reviewer**: Human Engineer / User
- **Review Items**:
  - Review security audit findings ranked by severity (Critical / High / Medium / Low).
  - Select and prioritize vulnerabilities for immediate remediation.
- **Status**: Execution pauses until human confirms remediation backlog.

---

### Phase 3: Surgical Security Patch Implementation
- **Active Agent**: Developer Agent
- **Skills Used**: `code-generation`, `test-automation`, `code-conformance`
- **Actions**:
  1. Implement surgical fixes for approved vulnerabilities (e.g., input sanitization, safe DOM APIs, CSP).
  2. Write automated security regression tests to guarantee vulnerabilities cannot recur.
- **Output Artifacts**: Security Patch Diff, `TEST_REPORT.md`

---

### Phase 4: Quality & Regression Verification
- **Active Agent**: QA / Code Reviewer Agent
- **Skills Used**: `code-quality`, `security-scanning`
- **Actions**:
  1. Re-run static security scans to verify vulnerabilities are completely eradicated.
  2. Run regression suite to ensure patches did not break application functionality.
  3. Issue final security sign-off verdict.
- **Output Artifact**: `QA_REPORT.md`
