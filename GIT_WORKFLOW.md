# API Playground — Git Workflow & Branching Strategy

This document outlines the professional Git workflow, branch naming conventions, commit guidelines, and Pull Request lifecycle used throughout the **API Playground** project.

---

## 1. Branching Strategy Model

The project follows a **Feature-Branch Workflow with a `main` and `dev` branch structure**.

```text
  [main] ───────────────────────────────────────────● [Production Release]

     │                                              ▲
     │                                              │ (PR)
     ▼                                              │

  [dev] ───────────────●──────────────●─────────────┘
     │                  ▲              ▲
     │ (Branch out)     │ (PR)         │ (PR)
     │                  │              │
     ├──────▶ [feat/api-playground] ───┤
     │
     ├──────▶ [feat/js-concept-demos] ─┤
     │
     └──────▶ [fix/api-error-handling]─┘
```

### Branch Hierarchy

| Branch          | Purpose                                                                     | Protection Rules                                           |
| --------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `main`          | Production-ready stable branch containing fully tested code.                | Protected. Changes should be merged through Pull Requests. |
| `dev`           | Active integration branch where completed features are combined and tested. | Protected. Features are merged through Pull Requests.      |
| `feat/<name>`   | Feature branches created from `dev` for implementing new functionality.     | Temporary. Deleted after merging into `dev`.               |
| `fix/<name>`    | Branches created for resolving bugs or defects.                             | Temporary. Merged into `dev` through a Pull Request.       |
| `hotfix/<name>` | Urgent production fixes created from `main`.                                | Merged back into both `main` and `dev`.                    |

### Examples

```text
feat/api-filtering
feat/javascript-concept-demos
feat/code-snippet-generation
feat/doctor-patient-api

fix/api-error-handling
fix/filter-validation

hotfix/production-api-failure
```

---

## 2. Conventional Commits Standard

All commit messages should follow the **Conventional Commits v1.0.0** specification.

```text
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Commit Types

* `feat:` — A new feature or user-facing functionality.

  ```text
  feat: add JavaScript concept demonstration utilities
  ```

* `fix:` — A bug fix.

  ```text
  fix(api): handle invalid API filter parameters
  ```

* `docs:` — Documentation changes.

  ```text
  docs: add API Playground Git workflow guide
  ```

* `refactor:` — Code restructuring without adding features or fixing bugs.

  ```text
  refactor(utils): simplify API request helper functions
  ```

* `test:` — Adding or updating automated tests.

  ```text
  test(api): add tests for doctors filtering
  ```

* `chore:` — Maintenance, dependency updates, or configuration changes.

  ```text
  chore: update project dependencies
  ```

### Commit Guidelines

Commit messages should:

1. Use the imperative mood.
2. Start with a valid Conventional Commit type.
3. Clearly describe the change.
4. Keep the first line concise.
5. Avoid vague messages such as:

   ```text
   update files
   changes
   final changes
   fixed code
   ```

For example, when adding the four JavaScript demonstration utilities:

```text
feat: add JavaScript concept demonstration utilities
```

---

## 3. Pull Request (PR) Lifecycle

### Step 1: Create a Feature Branch

Start from the latest `dev` branch:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/your-feature-name
```

For example:

```bash
git checkout -b feat/javascript-concept-demos
```

---

### Step 2: Make and Commit Changes

Add the modified files:

```bash
git add .
```

Create a Conventional Commit:

```bash
git commit -m "feat: add JavaScript concept demonstration utilities"
```

---

### Step 3: Synchronize with the Latest `dev` Branch

Before opening a Pull Request:

```bash
git fetch origin
git rebase origin/dev
```

If conflicts occur, resolve them and continue:

```bash
git add .
git rebase --continue
```

---

### Step 4: Push the Feature Branch

```bash
git push -u origin feat/your-feature-name
```

For example:

```bash
git push -u origin feat/javascript-concept-demos
```

---

### Step 5: Open a Pull Request

Create a Pull Request with:

```text
Base branch:   dev
Compare branch: feat/your-feature-name
```

The Pull Request should clearly explain:

* What feature or change was implemented.
* Which parts of the project were modified.
* How the changes were tested.
* Any known limitations.

---

### Step 6: Code Review and Validation

Before merging:

* Verify that the application runs correctly.
* Check that the frontend and backend integration is not broken.
* Ensure no `.env` files, API keys, or database credentials are committed.
* Resolve all merge conflicts.
* Ensure automated checks pass, if configured.

For API Playground, changes should be reviewed carefully when they affect:

* Doctors API endpoints.
* Patients API endpoints.
* Dynamic filtering.
* API URL generation.
* Frontend-to-backend communication.
* Database queries.
* Error handling.
* Generated API code snippets.

---

### Step 7: Merge Strategy

Feature branches should be merged into `dev` using **Squash and Merge**.

This keeps the `dev` branch history clean:

```text
main
  │
  └── dev
        │
        ├── feat/api-filtering
        ├── feat/javascript-concept-demos
        └── fix/api-error-handling
```

After successful merging, delete the feature branch:

```bash
git branch -d feat/your-feature-name
git push origin --delete feat/your-feature-name
```

---

## 4. Release Workflow

When the `dev` branch has been fully tested and is ready for production, create a Pull Request from:

```text
dev → main
```

After the Pull Request is approved and merged, create a release tag:

```bash
git checkout main
git pull origin main

git tag -a v1.0.0 -m "Release v1.0.0: API Playground production release"

git push origin main --tags
```

Example future release:

```bash
git tag -a v1.1.0 -m "Release v1.1.0: Enhanced API filtering and code generation"

git push origin main --tags
```

### Release Versioning

The project follows semantic versioning:

```text
MAJOR.MINOR.PATCH
```

Examples:

* `v1.0.0` — Initial stable release.
* `v1.1.0` — New features such as additional API functionality.
* `v1.1.1` — Backward-compatible bug fixes.
* `v2.0.0` — Major changes that introduce breaking API or application changes.

---

## 5. Standard Workflow Summary

The standard development workflow for API Playground is:

```text
1. Update local dev branch
            ↓
2. Create feature/fix branch
            ↓
3. Implement and test changes
            ↓
4. Commit using Conventional Commits
            ↓
5. Rebase on latest dev
            ↓
6. Push feature branch
            ↓
7. Open Pull Request → dev
            ↓
8. Review and validate changes
            ↓
9. Squash and merge into dev
            ↓
10. Merge dev → main for releases
            ↓
11. Create version tag
```

### Recommended Commands

```bash
# Start new feature
git checkout dev
git pull origin dev
git checkout -b feat/your-feature-name

# Stage and commit
git add .
git commit -m "feat: describe the feature"

# Sync with latest development branch
git fetch origin
git rebase origin/dev

# Push feature branch
git push -u origin feat/your-feature-name

# After review, merge the PR into dev
```

This workflow keeps the **API Playground** repository organized, provides a clean development history, and ensures that new features such as API filtering, doctors and patients endpoints, generated code snippets, and JavaScript concept demonstrations are developed safely before reaching the stable `main` branch.
