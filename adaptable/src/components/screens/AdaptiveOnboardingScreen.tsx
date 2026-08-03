import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { DisabilityType, PreferredLanguage, VoiceTextPreference } from '../../types';
import {
  Eye,
  Volume2,
  Mic,
  Brain,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Languages,
  Sparkles,
  Type,
  Subtitles,
  Activity,
} from 'lucide-react';

export const AdaptiveOnboardingScreen: React.FC = () => {
  const { config, updateConfig, setCurrentScreen, speakText } = useAccessibility();

  const [step, setStep] = useState<number>(1);

  const disabilityOptions: { type: DisabilityType; title: string; icon: any; desc: string }[] = [
    {
      type: 'visual',
      title: 'Visual Impairment',
      icon: Eye,
      desc: 'Optimized for Screen Readers, High Contrast, Audio Description, and Keyboard Nav.',
    },
    {
      type: 'hearing',
      title: 'Hearing Impairment',
      icon: Volume2,
      desc: 'Optimized for Live Captions, Visual Alerts, Text Responses, and Sign Gloss.',
    },
    {
      type: 'speech',
      title: 'Speech Impairment',
      icon: Mic,
      desc: 'Optimized for AAC Tile Boards, Text Inputs, and Personalized Speech Baselines.',
    },
    {
      type: 'cognitive',
      title: 'Cognitive / Learning',
      icon: Brain,
      desc: 'Optimized for Dyslexia Fonts, Simple Language (ELI5), and Social Stories.',
    },
  ];

  const handleDisabilitySelect = (type: DisabilityType) => {
    updateConfig({ disabilityType: type });
    if (type === 'visual') {
      updateConfig({ screenReaderMode: true, highContrast: false, fontSize: 'large' });
    } else if (type === 'hearing') {
      updateConfig({ liveCaptions: true, textOnlyMode: true });
    } else if (type === 'speech') {
      updateConfig({ voiceTextPreference: 'text' });
    } else if (type === 'cognitive') {
      updateConfig({ dyslexicFont: true, simpleLanguage: true });
    }
    speakText(`Selected ${type} impairment adaptive profile. Interface updated.`);
  };

  const handleLanguageSelect = (lang: PreferredLanguage) => {
    updateConfig({ preferredLanguage: lang });
    speakText(`Preferred language set to ${lang}`);
  };

  const handleVoiceTextPref = (pref: VoiceTextPreference) => {
    updateConfig({ voiceTextPreference: pref });
    speakText(`Interaction preference set to ${pref}`);
  };

  return (
    <div
      className={`min-h-[calc(100vh-5rem)] p-6 sm:p-10 max-w-4xl mx-auto flex flex-col justify-between ${
        config.highContrast ? 'text-yellow-300' : 'text-slate-900'
      }`}
    >
      <div className="space-y-8">
        {/* Onboarding Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Adaptive Interface Engine • Step {step} of 3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Personalized Accessibility Setup</h1>
          </div>

          <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-2xl border border-indigo-200 text-indigo-800 text-xs font-semibold shadow-xs">
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>UI Adapting Live</span>
          </div>
        </div>

        {/* STEP 1: Disability Type */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Select Primary Ability or Learning Focus</h2>
              <p className="text-xs text-slate-500">
                AdaptAble automatically restructures menus, font sizes, contrast, and audio readers to fit your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {disabilityOptions.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleDisabilitySelect(item.type)}
                  className={`p-5 rounded-[2rem] border text-left transition-all relative focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
                    config.disabilityType === item.type
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                  aria-label={`Select ${item.title}`}
                >
                  {config.disabilityType === item.type && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 absolute top-4 right-4" />
                  )}
                  <div className="p-3 rounded-2xl bg-indigo-100 w-fit mb-3 text-indigo-700">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Language & Voice/Text Preference */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Preferred Language & Mode</h2>
              <p className="text-xs text-slate-400">Select how you prefer to communicate and read practice material.</p>
            </div>

            {/* Language Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-indigo-600" />
                Preferred Workplace Language
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['English', 'Spanish', 'Hindi', 'French', 'German', 'Sign Gloss'] as PreferredLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      config.preferredLanguage === lang
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice vs Text Preference */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Voice / Text Interaction Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { pref: 'voice', title: 'Voice Primary', desc: 'Speak into mic, listen to AI voice responses' },
                  { pref: 'text', title: 'Text / AAC Primary', desc: 'Type or click AAC tiles, read text captions' },
                  { pref: 'both', title: 'Multimodal (Both)', desc: 'Combine speech and text captions together' },
                ].map((item) => (
                  <button
                    key={item.pref}
                    onClick={() => handleVoiceTextPref(item.pref as VoiceTextPreference)}
                    className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      config.voiceTextPreference === item.pref
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-2 ring-indigo-500 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-800 mb-1">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Fine-Tuning UI Toggles */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Fine-Tune Accessibility Controls</h2>
              <p className="text-xs text-slate-500">Toggle individual UI enhancements to maximize comfort.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* High Contrast */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                <div>
                  <p className="text-sm font-bold text-slate-800">High Contrast Mode</p>
                  <p className="text-xs text-slate-500">Maximizes color difference for low vision</p>
                </div>
                <button
                  onClick={() => updateConfig({ highContrast: !config.highContrast })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.highContrast ? 'bg-amber-400 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                  aria-label="Toggle High Contrast"
                >
                  <div className={`w-4 h-4 rounded-full ${config.highContrast ? 'bg-black' : 'bg-white'}`}></div>
                </button>
              </div>

              {/* Dyslexia Font */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                <div>
                  <p className="text-sm font-bold text-slate-800">Dyslexia Friendly Font</p>
                  <p className="text-xs text-slate-500">Weighted letter bottoms for easier reading</p>
                </div>
                <button
                  onClick={() => updateConfig({ dyslexicFont: !config.dyslexicFont })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.dyslexicFont ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                  aria-label="Toggle Dyslexia Font"
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>

              {/* Live Captions */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                <div>
                  <p className="text-sm font-bold text-slate-800">Live Captions Reader</p>
                  <p className="text-xs text-slate-500">Sticky text bar for all AI audio speech</p>
                </div>
                <button
                  onClick={() => updateConfig({ liveCaptions: !config.liveCaptions })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.liveCaptions ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                  aria-label="Toggle Live Captions"
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>

              {/* Simple Language */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                <div>
                  <p className="text-sm font-bold text-slate-800">Simple Language Mode</p>
                  <p className="text-xs text-slate-500">Simplified terms and step-by-step guidance</p>
                </div>
                <button
                  onClick={() => updateConfig({ simpleLanguage: !config.simpleLanguage })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    config.simpleLanguage ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                  aria-label="Toggle Simple Language"
                >
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-sm font-bold transition-all shadow-xs"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              speakText('Setup completed! Welcome to your Home Dashboard.');
              setCurrentScreen('dashboard');
            }}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Finish & Go to Dashboard</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
