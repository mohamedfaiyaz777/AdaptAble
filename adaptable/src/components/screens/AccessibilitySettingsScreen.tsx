import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PreferredLanguage } from '../../types';
import { getTranslation, formatGenericText } from '../../utils/languageUtils';
import {
  Settings,
  Eye,
  Volume2,
  Mic,
  Brain,
  Sliders,
  VolumeX,
  Type,
  Subtitles,
  Grid,
  Sparkles,
  ArrowLeft,
  Lock,
  Download,
  ShieldCheck,
  Languages,
  CheckCircle2,
} from 'lucide-react';

export const AccessibilitySettingsScreen: React.FC = () => {
  const {
    config,
    updateConfig,
    setCurrentScreen,
    speakText,
    exportEncryptedVault,
  } = useAccessibility();

  const [activeTab, setActiveTab] = useState<'settings' | 'language' | 'aac-board'>('settings');

  const languagesList: { lang: PreferredLanguage; label: string; flag: string }[] = [
    { lang: 'English', label: 'English', flag: '🇬🇧' },
    { lang: 'Spanish', label: 'Español (Spanish)', flag: '🇪🇸' },
    { lang: 'Hindi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { lang: 'French', label: 'Français (French)', flag: '🇫🇷' },
    { lang: 'German', label: 'Deutsch (German)', flag: '🇩🇪' },
    { lang: 'Sign Gloss', label: 'Sign Language Gloss', flag: '🤟' },
  ];

  // AAC Augmentative & Alternative Communication tiles for rapid speech impaired communication
  const aacTiles = [
    { label: 'I need a moment', category: 'Pacing', text: 'I need a brief moment to formulate my response.' },
    { label: 'Please repeat that', category: 'Clarification', text: 'Could you please repeat that point for me?' },
    { label: 'I agree', category: 'Response', text: 'I fully agree with that proposed approach.' },
    { label: 'I request accommodation', category: 'Advocacy', text: 'I would like to request a workplace accommodation for this task.' },
    { label: 'Thank you', category: 'Social', text: 'Thank you very much for your support.' },
    { label: 'Let me type my answer', category: 'Mode', text: 'I am typing my detailed answer in the chat box.' },
    { label: 'Can we follow up in email?', category: 'Channel', text: 'Could we follow up on this specific item via email?' },
    { label: 'What is the due date?', category: 'Task', text: 'Could you please confirm the exact due date for this task?' },
    { label: 'I need a break', category: 'Health', text: 'I am stepping away for a 5-minute focus break.' },
    { label: 'I understand', category: 'Response', text: 'I understand and will proceed accordingly.' },
    { label: 'Could you clarify step 2?', category: 'Task', text: 'Could you clarify step 2 in the instructions?' },
    { label: 'My baseline is active', category: 'Advocacy', text: 'My personalized communication baseline is active.' },
  ];

  const handleTileClick = (tile: typeof aacTiles[0]) => {
    speakText(tile.text);
  };

  return (
    <div
      className={`min-h-[calc(100vh-5rem)] p-4 sm:p-8 max-w-6xl mx-auto space-y-6 pb-24 ${
        config.highContrast ? 'text-yellow-300' : 'text-slate-900'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-xs"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-0.5">
              <Settings className="w-4 h-4" />
              <span>MODULE 5 • Accessibility Settings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Adaptive UI & AAC Board</h1>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 inline mr-1.5" />
            UI Preferences
          </button>
          <button
            onClick={() => setActiveTab('language')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'language'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Languages className="w-3.5 h-3.5 inline mr-1.5" />
            Preferred Language ({config.preferredLanguage})
          </button>
          <button
            onClick={() => setActiveTab('aac-board')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'aac-board'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5 inline mr-1.5" />
            AAC Speech Tiles
          </button>
        </div>
      </div>

      {activeTab === 'settings' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* VISUAL MODE SETTINGS */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 font-bold border-b border-slate-200 pb-3">
              <Eye className="w-5 h-5" />
              <span>Visual Mode Preferences</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">High Contrast Colors</p>
                  <p className="text-slate-500">Black/yellow/cyan maximum WCAG contrast</p>
                </div>
                <button
                  onClick={() => updateConfig({ highContrast: !config.highContrast })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.highContrast ? 'bg-amber-400 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${config.highContrast ? 'bg-black' : 'bg-white'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <p className="font-bold text-slate-800">Text Font Size</p>
                  <p className="text-slate-500">Current: {config.fontSize}</p>
                </div>
                <div className="flex items-center gap-1">
                  {(['normal', 'large', 'xlarge'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateConfig({ fontSize: s })}
                      className={`px-2.5 py-1 rounded-lg font-bold capitalize ${
                        config.fontSize === s ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <p className="font-bold text-slate-800">Screen Reader Mode</p>
                  <p className="text-slate-500">Enables automatic ARIA announcements</p>
                </div>
                <button
                  onClick={() => updateConfig({ screenReaderMode: !config.screenReaderMode })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.screenReaderMode ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
          </div>

          {/* HEARING MODE SETTINGS */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 font-bold border-b border-slate-200 pb-3">
              <Volume2 className="w-5 h-5" />
              <span>Hearing Mode Preferences</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Live Sticky Captions</p>
                  <p className="text-slate-500">Displays real-time text captions at viewport bottom</p>
                </div>
                <button
                  onClick={() => updateConfig({ liveCaptions: !config.liveCaptions })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.liveCaptions ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <p className="font-bold text-slate-800">Text-Only Responses</p>
                  <p className="text-slate-500">Prioritizes written text over auto-playing audio</p>
                </div>
                <button
                  onClick={() => updateConfig({ textOnlyMode: !config.textOnlyMode })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.textOnlyMode ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
          </div>

          {/* SPEECH MODE SETTINGS */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 font-bold border-b border-slate-200 pb-3">
              <Mic className="w-5 h-5" />
              <span>Speech & AI Audio Pace</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">AI Voice Pace</p>
                  <p className="text-slate-500">Slower speech helps processing</p>
                </div>
                <div className="flex items-center gap-1">
                  {(['normal', 'slow', 'very_slow'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateConfig({ speechPace: p })}
                      className={`px-2.5 py-1 rounded-lg font-bold capitalize ${
                        config.speechPace === p ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {p.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LEARNING / COGNITIVE MODE */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 font-bold border-b border-slate-200 pb-3">
              <Brain className="w-5 h-5" />
              <span>Cognitive & Dyslexia Preferences</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Dyslexia Friendly Font</p>
                  <p className="text-slate-500">Uses weighted letterform styling</p>
                </div>
                <button
                  onClick={() => updateConfig({ dyslexicFont: !config.dyslexicFont })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.dyslexicFont ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <p className="font-bold text-slate-800">Simple Language (ELI5 Mode)</p>
                  <p className="text-slate-500">Simplifies technical workplace terminology</p>
                </div>
                <button
                  onClick={() => updateConfig({ simpleLanguage: !config.simpleLanguage })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.simpleLanguage ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'language' ? (
        /* PREFERRED LANGUAGE & SIMPLE LANGUAGE TAB */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1 text-xs uppercase tracking-wider">
                  <Languages className="w-4 h-4" />
                  <span>Workplace Language & Simplification Center</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">Select Preferred Workplace Language</h2>
                <p className="text-xs text-slate-500">
                  AdaptAble automatically translates menus, vocabulary, speech coaching prompts, and scenarios into your chosen language.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-800 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Active: {config.preferredLanguage}</span>
              </div>
            </div>

            {/* Language Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {languagesList.map((item) => (
                <button
                  key={item.lang}
                  onClick={() => {
                    updateConfig({ preferredLanguage: item.lang });
                    speakText(`Language changed to ${item.lang}`);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
                    config.preferredLanguage === item.lang
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{item.label}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.lang === 'Sign Gloss' ? 'Visual uppercase gloss' : 'Full AI UI translation'}
                      </div>
                    </div>
                  </div>
                  {config.preferredLanguage === item.lang && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Simple Language (ELI5 Mode) Toggle */}
            <div className="p-6 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-800 font-extrabold text-sm">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>Simple Language Mode (ELI5 / Plain Words)</span>
                  {config.simpleLanguage && (
                    <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-full text-[10px] font-bold">ACTIVE</span>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  Replaces complex corporate jargon with simple, clear, easy-to-understand terms across all modules.
                </p>
              </div>

              <button
                onClick={() => {
                  const next = !config.simpleLanguage;
                  updateConfig({ simpleLanguage: next });
                  speakText(next ? 'Simple language mode enabled' : 'Simple language mode disabled');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-xs ${
                  config.simpleLanguage
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                <span>{config.simpleLanguage ? 'Enabled (Simple Words)' : 'Enable Simple Language'}</span>
              </button>
            </div>

            {/* Live Translation & Simplification Preview Box */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Live Preview in {config.preferredLanguage} {config.simpleLanguage ? '(ELI5 Active)' : ''}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-[10px] font-bold text-slate-400 mb-1">Standard Technical Phrase:</div>
                  <div className="font-semibold text-slate-200">"Request Workplace Accommodation for Screen Reader"</div>
                </div>
                <div className="p-3 bg-indigo-950/80 rounded-xl border border-indigo-600/50">
                  <div className="text-[10px] font-bold text-indigo-300 mb-1">Transformed Output ({config.preferredLanguage}):</div>
                  <div className="font-extrabold text-white text-sm">
                    "{getTranslation('Request Workplace Accommodation', config.preferredLanguage, config.simpleLanguage)}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* AAC AUGMENTATIVE TILE BOARD FOR SPEECH IMPAIRED / NON-VERBAL USERS */
        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1 text-xs uppercase tracking-wider">
              <Grid className="w-4 h-4" />
              <span>Augmentative and Alternative Communication (AAC) Tile Board</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">1-Tap Rapid Speech Tiles</h2>
            <p className="text-xs text-slate-500">
              Tap any tile to immediately synthesize and speak the phrase aloud in workplace discussions or interviews.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {aacTiles.map((tile, idx) => (
              <button
                key={idx}
                onClick={() => handleTileClick(tile)}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-indigo-600 text-left border border-slate-200 hover:border-indigo-600 transition-all transform hover:-translate-y-1 shadow-xs space-y-2 group focus:outline-none focus:ring-4 focus:ring-indigo-400"
                aria-label={`Speak phrase: ${tile.label}`}
              >
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 group-hover:text-white">
                  {tile.category}
                </div>
                <div className="text-sm font-extrabold text-slate-800 group-hover:text-white">{tile.label}</div>
                <p className="text-[11px] text-slate-500 group-hover:text-indigo-100 line-clamp-2">"{tile.text}"</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enterprise Vault Backup Download Bar */}
      <div className="p-6 rounded-[2rem] bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Enterprise E2EE Data Vault Management</h3>
            <p className="text-xs text-slate-500">Download an offline backup of your accessibility settings & baseline.</p>
          </div>
        </div>

        <button
          onClick={exportEncryptedVault}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Encrypted Vault (.cbv)</span>
        </button>
      </div>
    </div>
  );
};
