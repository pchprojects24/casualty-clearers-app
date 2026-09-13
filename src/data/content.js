export const categories = [
  { id: 'assessment', label: 'Assessment & MARCHE', short: 'Assessment', description: 'Approach, assess, treat immediate threats and reassess.', color: 'teal', icon: 'assessment' },
  { id: 'bleeding', label: 'Bleeding Control', short: 'Bleeding', description: 'Recognize serious bleeding and choose the right control method.', color: 'sky', icon: 'bleeding' },
  { id: 'airway', label: 'Airway & Breathing', short: 'Airway', description: 'Check and support the airway and breathing.', color: 'yellow', icon: 'airway' },
  { id: 'equipment', label: 'Equipment', short: 'Equipment', description: 'Quick-use pages and official product media.', color: 'coral', icon: 'equipment' },
];

const RED_CROSS_GUIDE = 'https://cdn.redcross.ca/prodmedia/crc/azure/documents/first-aid-program-2025/comprehensive_guide_fa_cpr_en.pdf';
const CAT_PRODUCT = 'https://www.narescue.com/cat-tourniquet';
const CAT_VIDEOS = 'https://www.narescue.com/videos';
const OLAES_PRODUCT = 'https://tacmedsolutions.com/products/olaes-modular-bandage?variant=40633970950343';
const IGEL_PRODUCT = 'https://www.intersurgical.com/info/igel';
const IGEL_VIDEOS = 'https://www.intersurgical.com/info/videos-airway-management';
const VITAL_SIGNS = 'https://medlineplus.gov/ency/article/002341.htm';
const PULSE_GUIDE = 'https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse';
const AHA_FIRST_AID = 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines';
const HEART_STROKE_AED = 'https://www.heartandstroke.ca/how-you-can-help/learn-cpr/aeds';
const BLOOD_PRESSURE_GUIDE = 'https://medlineplus.gov/lab-tests/measuring-blood-pressure/';
const MSD_TBI = 'https://www.msdmanuals.com/professional/injuries-poisoning/traumatic-brain-injury-tbi/traumatic-brain-injury-tbi';
const JTS_HANDOFF = 'https://jts.health.mil/assets/docs/cpgs/CoERCCC%20Guidelines%20FY26.pdf';

const internal = (topicId, title, description) => ({ topicId, title, description });
const external = (url, title, description, kind = 'Official resource') => ({ url, title, description, kind });

