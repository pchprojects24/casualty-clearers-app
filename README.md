# CCT Info Hub

A consolidated information hub for AOPS casualty clearing team members.

## Current phase

This repository is the project's content and application home. The interactive application is published at [pchprojects24.github.io/casualty-clearers-app](https://pchprojects24.github.io/casualty-clearers-app/).

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

- Search across curated app-facing content.
- A guided assessment pathway from scene survey through AVPU, MARCHE, vital signs, secondary survey and reassessment.
- Interactive MARCHE letters that open the relevant actions, procedures and equipment.
- Step-by-step procedure pages with official references and product media where useful.
- Saved and recently viewed information stored on the user's device.
- Responsive desktop, tablet and mobile navigation.
- An installable manifest. The app is online-only; it does not cache for offline use.

Planning documents and source-review notes remain in `docs/`; they are not rendered as user-facing app pages.

Run it locally with `npm install` and `npm run dev`. Create the production bundle with `npm run build`.

## Next content step

Continue the same guided, connected treatment of content beyond the completed assessment, MARCHE, bleeding-control and airway/breathing pathway. Complete local and equipment-model confirmations where required before presenting exact local procedures.
