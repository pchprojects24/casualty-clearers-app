# GitHub Source Sweep

Reviewed 11 September 2026.

## Scope of the sweep

The accessible repositories under `pchprojects24` were searched for casualty clearing, CCT, AOPS, MARCHE, MIST, hemorrhage control, airway, movement equipment, monitoring, and related terms. Default-branch content and relevant commit history were reviewed. No matching issue discussions were found.

The two pertinent repositories were:

- [ACTT](https://github.com/pchprojects24/ACTT)
- [paramedic_AOPV](https://github.com/pchprojects24/paramedic_AOPV)

## ACTT: useful material to assess and selectively reuse

### CCT structure and workflow

[data/casualty-clearing-team.js](https://github.com/pchprojects24/ACTT/blob/main/data/casualty-clearing-team.js) contains the most substantial existing CCT work. It is useful for:

- CCT roles and organization.
- MARCHE-based navigation.
- MIST handover structure.
- Movement, monitoring, reassessment, and communication concepts.
- Ideas for concise cards, warnings, and quick-reference presentation.

It should be treated as a source lead and structural input, not copied as the treatment authority. The ACTT repository is aimed partly at clinicians and contains material beyond casualty-clearer scope.

### Hemorrhage procedures

The existing [tourniquet page](https://github.com/pchprojects24/ACTT/blob/main/data/Procedures/tourniquet.html) and [wound-packing page](https://github.com/pchprojects24/ACTT/blob/main/data/Procedures/wound_packing.html) provide useful procedural structure. Reuse is conditional:

- Retain commercial-tourniquet application, tightening until bleeding stops, time recording, security, and reassessment.
- Do not combine generic 5–7 cm placement with “high and tight” as though they are one universal instruction. The selected local course wording and manufacturer directions must be confirmed and used consistently.
- Retain trained wound packing to the bleeding source followed by firm pressure.
- Remove clinician-level additions such as TXA consideration.
- Product-specific pressure times must match the actual hemostatic product.
- Neck-wound language needs deliberate local review and must not become a casual generic instruction.

### Airway and ventilation

[data/Procedures/bvm_opa_npa.html](https://github.com/pchprojects24/ACTT/blob/main/data/Procedures/bvm_opa_npa.html) is useful for identifying equipment and basic technique:

- Open airway, effective mask seal, and ventilation only to visible chest rise.
- Two-person BVM technique where trained help is available.
- OPA and NPA identification and equipment layout.

Do not carry over clinician-level escalation, intubation, supraglottic-airway, PEEP, capnography, or automatic high-flow oxygen content. The OPA sizing wording conflicts with another professional-responder source already reviewed, so the final method must be checked against the current AOPS casualty-clearer course.

### Monitoring equipment

[data/Equipment/masimo-rad57.html](https://github.com/pchprojects24/ACTT/blob/main/data/Equipment/masimo-rad57.html) can contribute device recognition, sensor application, signal-quality checks, and troubleshooting ideas.

Do not reuse its clinical thresholds or wording that treats an elevated SpCO or SpMet value as a standalone treatment decision. Rad-57 readings support the whole assessment and do not independently diagnose or direct treatment.

### Source library and inventory

[data/library.js](https://github.com/pchprojects24/ACTT/blob/main/data/library.js) identifies CCT source leads, including an Annex C CCT manual and CCT pocket material. Those titles can guide later source verification, but the PDFs are not being copied into this repository.

The ACTT inventory may help identify candidate equipment, but it is not proof of what is currently carried, taught, serviceable, or assigned to casualty clearers on this ship.

## ACTT material not to carry forward

- Advanced IV/IO, medication, TXA, airway, intubation, chest-procedure, pressor, ventilator, and clinician resuscitation content.
- Tourniquet conversion or removal by casualty clearers.
- Routine oxygen for every casualty.
- Diagnostic decisions based on one monitor value.
- Routine rigid-collar or long-board “spinal immobilization” wording.
- Current-use claims for Ashton Waters stretchers.
- Presentation of the Stokes stretcher as a routine primary device.
- Generic shipboard routes, thresholds, equipment fit, or command relationships that have not been locally confirmed.

## paramedic_AOPV

The casualty-clearing section and its fire, flood, and isolated-casualty pages are placeholders. They provide a possible folder/navigation pattern but no substantive CCT content worth importing.

## Commit-history finding

ACTT has a clear CCT development trail, including commits that added, refined, integrated, and later overhauled its casualty-clearing section. This confirms it is a valuable earlier project to mine for ideas, while also explaining why duplicate drafts and mixed-scope content require careful selection.

## Decision

Use ACTT selectively as a source of structure, terminology, and candidate facts. Apply the separate treatment-accuracy review and the agreed casualty-clearer scope before any wording moves into app-ready content. Do not copy raw source PDFs or the ACTT clinical library wholesale.
