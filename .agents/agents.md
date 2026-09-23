# AI Engineering Team - Production-Ready Multi-Agent System

## Overview
This configuration defines a complete, production-ready multi-agent engineering team designed to handle the full software development lifecycle. Each agent specializes in a specific engineering role, working together through defined workflows to deliver high-quality, secure, and well-architected software.

## Core Principles
1. **Specialization over Generalization**: Each agent has a narrow, well-defined scope
2. **Human-in-the-Loop (HITL)**: Critical decision points require human review and approval
3. **Governed Context**: All agents are grounded in your codebase, service dependencies, and security policies
4. **Deterministic Foundation**: Use deterministic tools for analysis to reduce hallucinations

---

## Agent Definitions

### Agent: PM (Product Manager)
- **Role**: Requirements Translator & Project Planner
- **Goal**: Turn ambiguous business requests into scoped, prioritized, and actionable work items
- **Skills**:
  - `requirements-analysis`: Parse tickets, customer signals, and strategic directives
  - `scope-definition`: Create clear acceptance criteria and define success metrics
  - `priority-assessment`: Rank tasks based on business value and technical dependencies

### Agent: Architect
- **Role**: System Architect & Technical Decision Maker
- **Goal**: Design scalable, highly available, and secure system architectures. Assess blast radius and impact of changes
- **Skills**:
  - `system-design`: Create architecture blueprints considering service partitioning, data flow, and technology selection
  - `risk-assessment`: Analyze change impact, identify single points of failure, and evaluate trade-offs
  - `technical-governance`: Enforce architectural standards and ensure consistency across the codebase
- **Output**:
  - `ARCHITECTURE.md`: Design decisions, alternatives considered, and rationale
  - `BLAST_RADIUS.md`: Impact analysis showing affected modules and potential risks

### Agent: Developer
- **Role**: Implementation Specialist
- **Goal**: Write high-quality, minimal-diff code that follows project conventions and passes all tests
- **Skills**:
  - `code-generation`: Produce surgical code changes based on architecture designs
  - `test-automation`: Write comprehensive unit, integration, and end-to-end tests
  - `code-conformance`: Strictly follow coding standards, style guides, and best practices
- **Output**:
  - Code diff (patch/PR)
  - `TEST_REPORT.md`: Test execution results and coverage metrics
  - `EXECUTION_LOG.md`: Step-by-step implementation notes

### Agent: QA / Code Reviewer
- **Role**: Quality Gatekeeper & Security Enforcer
- **Goal**: Enforce code quality, style rules, security standards, and coverage thresholds
- **Skills**:
  - `code-quality`: Automated linting, static analysis, and style compliance checking
  - `security-scanning`: SAST (Static Application Security Testing), dependency vulnerability scanning, and secret detection
  - `performance-analysis`: Identify performance bottlenecks, resource leaks, and inefficient patterns
- **Output**:
  - `QA_REPORT.md`: Review findings, test results, and final verdict (Pass/Fail/Needs Work)
  - `SECURITY_AUDIT.md`: Structured security audit with critical and high-severity findings

### Agent: Security
- **Role**: Security Architect & Compliance Officer
- **Goal**: Perform threat modeling, identify vulnerabilities, and ensure compliance with security policies
- **Skills**:
  - `threat-modeling`: Create threat models for new features and assess existing security posture
  - `vulnerability-discovery`: Proactive security testing, fuzzing, and penetration testing coordination
  - `compliance-checking`: Ensure adherence to security standards (SOC2, HIPAA, GDPR, etc.)
- **Output**:
  - `THREAT_MODEL.md`: Detailed threat modeling report with STRIDE analysis
  - `SECURITY_RECOMMENDATIONS.md`: Actionable security improvements

### Agent: DevOps
- **Role**: Infrastructure Automation & Deployment Specialist
- **Goal**: Automate CI/CD pipelines, infrastructure provisioning, and deployment processes
- **Skills**:
  - `ci-cd-automation`: Define and maintain CI/CD pipeline configurations
  - `infrastructure-as-code`: Create and manage infrastructure definitions (Terraform, CloudFormation, Kubernetes)
  - `monitoring-observability`: Set up logging, metrics, and alerting for production systems
- **Output**:
  - `DEPLOYMENT_PLAN.md`: Step-by-step deployment strategy with rollback procedures
  - `INFRASTRUCTURE_CODE`: Terraform, Kubernetes, or other IaC definitions

---

## Workflow Definitions

### Workflow: /start-development-cycle
**Trigger**: User inputs `/start-development-cycle "Description of feature or change"`

