# CCT Info Hub

A consolidated information hub for AOPS casualty clearing team members.

## Current phase

This repository is the project's content and application home. The first interactive application has now been built; GitHub Pages has not yet been enabled.

The project brings useful casualty-clearer information together in one place. It does not include patient records, course schedules, lesson administration, attendance, testing, procurement, or a complete ship medical inventory.

## Project documents

- [Content blueprint](docs/CONTENT_BLUEPRINT.md) — intended subjects, depth, exclusions, and current readiness.
- [Treatment accuracy decisions](docs/TREATMENT_ACCURACY.md) — current-practice review and subjects requiring local or model confirmation.
- [Project decisions](docs/PROJECT_DECISIONS.md) — the agreed scope in plain language.
- [GitHub source sweep](docs/source-review/GITHUB_SOURCE_SWEEP.md) — pertinent material found in existing repositories and what can or cannot be reused.

## Content control

Treatment subjects use three working states:

- **Confirmed** — current authoritative guidance supports the core content.
- **Local / model check** — the subject belongs, but the exact method depends on AOPS direction, the casualty-clearer course, or the equipment model.
- **Revise / exclude** — older, conflicting, irrelevant, or out-of-scope material is not carried forward.

Raw internal source documents and full equipment manuals are not stored here. The repository contains consolidated decisions, source notes, and original project content.

## Application

The application is a responsive React and Vite information hub with:

- Search across the consolidated treatment and blueprint content.
- Browseable subject categories and connected topic pages.
- Saved and recently viewed information stored on the user's device.
- Responsive desktop, tablet and mobile navigation.
- An installable manifest and offline caching foundation.

Run it locally with `npm install` and `npm run dev`. Create the production bundle with `npm run build`.

## Next content step

Continue converting the reviewed source decisions into clean app-facing topic wording, then complete local and equipment-model confirmations where required.
