import { VocabularyWord } from '../types';

export const VOCABULARY_LIST: VocabularyWord[] = [
  {
    id: 'vocab-1',
    word: 'Deliverable',
    category: 'Office',
    meaning: 'A tangible product or completed result required by a deadline.',
    workplaceContext: 'Used in status updates and project planning to specify output.',
    signLanguageGloss: 'WORK - FINISH - GIVE - MANAGER',
    dyslexiaBreakdown: 'DE - LIV - ER - A - BLE',
    exampleConversation: [
      { speaker: 'Manager', line: 'Is the design deliverable ready for client review?' },
      { speaker: 'Employee', line: 'Yes, the deliverable has been uploaded to the shared portal.' }
    ],
    audioText: 'Deliverable. A tangible product or completed result required by a deadline.',
    quickTemplates: ['The deliverable is on schedule for 3 PM.', 'Could you confirm the requirements for this deliverable?'],
    difficulty: 'Intermediate',
  },
  {
    id: 'vocab-2',
    word: 'Accommodation',
    category: 'HR',
    meaning: 'An adjustment or tool provided at work so employees with disabilities can perform effectively.',
    workplaceContext: 'Discussed with HR to request tools like screen readers, flexible hours, or ergonomic desks.',
    signLanguageGloss: 'HELP - SPECIAL - WORK - AGREE',
    dyslexiaBreakdown: 'AC - COM - MO - DA - TION',
    exampleConversation: [
      { speaker: 'HR Manager', line: 'We want to ensure your workspace supports you fully.' },
      { speaker: 'Employee', line: 'Thank you. I would like to request an ergonomic keyboard as a workplace accommodation.' }
    ],
    audioText: 'Accommodation. An adjustment or tool provided at work to support disability access.',
    quickTemplates: ['I would like to submit a formal accommodation request.', 'This screen reader accommodation helps me review documents twice as fast.'],
    difficulty: 'Beginner',
  },
  {
    id: 'vocab-3',
    word: 'Action Item',
    category: 'Team Meeting',
    meaning: 'A specific task assigned to an individual following a discussion.',
    workplaceContext: 'Recorded in meeting notes to assign clear responsibility.',
    signLanguageGloss: 'DO - TASK - NAME - DUE',
    dyslexiaBreakdown: 'AC - TION - I - TEM',
    exampleConversation: [
      { speaker: 'Team Lead', line: 'Let us review today\'s action items before ending.' },
      { speaker: 'Employee', line: 'My action item is to email the preliminary report by Thursday.' }
    ],
    audioText: 'Action Item. A specific task assigned to an individual following a discussion.',
    quickTemplates: ['I have logged my action item and will complete it by tomorrow.', 'Could you repeat who owns that action item?'],
    difficulty: 'Beginner',
  },
  {
    id: 'vocab-4',
    word: 'Circulate',
    category: 'Emails',
    meaning: 'To send a document or memo out to all team members.',
    workplaceContext: 'Commonly written in emails when distributing meeting notes or policies.',
    signLanguageGloss: 'SEND - ALL - PEOPLE - READ',
    dyslexiaBreakdown: 'CIR - CU - LATE',
    exampleConversation: [
      { speaker: 'Colleague', line: 'Should I circulate the agenda now?' },
      { speaker: 'Employee', line: 'Yes, please circulate the draft to the team before noon.' }
    ],
    audioText: 'Circulate. To send a document out to all team members.',
    quickTemplates: ['I will circulate the minutes shortly.', 'Please circulate this update to stakeholders.'],
    difficulty: 'Intermediate',
  },
  {
    id: 'vocab-5',
    word: 'Alignment',
    category: 'Team Meeting',
    meaning: 'Agreement across team members on goals or priorities.',
    workplaceContext: 'Used to confirm everyone understands expectations before starting work.',
    signLanguageGloss: 'SAME - THINK - TOGETHER - AGREE',
    dyslexiaBreakdown: 'A - LIGN - MENT',
    exampleConversation: [
      { speaker: 'Supervisor', line: 'Do we have alignment on the project timeline?' },
      { speaker: 'Employee', line: 'Yes, we are in full alignment on the milestone dates.' }
    ],
    audioText: 'Alignment. Agreement across team members on goals or priorities.',
    quickTemplates: ['I want to ensure alignment before proceeding.', 'Our team alignment meeting is at 2 PM.'],
    difficulty: 'Intermediate',
  },
  {
    id: 'vocab-6',
    word: 'Bandwidth',
    category: 'Office',
    meaning: 'Mental energy or time available to take on new work tasks.',
    workplaceContext: 'Used politely to state whether you have capacity for extra work.',
    signLanguageGloss: 'TIME - BRAIN - FREE - WORK',
    dyslexiaBreakdown: 'BAND - WIDTH',
    exampleConversation: [
      { speaker: 'Project Coordinator', line: 'Can you take on the weekly audit task?' },
      { speaker: 'Employee', line: 'I do not have the bandwidth this week, but I can assist next Monday.' }
    ],
    audioText: 'Bandwidth. Mental energy or time available to take on new work tasks.',
    quickTemplates: ['I currently have bandwidth for one additional project.', 'Let me check my bandwidth and confirm by end of day.'],
    difficulty: 'Intermediate',
  },
  {
    id: 'vocab-7',
    word: 'Elevator Pitch',
    category: 'Interview',
    meaning: 'A concise 30-to-60 second introduction of your skills and background.',
    workplaceContext: 'Essential during job interviews and networking events.',
    signLanguageGloss: 'SHORT - TALK - SELF - GOOD',
    dyslexiaBreakdown: 'EL - E - VA - TOR - PITCH',
    exampleConversation: [
      { speaker: 'Interviewer', line: 'Tell me about yourself in a few sentences.' },
      { speaker: 'Candidate', line: 'I am a detail-oriented analyst skilled in data management and inclusive communication.' }
    ],
    audioText: 'Elevator Pitch. A concise introduction of your skills and background.',
    quickTemplates: ['Here is my brief professional background.', 'My key strengths center on analytical research and team collaboration.'],
    difficulty: 'Beginner',
  },
  {
    id: 'vocab-8',
    word: 'De-escalate',
    category: 'Professional Behaviour',
    meaning: 'To reduce tension or anger in a stressful situation or conflict.',
    workplaceContext: 'Used when handling customer complaints or team disagreements calmly.',
    signLanguageGloss: 'CALM - DOWN - TALK - SLOW',
    dyslexiaBreakdown: 'DE - ES - CA - LATE',
    exampleConversation: [
      { speaker: 'Coworker', line: 'The client seems frustrated about the delay.' },
      { speaker: 'Employee', line: 'I will call them, listen attentively, and de-escalate the situation with clear options.' }
    ],
    audioText: 'De-escalate. To reduce tension or anger in a stressful situation.',
    quickTemplates: ['I remained calm to de-escalate the conversation.', 'Let us pause for 5 minutes to de-escalate.'],
    difficulty: 'Advanced',
  },
  {
    id: 'vocab-9',
    word: 'Scope Creep',
    category: 'Client Interaction',
    meaning: 'Uncontrolled growth in project requirements without extra time or budget.',
    workplaceContext: 'Important when setting boundaries with clients or management.',
    signLanguageGloss: 'WORK - GROW - TOO - MUCH - NO - TIME',
    dyslexiaBreakdown: 'SCOPE - CREEP',
    exampleConversation: [
      { speaker: 'Client', line: 'Can we add five more features before launch?' },
      { speaker: 'Employee', line: 'To prevent scope creep, we can schedule those features for Phase 2.' }
    ],
    audioText: 'Scope Creep. Uncontrolled growth in project requirements without extra budget.',
    quickTemplates: ['We need to review the original contract to avoid scope creep.', 'That request represents scope creep.'],
    difficulty: 'Advanced',
  },
  {
    id: 'vocab-10',
    word: 'Touch Base',
    category: 'Emails',
    meaning: 'To briefly check in with someone regarding progress or news.',
    workplaceContext: 'A friendly business phrase used in email subject lines and quick chats.',
    signLanguageGloss: 'TALK - QUICK - CHECK - HOW',
    dyslexiaBreakdown: 'TOUCH - BASE',
    exampleConversation: [
      { speaker: 'Manager', line: 'Let us touch base tomorrow morning.' },
      { speaker: 'Employee', line: 'Sounds good. I will share the draft right before we touch base.' }
    ],
    audioText: 'Touch Base. To briefly check in with someone regarding progress.',
    quickTemplates: ['Just wanted to touch base regarding the report.', 'Can we touch base for 5 minutes after lunch?'],
    difficulty: 'Beginner',
  },
  {
    id: 'vocab-11',
    word: 'Stakeholder',
    category: 'Office',
    meaning: 'An individual or group affected by or interested in a project\'s outcome.',
    workplaceContext: 'Refers to executives, team leads, clients, or department heads.',
    signLanguageGloss: 'IMPORTANT - PEOPLE - INVOLVED',
    dyslexiaBreakdown: 'STAKE - HOLD - ER',
    exampleConversation: [
      { speaker: 'Project Lead', line: 'We must present these findings to key stakeholders.' },
      { speaker: 'Employee', line: 'I have compiled the presentation for tomorrow\'s stakeholder meeting.' }
    ],
    audioText: 'Stakeholder. An individual or group affected by a project outcome.',
    quickTemplates: ['Stakeholder feedback has been incorporated.', 'We will notify all stakeholders by Friday.'],
    difficulty: 'Intermediate',
  },
  {
    id: 'vocab-12',
    word: 'KPI (Key Performance Indicator)',
    category: 'Office',
    meaning: 'A measurable goal used to evaluate success.',
    workplaceContext: 'Discussed during performance reviews and quarterly planning.',
    signLanguageGloss: 'GOAL - MEASURE - SUCCESS - SCORE',
    dyslexiaBreakdown: 'K - P - I',
    exampleConversation: [
      { speaker: 'HR Manager', line: 'What is your primary KPI for this quarter?' },
      { speaker: 'Employee', line: 'My main KPI is maintaining a 95% accessibility audit score on all documents.' }
    ],
    audioText: 'Key Performance Indicator. A measurable goal used to evaluate success.',
    quickTemplates: ['My quarterly KPI targets are on track.', 'How is this project KPI calculated?'],
    difficulty: 'Intermediate',
  },
];