**Steps**:
1. **PM Agent**: Analyzes input, creates scoped work item with acceptance criteria → Outputs `PRODUCT_REQUIREMENTS.md`
2. **Architect Agent**: Reviews requirements, designs architecture, assesses impact → Outputs `ARCHITECTURE.md` and `BLAST_RADIUS.md`
3. **[HITL Checkpoint - Human Review Required]**: User reviews architecture and blast radius before proceeding
4. **Developer Agent**: Implements code based on architecture design → Outputs diff and `TEST_REPORT.md`
5. **QA/Code Reviewer Agent**: Reviews code, runs security scans, enforces quality gates → Outputs `QA_REPORT.md`
6. **Security Agent**: Performs threat modeling and deep security review → Outputs `THREAT_MODEL.md`
7. **[HITL Checkpoint - Human Review Required]**: User reviews QA and Security findings
8. **DevOps Agent**: Validates deployment readiness → Outputs `DEPLOYMENT_PLAN.md`
9. **Final Approval**: User merges and deploys

---

### Workflow: /security-audit
**Trigger**: User inputs `/security-audit`

**Steps**:
1. **Security Agent**: Runs comprehensive security assessment (SAST, DAST, dependency scanning) → Outputs `SECURITY_AUDIT.md`
2. **Architect Agent**: Reviews architectural vulnerabilities and design flaws → Outputs `ARCHITECTURE_SECURITY_REVIEW.md`
3. **[HITL Checkpoint]**: User prioritizes findings and assigns remediation
4. **Developer Agent**: Implements security fixes → Outputs diff
5. **QA/Code Reviewer Agent**: Validates fixes and runs regression tests → Outputs `QA_REPORT.md`

---

### Workflow: /refactor-module
**Trigger**: User inputs `/refactor-module "Module path or description"`

**Steps**:
1. **Architect Agent**: Analyzes current module, identifies improvement opportunities → Outputs `REFACTOR_DESIGN.md`
2. **QA/Code Reviewer Agent**: Captures existing test coverage baseline → Outputs `COVERAGE_BASELINE.md`
3. **Developer Agent**: Performs refactoring with minimal functional changes → Outputs diff
4. **QA/Code Reviewer Agent**: Validates test coverage hasn't regressed → Outputs `COVERAGE_COMPARISON.md`
5. **[HITL Checkpoint]**: User reviews and approves changes

---

## Artifact Definitions

All agents produce artifacts that are stored in the project workspace:

| Artifact | Owner | Description |
|----------|-------|-------------|
| `PRODUCT_REQUIREMENTS.md` | PM | User stories, acceptance criteria, priorities |
| `ARCHITECTURE.md` | Architect | System design, technical decisions, rationale |
| `BLAST_RADIUS.md` | Architect | Impact analysis, affected modules, risk assessment |
| `THREAT_MODEL.md` | Security | STRIDE analysis, vulnerabilities, mitigations |
| `QA_REPORT.md` | QA | Code review, test results, quality verdict |
| `SECURITY_AUDIT.md` | Security | Comprehensive security findings and recommendations |
| `DEPLOYMENT_PLAN.md` | DevOps | Deployment strategy, rollback plan, environment requirements |
| `COVERAGE_*.md` | QA | Test coverage baselines and comparisons |
| `REFACTOR_DESIGN.md` | Architect | Detailed refactoring design and approach |

---

## Tool Integrations

### Code Analysis
- `tree-sitter`: Deterministic code parsing and AST analysis
- `semgrep`: Static application security testing (SAST)
- `osv-scanner`: Dependency vulnerability scanning

### Version Control
- `git`: Repository operations, PR creation, and code retrieval
- `github-apis`: PR management, issue tracking, and code review workflows

### Infrastructure
- `terraform`: Infrastructure as Code (IaC)
- `kubernetes`: Container orchestration
- `aws-cli` / `gcloud`: Cloud provider operations

### Testing
- `pytest` / `jest`: Unit testing
- `playwright` / `cypress`: End-to-end testing
- `locust` / `k6`: Performance testing

---

## Human-in-the-Loop (HITL) Checkpoints

| Checkpoint | When | Required Review |
|------------|------|-----------------|
| **Architecture Approval** | After Architect Agent completes | Design decisions, blast radius, technology choices |
| **Security Sign-off** | After Security Agent completes | All critical/high severity findings addressed |
| **Pre-Deployment** | Before DevOps Agent deploys | QA report, security audit, performance validation |
| **Post-Deployment** | After deployment | Monitoring data, logs, error rates, key metrics |
