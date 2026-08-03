import { SimulationRole, SimulationScenario } from '../types';

export interface SimulationScenarioMeta {
  id: string;
  scenario: SimulationScenario;
  defaultRole: SimulationRole;
  title: string;
  description: string;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  initialPrompt: string;
  learningGoal: string;
}

export const SIMULATION_SCENARIOS: SimulationScenarioMeta[] = [
  {
    id: 'sim-1',
    scenario: 'Job Interview',
    defaultRole: 'HR Manager',
    title: 'Workplace Job Interview',
    description: 'Practice responding to common behavioral and technical interview questions with supportive AI HR feedback.',
    iconName: 'UserCheck',
    difficulty: 'Beginner',
    initialPrompt: 'Welcome to your interview at TechBridge Solutions! To kick things off, please introduce yourself and tell me why you are interested in this position.',
    learningGoal: 'Structure clear self-introductions, highlight adaptive strengths, and express confidence.',
  },
  {
    id: 'sim-2',
    scenario: 'Request Workplace Accommodation',
    defaultRole: 'HR Manager',
    title: 'Request Workplace Accommodation',
    description: 'Learn how to professionally articulate your accessibility requirements (screen reader, quiet room, sign interpreter, flexible hours).',
    iconName: 'ShieldCheck',
    difficulty: 'Intermediate',
    initialPrompt: 'Hi Alex, thanks for stopping by HR. How can we help tailor your workspace equipment or schedule to ensure you have everything you need?',
    learningGoal: 'Clearly state accessibility needs using formal workplace language without hesitation.',
  },
  {
    id: 'sim-3',
    scenario: 'Asking Deadline Extension',
    defaultRole: 'Boss',
    title: 'Asking Deadline Extension',
    description: 'Practice proactively communicating project delays before a deadline passes.',
    iconName: 'Clock',
    difficulty: 'Intermediate',
    initialPrompt: 'Hey Alex, I wanted to check on the progress for the quarterly report due tomorrow at 5 PM. How is it coming along?',
    learningGoal: 'Communicate progress, explain bottlenecks objectively, and offer a firm revised completion date.',
  },
  {
    id: 'sim-4',
    scenario: 'Request Leave',
    defaultRole: 'Boss',
    title: 'Requesting Time Off / Leave',
    description: 'Navigate asking for medical, rehabilitation, or personal leave with proper notice and task coverage.',
    iconName: 'Calendar',
    difficulty: 'Beginner',
    initialPrompt: 'Good morning! You mentioned in your message that you needed to discuss upcoming schedule dates. What dates were you thinking?',
    learningGoal: 'State leave dates clearly, confirm work coverage plan, and maintain professional confidence.',
  },
  {
    id: 'sim-5',
    scenario: 'Presenting Idea',
    defaultRole: 'Team Leader',
    title: 'Presenting an Idea in a Meeting',
    description: 'Pitch an improvement or solution during a team meeting and handle follow-up questions from peers.',
    iconName: 'Lightbulb',
    difficulty: 'Intermediate',
    initialPrompt: 'Thanks everyone for joining. Alex, you mentioned you had a proposal regarding our accessibility testing workflow. We are all ears!',
    learningGoal: 'Use concise structure (Problem -> Proposed Solution -> Benefit) and handle feedback calmly.',
  },
  {
    id: 'sim-6',
    scenario: 'Conflict Resolution',
    defaultRole: 'Coworker',
    title: 'Resolving Workplace Miscommunication',
    description: 'De-escalate a disagreement with a team member over overlapping responsibilities or communication styles.',
    iconName: 'MessageSquare',
    difficulty: 'Advanced',
    initialPrompt: 'Hey Alex, I noticed you updated the client slide deck without tagging me first. I had already worked on those slides yesterday.',
    learningGoal: 'Acknowledge colleague perspective, de-escalate emotional tone, and establish mutual guidelines.',
  },
];
