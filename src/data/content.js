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
    actions: [internal('respiratory-rate', 'Measure respiratory rate', 'How to count and describe breathing.'), internal('oxygen', 'Oxygen', 'Setup, use limits and reassessment.'), internal('bvm', 'Bag-valve-mask', 'Two-person technique points and effectiveness checks.'), internal('chest-seal', 'Chest seal', 'Open-chest-wound recognition and trained-use boundaries.')],
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
    actionHeading: 'Circulation assessment cards',
    actions: [internal('pulse', 'Check a pulse', 'Radial and carotid locations, counting and quality.'), internal('capillary-refill', 'Check capillary refill', 'A locally taught check, including after splinting.'), internal('skin-signs', 'Check skin signs', 'Colour, temperature, moisture and change.'), internal('vital-signs', 'Vital-sign set', 'Put the findings together and record the trend.')],
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
    actionHeading: 'Reassessment cards',
    actions: [internal('avpu', 'Repeat AVPU', 'Describe changes in responsiveness clearly.'), internal('vital-signs', 'Repeat vital signs', 'Look for change, not a single isolated number.'), internal('reassessment-handover', 'Reassess and hand over', 'Confirm treatments and report deterioration.')],
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
    actions: [internal('secondary-survey', 'Secondary survey', 'History, head-to-toe check and additional findings.'), internal('vital-signs', 'Vital signs', 'Measure and describe the casualty’s current condition.'), internal('reassessment-handover', 'Reassessment and handover', 'Trend changes and organize the report.')],
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
    actions: [internal('respiratory-rate', 'Respiratory rate & quality', 'Count and describe breathing.'), internal('pulse', 'Pulse rate & quality', 'Find, count and describe a pulse.'), internal('skin-signs', 'Skin signs', 'Assess colour, temperature and moisture.'), internal('avpu', 'AVPU', 'Describe responsiveness consistently.')],
    resources: [external(VITAL_SIGNS, 'MedlinePlus: Vital signs', 'Reviewed January 2025; general healthy-adult resting ranges.'), external(RED_CROSS_GUIDE, 'Canadian Red Cross assessment guidance', 'Responsiveness, breathing, skin and ongoing care.')],
    related: ['respiratory-rate', 'pulse', 'skin-signs', 'avpu'],
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
    intro: 'Begin after immediate life threats have been identified and managed. Continue to watch for deterioration while gathering more information.',
    sections: [
      { title: 'History', bullets: ['Signs and symptoms', 'Allergies', 'Medications', 'Past medical history', 'Last oral intake', 'Events leading to the incident'] },
      { title: 'Head-to-toe check', bullets: ['Systematically check the head and neck, chest, abdomen, pelvis, limbs and back as appropriate.', 'Look and feel for wounds, bleeding, tenderness, deformity, swelling and abnormal movement.', 'Ask about pain and other symptoms when the casualty can respond.'] },
      { title: 'Complete the picture', bullets: ['Take and record vital signs.', 'Recheck every treatment and splint.', 'Prepare findings for MIST and handover.'] },
    ],
    resources: [external(RED_CROSS_GUIDE, 'Canadian Red Cross secondary assessment', 'SAMPLE history, vital signs and injury check.')],
    related: ['march-e', 'vital-signs', 'reassessment-handover'],
  },
  {
    id: 'reassessment-handover', title: 'Reassessment & handover', category: 'assessment', group: 'Ongoing care', icon: 'communications', color: 'mint', reference: true,
    intro: 'Repeat the assessment, confirm that treatments still work and communicate changes clearly.',
    sections: [
      { title: 'Reassess', bullets: ['Repeat MARCHE whenever the condition changes.', 'Recheck bleeding control, airway position and breathing support.', 'Repeat AVPU, respirations, pulse, skin and assigned observations.', 'Check dressings, tourniquets, splints and movement equipment.', 'Record the time and direction of change.'] },
      { title: 'Prepare the handover', bullets: ['Mechanism or medical complaint', 'Injuries and important findings', 'Signs: AVPU, respirations, pulse, skin and other recorded observations', 'Treatments, devices and application times', 'Response to treatment and any deterioration'] },
    ],
    related: ['marche', 'vital-signs', 'secondary-survey'],
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
];

const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));
const searchableText = (topic) => JSON.stringify({ title: topic.title, group: topic.group, intro: topic.intro, path: topic.path, march: topic.march, quickRoutes: topic.quickRoutes, steps: topic.steps, sections: topic.sections, actions: topic.actions, nextStep: topic.nextStep }).toLowerCase();
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
