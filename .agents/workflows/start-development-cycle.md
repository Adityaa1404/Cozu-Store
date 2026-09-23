# Workflow: /start-development-cycle

## Trigger
- **Command**: `/start-development-cycle "<Feature or Change Description>"`
- **Purpose**: Complete end-to-end software development lifecycle from requirements translation to deployment readiness with structured HITL checkpoints.

---

## Workflow Execution Steps

### Phase 1: Requirements & Scoping
- **Active Agent**: PM Agent
- **Skills Used**: `requirements-analysis`, `scope-definition`, `priority-assessment`
- **Actions**:
  1. Parse the feature description and analyze business objectives.
  2. Define user stories, clear acceptance criteria, and out-of-scope items.
  3. Prioritize deliverables and highlight dependencies.
- **Output Artifact**: `PRODUCT_REQUIREMENTS.md`

---

### Phase 2: Architecture & Impact Analysis
- **Active Agent**: Architect Agent
- **Skills Used**: `system-design`, `risk-assessment`, `technical-governance`
- **Actions**:
  1. Ingest `PRODUCT_REQUIREMENTS.md` and explore codebase structure.
  2. Design system architecture, component contracts, and state flow.
  3. Evaluate trade-offs and calculate blast radius across affected modules.
- **Output Artifacts**: `ARCHITECTURE.md`, `BLAST_RADIUS.md`

---

### 🛑 HITL Checkpoint 1: Architecture Approval
- **Required Reviewer**: Human Engineer / User
- **Review Items**:
  - Review design decisions in `ARCHITECTURE.md`.
  - Review risk level, affected modules, and failure modes in `BLAST_RADIUS.md`.
- **Status**: Execution pauses until human approves or provides feedback.

---

### Phase 3: Surgical Implementation & Unit Testing
- **Active Agent**: Developer Agent
- **Skills Used**: `code-generation`, `test-automation`, `code-conformance`
- **Actions**:
  1. Implement surgical, minimal-diff code matching `ARCHITECTURE.md`.
  2. Write automated unit and integration tests covering positive and edge cases.
  3. Run local verification and compile execution logs.
- **Output Artifacts**: Code Diffs / Source Files, `TEST_REPORT.md`, `EXECUTION_LOG.md`

---

### Phase 4: Quality Gate & Code Review
- **Active Agent**: QA / Code Reviewer Agent
- **Skills Used**: `code-quality`, `security-scanning`, `performance-analysis`
- **Actions**:
  1. Perform static analysis, linting, and style conformance checks.
  2. Inspect code complexity, error handling, and regression risks.
  3. Validate test coverage metrics and issue a Pass/Needs Work/Fail verdict.
- **Output Artifact**: `QA_REPORT.md`

---

### Phase 5: Threat Modeling & Security Review
- **Active Agent**: Security Agent
- **Skills Used**: `threat-modeling`, `vulnerability-discovery`, `compliance-checking`
- **Actions**:
  1. Perform STRIDE threat modeling on the changes.
  2. Scan for OWASP Top 10 vulnerabilities, unsafe evaluations, and secret exposure.
  3. Compile findings ranked by severity (Critical / High / Medium / Low).
- **Output Artifacts**: `THREAT_MODEL.md`, `SECURITY_AUDIT.md`

---

### 🛑 HITL Checkpoint 2: QA & Security Sign-off
- **Required Reviewer**: Human Engineer / User
- **Review Items**:
  - Review QA findings and verdict in `QA_REPORT.md`.
  - Review STRIDE analysis and vulnerabilities in `SECURITY_AUDIT.md`.
  - Ensure all Critical/High items are resolved before proceeding.
- **Status**: Execution pauses until human signs off.

---

### Phase 6: Infrastructure & Deployment Automation
- **Active Agent**: DevOps Agent
- **Skills Used**: `ci-cd-automation`, `infrastructure-as-code`, `monitoring-observability`
- **Actions**:
  1. Validate environment configuration and CI/CD pipelines.
  2. Formulate zero-downtime deployment strategy and automated rollback procedures.
  3. Define post-deployment monitoring metrics and health check validation.
- **Output Artifact**: `DEPLOYMENT_PLAN.md`

---

### 🏁 Final Milestone: Merge & Deploy Approval
- **Reviewer**: Human Engineer / User
- **Action**: Review `DEPLOYMENT_PLAN.md`, approve release, and initiate deployment.
