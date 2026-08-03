import React from 'react';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { HeaderNav } from './components/HeaderNav';
import { LiveCaptionBar } from './components/LiveCaptionBar';
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { AdaptiveOnboardingScreen } from './components/screens/AdaptiveOnboardingScreen';
import { HomeDashboardScreen } from './components/screens/HomeDashboardScreen';
import { WorkplaceLearningScreen } from './components/screens/WorkplaceLearningScreen';
import { SpeechCoachScreen } from './components/screens/SpeechCoachScreen';
import { SimulatorScreen } from './components/screens/SimulatorScreen';
import { SocialStoriesScreen } from './components/screens/SocialStoriesScreen';
import { SignBotScreen } from './components/screens/SignBotScreen';
import { AccessibilitySettingsScreen } from './components/screens/AccessibilitySettingsScreen';
import { ProgressDashboardScreen } from './components/screens/ProgressDashboardScreen';
import { AchievementsScreen } from './components/screens/AchievementsScreen';
import { TrainerDashboardScreen } from './components/screens/TrainerDashboardScreen';
import { InstitutionDashboardScreen } from './components/screens/InstitutionDashboardScreen';
import { PricingScreen } from './components/screens/PricingScreen';
import { SecurityVaultScreen } from './components/screens/SecurityVaultScreen';

const MainContent: React.FC = () => {
  const { currentScreen, config } = useAccessibility();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'onboarding':
        return <AdaptiveOnboardingScreen />;
      case 'dashboard':
        return <HomeDashboardScreen />;
      case 'vocabulary':
        return <WorkplaceLearningScreen />;
      case 'speech-coach':
        return <SpeechCoachScreen />;
      case 'simulator':
        return <SimulatorScreen />;
      case 'social-stories':
        return <SocialStoriesScreen />;
      case 'sign-bot':
        return <SignBotScreen />;
      case 'accessibility':
        return <AccessibilitySettingsScreen />;
      case 'progress':
        return <ProgressDashboardScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'trainer':
        return <TrainerDashboardScreen />;
      case 'institution':
        return <InstitutionDashboardScreen />;
      case 'pricing':
        return <PricingScreen />;
      case 'security-vault':
        return <SecurityVaultScreen />;
      default:
        return <HomeDashboardScreen />;
    }
  };

  const getContainerStyles = () => {
    let classes = 'min-h-screen transition-all duration-300 ';

    if (config.highContrast) {
      classes += 'bg-black text-yellow-300 selection:bg-yellow-400 selection:text-black ';
    } else {
      classes += 'bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white ';
    }

    if (config.fontSize === 'large') {
      classes += 'text-lg ';
    } else if (config.fontSize === 'xlarge') {
      classes += 'text-xl ';
    } else {
      classes += 'text-base ';
    }

    if (config.dyslexicFont) {
      classes += 'font-serif tracking-wide ';
    } else {
      classes += 'font-sans ';
    }

    return classes;
  };

  return (
    <div className={getContainerStyles()}>
      {currentScreen !== 'splash' && <HeaderNav />}
      <main className="w-full">{renderScreen()}</main>
      <LiveCaptionBar />
    </div>
  );
};

export default function App() {
  return (
    <AccessibilityProvider>
      <MainContent />
    </AccessibilityProvider>
  );
}
