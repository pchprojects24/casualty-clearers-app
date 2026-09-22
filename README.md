# CCT Info Hub

A consolidated information hub for AOPS casualty clearing team members.

## Current phase

This repository is the project's content and application home. The interactive application is published at [pchprojects24.github.io/casualty-clearers-app](https://pchprojects24.github.io/casualty-clearers-app/).

The project brings practical casualty-clearer information together in one searchable place. It is a public static application: it has no accounts, backend, patient records, analytics, telemetry, or database. Saved and Recently Viewed lists stay in the browser that created them. It currently requires an online connection; home-screen installation does not make its content available offline.

## Project documents

- [Content status](docs/CONTENT_STATUS.md) — what is complete, what information is still missing, and the order to add it.
- [Content blueprint](docs/CONTENT_BLUEPRINT.md) — the app’s sections and the intended depth of each one.
- [Project decisions](docs/PROJECT_DECISIONS.md) — the scope and build choices in plain language.

## Application

The application is a responsive React and Vite information hub with:

- Search across curated app-facing content.
- A guided assessment pathway from scene survey through AVPU, MARCHE, vital signs, triage when needed, secondary survey and reassessment.
- Interactive MARCHE letters that open the relevant actions, procedures and equipment.
- Sudden-illness pathways for suspected heart attack, stroke, seizure, diabetic emergencies, anaphylaxis, asthma and acute breathing difficulty.
- Connected movement-equipment and contaminated-casualty pages.
- Step-by-step procedure pages with useful product instructions and demonstrations where available.
- Saved and recently viewed information stored on the user's device.
- Responsive desktop, tablet and mobile navigation.

Project notes remain in `docs/`; they are not rendered as app pages.

## Development

Use Node.js 20.19 or later. Install the locked dependency set with `npm ci`, then run `npm run dev` for local development. The application keeps its hash routes (`#/topic/<topic-id>` and `#/category/<category-id>`) so it can work under the GitHub Pages subpath.

Before a release, run:

```sh
npm run check
npm run validate:content
npm run test
npm run build
```

The content validator checks renderer-facing data shapes, IDs, category associations and internal topic links. Tests cover routing recovery, search scope, browser-local saved/recent data and schema regressions. GitHub Actions runs those checks for pushes and pull requests; only a push to `main` can upload and deploy the Pages artifact. Manual workflow runs and pull requests cannot deploy production.

Optional `sourceMetadata` may be added to a topic when authoritative details are available. It supports a truthful source/review record (for example authority, publication/version, section/page, applicability, review status/date and notes); the app deliberately does not infer or display missing review claims.

## Next content step

Add poisoning, opioid overdose and naloxone awareness next, using the same connected sudden-illness structure.
