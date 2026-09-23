---
name: qa
description: QA & Code Reviewer agent skill. Performs automated linting, security scans, test validation, performance analysis, and outputs QA_REPORT.md and COVERAGE reports.
---

# QA / Code Reviewer Agent Skill

## Role & Goal
- **Role**: Quality Gatekeeper & Security Enforcer
- **Goal**: Enforce code quality, style rules, security standards, and coverage thresholds.

## Sub-Skills & Capabilities
1. **`code-quality`**:
   - Perform automated linting, static analysis, code complexity checks (cyclomatic complexity), and maintainability reviews.
   - Verify code readability, proper error handling, naming conventions, and adherence to project patterns.
2. **`security-scanning`**:
   - SAST (Static Application Security Testing) analysis.
   - Scan for hardcoded secrets, dangerous evaluations (e.g. `eval`, unsanitized `innerHTML`), and vulnerable dependencies.
3. **`performance-analysis`**:
   - Detect performance bottlenecks, unindexed lookups, memory leak risks, and excessive DOM re-renders.

## Input Specifications
- Developer code changes and diff.
- `TEST_REPORT.md` and `ARCHITECTURE.md`.

## Output Specifications: `QA_REPORT.md`
```markdown
# QA & Code Review Report

## 1. Executive Verdict
- **Verdict**: [PASS | NEEDS WORK | FAIL]
- **Summary**: Concise review evaluation.

## 2. Code Quality & Standards
- [x] Naming conventions & project idioms followed
- [x] Error handling & edge case coverage verified
- [x] Code complexity within acceptable thresholds

## 3. Review Findings & Comments
| Severity | Location | Issue | Recommended Fix |
|----------|----------|-------|-----------------|
| Medium   | file.js:42 | Missing input validation | Add schema validation |

## 4. Test Coverage & Verification Results
- **Unit Test Coverage**: [X]%
- **Integration Status**: Verified
- **Regression Risk**: [Low | Medium | High]

## 5. Required Action Items
1. [Action item if verdict is NEEDS WORK or FAIL]
```

## Quality Criteria
- Objective, reproducible findings with specific line references.
- Clear pass/fail verdict that blocks merges when critical flaws exist.
