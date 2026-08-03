import { SocialStory } from '../types';

export const SOCIAL_STORIES_LIST: SocialStory[] = [
  {
    id: 'story-1',
    title: 'What to do when someone interrupts me in a meeting',
    category: 'Meeting Etiquette',
    situation: 'During a live video conference or in-person staff meeting, another colleague starts speaking while I am in the middle of expressing my thoughts.',
    expectedBehaviour: 'People interrupt for many reasons—excitement, fear of forgetting a point, or fast-paced meeting dynamics. It is usually not a personal attack. I can remain calm and use a polite bridging statement.',
    stepByStepGuide: [
      'Pause immediately and take a slow breath to regulate sensory arousal.',
      'Allow the colleague 5 to 10 seconds to finish their sentence without frowning.',
      'Gently raise your hand or use the meeting app raise-hand button.',
      'Say calmly: "Thanks Sam, to wrap up my quick point before we switch topics..."',
      'Finish your 1-2 key sentences cleanly.'
    ],
    exampleConversation: [
      { speaker: 'You', dialogue: 'I analyzed the accessibility reports for May and noticed...' },
      { speaker: 'Colleague', dialogue: 'Oh! Did you also check the June server deployment logs?' },
      { speaker: 'You', dialogue: 'Great question. Let me finish the May summary in 30 seconds, and then we will dive into June.' },
      { speaker: 'Colleague', dialogue: 'Sounds great, go ahead!' }
    ],
    keyLearning: 'You do not have to raise your voice to hold your floor. A calm, polite pause maintains complete professional authority.',
    sensoryAndCommunicationTips: [
      'Keep a physical card on your desk with the phrase: "To complete my thought..."',
      'Use the chat box as an alternative turn-taking tool if speech is difficult.'
    ]
  },
  {
    id: 'story-2',
    title: 'Managing sensory overload at your desk',
    category: 'Self-Advocacy & Health',
    situation: 'The open office becomes too noisy with multiple conversations, overhead lights flicker, or multiple chat notifications flood your screen at once.',
    expectedBehaviour: 'It is expected and healthy for employees to use noise-canceling headphones, adjust lighting, or step away to a quiet space for 5 minutes.',
    stepByStepGuide: [
      'Recognize early bodily warning signs: tight shoulders, racing heart, or trouble reading.',
      'Put on noise-canceling headphones or screen tint glasses.',
      'Send a quick 1-sentence Slack/Teams status update: "Focus block until 2 PM."',
      'Step to a quiet break room, sensory pod, or outside for fresh air.',
      'Drink water before returning.'
    ],
    exampleConversation: [
      { speaker: 'Colleague', dialogue: 'Hey Alex, do you have a minute to chat right now?' },
      { speaker: 'You', dialogue: 'Hi! I am currently in a focus block. Can we touch base at 2:30 PM via email or quick call?' },
      { speaker: 'Colleague', dialogue: 'No problem at all! Talk to you at 2:30.' }
    ],
    keyLearning: 'Protecting your focus environment is respected by colleagues when communicated clearly with an alternative time.',
    sensoryAndCommunicationTips: [
      'Set an automated Teams/Slack status indicator icon (e.g., 🎧 Focus Mode).',
      'Keep fidget tools or textured grounding objects near your keyboard.'
    ]
  },
  {
    id: 'story-3',
    title: 'Receiving constructive feedback from a supervisor',
    category: 'Professional Behaviour',
    situation: 'Your supervisor reviews a draft you created and suggests making 3 major revisions or points out errors.',
    expectedBehaviour: 'Constructive feedback is a normal tool for professional growth, not a statement about your personal worth. Supervisors expect questions and gratitude for clear guidance.',
    stepByStepGuide: [
      'Listen fully without making excuses or interrupting.',
      'Take written or digital notes of the specific changes requested.',
      'Nod and confirm understanding: "Thank you for the guidance. I will adjust items 1 and 2 by 4 PM."',
      'Ask clarifying questions if instructions feel vague.',
      'Send a revised draft when ready.'
    ],
    exampleConversation: [
      { speaker: 'Supervisor', dialogue: 'The presentation slides look good, but section 3 needs simpler language and higher contrast charts.' },
      { speaker: 'You', dialogue: 'Thank you for pointing that out. I will simplify section 3 text and update chart contrast right away.' },
      { speaker: 'Supervisor', dialogue: 'Appreciate it, Alex!' }
    ],
    keyLearning: 'Saying "Thank you, I will make those updates" reduces anxiety and marks you as an eager, adaptable team member.',
    sensoryAndCommunicationTips: [
      'If feeling overwhelmed during feedback, ask: "May I review these notes and follow up in 15 minutes?"',
      'Convert written feedback into a clear checklist.'
    ]
  },
  {
    id: 'story-4',
    title: 'Asking for help when a instruction is unclear',
    category: 'Task Management',
    situation: 'A task assigned to you in a email or ticket uses unfamiliar technical jargon or ambiguous deadlines.',
    expectedBehaviour: 'Asking for clarification saves time and prevents mistakes. Managers prefer employees who ask clear questions early rather than staying silent and guessing.',
    stepByStepGuide: [
      'Identify the exact part that is unclear (e.g., deadline, format, or software to use).',
      'Draft a polite 2-line message.',
      'State what you DO understand first.',
      'Ask your specific question.'
    ],
    exampleConversation: [
      { speaker: 'You', dialogue: 'Hi Morgan, I have started working on the compliance document. To ensure accuracy, should this be submitted in PDF or Word format?' },
      { speaker: 'Supervisor', dialogue: 'Please submit in Word format so the compliance team can add annotations. Thanks for checking!' }
    ],
    keyLearning: 'Stating what you understand first shows initiative before asking your clarifying question.',
    sensoryAndCommunicationTips: [
      'Use a template email format saved in your notes.',
      'Break complex multi-part tasks into bulleted lists.'
    ]
  }
];
