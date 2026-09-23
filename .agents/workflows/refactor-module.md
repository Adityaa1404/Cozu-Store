# Workflow: /refactor-module

## Trigger
- **Command**: `/refactor-module "<Module Path or Description>"`
- **Purpose**: Systematically refactor complex, high-debt, or legacy modules while guaranteeing zero regressions and preserving test coverage.

---

## Workflow Execution Steps

### Phase 1: Module Analysis & Refactor Design
- **Active Agent**: Architect Agent
- **Skills Used**: `system-design`, `risk-assessment`, `technical-governance`
- **Actions**:
  1. Analyze target module complexity, dependencies, coupling, and code smells.
  2. Design refactored architecture, improved abstractions, and clean interfaces.
  3. Define invariant behavioral requirements that must remain unchanged.
- **Output Artifact**: `REFACTOR_DESIGN.md`

---

### Phase 2: Test Baseline Capture
- **Active Agent**: QA / Code Reviewer Agent
- **Skills Used**: `code-quality`, `performance-analysis`
- **Actions**:
  1. Profile existing test coverage and performance characteristics of the target module.
  2. Establish strict baseline test metrics before refactoring starts.
- **Output Artifact**: `COVERAGE_BASELINE.md`

---

### Phase 3: Surgical Refactoring
- **Active Agent**: Developer Agent
- **Skills Used**: `code-generation`, `test-automation`, `code-conformance`
- **Actions**:
  1. Incrementally refactor module code according to `REFACTOR_DESIGN.md`.
  2. Ensure functional equivalence and minimal peripheral churn.
  3. Update or enhance tests to validate newly introduced abstractions.
- **Output Artifacts**: Refactored Source Code Diffs, `TEST_REPORT.md`

---

### Phase 4: Coverage & Equivalence Verification
- **Active Agent**: QA / Code Reviewer Agent
- **Skills Used**: `code-quality`, `performance-analysis`
- **Actions**:
  1. Execute full test suite and compare test coverage against `COVERAGE_BASELINE.md`.
  2. Verify performance metrics (memory, execution speed) have improved or remained steady.
  3. Validate that no behavioral regressions were introduced.
- **Output Artifacts**: `COVERAGE_COMPARISON.md`, `QA_REPORT.md`

---

### 🛑 HITL Checkpoint: Refactoring Approval
- **Required Reviewer**: Human Engineer / User
- **Review Items**:
  - Review `REFACTOR_DESIGN.md`, diffs, and `COVERAGE_COMPARISON.md`.
  - Approve final merge of refactored module.
