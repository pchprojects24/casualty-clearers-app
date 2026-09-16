# CCT Info Hub

A consolidated information hub for AOPS casualty clearing team members.

## Current phase

This repository is the project's content and application home. The interactive application is published at [pchprojects24.github.io/casualty-clearers-app](https://pchprojects24.github.io/casualty-clearers-app/).

The project brings practical casualty-clearer information together in one searchable place. It does not include patient records, course administration, procurement, or a complete ship medical inventory.

## Project documents

- [Content status](docs/CONTENT_STATUS.md) — what is complete, what information is still missing, and the order to add it.
- [Content blueprint](docs/CONTENT_BLUEPRINT.md) — the app’s sections and the intended depth of each one.
- [Project decisions](docs/PROJECT_DECISIONS.md) — the scope and build choices in plain language.

## Application

The application is a responsive React and Vite information hub with:

- Search across curated app-facing content.
- A guided assessment pathway from scene survey through AVPU, MARCHE, vital signs, triage when needed, secondary survey and reassessment.
- Interactive MARCHE letters that open the relevant actions, procedures and equipment.
- Sudden-illness pathways for suspected heart attack, stroke, seizure, anaphylaxis, asthma and acute breathing difficulty.
- Connected movement-equipment and contaminated-casualty pages.
- Step-by-step procedure pages with useful product instructions and demonstrations where available.
- Saved and recently viewed information stored on the user's device.
- Responsive desktop, tablet and mobile navigation.

Project notes remain in `docs/`; they are not rendered as app pages.

Run it locally with `npm install` and `npm run dev`. Check the content links with `npm run validate:content`, and create the production bundle with `npm run build`.

## Next content step

Add diabetic emergencies next, using the same connected sudden-illness structure.