export const topics = [
  {
    id: 'assessment-overview', title: 'Assessment & MARCHE', category: 'assessment', group: 'Start here', icon: 'assessment', color: 'teal', reference: true,
    intro: 'Follow the assessment in order. Deal with immediate threats as you find them, then continue and reassess.',
    path: [
      internal('scene-survey', '1. Scene survey', 'Check hazards, protection, what happened, how many casualties and what help is needed.'),
      internal('avpu', '2. Responsiveness — AVPU', 'Establish and report the casualty’s level of responsiveness.'),
      internal('marche', '3. Primary survey — MARCHE', 'Work through massive hemorrhage, airway, respiration, circulation, head/hypothermia and everything else.'),
      internal('vital-signs', '4. Vital signs', 'Check respirations, pulse, skin, responsiveness and other assigned observations.'),
      internal('secondary-survey', '5. Secondary survey', 'After immediate threats are controlled, gather history and complete a head-to-toe check.'),
      internal('reassessment-handover', '6. Reassess and hand over', 'Repeat findings, confirm treatments and report what changed.'),
    ],
    sections: [{ title: 'Keep the sequence moving', bullets: ['If you find an immediate threat, act within your training and call for help.', 'After an intervention, check whether it worked before continuing.', 'Return to MARCHE whenever the casualty changes.'] }],
    related: ['scene-survey', 'avpu', 'marche', 'vital-signs'],
  },
  {
    id: 'equipment-overview', title: 'Equipment', category: 'equipment', group: 'Choose by purpose', icon: 'equipment', color: 'coral', reference: true,
    intro: 'Start with the clinical need, then open the equipment card. Each card explains what the item is for, a short use sequence and the checks that matter afterward.',
    quickRoutes: [
      internal('equipment-bag-check', 'Response-bag check', 'Confirm the team is ready before leaving and restore the bag after use.'),
      internal('monitoring-equipment', 'Monitoring setup', 'Open blood pressure, pulse oximetry and 3-lead setup from one place.'),
      internal('aed', 'AED', 'Review the arrest response and AED sequence.'),
    ],
    quickRouteHeading: 'Start here',
    equipmentGroups: [
      {
        letter: 'M', title: 'Massive hemorrhage', text: 'Stop life-threatening bleeding and support a suspected pelvic injury.',
        items: [
          internal('cat-tourniquet', 'C-A-T tourniquet', 'Life-threatening bleeding from an arm or leg.'),
          internal('olaes-bandage', 'OLAES modular bandage', 'Pressure dressing with modular components.'),
          internal('wound-packing', 'Packing gauze', 'Pack a suitable deep wound when trained.'),
          internal('pelvic-binder', 'Pelvic binder', 'Recognition and model-specific use boundary.'),
        ],
      },
      {
        letter: 'A', title: 'Airway', text: 'Open the airway and choose an adjunct only through current training.',
        items: [
          internal('opa', 'OPA', 'For an unresponsive casualty without an intact gag response.'),
          internal('npa', 'NPA', 'Use only through the locally taught method.'),
          internal('igel', 'i-gel', 'Advanced airway adjunct when trained and authorized.'),
        ],
      },
      {
        letter: 'R', title: 'Respiration', text: 'Support inadequate breathing, provide oxygen and manage an open chest wound.',
        items: [
          internal('bvm', 'Bag-valve-mask', 'Assisted ventilation with visible chest rise.'),
          internal('oxygen', 'Oxygen system', 'Cylinder, regulator and delivery-device sequence.'),
          internal('chest-seal', 'Chest seal', 'Trained response to a recognized open chest wound.'),
          internal('pulse-oximeter', 'Portable pulse oximeter', 'Obtain and interpret a reliable SpO₂ reading.'),
        ],
      },
      {
        letter: 'C', title: 'Circulation & monitoring', text: 'Recognize cardiac arrest and build a reliable set of observations.',
        items: [
          internal('aed', 'AED', 'Use as soon as possible during cardiac arrest.'),
          internal('manual-blood-pressure', 'Manual blood pressure', 'Cuff and stethoscope measurement sequence.'),
          internal('pulse-oximeter', 'Portable pulse oximeter', 'SpO₂ and displayed pulse with limitations.'),
          internal('three-lead-ecg', '3-lead ECG setup', 'Apply leads and obtain a usable trace.'),
          internal('monitoring-equipment', 'Monitoring equipment', 'Open all monitoring cards and record a trend.'),
        ],
      },
      {
        letter: 'H', title: 'Head & hypothermia', text: 'Reduce further heat loss and use active warming in the appropriate care area.',
        items: [
          internal('foil-blanket', 'Foil blanket', 'Insulate, wrap and keep the airway visible.'),
          internal('cocoon-warming', 'Cocoon warming unit', 'Active warming setup under the confirmed model instructions.'),
        ],
      },
      {
        letter: 'E', title: 'Everything else & movement', text: 'Support injuries and move a casualty with coordinated handling.',
        items: [
          internal('splinting-equipment', 'Splinting equipment', 'Support the injury and recheck distal findings.'),
          internal('basket-stretcher', 'Basket stretcher', 'Brief guide for the rarely used Stokes-style stretcher.'),
        ],
      },
    ],
    notice: { title: 'Current equipment set', text: 'Aston equipment is excluded because it is no longer used. The basket stretcher is included briefly as a rarely used option. Exact models and model-specific steps must match the equipment actually available.' },
    related: ['marche', 'equipment-bag-check', 'monitoring-equipment', 'aed'],
  },
  {
    id: 'scene-survey', title: 'Scene survey', category: 'assessment', group: 'Before contact', icon: 'assessment', color: 'teal', reference: true,
    intro: 'Pause before approaching. The casualty clearer must not become another casualty.',
    steps: ['Look and listen for hazards before entering the area.', 'Use the PPE and protection required for the situation.', 'Identify what happened and the likely mechanism of injury or illness.', 'Count the casualties and form an initial impression of urgency.', 'Identify the people, equipment and route needed to reach, treat and move the casualty.', 'Report the location, hazards, casualty count and resources required.', 'Approach only when the scene is safe enough for your role and protection.'],
    sections: [
      { title: 'Look for', bullets: ['Fire, smoke, electricity, flooding or structural damage', 'Hazardous material or contamination', 'Moving machinery, confined-space and access hazards', 'Violence, unstable objects or uncontrolled energy', 'A route for the team, equipment and casualty movement'] },
      { title: 'Before touching the casualty', bullets: ['Introduce yourself if the casualty is responsive.', 'Note their position, obvious bleeding and general appearance.', 'Move immediately into responsiveness and the primary survey.'] },
    ],
    notice: { title: 'Unsafe or contaminated area', text: 'Do not enter beyond your training, PPE or assigned response role. Report the hazard and follow the controlling response procedure.' },
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross Comprehensive Guide for First Aid & CPR', 'Current Canadian first-aid assessment and care reference.')],
    related: ['avpu', 'marche', 'reassessment-handover'],
  },
  {
    id: 'avpu', title: 'AVPU', category: 'assessment', group: 'Responsiveness', icon: 'assessment', color: 'teal', reference: true,
    intro: 'AVPU is a quick way to describe the casualty’s level of responsiveness. Record the best response you actually observe.',
    scale: [
      { letter: 'A', title: 'Alert', text: 'Awake, aware and responding appropriately without prompting.' },
      { letter: 'V', title: 'Voice', text: 'Responds when you speak, but is not otherwise alert.' },
      { letter: 'P', title: 'Pain', text: 'Responds only to the painful-stimulus method taught in the course. Do not improvise a technique.' },
      { letter: 'U', title: 'Unresponsive', text: 'No response to voice or the trained stimulus.' },
    ],
    steps: ['Observe whether the casualty is awake and tracking what is happening.', 'Speak clearly and ask a simple question or give a simple command.', 'If there is no response, use only the further assessment method you were trained to use.', 'State and record the result plainly, for example: “Responds to voice.”', 'Repeat AVPU after treatment, movement and any change in condition.'],
    notice: { title: 'A change matters', text: 'A casualty moving from Alert to Voice, Pain or Unresponsive is deteriorating and requires immediate reporting and reassessment.' },
    related: ['scene-survey', 'marche', 'vital-signs', 'reassessment-handover'],
  },
  {
    id: 'marche', title: 'MARCHE primary survey', category: 'assessment', group: 'Primary survey', icon: 'assessment', color: 'teal', reference: true,
    intro: 'MARCHE keeps the primary survey in priority order. Select a letter to review what to check and what options are available.',
    march: [
      { letter: 'M', title: 'Massive hemorrhage', text: 'Find and control life-threatening external bleeding.', topicId: 'march-m' },
      { letter: 'A', title: 'Airway', text: 'Decide whether the airway is open and keep it open.', topicId: 'march-a' },
      { letter: 'R', title: 'Respiration', text: 'Check the effectiveness of breathing and look for chest problems.', topicId: 'march-r' },
      { letter: 'C', title: 'Circulation', text: 'Check pulse, skin and signs of poor circulation or shock.', topicId: 'march-c' },
      { letter: 'H', title: 'Head & hypothermia', text: 'Protect from heat loss and recognize head-injury concerns.', topicId: 'march-h' },
      { letter: 'E', title: 'Everything else', text: 'Complete a rapid body survey and prepare for the secondary survey.', topicId: 'march-e' },
    ],
    sections: [{ title: 'At every stage', bullets: ['Treat an immediate threat within your training.', 'Call for assistance early.', 'Check whether each intervention worked.', 'Continue to the next priority and restart if the casualty changes.'] }],
    related: ['march-m', 'march-a', 'march-r', 'march-c'],
  },
  {
    id: 'march-m', title: 'M — Massive hemorrhage', category: 'assessment', group: 'MARCHE', icon: 'bleeding', color: 'sky', reference: true,
    intro: 'Life-threatening external bleeding comes before the airway in the MARCHE sequence. Find it quickly and control it.',
    quickRoutes: [
      internal('direct-pressure', 'Bleeding found', 'Start immediate hands-on control at the source.'),
      internal('wound-packing', 'Deep wound', 'Review wound packing when the wound and current training make it appropriate.'),
      internal('cat-tourniquet', 'Life-threatening limb bleeding', 'Open the C-A-T sequence for the carried device.'),
      internal('pelvic-binder', 'Possible pelvic injury', 'Recognize the concern and open the locally confirmed binder card.'),
    ],
    sections: [
      { title: 'What you’re checking', bullets: ['Rapidly scan and feel for severe bleeding.', 'Expose the source when practical.', 'Look for pooling, spurting, continuous heavy flow, soaked clothing or partial/complete amputation.', 'Check beneath and behind the casualty when access allows.', 'Note concerns about pelvic injury without repeatedly manipulating the pelvis.'] },
      { title: 'Immediate actions', bullets: ['Start firm direct pressure at the bleeding source.', 'Pack a suitable deep wound when trained, then maintain firm pressure.', 'Use a pressure dressing to maintain control after bleeding has been controlled.', 'Use a commercial tourniquet for life-threatening limb bleeding when direct pressure does not work, cannot be maintained or is impractical.', 'Use a pelvic binder only when the carried device, local method and responsibility are confirmed.'] },
      { title: 'Reassess and report', bullets: ['Confirm that bleeding has stopped.', 'Check dressings for continued soak-through.', 'Check and record a tourniquet application time.', 'Report the wound, treatment and response.'] },
    ],
    actionHeading: 'Procedure and equipment cards',
    actions: [internal('direct-pressure', 'Direct pressure', 'Immediate hands-on bleeding control.'), internal('wound-packing', 'Wound packing', 'For a suitable deep wound when trained.'), internal('pressure-dressing', 'Pressure dressing', 'Maintain control after bleeding has stopped.'), internal('cat-tourniquet', 'C-A-T tourniquet', 'Product page, application sequence and official video.'), internal('olaes-bandage', 'OLAES modular bandage', 'Product features, pressure-dressing use and official product information.'), internal('pelvic-binder', 'Pelvic binder', 'Recognition and locally confirmed use only.')],
    nextStep: internal('march-a', 'Continue to A — Airway', 'Once bleeding is controlled, check whether the airway is open and stays open.'),
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross bleeding-control guidance', 'Direct pressure, hemostatic dressings and tourniquet guidance.')],
    related: ['direct-pressure', 'wound-packing', 'pressure-dressing', 'cat-tourniquet', 'pelvic-binder'],
  },
  {
    id: 'march-a', title: 'A — Airway', category: 'assessment', group: 'MARCHE', icon: 'airway', color: 'yellow', reference: true,
    intro: 'Check whether air can move freely. An open airway must be maintained and reassessed.',
    quickRoutes: [
      internal('airway-positioning', 'Airway needs opening', 'Open and position the airway, then check for air movement.'),
      internal('airway-adjuncts', 'An adjunct may be needed', 'Review the trained OPA, NPA and i-gel options before choosing one.'),
      internal('march-r', 'Airway is open', 'Continue to breathing and chest assessment.'),
    ],
    sections: [
      { title: 'What you’re checking', bullets: ['Can the casualty speak or make sounds?', 'Look for visible obstruction, vomit, blood or secretions.', 'Listen for snoring, gurgling, stridor or absent air movement.', 'Consider the casualty’s responsiveness and possible head or neck injury.'] },
      { title: 'Immediate actions', bullets: ['Reposition and use the appropriate airway-opening manoeuvre.', 'Clear visible material; use suction only if carried and trained.', 'Use an OPA for an unresponsive casualty without an intact gag response, when trained.', 'Use an NPA only under the locally taught method and contraindications.', 'Use an i-gel only when the device, training and authorization are confirmed.'] },
      { title: 'Reassess and continue', bullets: ['Look, listen and feel for air movement.', 'Confirm that any adjunct remains correctly positioned.', 'Continue into respiration and return immediately if airway sounds or responsiveness change.'] },
    ],
    actionHeading: 'Airway procedure and equipment cards',
    actions: [internal('airway-positioning', 'Open and position the airway', 'Head-tilt/chin-lift or jaw thrust as appropriate.'), internal('airway-adjuncts', 'Airway adjuncts', 'Choose between OPA, NPA and i-gel only through current training.'), internal('opa', 'OPA', 'Purpose, sizing, checks and trained-use sequence.'), internal('npa', 'NPA', 'Purpose and local-method confirmation.'), internal('igel', 'i-gel', 'Training-dependent device page and official manufacturer media.')],
    nextStep: internal('march-r', 'Continue to R — Respiration', 'When the airway is open, assess whether breathing is present and effective.'),
    related: ['airway-positioning', 'opa', 'npa', 'igel'],
  },
  {
    id: 'march-r', title: 'R — Respiration', category: 'assessment', group: 'MARCHE', icon: 'airway', color: 'yellow', reference: true,
    intro: 'Decide whether breathing is present and effective, then look for problems that require support.',
    quickRoutes: [
      internal('respiratory-rate', 'Breathing is present', 'Measure the rate and describe whether it is effective.'),
      internal('bvm', 'Breathing is absent or inadequate', 'Open the BVM page for trained breathing support.'),
      internal('oxygen', 'Oxygen may be indicated', 'Check the carried system, trained method and authorized target.'),
      internal('chest-seal', 'Open chest injury', 'Recognize entry and exit wounds, then use the locally confirmed chest-seal response.'),
    ],
    sections: [
      { title: 'What you’re checking', bullets: ['Use look, listen and feel. Auscultation is not part of the casualty-clearer check.', 'Observe chest and abdominal movement.', 'Count the rate and describe depth and regularity.', 'Look for increased effort, unequal movement, injury, pain, and possible entry or exit wounds.', 'Listen for unusual sounds and note whether the casualty can speak normally.', 'Check skin signs and assigned monitor readings without letting a number override what you see.'] },
      { title: 'Immediate actions', bullets: ['Allow a responsive casualty with breathing difficulty to use the most comfortable position.', 'Give oxygen only under the applicable training, direction and target.', 'Use BVM ventilation when breathing is absent or inadequate and you are trained.', 'For an open chest wound, use the locally taught response and a purpose-designed vented chest seal only when trained and equipped.', 'Identify and report chest injury or deteriorating breathing immediately.'] },
      { title: 'Reassess and report', bullets: ['Repeat rate and quality after positioning or treatment.', 'Look for visible chest rise during assisted ventilation.', 'If breathing worsens after a dressing or seal, follow the trained response immediately.', 'Record the time, findings, intervention and change.'] },
    ],
    actionHeading: 'Breathing procedure and equipment cards',
    actions: [internal('respiratory-rate', 'Measure respiratory rate', 'How to count and describe breathing.'), internal('oxygen', 'Oxygen', 'Setup, use limits and reassessment.'), internal('bvm', 'Bag-valve-mask', 'Two-person technique points and effectiveness checks.'), internal('chest-seal', 'Chest seal', 'Open-chest-wound recognition and trained-use boundaries.'), internal('pulse-oximeter', 'Portable pulse oximeter', 'Obtain a stable SpO₂ reading and recognize its limitations.')],
    nextStep: internal('march-c', 'Continue to C — Circulation', 'After breathing is addressed, assess pulse, skin and signs of circulation problems.'),
    related: ['respiratory-rate', 'oxygen', 'bvm', 'march-a'],
  },
  {
    id: 'march-c', title: 'C — Circulation', category: 'assessment', group: 'MARCHE', icon: 'assessment', color: 'teal', reference: true,
    intro: 'Use pulse, skin and the overall casualty picture to judge circulation and recognize deterioration.',
    quickRoutes: [
      internal('march-m', 'Bleeding is found or restarts', 'Return to M immediately and control the source.'),
      internal('vital-signs', 'Need a clearer picture', 'Put pulse, skin, breathing and responsiveness together as a trend.'),
      internal('march-h', 'Immediate threats are controlled', 'Continue to head concerns and heat-loss prevention.'),
    ],
    sections: [
      { title: 'What you’re checking', bullets: ['Find and describe the pulse: rate, rhythm and strength.', 'Check skin colour against the casualty’s usual tone, along with temperature and moisture.', 'Look again for bleeding that was missed or has restarted.', 'Check capillary refill only if it is part of the locally taught assessment, including after splinting.', 'Note behaviour, thirst, weakness, confusion and other signs that may accompany shock.'] },
      { title: 'Immediate actions', bullets: ['Return to massive-hemorrhage control if bleeding is found or restarts.', 'Keep the casualty at rest and protect them from heat loss.', 'Continue oxygen or other treatment only as directed by the applicable protocol.', 'Arrange movement and medical assistance according to urgency.'] },
      { title: 'Reassess and report', bullets: ['Trend findings instead of relying on one number.', 'Repeat pulse, skin and any locally taught capillary-refill checks after treatment and movement.', 'Report deterioration immediately.'] },
    ],
    actionHeading: 'Circulation assessment and equipment cards',
    actions: [internal('pulse', 'Check a pulse', 'Radial and carotid locations, counting and quality.'), internal('capillary-refill', 'Check capillary refill', 'A locally taught check, including after splinting.'), internal('skin-signs', 'Check skin signs', 'Colour, temperature, moisture and change.'), internal('vital-signs', 'Vital-sign set', 'Put the findings together and record the trend.'), internal('aed', 'AED', 'Open the cardiac-arrest and AED sequence.'), internal('monitoring-equipment', 'Monitoring equipment', 'Blood pressure, SpO₂ and 3-lead setup.')],
    nextStep: internal('march-h', 'Continue to H — Head & hypothermia', 'Protect from heat loss and look for head-injury concerns while reassessing.'),
    related: ['pulse', 'skin-signs', 'vital-signs', 'reassessment-handover'],
  },
  {
    id: 'march-h', title: 'H — Head & hypothermia', category: 'assessment', group: 'MARCHE', icon: 'assessment', color: 'violet', reference: true,
    intro: 'Prevent heat loss early and remain alert for changes that may suggest a head injury.',
    sections: [
      { title: 'Immediate actions for heat loss', bullets: ['Insulate the casualty from the deck and environment.', 'Remove or isolate wet clothing when appropriate.', 'Cover the head and neck while keeping the airway observable.', 'Use the team’s foil blanket, blankets, a vapour barrier and protected warming measures as trained.', 'Move to a warmer area when it is safe and practical.'] },
      { title: 'What you’re checking for', bullets: ['Note the mechanism and any direct head impact.', 'Repeat AVPU and watch for confusion, worsening responsiveness, vomiting, seizure or unequal movement.', 'Watch for shivering, loss of coordination, slurred speech, confusion or a fall in responsiveness.', 'Avoid unnecessary movement and report deterioration promptly.'] },
    ],
    notice: { title: 'Keep reassessing', text: 'Cold stress and head injury can both change responsiveness. Repeat AVPU, breathing and circulation throughout care and movement.' },
    actionHeading: 'Reassessment and warming cards',
    actions: [internal('foil-blanket', 'Foil blanket', 'Reduce further heat loss during care and movement.'), internal('cocoon-warming', 'Cocoon warming unit', 'Active warming in the appropriate care area.'), internal('avpu', 'Repeat AVPU', 'Describe changes in responsiveness clearly.'), internal('vital-signs', 'Repeat vital signs', 'Look for change, not a single isolated number.'), internal('reassessment-handover', 'Reassess and hand over', 'Confirm treatments and report deterioration.')],
    nextStep: internal('march-e', 'Continue to E — Everything else', 'When immediate head and heat-loss concerns are addressed, complete the rapid body survey.'),
    related: ['avpu', 'march-r', 'march-c', 'reassessment-handover'],
  },
  {
    id: 'march-e', title: 'E — Everything else', category: 'assessment', group: 'MARCHE', icon: 'assessment', color: 'violet', reference: true,
    intro: 'After immediate threats are controlled, rapidly look for other injuries and prepare to move into the secondary survey.',
    sections: [
      { title: 'What you’re checking', bullets: ['Check head and neck, chest, abdomen, pelvis, limbs and back as the situation allows.', 'Look and feel for bleeding, tenderness, deformity, swelling, wounds and abnormal movement.', 'Expose only what is needed, protect privacy and cover the casualty again promptly.', 'Check circulation, sensation and movement before and after splinting or movement when applicable.'] },
      { title: 'Next step', bullets: ['Move into the secondary survey when immediate threats are controlled.', 'Gather history and repeat vital signs.', 'Prepare findings and treatments for handover.'] },
    ],
    actionHeading: 'Continue the assessment',
    actions: [internal('secondary-survey', 'Secondary survey', 'History, head-to-toe check and additional findings.'), internal('vital-signs', 'Vital signs', 'Measure and describe the casualty’s current condition.'), internal('splinting-equipment', 'Splinting equipment', 'Support an injury and recheck distal findings.'), internal('basket-stretcher', 'Basket stretcher', 'Coordinated movement using the rarely used Stokes-style stretcher.'), internal('reassessment-handover', 'Reassessment and handover', 'Trend changes and organize the report.')],
    nextStep: { ...internal('secondary-survey', 'Continue to secondary survey', 'Immediate MARCHE priorities are addressed. Gather the complete history, head-to-toe findings and handover details.'), kicker: 'After MARCHE' },
    related: ['secondary-survey', 'vital-signs', 'reassessment-handover'],
  },
  {
    id: 'capillary-refill', title: 'Capillary refill', category: 'assessment', group: 'Vital signs — locally taught check', icon: 'assessment', color: 'teal', reference: true,
    intro: 'Capillary refill is a supporting observation, not a stand-alone diagnosis. Use it only if it remains part of the locally taught assessment.',
    steps: ['Choose the finger, toe or other site taught in the current course.', 'Briefly press the area to blanch it, then release.', 'Observe and describe the return of colour using the locally taught method.', 'Record the site, conditions and result with pulse, skin, responsiveness and the rest of the assessment.', 'Repeat the check after a splint, dressing, movement or change in condition when it is part of the local method.'],
    notice: { title: 'Use the trend, not one finding', text: 'Cold surroundings, poor perfusion and the assessment site can affect the observation. Recheck a concerning result and report it with the rest of the casualty picture.' },
    related: ['march-c', 'pulse', 'skin-signs', 'vital-signs'],
  },
  {
    id: 'chest-seal', title: 'Chest seal', category: 'equipment', group: 'Open chest injury — trained-use equipment', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A chest seal may be part of the CCT response to a recognized open chest wound only when the carried device, training and local method are confirmed.',
    sections: [
      { title: 'What you’re looking for', bullets: ['A wound to the chest with visible air movement, bleeding, bubbling, sucking or unusual sounds.', 'Possible entry and exit wounds — check both the front and back when access is safe.', 'Breathing difficulty, unequal chest movement, chest pain, blue-grey skin signs or a change in responsiveness.'] },
      { title: 'Trained-use boundaries', bullets: ['Call for urgent medical assistance and continue the breathing assessment.', 'Use a purpose-designed vented chest seal only when it is carried and you are trained to apply it.', 'Do not treat an improvised fully occlusive seal as a universal answer for every open chest wound.', 'If breathing worsens after a dressing or seal, follow the trained response immediately and report the change.'] },
      { title: 'Keep watching', bullets: ['Repeat look, listen and feel checks.', 'Record the wound location, what was applied, the time and the casualty’s response.', 'Continue into circulation and return to respiration immediately if breathing changes.'] },
    ],
    notice: { title: 'Confirm the actual product', text: 'Before a detailed application card is added, confirm the carried chest-seal model, whether it is vented, and the current CCT training method.' },
    resources: [external(AHA_FIRST_AID, 'American Heart Association and American Red Cross first-aid guidance', 'Current guidance for open chest wounds and worsening breathing after a dressing or seal.')],
    related: ['march-r', 'respiratory-rate', 'bvm', 'oxygen'],
  },
  {
    id: 'pelvic-binder', title: 'Pelvic binder', category: 'equipment', group: 'Possible pelvic injury — local equipment confirmation required', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A pelvic binder belongs in the information hub as a recognition and escalation topic. A detailed application procedure must match the exact carried product and local direction.',
    sections: [
      { title: 'Recognize and report', bullets: ['Consider the mechanism, pelvic pain, deformity or other signs of significant trauma.', 'Control any immediately visible bleeding and continue MARCHE priorities.', 'Avoid repeated movement or repeated manipulation of the pelvis.', 'Report the concern and request the required equipment or medical direction.'] },
      { title: 'Before a procedure card is published', bullets: ['Confirm that the device is carried.', 'Confirm whether casualty clearers are trained or directed to apply or assist with it.', 'Confirm the exact product, placement landmark, indications, contraindications and authorization process.', 'Use the manufacturer’s instructions for that exact model.'] },
    ],
    notice: { title: 'Do not blend products', text: 'Pelvic binders and wraps have model-specific instructions. This hub will not present a generic procedure made from several different products.' },
    related: ['march-m', 'march-c', 'march-e', 'reassessment-handover'],
  },
  {
    id: 'vital-signs', title: 'Vital signs', category: 'assessment', group: 'Assessment', icon: 'assessment', color: 'teal', reference: true,
    intro: 'Build a complete picture and record the trend. A single number never replaces the casualty’s appearance and change over time.',
    sections: [
      { title: 'Core observations', bullets: ['Responsiveness: record AVPU and any change.', 'Respirations: rate, regularity, depth, effort, sounds and pain.', 'Pulse: rate, rhythm and strength.', 'Skin: colour compared with normal tone, temperature and moisture.', 'Blood pressure and assigned monitor readings when trained and directed.', 'Capillary refill only when it remains part of the locally taught method.'] },
      { title: 'Typical resting adult guide', bullets: ['Respirations: about 12–18 breaths per minute.', 'Pulse: about 60–100 beats per minute.', 'Pain, anxiety, exertion, temperature, medication, illness and injury can change these values.', 'Treat and report the casualty, not an isolated number.'] },
      { title: 'Record', bullets: ['Time of each set', 'Position and relevant circumstances', 'Exact rate and observed quality', 'Treatment given between sets', 'Direction of change: improving, unchanged or deteriorating'] },
    ],
    actions: [internal('respiratory-rate', 'Respiratory rate & quality', 'Count and describe breathing.'), internal('pulse', 'Pulse rate & quality', 'Find, count and describe a pulse.'), internal('skin-signs', 'Skin signs', 'Assess colour, temperature and moisture.'), internal('avpu', 'AVPU', 'Describe responsiveness consistently.'), internal('manual-blood-pressure', 'Manual blood pressure', 'Measure systolic and diastolic pressure.'), internal('pulse-oximeter', 'Portable pulse oximeter', 'Obtain and validate an SpO₂ reading.'), internal('three-lead-ecg', '3-lead ECG setup', 'Apply leads and obtain a usable trace.')],
    nextStep: { ...internal('head-to-toe', 'Continue to the injury check', 'Use a focused examination or a systematic head-to-toe check to find other injuries.'), kicker: 'Secondary survey' },
    resources: [external(VITAL_SIGNS, 'MedlinePlus: Vital signs', 'Reviewed January 2025; general healthy-adult resting ranges.'), external(RED_CROSS_GUIDE, 'Canadian Red Cross assessment guidance', 'Responsiveness, breathing, skin and ongoing care.')],
    related: ['secondary-survey', 'respiratory-rate', 'pulse', 'skin-signs', 'avpu'],
  },
  {
    id: 'respiratory-rate', title: 'Respiratory rate & quality', category: 'assessment', group: 'Vital signs', icon: 'airway', color: 'yellow', reference: true,
    intro: 'Count the breaths and describe how well the casualty is breathing.',
    steps: ['Position yourself where you can see chest or abdominal movement.', 'When practical, avoid announcing that you are counting so the casualty does not consciously change the rate.', 'Count one rise and fall as one breath.', 'Count for a full 60 seconds. Use a shorter timed count only when that is the current locally taught method.', 'Record the rate and the quality at the same time.'],
    sections: [{ title: 'Describe the quality', bullets: ['Regular or irregular', 'Normal, shallow or deep', 'Easy or increased effort', 'Quiet or accompanied by unusual sounds', 'Equal or unequal chest movement', 'Able or unable to speak normally'] }, { title: 'Typical resting adult guide', bullets: ['About 12–18 breaths per minute for an average healthy adult at rest.', 'The casualty’s normal, the trend and signs of distress matter more than one isolated rate.'] }],
    resources: [external(VITAL_SIGNS, 'MedlinePlus: Vital signs', 'General healthy-adult resting ranges.'), external(RED_CROSS_GUIDE, 'Canadian Red Cross breathing assessment', 'Assess rate and quality as part of the whole casualty.')],
    related: ['march-r', 'oxygen', 'bvm', 'vital-signs'],
  },
  {
    id: 'pulse', title: 'Pulse rate & quality', category: 'assessment', group: 'Vital signs', icon: 'assessment', color: 'teal', reference: true,
    intro: 'A pulse check includes more than a number. Record where you checked, the rate, rhythm and strength.',
    steps: ['Use the pads of two fingers, not your thumb.', 'For a radial pulse, place the fingers on the thumb side of the inner wrist and press lightly.', 'Use a carotid pulse only as taught for an unresponsive casualty. Never press both sides of the neck at once.', 'Count for a full 60 seconds. Use a shorter timed count only when that is the current locally taught method.', 'Record the rate, regularity and strength, then compare it with later checks.'],
    sections: [{ title: 'Describe', bullets: ['Rate in beats per minute', 'Regular or irregular rhythm', 'Strong, normal or weak quality', 'Location used: radial or carotid'] }, { title: 'Typical resting adult guide', bullets: ['About 60–100 beats per minute for a calm, resting adult.', 'Fitness, pain, anxiety, temperature, medication, illness, blood loss and shock can alter the rate.'] }],
    resources: [external(PULSE_GUIDE, 'American Heart Association: Checking a pulse', 'Pulse locations, wrist technique and resting adult range.'), external(VITAL_SIGNS, 'MedlinePlus: Vital signs', 'General healthy-adult resting ranges.')],
    related: ['march-c', 'skin-signs', 'vital-signs', 'reassessment-handover'],
  },
  {
    id: 'skin-signs', title: 'Skin signs', category: 'assessment', group: 'Vital signs', icon: 'assessment', color: 'teal', reference: true,
    intro: 'Compare the casualty’s skin with their normal appearance and look for change over time.',
    sections: [
      { title: 'Check', bullets: ['Colour: normal for the casualty, unusually pale, ashen, blue-grey, flushed or mottled.', 'Temperature: warm, cool or hot.', 'Moisture: dry, damp or sweaty.', 'Look at the lips, nail beds and around the mouth when a colour change is difficult to judge elsewhere.'] },
      { title: 'Report the finding', bullets: ['Use descriptive words instead of diagnosing from skin alone.', 'Record the time and whether the finding is improving or worsening.', 'Interpret skin together with breathing, pulse, responsiveness and the mechanism.'] },
    ],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross skin assessment', 'Current guidance for evaluating colour, temperature and moisture.')],
    related: ['march-c', 'pulse', 'vital-signs', 'reassessment-handover'],
  },
  {
    id: 'secondary-survey', title: 'Secondary survey', category: 'assessment', group: 'After immediate threats', icon: 'assessment', color: 'teal', reference: true,
    intro: 'Build the rest of the casualty picture after immediate threats are managed. Ask the history, record vital signs, check for other injuries and keep reassessing.',
    quickRoutes: [
      internal('sample-history', 'Ask the SAMPLE history', 'Use six prompts to collect the information that matters.'),
      internal('vital-signs', 'Record vital signs', 'Describe responsiveness, breathing, pulse, skin and assigned observations.'),
      internal('head-to-toe', 'Complete the injury check', 'Choose a focused examination or a systematic head-to-toe check.'),
      internal('reassessment-handover', 'Reassess and hand over', 'Repeat priority findings and organize the report.'),
    ],
    sections: [
      { title: 'Before you begin', bullets: ['Confirm that immediate MARCHE threats have been addressed.', 'Explain what you are going to do and obtain permission when the casualty can respond.', 'Keep watching breathing, responsiveness and skin while you continue.', 'Stop the secondary survey and return to MARCHE immediately if the casualty deteriorates.'] },
      { title: 'Choose the appropriate examination', bullets: ['For a responsive casualty, ask what hurts and begin with a focused examination of the area of concern.', 'Use a broader hands-on check when the casualty cannot communicate, there may be more than one injury, or the mechanism and findings make it necessary.', 'Preserve privacy and expose only what is needed to assess and treat the casualty.'] },
      { title: 'Complete the picture', bullets: ['Record the SAMPLE history and each vital-sign set.', 'Recheck dressings, tourniquets, airway devices, splints and other treatments.', 'Document important negative findings as well as injuries found.', 'Prepare the mechanism, injuries, signs, treatments and response for handover.'] },
    ],
    nextStep: { ...internal('sample-history', 'Start with the SAMPLE history', 'Ask the casualty and available witnesses for the information that will shape the rest of the assessment.'), kicker: 'Secondary survey' },
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross secondary assessment', 'Current SAMPLE history, vital-sign and injury-check guidance.'), external(AHA_FIRST_AID, 'AHA and American Red Cross first-aid guidelines', 'Physical examination and SAMPLE history as essential assessment components.')],
    related: ['sample-history', 'vital-signs', 'head-to-toe', 'reassessment-handover'],
  },
  {
    id: 'sample-history', title: 'SAMPLE history', category: 'assessment', group: 'Secondary survey — history', icon: 'communications', color: 'mint', reference: true,
    intro: 'SAMPLE is a short, repeatable set of prompts for gathering the casualty’s symptoms, medical background and the events surrounding the problem.',
    mnemonic: {
      heading: 'Ask SAMPLE',
      items: [
        { letter: 'S', title: 'Signs & symptoms', text: 'What happened? What hurts? What feels different? What can you see or observe?' },
        { letter: 'A', title: 'Allergies', text: 'Any allergies to medication, food, latex or anything else?' },
        { letter: 'M', title: 'Medications', text: 'What medications do you take, what are they for, and when was the last dose?' },
        { letter: 'P', title: 'Past medical history', text: 'Any medical conditions, recent illness, surgery, pregnancy, or a similar episode before?' },
        { letter: 'L', title: 'Last oral intake', text: 'When did you last eat or drink, and what did you have?' },
        { letter: 'E', title: 'Events leading up', text: 'What was happening immediately before the injury or illness, and how did it develop?' },
      ],
    },
    sections: [
      { title: 'How to gather it', bullets: ['Ask the casualty first when they can answer.', 'Use calm, open questions, then clarify important details.', 'Ask witnesses or teammates for information the casualty cannot provide.', 'Look for medical identification when appropriate.', 'Record the answers and identify who supplied them.'] },
      { title: 'What to pass on', bullets: ['The main complaint and when it began', 'Important allergies and medications', 'Relevant medical history', 'The last oral intake when it may affect care', 'The mechanism or events, including any change since the incident'] },
    ],
    notice: { title: 'SAMPLE does not delay priority care', text: 'If breathing, responsiveness, bleeding or the overall condition worsens, stop the questions and return to MARCHE.' },
    nextStep: { ...internal('vital-signs', 'Continue with vital signs', 'Record the casualty’s current condition and establish a baseline for comparison.'), kicker: 'Secondary survey' },
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross SAMPLE history', 'Current prompts used during the secondary assessment.'), external(AHA_FIRST_AID, 'AHA and American Red Cross first-aid guidelines', 'SAMPLE history and physical examination within first-aid assessment.')],
    related: ['secondary-survey', 'vital-signs', 'head-to-toe', 'reassessment-handover'],
  },
  {
    id: 'head-to-toe', title: 'Head-to-toe injury check', category: 'assessment', group: 'Secondary survey — examination', icon: 'assessment', color: 'violet', reference: true,
    intro: 'Check systematically for injuries that were not found during MARCHE. Use a focused examination when that is enough and a broader hands-on check when the situation requires it.',
    quickRouteHeading: 'Choose a body area',
    quickRoutes: [
      internal('head-face-check', 'Head & face', 'Scalp, face, eyes, ears, mouth and head-injury warning signs.'),
      internal('neck-check', 'Neck', 'Pain, wounds, deformity and neurologic symptoms without unnecessary movement.'),
      internal('chest-check', 'Chest', 'Breathing movement, wounds, pain and rib concerns.'),
      internal('abdomen-check', 'Abdomen', 'Pain, tenderness, bruising, distension and firmness.'),
      internal('pelvis-check', 'Pelvis', 'Recognize concerns without pushing or repeatedly manipulating the pelvis.'),
      internal('limbs-check', 'Arms & legs', 'Compare sides, check movement, sensation and circulation beyond an injury.'),
      internal('back-check', 'Back', 'Check during safe, necessary movement without reaching blindly underneath.'),
    ],
    sections: [
      { title: 'Focused or full check?', bullets: ['Ask a responsive casualty where they hurt and examine that area first.', 'Use a systematic hands-on check when the casualty cannot communicate or there may be additional injuries.', 'Begin at the head and work downward, prioritizing the chest, abdomen and legs before the arms.', 'Check the back during safe, necessary movement using the locally taught team method.'] },
      { title: 'Look, ask and feel', bullets: ['Look for bleeding, wounds, bruising, swelling, burns and unusual position or shape.', 'Ask about pain, tenderness, numbness, tingling, weakness and what feels different.', 'Feel gently for tenderness, deformity, firmness or abnormal movement only where appropriate.', 'Compare one side with the other and watch the casualty’s face and response.', 'Look around the casualty for blood or other clues; do not reach blindly underneath.'] },
      { title: 'Keep the primary survey active', bullets: ['Continue to monitor responsiveness, breathing, pulse and skin.', 'Treat findings within training as they are identified.', 'Stop and return to MARCHE if the casualty deteriorates.', 'Record what was checked, important findings, treatment and the response.'] },
    ],
    nextStep: { ...internal('reassessment-handover', 'Reassess and prepare the handover', 'Repeat priority findings, confirm treatments and communicate the full picture.'), kicker: 'Secondary survey' },
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross injury check', 'Focused and hands-on secondary examination guidance.')],
    related: ['sample-history', 'vital-signs', 'reassessment-handover', 'march-e'],
  },
  {
    id: 'head-face-check', title: 'Head & face check', category: 'assessment', group: 'Head-to-toe', icon: 'assessment', color: 'violet', reference: true,
    intro: 'Look carefully and use gentle assessment. Changes in responsiveness or breathing take priority over completing the examination.',
    sections: [
      { title: 'Ask and observe', bullets: ['Ask about headache, pain, dizziness, nausea, vision, hearing and memory of the event.', 'Repeat AVPU and note confusion, unusual behaviour, vomiting, seizure or worsening drowsiness.', 'Look over the scalp and face for bleeding, wounds, swelling, bruising, burns or unusual shape.', 'Check the eyes for obvious injury and note unequal pupils only if pupil assessment is part of current training.', 'Look at the mouth for bleeding, damaged teeth or loose material that could affect the airway.'] },
      { title: 'Report these findings immediately', bullets: ['Bruising around the eyes that is not explained by a direct eye injury — often called raccoon eyes.', 'Bruising behind an ear — often called Battle sign.', 'Clear or blood-stained fluid from an ear or the nose.', 'A depressed or visibly deformed area of the skull.', 'A new decrease in responsiveness, repeated vomiting, seizure, weakness or unequal movement.'] },
      { title: 'Protect and reassess', bullets: ['Do not press on a suspected skull deformity or insert anything into an ear or the nose.', 'Control bleeding using the locally taught approach while avoiding pressure over an obvious deformity.', 'Maintain the airway, minimize unnecessary movement and repeat AVPU.', 'Report the mechanism, findings, changes and treatment promptly.'] },
    ],
    notice: { title: 'Recognize; do not diagnose', text: 'These findings can indicate a serious head injury. The casualty-clearer task is to recognize the concern, protect priority functions and report it.' },
    resources: [external(MSD_TBI, 'MSD Manual: Traumatic brain injury', 'Professional reference for signs associated with skull-base injury.'), external(RED_CROSS_GUIDE, 'Canadian Red Cross injury check', 'Current secondary-assessment approach.')],
    related: ['head-to-toe', 'neck-check', 'avpu', 'march-h'],
  },
  {
    id: 'neck-check', title: 'Neck check', category: 'assessment', group: 'Head-to-toe', icon: 'assessment', color: 'violet', reference: true,
    intro: 'Check the neck without asking the casualty to move it when trauma or a spinal injury may be present.',
    sections: [
      { title: 'Check', bullets: ['Ask about neck pain, tenderness, numbness, tingling or weakness.', 'Look for wounds, bleeding, bruising, swelling or unusual position.', 'Observe breathing and listen for a change in the voice or new airway sounds.', 'Check movement and sensation in the limbs only using the method included in current training.'] },
      { title: 'Protect', bullets: ['Do not test neck range of motion after a concerning mechanism or finding.', 'Avoid unnecessary movement and support the head and neck using the locally taught method.', 'Keep airway and breathing care as the priority if the casualty deteriorates.', 'Report pain, neurologic symptoms, deformity and any change in responsiveness.'] },
    ],
    resources: [external(AHA_FIRST_AID, 'AHA and American Red Cross first-aid guidelines', 'Current guidance to avoid unnecessary movement with possible neck or back injury.')],
    related: ['head-face-check', 'head-to-toe', 'limbs-check', 'march-h'],
  },
  {
    id: 'chest-check', title: 'Chest check', category: 'assessment', group: 'Head-to-toe', icon: 'airway', color: 'yellow', reference: true,
    intro: 'Breathing problems remain a MARCHE priority. Stop the secondary check and return to respiration whenever breathing changes.',
    sections: [
      { title: 'Look and listen', bullets: ['Observe the rate, effort and whether both sides of the chest move together.', 'Look for wounds, bruising, burns, swelling, unusual shape and possible entry or exit wounds.', 'Listen for unusual breathing sounds and note whether the casualty can speak normally.', 'Ask about pain, shortness of breath and whether a deep breath makes pain worse.'] },
      { title: 'Feel only as appropriate', bullets: ['Use gentle, trained palpation to identify localized tenderness or an obvious rib deformity.', 'Do not repeatedly press a painful or unstable area.', 'Check both the front and back when access is safe and movement is justified.', 'Return to R in MARCHE for breathing support or open-chest-wound care.'] },
      { title: 'Reassess', bullets: ['Repeat breathing rate and quality after positioning or treatment.', 'Report increasing pain, unequal movement, worsening breathing or a change in responsiveness.', 'Record the wound or painful area, treatment, time and response.'] },
    ],
    actions: [internal('march-r', 'Return to R — Respiration', 'Reassess breathing and treat the immediate priority.'), internal('chest-seal', 'Chest seal', 'Open-chest-wound recognition and trained-use boundaries.'), internal('respiratory-rate', 'Respiratory rate', 'Count and describe breathing.')],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross hands-on check', 'Chest observation and gentle injury-check guidance.')],
    related: ['head-to-toe', 'abdomen-check', 'march-r', 'chest-seal'],
  },
  {
    id: 'abdomen-check', title: 'Abdomen check', category: 'assessment', group: 'Head-to-toe', icon: 'assessment', color: 'violet', reference: true,
    intro: 'Look before touching, ask about pain, and use only gentle examination within current training.',
    sections: [
      { title: 'Check', bullets: ['Ask about pain, tenderness, nausea and whether the pain began before or after the incident.', 'Look for wounds, bleeding, bruising, burns, swelling or distension.', 'Using the taught sequence, feel gently for tenderness, guarding or unusual firmness.', 'Watch the casualty’s face and stop if gentle pressure produces significant pain.'] },
      { title: 'Act and report', bullets: ['Treat any immediately visible external bleeding within training.', 'Do not repeatedly palpate a painful, rigid or injured area.', 'Keep the casualty at rest, protect from heat loss and monitor for shock.', 'Report the location and character of pain, visible findings, firmness and any deterioration.'] },
    ],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross hands-on check', 'Current general guidance for gentle abdominal assessment.')],
    related: ['head-to-toe', 'chest-check', 'pelvis-check', 'march-c'],
  },
  {
    id: 'pelvis-check', title: 'Pelvis check', category: 'assessment', group: 'Head-to-toe', icon: 'assessment', color: 'violet', reference: true,
    intro: 'Use the mechanism, symptoms and visible findings. Do not push, spring or repeatedly manipulate the pelvis during the secondary check.',
    sections: [
      { title: 'Recognize the concern', bullets: ['Ask about pain in the pelvis, hips, groin or lower back.', 'Consider falls, crush injury, impact or other significant mechanisms.', 'Look for bleeding, bruising, swelling, unusual leg position or apparent leg-length difference.', 'Ask about numbness, weakness and the ability to feel the legs without asking the casualty to stand.'] },
      { title: 'Protect and report', bullets: ['Do not press inward or downward to test pelvic stability.', 'Avoid unnecessary movement and manage immediate bleeding or shock concerns.', 'Request assistance and the locally confirmed movement or binder equipment when indicated.', 'Report the mechanism, pain, visible findings, circulation concerns and any deterioration.'] },
    ],
    actions: [internal('pelvic-binder', 'Pelvic binder', 'Recognition and locally confirmed use only.'), internal('march-c', 'Return to C — Circulation', 'Reassess circulation and shock concerns.'), internal('limbs-check', 'Continue to the limbs', 'Compare both sides without asking the casualty to stand.')],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross hands-on check', 'Current guidance not to push on the pelvis during an injury check.'), external(AHA_FIRST_AID, 'AHA and American Red Cross first-aid guidelines', 'Avoid unnecessary movement with possible hip or pelvic injury.')],
    related: ['head-to-toe', 'abdomen-check', 'pelvic-binder', 'limbs-check'],
  },
  {
    id: 'limbs-check', title: 'Arms & legs check', category: 'assessment', group: 'Head-to-toe', icon: 'assessment', color: 'sky', reference: true,
    intro: 'Compare both sides and check the injury as well as circulation and sensation beyond it.',
    sections: [
      { title: 'Look, ask and feel', bullets: ['Look for bleeding, wounds, bruising, swelling, burns, deformity and unusual position.', 'Ask about pain, tenderness, numbness, tingling or weakness.', 'Feel gently for tenderness and deformity without repeatedly moving the injured part.', 'Check whether the casualty can move fingers or toes only when movement is appropriate and within training.'] },
      { title: 'Check beyond an injury or splint', bullets: ['Assess the distal pulse using the locally taught site.', 'Check skin colour, temperature and sensation.', 'Use capillary refill only if it remains part of the local method.', 'Repeat and record the same checks after splinting, dressing, movement and any change.'] },
      { title: 'Protect and report', bullets: ['Control bleeding and support the injured area in the position found unless the current method directs otherwise.', 'Do not straighten a deformed limb simply to complete the examination.', 'Report the side, exact location, appearance, circulation and sensation findings.', 'Escalate absent pulse, worsening colour, loss of sensation or severe pain promptly.'] },
    ],
    actions: [internal('pulse', 'Pulse check', 'Record the site, rate, rhythm and strength.'), internal('capillary-refill', 'Capillary refill', 'Locally taught use, including after splinting.'), internal('skin-signs', 'Skin signs', 'Colour, temperature and moisture.')],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross injury check', 'Current systematic hands-on assessment guidance.')],
    related: ['head-to-toe', 'pelvis-check', 'back-check', 'reassessment-handover'],
  },
  {
    id: 'back-check', title: 'Back check', category: 'assessment', group: 'Head-to-toe', icon: 'movement', color: 'mint', reference: true,
    intro: 'Check the back when it can be done safely during necessary movement. Do not create extra movement only to finish the list.',
    sections: [
      { title: 'Before moving', bullets: ['Consider the mechanism, pain, numbness, tingling, weakness and the need for spinal-motion precautions.', 'Keep the airway and immediate treatment needs visible and controlled.', 'Use enough trained team members and the locally taught movement method.', 'Explain the movement to a responsive casualty.'] },
      { title: 'Check', bullets: ['Look for bleeding, wounds, bruising, burns, swelling or an object beneath the casualty.', 'Ask about pain and note tenderness or deformity without pressing directly on a suspected spinal injury.', 'Inspect clothing and the surface for blood or other clues.', 'Never reach blindly underneath where glass, metal or another sharp object may be present.'] },
      { title: 'After movement', bullets: ['Recheck MARCHE, AVPU and vital signs.', 'Recheck every dressing, airway device, splint and movement aid.', 'Report what was found and whether the casualty changed during movement.'] },
    ],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross hands-on check', 'Current back-check and responder-safety guidance.'), external(AHA_FIRST_AID, 'AHA and American Red Cross first-aid guidelines', 'Current spinal-motion and safe-position guidance.')],
    related: ['head-to-toe', 'neck-check', 'limbs-check', 'reassessment-handover'],
  },
  {
    id: 'reassessment-handover', title: 'Reassessment & handover', category: 'assessment', group: 'Ongoing care', icon: 'communications', color: 'mint', reference: true,
    intro: 'Keep checking the casualty, confirm that every intervention still works, and hand over the important information in a clear order.',
    quickRoutes: [
      internal('reassessment-loop', 'The condition changed', 'Restart the priority assessment and deal with the first problem found.'),
      internal('treatment-checks', 'A treatment was applied', 'Confirm bleeding control, airway, breathing support, circulation and protection.'),
      internal('vital-signs', 'Repeat the observations', 'Record a new set and describe the direction of change.'),
      internal('mist-handover', 'Prepare the handover', 'Organize mechanism, injuries, signs, treatments and response.'),
    ],
    sections: [
      { title: 'Restart MARCHE immediately when', bullets: ['Responsiveness decreases or behaviour changes.', 'Bleeding begins again or a dressing or tourniquet is no longer controlling it.', 'The airway becomes noisy, obstructed or difficult to maintain.', 'Breathing becomes slower, faster, more difficult or less effective.', 'Pulse, skin, circulation beyond a splint, pain or the overall condition worsens.', 'The casualty changes during or after movement.'] },
      { title: 'Build a useful trend', bullets: ['Repeat the same observations using the same method whenever practical.', 'Record the time and whether each finding is improving, unchanged or worsening.', 'Note treatment or movement that occurred between sets.', 'Report a meaningful change immediately rather than waiting to complete every observation.'] },
      { title: 'Before the handover', bullets: ['Complete one last priority reassessment.', 'Confirm every dressing, tourniquet, airway device, oxygen or BVM setup, splint and warming measure.', 'Make treatment times, findings and changes easy for the receiving person to understand.', 'Keep responsibility for the casualty until the receiving person acknowledges the handover.'] },
    ],
    nextStep: { ...internal('reassessment-loop', 'Open the reassessment loop', 'Use the same short sequence after treatment, movement or any change.'), kicker: 'Ongoing care' },
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross continual care', 'Current guidance for monitoring condition, ABCs and temperature while care continues.'), external(JTS_HANDOFF, 'Joint Trauma System hand-off guidance', 'Current public guidance to repeat MIST, verbally turn over care and identify interventions.', 'Official clinical guidance')],
    related: ['reassessment-loop', 'treatment-checks', 'mist-handover', 'secondary-survey'],
  },
  {
    id: 'reassessment-loop', title: 'Reassessment loop', category: 'assessment', group: 'Ongoing care', icon: 'assessment', color: 'mint', reference: true,
    intro: 'Use a short, repeatable loop after an intervention, after movement, at the locally directed interval, and whenever the casualty changes.',
    steps: [
      'Look at the whole casualty and identify why you are reassessing.',
      'Restart MARCHE and deal with the first immediate threat found.',
      'Confirm that each existing treatment is still in place and working.',
      'Repeat AVPU, breathing, pulse, skin and other assigned observations.',
      'Record the time, the new findings and what happened between assessments.',
      'Report deterioration or a treatment problem immediately, then continue the loop.',
    ],
    sections: [
      { title: 'Repeat after', bullets: ['Direct pressure, wound packing, a pressure dressing or tourniquet', 'Airway positioning, an airway adjunct, oxygen or BVM support', 'A chest dressing or seal', 'A splint, movement device or position change', 'Warming or cooling measures', 'Any change in pain, behaviour, responsiveness, breathing, pulse or skin'] },
      { title: 'Use the trend', bullets: ['Compare with the previous set, not only a normal range.', 'Use the same measurement site and method when practical.', 'State what is different and whether the change followed treatment or movement.', 'Return to the relevant MARCHE letter when a problem is found.'] },
    ],
    notice: { title: 'No invented universal interval', text: 'The correct timed reassessment interval depends on current local direction and the casualty’s condition. A change or treatment problem is always a reason to reassess immediately.' },
    actionHeading: 'Open the next check',
    actions: [internal('treatment-checks', 'Treatment checks', 'Confirm that every intervention is still effective.'), internal('vital-signs', 'Repeat vital signs', 'Record a comparable set and the direction of change.'), internal('marche', 'Restart MARCHE', 'Return to the priority sequence.'), internal('mist-handover', 'Prepare MIST', 'Organize the report while continuing care.')],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross continual care', 'Monitor the casualty’s condition and primary priorities throughout care.')],
    related: ['reassessment-handover', 'treatment-checks', 'vital-signs', 'mist-handover'],
  },
  {
    id: 'treatment-checks', title: 'Treatment checks', category: 'assessment', group: 'Ongoing care', icon: 'treatments', color: 'sky', reference: true,
    intro: 'A treatment is not finished when it is applied. Confirm that it is still working after application, movement and any change in condition.',
    sections: [
      { title: 'Bleeding control', bullets: ['Confirm that bleeding has stopped.', 'Look for soak-through, new bleeding or pooling beneath the casualty.', 'Confirm that a tourniquet remains secure, note the application time and do not cover it from view.', 'Do not disturb effective packing or a dressing simply to look underneath.'] },
      { title: 'Airway and breathing', bullets: ['Confirm that the airway remains open and any adjunct remains positioned as taught.', 'Repeat look, listen and feel; check rate, effort, sounds and visible chest movement.', 'During BVM support, confirm visible chest rise and effective technique.', 'Confirm the oxygen setup remains secure and is being used only under the applicable direction and target.', 'If breathing worsens after a chest dressing or seal, follow the trained response immediately.'] },
      { title: 'Circulation and limbs', bullets: ['Repeat pulse, skin and the overall circulation assessment.', 'Beyond a splint or dressing, compare pulse, colour, temperature, sensation and movement as trained.', 'Use capillary refill only when it remains part of the local method.', 'Report absent pulse, worsening colour, loss of sensation, increasing pain or renewed bleeding promptly.'] },
      { title: 'Temperature, position and movement', bullets: ['Keep the casualty insulated from the deck and environment.', 'Confirm blankets, the foil blanket and other warming or cooling measures remain appropriate.', 'Recheck the casualty and all treatments after every move or transfer.', 'Make sure straps and movement equipment are secure without compromising breathing or circulation.'] },
    ],
    notice: { title: 'A failed treatment becomes the priority', text: 'If bleeding restarts, the airway closes, breathing worsens or circulation beyond a splint changes, return to the relevant MARCHE letter and act immediately within training.' },
    actionHeading: 'Open the related card',
    actions: [internal('march-m', 'Bleeding control', 'Return to M and the carried bleeding-control options.'), internal('march-a', 'Airway', 'Recheck airway position and adjuncts.'), internal('march-r', 'Respiration', 'Recheck breathing support and chest concerns.'), internal('march-c', 'Circulation', 'Recheck pulse, skin and distal circulation.'), internal('march-h', 'Head & hypothermia', 'Repeat AVPU and protect temperature.'), internal('capillary-refill', 'Capillary refill', 'Locally taught use after splinting or dressing.')],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross continual care', 'Ongoing monitoring and reassessment principles.'), external(JTS_HANDOFF, 'Joint Trauma System hand-off guidance', 'Current public guidance to verify interventions during transfer of care.', 'Official clinical guidance')],
    related: ['reassessment-loop', 'mist-handover', 'vital-signs', 'reassessment-handover'],
  },
  {
    id: 'mist-handover', title: 'MIST handover', category: 'assessment', group: 'Handover', icon: 'communications', color: 'mint', reference: true,
    intro: 'MIST puts the essential information in a predictable order so the receiving person can understand the casualty and continue care.',
    mnemonic: {
      heading: 'Report MIST',
      items: [
        { letter: 'M', title: 'Mechanism or medical complaint', text: 'What happened, when it happened, and the main illness or injury concern.' },
        { letter: 'I', title: 'Injuries & important findings', text: 'What you found, where it is, and important findings you did not find.' },
        { letter: 'S', title: 'Signs & trends', text: 'AVPU, breathing, pulse, skin, assigned readings, and whether the casualty is better, unchanged or worse.' },
        { letter: 'T', title: 'Treatments & response', text: 'What was done, device and application times, whether it worked, and what still needs attention.' },
      ],
    },
    sections: [
      { title: 'Prepare before speaking', bullets: ['Complete a final MARCHE reassessment.', 'Put the findings and times in order.', 'Lead with the most urgent concern or recent deterioration.', 'Keep the report short enough to follow, but do not omit a critical treatment or change.'] },
      { title: 'Make the treatments visible', bullets: ['Point out tourniquets, packed wounds, dressings, chest seals, airway devices and splints.', 'State oxygen or ventilation support and how the casualty responded.', 'Hand over any written record with the casualty.', 'Continue monitoring until the receiver acknowledges the report and takes over.'] },
      { title: 'Include the direction of change', bullets: ['Give the earliest and most recent important findings.', 'State what happened between those observations.', 'Use clear words such as improving, unchanged or deteriorating.', 'Answer questions and correct any misunderstanding before leaving.'] },
    ],
    actionHeading: 'Practise the format',
    actions: [internal('handover-example', 'Read a complete MIST example', 'See how the four parts become one short verbal report.'), internal('treatment-checks', 'Review treatment checks', 'Confirm everything before the report.'), internal('reassessment-loop', 'Repeat the assessment', 'Update the findings before handover.')],
    resources: [external(JTS_HANDOFF, 'Joint Trauma System hand-off guidance', 'Current public guidance to repeat MIST, verbally transfer care, provide documentation and identify interventions.', 'Official clinical guidance')],
    related: ['handover-example', 'treatment-checks', 'reassessment-loop', 'secondary-survey'],
  },
  {
    id: 'handover-example', title: 'MIST handover example', category: 'assessment', group: 'Handover — practice example', icon: 'communications', color: 'mint', reference: true,
    intro: 'This made-up example shows how separate findings become one concise report. The values and event are fictional.',
    mnemonic: {
      heading: 'Build the example',
      items: [
        { letter: 'M', title: 'Mechanism', text: 'Adult casualty fell from a ladder approximately 20 minutes ago and landed on the right side.' },
        { letter: 'I', title: 'Injuries', text: 'Closed deformity and pain to the right lower leg. No other injury found during the secondary check.' },
        { letter: 'S', title: 'Signs', text: 'Alert throughout. Breathing 18 and effective. Radial pulse changed from 104 to 96 and remains regular. Skin is cool and pale.' },
        { letter: 'T', title: 'Treatments', text: 'Right leg supported and splinted at 1015. Distal pulse, skin, sensation and movement are unchanged after splinting. Casualty kept warm.' },
      ],
    },
    example: {
      title: 'Say it as one report',
      text: 'Adult casualty fell from a ladder about 20 minutes ago and landed on the right side. They have a closed deformity and pain to the right lower leg, with no other injury identified during the secondary check. They have remained alert. Breathing is 18 and effective. Radial pulse changed from 104 to 96 and is regular; skin remains cool and pale. The leg was supported and splinted at 1015. Distal circulation, sensation and movement are unchanged after splinting, and the casualty has been kept warm.'
    },
    sections: [
      { title: 'Why the report works', bullets: ['It follows one predictable order.', 'It gives a trend instead of an isolated pulse.', 'It states the treatment time and whether the treatment changed distal findings.', 'It identifies the remaining concern without adding a diagnosis.'] },
      { title: 'Before using MIST', bullets: ['Replace every example detail with the actual casualty findings.', 'Include assigned readings only when they were actually measured.', 'Report urgent deterioration before completing a polished handover.', 'Use the locally taught terminology when it differs from this example.'] },
    ],
    notice: { title: 'Practice example only', text: 'The app does not collect or store casualty information. This page demonstrates the communication structure only.' },
    resources: [external(JTS_HANDOFF, 'Joint Trauma System hand-off guidance', 'Current public hand-off and MIST guidance.', 'Official clinical guidance')],
    related: ['mist-handover', 'treatment-checks', 'reassessment-loop', 'vital-signs'],
  },
  {
    id: 'direct-pressure', title: 'Direct pressure', category: 'bleeding', group: 'Bleeding control', icon: 'bleeding', color: 'sky', reference: true,
    intro: 'Firm, continuous pressure is the immediate control method for most external bleeding.',
    steps: ['Expose the bleeding site when practical.', 'Place a dressing or gauze directly over the source.', 'Press firmly and continuously with your hand.', 'Maintain pressure until bleeding is controlled or another method is required.', 'If blood comes through, maintain pressure and reinforce without disturbing the clot.', 'Reassess continuously.'],
    notice: { title: 'Life-threatening limb bleeding', text: 'If direct pressure does not control the bleeding, cannot be maintained or is impractical, move to the commercial-tourniquet method taught for the carried device.' },
    actions: [internal('pressure-dressing', 'Pressure dressing', 'Maintain control once direct pressure has stopped the bleeding.'), internal('wound-packing', 'Wound packing', 'Add packing for a suitable deep wound when trained.'), internal('cat-tourniquet', 'C-A-T tourniquet', 'Commercial tourniquet product page and official media.')],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross bleeding-control guidance', 'Current first-aid guide.')],
    related: ['wound-packing', 'pressure-dressing', 'cat-tourniquet', 'march-m'],
  },
  {
    id: 'pressure-dressing', title: 'Pressure dressing', category: 'bleeding', group: 'Bleeding control', icon: 'bleeding', color: 'sky', reference: true,
    intro: 'A pressure dressing helps maintain control after firm direct pressure has stopped the bleeding.',
    steps: ['Keep direct pressure on the wound while preparing the dressing.', 'Centre the wound pad over the bleeding site.', 'Wrap firmly enough to maintain pressure and keep the pad in place.', 'Secure the dressing without creating an unintended tourniquet.', 'Check for renewed bleeding and reassess circulation beyond the dressing when applicable.', 'Record and report the wound, dressing and response.'],
    actions: [internal('olaes-bandage', 'OLAES modular bandage', 'Review the carried pressure-dressing product and official information.'), internal('direct-pressure', 'Direct pressure', 'Return to the immediate manual-pressure method.'), internal('cat-tourniquet', 'C-A-T tourniquet', 'For qualifying life-threatening limb bleeding.')],
    related: ['direct-pressure', 'olaes-bandage', 'wound-packing', 'march-m'],
  },
  {
    id: 'wound-packing', title: 'Wound packing', category: 'bleeding', group: 'Bleeding control — trained skill', icon: 'bleeding', color: 'sky', reference: true,
    intro: 'Pack a suitable deep wound only when this skill is part of current training. Packing places gauze directly at the bleeding source.',
    steps: ['Expose the wound and identify the bleeding cavity.', 'Feed gauze firmly into the deepest part of the wound, directly onto the bleeding source.', 'Continue packing until the cavity is filled.', 'Apply firm direct pressure for the time required by the carried gauze and current training.', 'Secure with a pressure dressing after control is achieved.', 'Reassess for renewed bleeding and report the treatment.'],
    notice: { title: 'Use the taught product method', text: 'Plain gauze and hemostatic gauze can require different hold times and instructions. Follow the carried product and current course.' },
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross bleeding-control guidance', 'Hemostatic dressing and direct-pressure principles.')],
    related: ['direct-pressure', 'pressure-dressing', 'olaes-bandage', 'march-m'],
  },
  {
    id: 'cat-tourniquet', title: 'C-A-T tourniquet', category: 'equipment', group: 'Bleeding-control product', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A commercial windlass tourniquet for life-threatening bleeding from an arm or leg. Confirm the carried generation and practise with a trainer, not an operational device.',
    steps: ['Expose the limb and identify the bleeding site.', 'Apply using the placement method taught for the current course and carried C-A-T generation.', 'Pull the band tight before turning the windlass.', 'Turn the windlass until the bleeding stops.', 'Secure the windlass and the retaining strap.', 'Record the application time where it remains visible.', 'Confirm bleeding has stopped and do not remove the tourniquet.'],
    notice: { title: 'Placement wording must match training', text: 'The 2025 Canadian Red Cross guide uses 5–10 cm above the injury, above a joint when necessary. Threat-based “high and tight” use is a different context. The app must follow the current CCT course and manufacturer instructions consistently.' },
    resources: [external(CAT_PRODUCT, 'Official C-A-T product page', 'Features, product details and application videos.', 'Manufacturer'), external(CAT_VIDEOS, 'Official North American Rescue product-use videos', 'Includes C-A-T one-handed and two-handed application videos.', 'Official video'), external(RED_CROSS_GUIDE, 'Canadian Red Cross tourniquet guidance', 'Current general first-aid placement and reassessment guidance.')],
    related: ['march-m', 'direct-pressure', 'pressure-dressing', 'olaes-bandage'],
  },
  {
    id: 'olaes-bandage', title: 'OLAES modular bandage', category: 'equipment', group: 'Bleeding-control product', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A modular trauma dressing that combines an elastic wrap, wound pad, pressure cup, packing gauze and an occlusive plastic sheet.',
    sections: [
      { title: 'Main components', bullets: ['Elastic wrap with control strips', 'Wound pad and transparent pressure cup', 'Approximately 3 metres of packing gauze', 'Removable occlusive plastic sheet'] },
      { title: 'As a pressure dressing', bullets: ['Control the bleeding with direct pressure first.', 'Centre the pad and pressure cup over the wound.', 'Wrap the elastic flat and firmly around the limb or body area.', 'Secure the wrap and reassess bleeding and circulation beyond the dressing.'] },
      { title: 'Before use', bullets: ['Confirm whether the carried model is standard OLAES or the hemostatic version.', 'Check package integrity and expiry.', 'Use the model demonstrated in current training.'] },
    ],
    resources: [external(OLAES_PRODUCT, 'Official OLAES Modular Bandage page', 'Manufacturer features, component photographs and product media.', 'Manufacturer')],
    related: ['pressure-dressing', 'wound-packing', 'direct-pressure', 'cat-tourniquet'],
  },
  {
    id: 'airway-positioning', title: 'Open and position the airway', category: 'airway', group: 'Airway', icon: 'airway', color: 'yellow', reference: true,
    intro: 'Positioning is the first airway intervention. Continue to hold and reassess the airway after it opens.',
    steps: ['Check responsiveness and look for clearly visible loose material in the mouth.', 'Remove only material that you can clearly see and easily remove.', 'Use the airway-opening manoeuvre taught for the casualty and situation.', 'When head or neck trauma is a concern, a trained responder may begin with a jaw thrust.', 'If a jaw thrust does not open the airway, opening the airway and supporting breathing take priority.', 'Look, listen and feel for air movement, then maintain the position and continue into respiration.'],
    notice: { title: 'Keep hands-on control', text: 'An airway can change after movement, vomiting or a change in responsiveness. Recheck it whenever the casualty moves or deteriorates.' },
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross airway guidance', 'Current general airway and breathing care.')],
    related: ['march-a', 'opa', 'npa', 'bvm'],
  },
  {
    id: 'airway-adjuncts', title: 'Airway adjuncts', category: 'airway', group: 'Airway', icon: 'airway', color: 'yellow', reference: true,
    intro: 'An airway adjunct can help maintain an open airway, but it never replaces positioning, observation and reassessment.',
    sections: [
      { title: 'Choose only through current training', bullets: ['Use an OPA for an unresponsive casualty without an intact gag response, when trained.', 'Use an NPA only through the locally taught method, including its contraindications.', 'Use an i-gel only when the carried model, training and authorization are confirmed.', 'If an adjunct causes gagging, coughing, resistance or a change in condition, reassess the airway and follow the trained response.'] },
      { title: 'After placement', bullets: ['Confirm that air is moving and the airway remains open.', 'Continue to respiration and watch for visible chest movement.', 'Recheck position after movement, vomiting or any change in responsiveness.'] },
    ],
    notice: { title: 'The device does not make the airway “finished”', text: 'Stay with the casualty, keep reassessing and return to airway support immediately if air movement or responsiveness changes.' },
    actions: [internal('opa', 'OPA', 'Purpose, sizing, checks and trained-use sequence.'), internal('npa', 'NPA', 'Purpose and local-method confirmation.'), internal('igel', 'i-gel', 'Training-dependent device page and official manufacturer media.')],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross airway guidance', 'Current general airway and breathing care.'), external(IGEL_PRODUCT, 'Official i-gel product page', 'Manufacturer product information and adult sizing documents.', 'Manufacturer')],
    related: ['march-a', 'airway-positioning', 'opa', 'npa'],
  },
  {
    id: 'opa', title: 'Oropharyngeal airway — OPA', category: 'airway', group: 'Airway adjunct — trained skill', icon: 'airway', color: 'yellow', reference: true,
    intro: 'An OPA helps hold the tongue away from the airway in an unresponsive casualty without an intact gag response.',
    steps: ['Confirm that the casualty is unresponsive and has no intact gag response.', 'Select and measure the size using the method taught in the current course.', 'Open the mouth and insert using the taught technique for that airway and casualty group.', 'Stop and remove it if the casualty gags, coughs or becomes more responsive.', 'Confirm air movement and continue to maintain the airway.', 'Reassess after movement and during ventilation.'],
    notice: { title: 'Technique must match current training', text: 'Sizing and insertion methods vary by age group and course. This page does not replace hands-on practice with the locally taught method.' },
    related: ['march-a', 'airway-positioning', 'npa', 'bvm'],
  },
  {
    id: 'npa', title: 'Nasopharyngeal airway — NPA', category: 'airway', group: 'Airway adjunct — local method required', icon: 'airway', color: 'yellow', reference: true,
    intro: 'An NPA can support an airway when the casualty has some responsiveness or an OPA is not tolerated. The exact CCT method must be confirmed before a step card is published.',
    sections: [{ title: 'The finished page must confirm', bullets: ['Indications and contraindications', 'The carried NPA type', 'Sizing landmark', 'Lubrication method', 'Insertion direction and resistance response', 'How placement and continued effectiveness are checked'] }],
    notice: { title: 'Do not improvise', text: 'Use an NPA only if it is currently taught and follow that exact method. Stop if the device will not advance easily.' },
    related: ['march-a', 'airway-positioning', 'opa', 'bvm'],
  },
  {
    id: 'igel', title: 'i-gel supraglottic airway', category: 'equipment', group: 'Advanced airway adjunct — confirmation required', icon: 'equipment', color: 'coral', reference: true,
    intro: 'The i-gel is a single-use supraglottic airway available in weight-based sizes. It belongs in the CCT hub only if the carried model, training and authorization are confirmed.',
    sections: [{ title: 'Before publishing a CCT quick-use sequence', bullets: ['Confirm that casualty clearers are trained and authorized to insert it.', 'Identify the exact carried i-gel or i-gel O₂ product.', 'Confirm size selection, insertion, ventilation connection and securing method.', 'Confirm placement checks and the response to ineffective ventilation.'] }],
    resources: [external(IGEL_PRODUCT, 'Official i-gel product page', 'Manufacturer product information and adult sizing documents.', 'Manufacturer'), external(IGEL_VIDEOS, 'Official Intersurgical airway videos', 'Includes i-gel training and guidance media.', 'Official video')],
    related: ['march-a', 'airway-positioning', 'bvm', 'opa'],
  },
  {
    id: 'bvm', title: 'Bag-valve-mask — BVM', category: 'airway', group: 'Breathing support — trained skill', icon: 'airway', color: 'yellow', reference: true,
    intro: 'A BVM supports a casualty whose breathing is absent or inadequate. Two trained rescuers are preferred when available.',
    steps: ['Open and maintain the airway.', 'Select the correct mask and connect oxygen when directed and available.', 'Position the mask over the nose and mouth.', 'Create and maintain an effective seal; use two hands on the mask when a second rescuer can squeeze the bag.', 'Ventilate only enough to produce visible chest rise.', 'Avoid excessive rate or volume.', 'Continuously reassess chest rise, air leak, airway position and casualty response.'],
    notice: { title: 'Use the current resuscitation sequence', text: 'Ventilation timing changes with the casualty’s pulse, CPR status and advanced-airway status. Follow the current course algorithm rather than memorizing one rate for every situation.' },
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross breathing and resuscitation guidance', 'General airway, breathing and CPR reference.')],
    related: ['march-r', 'march-a', 'airway-positioning', 'oxygen'],
  },
  {
    id: 'oxygen', title: 'Oxygen', category: 'equipment', group: 'Breathing-support equipment', icon: 'equipment', color: 'coral', reference: true,
    intro: 'Oxygen is not automatic for every casualty. Use it under current training or medical direction, with the correct delivery device and target.',
    sections: [{ title: 'Quick-use sequence', bullets: ['Confirm the cylinder and regulator are compatible and undamaged.', 'Secure the cylinder before opening it.', 'Open the valve slowly and check the pressure.', 'Connect the selected delivery device.', 'Set the ordered or trained flow rate.', 'Apply the device and reassess breathing, skin, responsiveness and assigned monitor readings.', 'When finished, close the cylinder, relieve line pressure and return the regulator to zero.'] }, { title: 'Safety', bullets: ['Keep away from flame, heat, oil and grease.', 'Protect the cylinder from falling or impact.', 'Do not let a monitor reading override obvious respiratory distress.'] }],
    notice: { title: 'Confirm the carried system', text: 'The final page should show the actual shipboard cylinder, regulator, masks and authorized targets once those details are confirmed.' },
    related: ['march-r', 'respiratory-rate', 'bvm', 'vital-signs'],
  },
  {
    id: 'equipment-bag-check', title: 'Response-bag check', category: 'equipment', group: 'Team readiness', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A quick readiness check makes sure the bag can support the first minutes of a casualty response and can be handed between team members without surprises.',
    sections: [
      { title: 'Before the response', bullets: ['Check that the bag closes, carries safely and has no obvious damage or contamination.', 'Confirm PPE, bleeding-control supplies, airway equipment, BVM, oxygen equipment, monitoring items and the foil blanket are present as locally assigned.', 'Check packages, seals, expiry dates and sterile items without opening them.', 'Confirm battery-powered items switch on or show the expected ready status.', 'Confirm the oxygen cylinder is secured, the regulator matches it and there is enough pressure for the expected response.', 'Arrange the bag so urgent MARCHE equipment can be found without emptying everything.'] },
      { title: 'Before leaving for the scene', bullets: ['Take the assigned bag and any separately stored equipment requested for the call.', 'Make sure the oxygen cylinder and loose equipment are secured for movement.', 'Confirm the team has the required communication equipment.', 'Tell the team lead immediately if an expected item is missing, damaged or not ready.'] },
      { title: 'After use', bullets: ['Separate used, contaminated, damaged and expired items.', 'Clean reusable equipment under the local cleaning method.', 'Replace opened or used supplies and restore the layout.', 'Recharge or replace batteries as required, secure the oxygen system and report anything that could not be restored.'] },
    ],
    notice: { title: 'Use the local inventory', text: 'This page organizes the readiness check without inventing quantities or storage locations. The confirmed response-bag inventory remains the source for what must be present.' },
    related: ['equipment-overview', 'oxygen', 'bvm', 'monitoring-equipment'],
  },
  {
    id: 'aed', title: 'AED', category: 'equipment', group: 'Automated external defibrillator — cardiac-arrest equipment', icon: 'equipment', color: 'coral', reference: true,
    intro: 'Use an AED as soon as it is available for a casualty in cardiac arrest. Keep CPR interruptions as short as possible and follow the device prompts.',
    steps: ['Recognize cardiac arrest, activate the response and begin CPR under the current resuscitation sequence.', 'Bring the AED to the casualty and turn it on.', 'Expose the chest. Dry it quickly if needed so the pads will stick.', 'Apply the pads to bare skin exactly as shown on the pads or AED package.', 'Connect the pad cable if the model requires it.', 'Make sure nobody is touching the casualty while the AED analyzes.', 'If a shock is advised, clearly tell everyone to stand clear, visually confirm the casualty is clear and deliver the shock as prompted.', 'Resume CPR immediately when prompted. Continue the CPR and AED cycle until the casualty shows signs of life or care is transferred.'],
    sections: [
      { title: 'Before applying pads', bullets: ['Choose the correct adult or pediatric pads and mode for the casualty and current training.', 'Remove medication patches from a pad site using appropriate protection, then wipe the site.', 'Do not place a pad directly over an implanted-device lump; shift the pad enough to avoid it.', 'Keep oxygen equipment away from the chest during shock delivery as taught.'] },
      { title: 'Keep the sequence effective', bullets: ['Continue CPR while the AED is prepared when enough responders are present.', 'Touch the casualty only when the AED says it is safe to do so.', 'Do not delay the shock to obtain a complete set of vital signs.', 'If the casualty begins to move or breathe normally, reassess and continue care.'] },
    ],
    notice: { title: 'Follow the AED in front of you', text: 'Button layout, pad connection, pediatric mode and ready indicators vary. Use the labels and prompts on the actual AED and the current CPR sequence.' },
    resources: [external(HEART_STROKE_AED, 'Heart & Stroke: How to use an AED', 'Canadian AED sequence and public training information.'), external(RED_CROSS_GUIDE, 'Canadian Red Cross CPR and AED guide', 'Current CPR, pad placement and AED sequence.')],
    related: ['march-c', 'monitoring-equipment', 'vital-signs', 'reassessment-handover'],
  },
  {
    id: 'pulse-oximeter', title: 'Portable pulse oximeter', category: 'equipment', group: 'Breathing and circulation monitoring', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A pulse oximeter estimates oxygen saturation and displays a pulse rate. Treat it as one part of the assessment, not a replacement for looking at the casualty.',
    steps: ['Check the casualty’s breathing, colour, responsiveness and pulse before focusing on the display.', 'Choose a clean, warm and still finger that fits the sensor.', 'Remove anything that prevents the sensor from seating correctly when practical.', 'Apply the sensor in the orientation shown on the device.', 'Keep the hand still and wait for the reading to settle or for the device to show an acceptable signal.', 'Compare the displayed pulse with the pulse you assessed. If they do not reasonably match, reposition the sensor and repeat.', 'Record the SpO₂, displayed pulse, time, oxygen treatment and any conditions that could affect the reading.'],
    sections: [
      { title: 'Question the reading when', bullets: ['The casualty is moving, shivering or has cold hands.', 'Perfusion is poor or the pulse is weak.', 'The sensor is loose, poorly positioned or the finger does not fit.', 'Nail products, bright light or contamination interfere with the sensor.', 'The displayed pulse does not match the assessed pulse.', 'The number conflicts with obvious breathing difficulty or deterioration.'] },
      { title: 'Use the trend', bullets: ['Repeat the measurement after positioning, oxygen or assisted ventilation.', 'Report the value with respiratory rate, work of breathing, skin signs and oxygen treatment.', 'Use oxygen targets and escalation thresholds from current direction, not a number invented for this app.'] },
    ],
    notice: { title: 'The casualty comes first', text: 'A normal-looking SpO₂ value does not rule out serious illness or injury. Continue the physical assessment and act on obvious respiratory distress or deterioration.' },
    resources: [external(AHA_FIRST_AID, 'American Heart Association and American Red Cross first-aid guidance', 'Use pulse oximetry with a complete assessment and an understanding of device limitations.')],
    related: ['march-r', 'respiratory-rate', 'oxygen', 'monitoring-equipment'],
  },
  {
    id: 'manual-blood-pressure', title: 'Manual blood pressure', category: 'equipment', group: 'Circulation monitoring', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A manual blood pressure uses a correctly sized cuff, gauge and stethoscope to measure systolic and diastolic pressure.',
    steps: ['Explain the check and position the casualty as the situation allows.', 'Choose the correct cuff size and place it on the bare upper arm with the artery marker aligned as shown on the cuff.', 'Support the arm close to heart level and keep the tubing free of twists.', 'Locate the brachial pulse at the inside of the elbow and place the stethoscope over it.', 'Close the valve, inflate the cuff using the method taught in the current course, then release pressure slowly and steadily.', 'Note the pressure at the first clear repetitive sound as the systolic value.', 'Note the pressure when the sounds disappear as the diastolic value.', 'Fully deflate the cuff, record the result, arm, position and time, and repeat only when needed.'],
    sections: [
      { title: 'Improve the measurement', bullets: ['Use the correct cuff size; a poor fit can distort the result.', 'Keep the casualty and arm as still as possible.', 'Do not place the cuff over thick clothing, an injury or equipment that makes the reading unsafe or unreliable.', 'If a value is unexpected, check the setup and repeat after allowing the arm to recover.'] },
      { title: 'Use the finding', bullets: ['Report blood pressure with pulse, skin, responsiveness, breathing and the overall trend.', 'Do not delay treatment of an immediate MARCHE threat to obtain a blood pressure.', 'The stethoscope is used here for the blood-pressure sounds; lung auscultation is not part of the casualty-clearer breathing check.'] },
    ],
    resources: [external(BLOOD_PRESSURE_GUIDE, 'MedlinePlus: Measuring blood pressure', 'Cuff placement, brachial sounds and systolic/diastolic measurement.')],
    related: ['march-c', 'vital-signs', 'pulse', 'monitoring-equipment'],
  },
  {
    id: 'three-lead-ecg', title: '3-lead ECG setup', category: 'equipment', group: 'Cardiac monitoring setup', icon: 'equipment', color: 'coral', reference: true,
    intro: 'The casualty clearer’s role is to place the leads correctly, obtain a clean trace and report changes. Rhythm interpretation and treatment decisions remain with the appropriately trained clinician.',
    steps: ['Confirm the monitor, 3-lead cable and electrodes are compatible and ready.', 'Expose only the areas needed and prepare clean, dry skin. Clip excess hair only when it prevents electrode contact.', 'Use the labels on the cable—not wire colour alone—to identify RA, LA and LL.', 'Place RA and LA on the upper right and upper left torso as taught, avoiding muscle and bony prominences.', 'Place LL on the lower left torso as taught.', 'Attach the lead wires, select the appropriate monitoring mode and check for a clear trace.', 'If the trace is poor, check skin contact, electrode position, cable connection and casualty movement before replacing equipment.', 'Record the time and report the monitor display and any change to the responsible clinician.'],
    sections: [
      { title: 'Reduce artifact', bullets: ['Keep electrodes on clean, dry, relatively flat skin.', 'Press the full electrode surface into contact.', 'Keep cables supported so they do not pull on the electrodes.', 'Minimize movement and shivering when possible without delaying care.'] },
      { title: 'Keep the role clear', bullets: ['Complete MARCHE and vital signs; the trace does not replace physical assessment.', 'Report symptoms, pulse and casualty appearance with the monitor finding.', 'Use the placement diagram and labels for the actual monitor because cable colour conventions vary.'] },
    ],
    notice: { title: 'Confirm the monitor model', text: 'The final device-specific page should show the actual cable labels, connector, screen controls and approved lead placement for the monitor in use.' },
    related: ['monitoring-equipment', 'vital-signs', 'pulse', 'march-c'],
  },
  {
    id: 'monitoring-equipment', title: 'Monitoring equipment', category: 'equipment', group: 'Sick Bay and scene monitoring', icon: 'equipment', color: 'coral', reference: true,
    intro: 'Use monitoring equipment to add repeatable observations to the physical assessment. Start with the casualty, connect only what is useful and record the trend.',
    quickRoutes: [
      internal('manual-blood-pressure', 'Manual blood pressure', 'Measure systolic and diastolic pressure with a cuff and stethoscope.'),
      internal('pulse-oximeter', 'Portable pulse oximeter', 'Obtain and validate an SpO₂ reading.'),
      internal('three-lead-ecg', '3-lead ECG setup', 'Apply the lead cable and obtain a usable trace.'),
      internal('vital-signs', 'Complete vital-sign set', 'Put the readings together with breathing, pulse, skin and AVPU.'),
    ],
    quickRouteHeading: 'Choose a monitoring card',
    sections: [
      { title: 'Set up without losing priorities', bullets: ['Address immediate MARCHE threats before routine monitoring.', 'Tell the casualty what you are applying when they can respond.', 'Confirm the equipment is clean, powered and shows the expected ready state.', 'Use one team member to continue observation while another sets up equipment when possible.', 'Secure cables and tubing so they do not interfere with treatment or movement.'] },
      { title: 'Make the numbers useful', bullets: ['Check whether each reading fits the casualty’s pulse, breathing, skin and responsiveness.', 'Repeat readings after treatment, movement or a change in condition.', 'Record the time, reading, oxygen or other treatment, and any reason the value may be unreliable.', 'Report the trend and important changes rather than reading a screen without context.'] },
    ],
    notice: { title: 'Know the equipment in use', text: 'Portable and Sick Bay monitors can use different connectors, cables and controls. Device-specific setup should match the actual monitor and approved instructions.' },
    related: ['equipment-overview', 'manual-blood-pressure', 'pulse-oximeter', 'three-lead-ecg'],
  },
  {
    id: 'foil-blanket', title: 'Foil blanket', category: 'equipment', group: 'Heat-loss prevention', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A foil blanket helps reduce further heat loss. It works best as part of a simple package that also protects the casualty from a cold or wet surface and the surrounding environment.',
    steps: ['Address immediate MARCHE threats before wrapping the casualty.', 'Insulate the casualty from the deck or other cold surface.', 'Remove or isolate wet clothing when appropriate and when privacy, safety and time allow.', 'Open the blanket fully and wrap it around the casualty without covering the face or blocking airway observation.', 'Close gaps and protect the casualty from wind, spray and further exposure.', 'Keep dressings, tourniquets, airway equipment and required assessment sites accessible.', 'Reassess breathing, skin, responsiveness and temperature concerns throughout care and movement.'],
    sections: [
      { title: 'Remember', bullets: ['A foil blanket reduces further heat loss; it does not replace active warming when active warming is required.', 'Avoid direct contact between the casualty and very hot objects.', 'Open the wrap enough to reassess and treat, then cover the casualty again promptly.', 'If the casualty is overheated, remove them from the heat, begin the locally taught cooling response and do not wrap them for warmth.'] },
    ],
    related: ['march-h', 'cocoon-warming', 'reassessment-handover', 'equipment-bag-check'],
  },
  {
    id: 'cocoon-warming', title: 'Cocoon warming unit', category: 'equipment', group: 'Active warming — confirmed setup required', icon: 'equipment', color: 'coral', reference: true,
    intro: 'The Cocoon warming unit provides active warming in the appropriate care area. Setup, temperature selection and alarms must match the exact unit and warming blanket in use.',
    sections: [
      { title: 'General setup sequence', bullets: ['Continue MARCHE, remove wet clothing when appropriate, dry the casualty and use insulating blankets as needed.', 'Inspect the warming unit, hose, power connection and compatible warming blanket before use.', 'Position the warming blanket and hose using the diagram for the actual product while keeping the airway and required treatment sites accessible.', 'Turn on the unit and select only the setting taught or directed for the casualty.', 'Confirm warm air is flowing and that the hose is connected to the blanket as designed.', 'Check the casualty’s skin, comfort, vital signs and temperature trend regularly.', 'Respond to alarms by checking the casualty and following the unit instructions; do not bypass the alarm.'] },
      { title: 'Avoid preventable harm', bullets: ['Do not direct an uncovered warming hose onto the casualty.', 'Do not place the blanket or hose where it obstructs the airway, compresses an injury or interferes with monitoring.', 'Watch areas with reduced sensation, poor circulation or pressure risk closely.', 'Stop and report excessive heat, skin changes, worsening condition or equipment malfunction.'] },
    ],
    notice: { title: 'Add the model-specific controls later', text: 'The exact Cocoon model, compatible blankets, approved temperature settings, alarm meanings and cleaning method still need to be confirmed before a button-by-button card is added.' },
    related: ['march-h', 'foil-blanket', 'vital-signs', 'monitoring-equipment'],
  },
  {
    id: 'splinting-equipment', title: 'Splinting equipment', category: 'equipment', group: 'Injury support and movement', icon: 'equipment', color: 'coral', reference: true,
    intro: 'A splint supports an injured limb, reduces movement and helps protect it during care and transport. Use the device and technique included in current training.',
    steps: ['Address immediate MARCHE threats before routine splinting.', 'Expose the injury enough to check it and control bleeding.', 'Check and record distal pulse, skin, sensation and movement before applying the splint when possible.', 'Support the limb in the position found unless the current course directs otherwise for a specific problem.', 'Choose a splint that supports the injury and the joints above and below when practical.', 'Pad gaps and secure the splint without placing pressure directly over the injury.', 'Recheck distal pulse, skin, sensation and movement after securing and after movement.', 'Loosen or correct the splint and report immediately if distal findings worsen.'],
    sections: [
      { title: 'Good splinting practice', bullets: ['Remove rings, watches or other constricting items early when swelling is expected and it can be done safely.', 'Keep dressings and important treatment sites accessible.', 'Do not straighten a limb simply to make it fit a device.', 'Reassess pain, swelling, bleeding and distal findings regularly.'] },
    ],
    notice: { title: 'Confirm the splints carried', text: 'The directory can be expanded with separate cards when the actual rigid, soft, vacuum or traction splints and the casualty-clearer scope for each are confirmed.' },
    related: ['march-e', 'capillary-refill', 'head-to-toe', 'basket-stretcher'],
  },
  {
    id: 'basket-stretcher', title: 'Basket stretcher', category: 'equipment', group: 'Rarely used movement equipment', icon: 'equipment', color: 'coral', reference: true,
    intro: 'The Stokes-style basket stretcher is rarely used by the team, but it is worth recognizing as a rigid casualty-movement option. Use it only with the assigned team, route and handling method.',
    sections: [
      { title: 'Before loading', bullets: ['Confirm the basket, straps, handles and attachment points have no obvious damage.', 'Choose one team leader and agree on the movement commands.', 'Plan the route and identify hazards before lifting.', 'Complete immediate treatment, secure equipment and recheck the casualty before movement.', 'Use the number of handlers and lifting method required for the situation.'] },
      { title: 'Secure and move', bullets: ['Place and pad the casualty using the taught movement method.', 'Secure the casualty with the stretcher straps while keeping the airway and essential treatment accessible.', 'Secure loose monitoring, oxygen and treatment equipment so it cannot fall or pull.', 'Lift, lower and turn only on the team leader’s command.', 'Recheck airway, breathing, bleeding control, distal findings and strap security after loading and after each major movement.'] },
    ],
    notice: { title: 'No generic hauling procedure', text: 'Confined-space, vertical, ladder and hoisting movements need the applicable shipboard procedure, trained personnel and rigging. This card covers recognition and basic coordinated handling only.' },
    related: ['march-e', 'splinting-equipment', 'reassessment-handover', 'equipment-bag-check'],
  },
];

