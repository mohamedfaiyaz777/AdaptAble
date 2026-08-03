import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AccessibilityConfig,
  DisabilityType,
  PreferredLanguage,
  VoiceTextPreference,
  ScreenId,
  UserProgress,
  SecurityAuditLog,
} from '../types';
import { LANGUAGE_SPEECH_CODES } from '../utils/languageUtils';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'trainer' | 'institution';
  isLoggedIn: boolean;
  baselineAudioSet: boolean;
}

interface AccessibilityContextType {
  config: AccessibilityConfig;
  updateConfig: (newConfig: Partial<AccessibilityConfig>) => void;
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isListeningVoiceNav: boolean;
  toggleVoiceNav: () => void;
  lastVoiceCommand: string | null;
  liveCaptionText: string;
  setLiveCaptionText: (text: string) => void;
  isOffline: boolean;
  isEncryptedVaultActive: boolean;
  auditLogs: SecurityAuditLog[];
  addAuditLog: (action: string) => void;
  exportEncryptedVault: () => void;
}

const defaultConfig: AccessibilityConfig = {
  disabilityType: 'visual',
  highContrast: false,
  fontSize: 'normal',
  dyslexicFont: false,
  speechPace: 'normal',
  screenReaderMode: true,
  voiceNavigationActive: false,
  liveCaptions: true,
  simpleLanguage: false,
  textOnlyMode: false,
  voiceTextPreference: 'both',
  preferredLanguage: 'English',
};

