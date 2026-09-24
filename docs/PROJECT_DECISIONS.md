# Project Decisions

Updated 24 September 2026.

## What this project is

- One practical place for information useful to AOPS casualty clearing team members.
- A working information app with short, connected pages rather than a document library.
- Useful material is rewritten into clear app content instead of copied in bulk.
- Missing subjects are tracked in the content-status page and added in practical groups.

## What this project is not

- No patient-information entry or storage.
- No course schedule, lesson timetable, attendance, testing, instructor administration, or sign-off system.
- No procurement or purchasing section.
- No attempt to reproduce complete equipment manuals.
- No wholesale copy of clinician-level, advanced-care, medication, invasive-procedure, or Sick Bay material.

## Equipment and images

- Photographs are optional. A useful page can exist without one.
- Equipment pages should provide a simple explanation and basic use appropriate to casualty clearers.
- Device-specific controls and limits should match the equipment being described.
- Ashton Waters stretcher material is excluded because it is no longer used.
- Stokes stretchers may receive a brief basket-stretcher mention but should not be presented as routinely used.
- SAGER and Cocoon material stays at familiarization depth unless later evidence shows a larger casualty-clearer role.

## Information style

- Present recognition, the basic first-aid sequence, cautions and reassessment in a clear learning order.
- Keep wording direct and practical. Readers are cooks, clerks, supply technicians and other trades for whom medical care is a secondary duty: explain jargon in the glossary and give concrete steps rather than referring only to "the taught method".
- Write for the reader, not the author. Notes about how the app was built stay in `docs/`.
- Keep treatment at the first-aid level. Do not ask the user to select a medication, calculate a dose or make an advanced treatment decision.
- Only include help with the person’s own prescribed rescue inhaler or auto-injector when the page states the boundary clearly.
- Preserve practical safety boundaries such as scene safety, equipment limits and when urgent help is needed.
- Link related pages instead of repeating the same treatment sequence in several places.

## Repository and build state

- `pchprojects24/casualty-clearers-app` is the project repository.
- The interactive web app is published with GitHub Pages at `https://pchprojects24.github.io/casualty-clearers-app/`.
- Project notes remain in `docs/`; they are not rendered as app content.
- The guided pathway runs from scene survey and triage when needed through AVPU, MARCHE, the secondary survey and reassessment, with connected procedure, equipment and product-information links.
- The app uses local browser state only for saved and recently viewed topics. It has no patient, account, or administrative data.