const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));
const searchableText = (topic) => JSON.stringify({ title: topic.title, group: topic.group, intro: topic.intro, path: topic.path, march: topic.march, equipmentGroups: topic.equipmentGroups, quickRoutes: topic.quickRoutes, steps: topic.steps, sections: topic.sections, actions: topic.actions, nextStep: topic.nextStep }).toLowerCase();
topics.forEach((topic) => { topic.searchText = searchableText(topic); });

export const topicById = Object.fromEntries(topics.map((topic) => [topic.id, topic]));
export const glossary = [
  { term: 'AVPU', meaning: 'Alert, responds to Voice, responds to Pain, Unresponsive.' },
  { term: 'BVM', meaning: 'Bag-valve-mask.' },
  { term: 'CCT', meaning: 'Casualty Clearing Team.' },
  { term: 'CSM', meaning: 'Circulation, sensation and movement.' },
  { term: 'MARCHE', meaning: 'Massive hemorrhage, Airway, Respiration, Circulation, Head and hypothermia, Everything else.' },
  { term: 'MIST', meaning: 'Mechanism, Injuries, Signs and symptoms, Treatments.' },
  { term: 'NPA', meaning: 'Nasopharyngeal airway.' },
  { term: 'OLAES', meaning: 'A modular trauma bandage with a pressure cup, gauze and elastic wrap.' },
  { term: 'OPA', meaning: 'Oropharyngeal airway.' },
  { term: 'PPE', meaning: 'Personal protective equipment.' },
];

export const getCategory = (id) => categoryById[id];

export function searchTopics(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return topics
    .map((topic) => ({ ...topic, score: words.reduce((score, word) => score + (topic.title.toLowerCase().includes(word) ? 8 : topic.searchText.includes(word) ? 2 : -10), 0) }))
    .filter((topic) => topic.score >= words.length * 2)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 16);
}

export function topicsForCategory(categoryId) {
  return topics.filter((topic) => topic.category === categoryId);
}