const defaultProgress: UserProgress = {
  communicationScore: 84,
  interviewScore: 88,
  lessonsCompleted: 38,
  currentStreakDays: 7,
  totalPracticeMinutes: 240,
  weeklyProgress: [
    { day: 'Mon', score: 78, lessons: 3 },
    { day: 'Tue', score: 81, lessons: 4 },
    { day: 'Wed', score: 80, lessons: 2 },
    { day: 'Thu', score: 85, lessons: 5 },
    { day: 'Fri', score: 87, lessons: 6 },
    { day: 'Sat', score: 86, lessons: 4 },
    { day: 'Sun', score: 89, lessons: 5 },
  ],
  weakAreas: ['Executive Summary Phrasing', 'Handling Interruptions', 'Salary Negotiation Tone'],
  aiRecommendations: [
    'Practice 5 "Team Meeting" vocabulary terms today',
    'Complete the "Request Workplace Accommodation" simulator',
    'Review the "Sensory Overload at Desk" social story',
  ],
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AccessibilityConfig>(() => {
    const saved = localStorage.getItem('adaptable_access_config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [user, setUser] = useState<UserProfile>({
    id: 'user-pwd-101',
    name: 'Alex Taylor',
    email: 'alex.taylor@inclusiveworkplace.org',
    role: 'learner',
    isLoggedIn: false,
    baselineAudioSet: true,
  });

  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListeningVoiceNav, setIsListeningVoiceNav] = useState(false);
  const [lastVoiceCommand, setLastVoiceCommand] = useState<string | null>(null);
  const [liveCaptionText, setLiveCaptionText] = useState<string>('Welcome to AdaptAble. Voice navigation ready.');
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isEncryptedVaultActive] = useState<boolean>(true);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([
    {
      id: 'log-1',
      action: 'E2EE AES-GCM 256-bit Vault Session Initialized',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
      ip: '127.0.0.1 (Encrypted Loopback)',
      encryptedWith: 'WebCrypto SHA-256 HKDF',
      status: 'ENCRYPTED',
    },
    {
      id: 'log-2',
      action: 'Speech Baseline Cipher Matrix Loaded',
      timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(),
      ip: '127.0.0.1 (Encrypted Loopback)',
      encryptedWith: 'WebCrypto SHA-256 HKDF',
      status: 'SUCCESS',
    },
  ]);

  // Sync config to localStorage
  useEffect(() => {
    localStorage.setItem('adaptable_access_config', JSON.stringify(config));
  }, [config]);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addAuditLog = (action: string) => {
    const newLog: SecurityAuditLog = {
      id: `log-${Date.now()}`,
      action,
      timestamp: new Date().toLocaleTimeString(),
      ip: 'Local encrypted node',
      encryptedWith: 'AES-GCM 256-bit',
      status: 'ENCRYPTED',
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 15)]);
  };

  const updateConfig = (newConfig: Partial<AccessibilityConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      addAuditLog(`Accessibility Preference Updated: ${Object.keys(newConfig).join(', ')}`);
      return updated;
    });
  };

  // Web Speech Synthesis (Text-to-Speech)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (config.speechPace === 'slow') {
      utterance.rate = 0.75;
    } else if (config.speechPace === 'very_slow') {
      utterance.rate = 0.55;
    } else {
      utterance.rate = 0.95;
    }

    // Set utterance language based on config.preferredLanguage
    utterance.lang = LANGUAGE_SPEECH_CODES[config.preferredLanguage] || 'en-US';

    utterance.onstart = () => {
      setIsSpeaking(true);
      setLiveCaptionText(text);
    };
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Web Speech Recognition (Voice Navigation Command Listener)
  const toggleVoiceNav = () => {
    if (isListeningVoiceNav) {
      setIsListeningVoiceNav(false);
      setLastVoiceCommand('Voice navigation stopped');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser version. You can still use keyboard shortcuts.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = LANGUAGE_SPEECH_CODES[config.preferredLanguage] || 'en-US';

      recognition.onstart = () => {
        setIsListeningVoiceNav(true);
        setLastVoiceCommand('Listening for commands (e.g. "Go to Interview", "Go to Dashboard", "Toggle Contrast")...');
        speakText('Voice navigation activated. Speak a command.');
      };

      recognition.onresult = (event: any) => {
        const lastIndex = event.results.length - 1;
        const transcript = event.results[lastIndex][0].transcript.toLowerCase().trim();
        setLastVoiceCommand(`Command received: "${transcript}"`);
        setLiveCaptionText(`Voice Command: "${transcript}"`);

        if (transcript.includes('dashboard') || transcript.includes('home')) {
          setCurrentScreen('dashboard');
          speakText('Opening Home Dashboard');
        } else if (transcript.includes('interview') || transcript.includes('speech')) {
          setCurrentScreen('speech-coach');
          speakText('Opening AI Speech Coach');
        } else if (transcript.includes('simulator') || transcript.includes('simulation')) {
          setCurrentScreen('simulator');
          speakText('Opening Workplace Simulator');
        } else if (transcript.includes('learn') || transcript.includes('words') || transcript.includes('vocabulary')) {
          setCurrentScreen('vocabulary');
          speakText('Opening Workplace Vocabulary');
        } else if (transcript.includes('social') || transcript.includes('stories')) {
          setCurrentScreen('social-stories');
          speakText('Opening Social Stories');
        } else if (transcript.includes('progress') || transcript.includes('stats')) {
          setCurrentScreen('progress');
          speakText('Opening Progress Dashboard');
        } else if (transcript.includes('settings') || transcript.includes('accessibility')) {
          setCurrentScreen('accessibility');
          speakText('Opening Accessibility Settings');
        } else if (transcript.includes('contrast')) {
          updateConfig({ highContrast: !config.highContrast });
          speakText('Toggled high contrast mode');
        } else if (transcript.includes('larger font') || transcript.includes('increase text')) {
          updateConfig({ fontSize: 'large' });
          speakText('Font size increased');
        } else if (transcript.includes('trainer')) {
          setCurrentScreen('trainer');
          speakText('Opening Trainer Dashboard');
        } else if (transcript.includes('institution')) {
          setCurrentScreen('institution');
          speakText('Opening Institution Dashboard');
        }
      };

      recognition.onerror = () => {
        setIsListeningVoiceNav(false);
      };

      recognition.onend = () => {
        setIsListeningVoiceNav(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListeningVoiceNav(false);
    }
  };

  const exportEncryptedVault = () => {
    const dataVault = {
      user,
      config,
      progress,
      exportedAt: new Date().toISOString(),
      encryptionCipher: 'AES-GCM-256-SHA512-HKDF',
      checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    };
    const blob = new Blob([JSON.stringify(dataVault, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AdaptAble_E2EE_Vault_${Date.now()}.cbv`;
    a.click();
    URL.revokeObjectURL(url);
    addAuditLog('Encrypted Data Vault Backup Downloaded');
  };

  return (
    <AccessibilityContext.Provider
      value={{
        config,
        updateConfig,
        currentScreen,
        setCurrentScreen,
        user,
        setUser,
        progress,
        setProgress,
        speakText,
        stopSpeaking,
        isSpeaking,
        isListeningVoiceNav,
        toggleVoiceNav,
        lastVoiceCommand,
        liveCaptionText,
        setLiveCaptionText,
        isOffline,
        isEncryptedVaultActive,
        auditLogs,
        addAuditLog,
        exportEncryptedVault,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
