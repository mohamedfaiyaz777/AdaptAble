import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { AdaptAbleLogo } from './AdaptAbleLogo';
import {
  ShieldCheck,
  Mic,
  Volume2,
  VolumeX,
  Eye,
  Type,
  Wifi,
  WifiOff,
  User,
  Settings,
  HelpCircle,
  Sparkles,
  Lock,
  Building,
  GraduationCap,
  LayoutDashboard,
  Languages,
  Brain,
} from 'lucide-react';
import { PreferredLanguage } from '../types';

export const HeaderNav: React.FC = () => {
  const {
    config,
    updateConfig,
    currentScreen,
    setCurrentScreen,
    user,
    setUser,
    isSpeaking,
    stopSpeaking,
    isListeningVoiceNav,
    toggleVoiceNav,
    isOffline,
    isEncryptedVaultActive,
    speakText,
  } = useAccessibility();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages: { lang: PreferredLanguage; label: string; flag: string }[] = [
    { lang: 'English', label: 'English', flag: '🇬🇧' },
    { lang: 'Spanish', label: 'Español', flag: '🇪🇸' },
    { lang: 'Hindi', label: 'हिन्दी', flag: '🇮🇳' },
    { lang: 'French', label: 'Français', flag: '🇫🇷' },
    { lang: 'German', label: 'Deutsch', flag: '🇩🇪' },
    { lang: 'Sign Gloss', label: 'Sign Gloss', flag: '🤟' },
  ];

  const toggleHighContrast = () => {
    const next = !config.highContrast;
    updateConfig({ highContrast: next });
    speakText(next ? 'High contrast mode enabled' : 'High contrast mode disabled');
  };

  const cycleFontSize = () => {
    let next: 'normal' | 'large' | 'xlarge' = 'normal';
    if (config.fontSize === 'normal') next = 'large';
    else if (config.fontSize === 'large') next = 'xlarge';
    else next = 'normal';
    updateConfig({ fontSize: next });
    speakText(`Font size changed to ${next}`);
  };

  const toggleDyslexicFont = () => {
    const next = !config.dyslexicFont;
    updateConfig({ dyslexicFont: next });
    speakText(next ? 'Dyslexia friendly font enabled' : 'Dyslexia friendly font disabled');
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        config.highContrast
          ? 'bg-black text-yellow-300 border-yellow-400'
          : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-800 shadow-xs'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        {/* Logo & Tagline */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentScreen('dashboard');
              speakText('Navigating to Home Dashboard');
            }}
            className="flex items-center gap-3 text-left focus:outline-none focus:ring-4 focus:ring-indigo-400 rounded-xl p-1 group"
            aria-label="AdaptAble Home Dashboard"
          >
            <AdaptAbleLogo size="md" />
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  AdaptAble
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
                  PwD Adaptive
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium italic">
                "Different Abilities. Equal Opportunities."
              </p>
            </div>
          </button>
        </div>

        {/* Center Quick Accessibility Controls */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {/* Sign Language Camera Bot Button */}
          <button
            onClick={() => {
              setCurrentScreen('sign-bot');
              speakText('Opening Camera Sign Language AI Bot');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              currentScreen === 'sign-bot'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
            }`}
            title="Camera Sign Language AI Bot for Deaf & Mute"
            aria-label="Open Camera Sign Language AI Bot"
          >
            <span>🤟 Sign AI Bot</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              config.highContrast
                ? 'bg-yellow-400 text-black shadow-md font-bold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white shadow-xs'
            }`}
            title="Toggle High Contrast Mode"
            aria-label="Toggle High Contrast Mode"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>Contrast</span>
          </button>

          {/* Font Size Selector */}
          <button
            onClick={cycleFontSize}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-slate-700 hover:text-slate-900 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
            title="Change Text Size"
            aria-label={`Change Text Size, current is ${config.fontSize}`}
          >
            <Type className="w-3.5 h-3.5 text-purple-600" />
            <span className="capitalize">{config.fontSize} Text</span>
          </button>

          {/* Dyslexia Font Toggle */}
          <button
            onClick={toggleDyslexicFont}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              config.dyslexicFont
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white'
            }`}
            title="Toggle Dyslexia Friendly Layout"
            aria-label="Toggle Dyslexia Friendly Layout"
          >
            <span>Dyslexia Font</span>
          </button>

          {/* Quick Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-slate-700 hover:text-slate-900 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Select Language"
              aria-label={`Select Preferred Language, currently ${config.preferredLanguage}`}
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              <span>{config.preferredLanguage}</span>
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-1.5 z-50 text-white">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                  Preferred Language
                </div>
                {languages.map((item) => (
                  <button
                    key={item.lang}
                    onClick={() => {
                      updateConfig({ preferredLanguage: item.lang });
                      speakText(`Language changed to ${item.lang}`);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between ${
                      config.preferredLanguage === item.lang
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{item.flag}</span>
                      <span>{item.label}</span>
                    </span>
                  </button>
                ))}

                <div className="border-t border-slate-800 mt-1.5 pt-1.5">
                  <button
                    onClick={() => {
                      const next = !config.simpleLanguage;
                      updateConfig({ simpleLanguage: next });
                      speakText(next ? 'Simple language mode enabled' : 'Simple language mode disabled');
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between ${
                      config.simpleLanguage ? 'bg-indigo-900 text-indigo-200 font-bold border border-indigo-500' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Simple Words (ELI5)</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800">{config.simpleLanguage ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Voice Command Nav Button */}
          <button
            onClick={toggleVoiceNav}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              isListeningVoiceNav
                ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white'
            }`}
            title="Voice Navigation Commands"
            aria-label="Activate Voice Command Navigation"
          >
            <Mic className="w-3.5 h-3.5 text-rose-500" />
            <span>{isListeningVoiceNav ? 'Listening...' : 'Voice Nav'}</span>
          </button>
        </div>

        {/* Right Status Badges & Navigation Buttons */}
        <div className="flex items-center gap-2">
          {/* Speaking Audio Cancel indicator */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-2.5 py-1.5 bg-amber-100 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1 animate-pulse"
              aria-label="Stop text to speech playback"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mute Audio</span>
            </button>
          )}

          {/* Encrypted Vault status badge */}
          <button
            onClick={() => setCurrentScreen('security-vault')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              config.highContrast
                ? 'border border-yellow-300 text-yellow-300'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Encrypted Vault (AES-GCM 256)"
            aria-label="View Enterprise Encryption Status"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden lg:inline uppercase tracking-tight text-[11px]">E2EE Secured</span>
          </button>

          {/* Offline / Online Indicator */}
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
              isOffline
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}
            title={isOffline ? 'Working Offline Mode' : 'Connected Online'}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 text-indigo-600" />}
            <span className="hidden sm:inline text-[11px] uppercase tracking-tight">{isOffline ? 'Offline' : 'Online'}</span>
          </div>

          {/* Role & Screen Navigation Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="p-1.5 pr-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="User Profile and Role Selector"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-100 border-2 border-purple-600 flex items-center justify-center text-purple-700 font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="text-xs font-bold hidden md:inline capitalize">{user.role}</span>
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 text-white">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-xs font-bold text-white">{user.name}</p>
                  <p className="text-[11px] text-slate-400">{user.email}</p>
                </div>

                <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Switch Dashboard Role
                </div>
                <button
                  onClick={() => {
                    setUser((prev) => ({ ...prev, role: 'learner' }));
                    setCurrentScreen('dashboard');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 ${
                    user.role === 'learner' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Learner / PwD Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setUser((prev) => ({ ...prev, role: 'trainer' }));
                    setCurrentScreen('trainer');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 ${
                    user.role === 'trainer' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Trainer Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setUser((prev) => ({ ...prev, role: 'institution' }));
                    setCurrentScreen('institution');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 ${
                    user.role === 'institution' ? 'bg-purple-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Institution Analytics</span>
                </button>

                <div className="border-t border-slate-800 my-1 pt-1">
                  <button
                    onClick={() => {
                      setCurrentScreen('accessibility');
                      setShowRoleDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Accessibility Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentScreen('pricing');
                      setShowRoleDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Plans & Pricing</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
