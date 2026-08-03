export type DisabilityType =
  | 'visual'
  | 'hearing'
  | 'speech'
  | 'cognitive'
  | 'custom';

export type PreferredLanguage =
  | 'English'
  | 'Spanish'
  | 'Hindi'
  | 'French'
  | 'German'
  | 'Sign Gloss';

export type VoiceTextPreference = 'voice' | 'text' | 'both';

export type ScreenId =
  | 'splash'
  | 'login'
  | 'onboarding'
  | 'dashboard'
  | 'vocabulary'
  | 'speech-coach'
  | 'simulator'
  | 'social-stories'
  | 'sign-bot'
  | 'progress'
  | 'achievements'
  | 'accessibility'
  | 'trainer'
  | 'institution'
  | 'pricing'
  | 'security-vault';

export interface AccessibilityConfig {
  disabilityType: DisabilityType;
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  dyslexicFont: boolean;
  speechPace: 'normal' | 'slow' | 'very_slow';
  screenReaderMode: boolean;
  voiceNavigationActive: boolean;
  liveCaptions: boolean;
  simpleLanguage: boolean;
  textOnlyMode: boolean;
  voiceTextPreference: VoiceTextPreference;
  preferredLanguage: PreferredLanguage;
}

export interface VocabularyWord {
  id: string;
  word: string;
  category: 'Interview' | 'Office' | 'Team Meeting' | 'HR' | 'Emails' | 'Professional Behaviour' | 'Client Interaction';
  meaning: string;
  workplaceContext: string;
  signLanguageGloss: string;
  dyslexiaBreakdown: string;
  exampleConversation: { speaker: string; line: string }[];
  audioText: string;
  quickTemplates: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SpeechAnalysisResult {
  clarityScore: number;
  confidenceScore: number;
  fluencyScore: number;
  professionalismScore: number;
  overallScore: number;
  summaryFeedback: string;
  strengths: string[];
  areasForGrowth: string[];
  actionableSuggestions: string[];
  suggestedAlternativePhrase: string;
  adaptedForDisabilityNotice: string;
  date: string;
}

export type SimulationRole = 'HR Manager' | 'Boss' | 'Team Leader' | 'Client' | 'Coworker';

export type SimulationScenario =
  | 'Job Interview'
  | 'Request Leave'
  | 'Asking Deadline Extension'
  | 'Presenting Idea'
  | 'Meeting Discussion'
  | 'Conflict Resolution'
  | 'Request Workplace Accommodation';

export interface SimulationMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  score?: number;
  betterAlternative?: string;
}

export interface SimulationSession {
  id: string;
  role: SimulationRole;
  scenario: SimulationScenario;
  messages: SimulationMessage[];
  completed: boolean;
  overallScore?: number;
  suggestions?: string[];
}

export interface VideoScene {
  id: string;
  sceneNumber: number;
  title: string;
  type: 'situation' | 'behavior' | 'action_step' | 'dialogue' | 'takeaway';
  speaker?: string;
  avatarType?: 'user' | 'colleague' | 'manager' | 'narrator';
  voiceoverText: string;
  captionText: string;
  visualTheme?: 'indigo' | 'emerald' | 'amber' | 'teal' | 'purple';
  visualDescription?: string;
  illustrationType?: 'meeting' | 'desk' | 'feedback' | 'question' | 'applause' | 'breakroom' | 'presentation' | 'custom';
}

export interface SocialStory {
  id: string;
  title: string;
  category: string;
  situation: string;
  expectedBehaviour: string;
  stepByStepGuide: string[];
  exampleConversation: { speaker: string; dialogue: string }[];
  keyLearning: string;
  sensoryAndCommunicationTips: string[];
  videoScenes?: VideoScene[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'Milestone' | 'Skill' | 'Consistency';
}

export interface UserProgress {
  communicationScore: number;
  interviewScore: number;
  lessonsCompleted: number;
  currentStreakDays: number;
  totalPracticeMinutes: number;
  weeklyProgress: { day: string; score: number; lessons: number }[];
  weakAreas: string[];
  aiRecommendations: string[];
}

export interface StudentRecord {
  id: string;
  name: string;
  disability: DisabilityType;
  avatar: string;
  lessonsCompleted: number;
  communicationScore: number;
  interviewReadiness: number;
  lastActive: string;
  weakArea: string;
  assignedTasksCount: number;
}

export interface InstitutionAnalytics {
  totalLearners: number;
  activeThisWeek: number;
  completionRate: number;
  avgCommunicationScore: number;
  interviewReadinessPercentage: number;
  departmentBreakdown: { department: string; learners: number; avgScore: number }[];
  disabilityDistribution: { type: string; count: number }[];
}

export interface SecurityAuditLog {
  id: string;
  action: string;
  timestamp: string;
  ip: string;
  encryptedWith: string;
  status: 'SUCCESS' | 'ENCRYPTED';
}

export interface SignRecognitionAnalysis {
  detectedSigns: string[];
  confidenceScore: number;
  translatedText: string;
  aiResponseText: string;
  aiSignGlossResponse: string;
  handShapeGuide: string;
  suggestedQuickSigns: string[];
  isPracticeMatch?: boolean;
}

export interface SignBotMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  signGloss?: string;
  snapshotUrl?: string;
  detectedSigns?: string[];
  confidenceScore?: number;
  timestamp: string;
  handShapeGuide?: string;
}

export interface SignDictionaryPracticeItem {
  id: string;
  term: string;
  category: string;
  gloss: string;
  description: string;
  handShapeTips: string;
  emojiIcon: string;
}

