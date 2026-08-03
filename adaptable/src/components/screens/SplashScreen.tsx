import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { AdaptAbleLogo } from '../AdaptAbleLogo';
import {
  Sparkles,
  ShieldCheck,
  Eye,
  Volume2,
  Mic,
  Brain,
  ArrowRight,
  Lock,
  HeartHandshake,
  CheckCircle2,
  Award,
} from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen, config, updateConfig, speakText } = useAccessibility();

  const handleStart = () => {
    speakText('Welcome to AdaptAble. Let us start with your personalized onboarding.');
    setCurrentScreen('onboarding');
  };

  const handleDirectLogin = () => {
    speakText('Navigating to Login');
    setCurrentScreen('login');
  };

  return (
    <div
      className={`min-h-[calc(100vh-5rem)] flex flex-col justify-between p-6 sm:p-10 transition-colors duration-200 ${
        config.highContrast
          ? 'bg-black text-yellow-300'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-4xl mx-auto w-full my-auto py-12 flex flex-col items-center text-center space-y-8">
        {/* Animated Badge & Logo Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wide shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
          <span>AI-Powered Adaptive Workplace Inclusion Platform</span>
        </div>

        <div className="relative group">
          <AdaptAbleLogo size="xl" />
        </div>

        {/* Title & Tagline */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            AdaptAble
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-indigo-600">
            "Different Abilities. Equal Opportunities."
          </p>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed pt-2">
            An adaptive workplace communication platform for Persons with Disabilities.
            The platform adapts to your abilities through personalized AI coaching, workplace simulations, and accessibility-first design.
          </p>
        </div>

        {/* Quick Disability Mode Selector Pills */}
        <div className="w-full max-w-xl bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Launch Disability Adaptive Mode
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { type: 'visual', label: 'Visual', icon: Eye, desc: 'High Contrast & Screen Reader' },
              { type: 'hearing', label: 'Hearing', icon: Volume2, desc: 'Live Captions & Text' },
              { type: 'speech', label: 'Speech', icon: Mic, desc: 'AAC Tiles & Custom Baseline' },
              { type: 'cognitive', label: 'Cognitive', icon: Brain, desc: 'Dyslexia & Social Stories' },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => {
                  updateConfig({ disabilityType: item.type as any });
                  speakText(`${item.label} disability mode activated.`);
                }}
                className={`p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  config.disabilityType === item.type
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-2 ring-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                aria-label={`Select ${item.label} Impairment Mode`}
              >
                <item.icon className="w-5 h-5 text-indigo-600 mb-1" />
                <div className="text-xs font-bold">{item.label} Mode</div>
                <div className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Enterprise Compliance Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 pt-2">
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            E2EE 256-bit Encryption
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            WCAG 2.1 AAA Compliant
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-sky-600" />
            Offline Capable Engine
          </span>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md pt-4">
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-base font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-400"
            aria-label="Start Adaptive Setup and Onboarding"
          >
            <span>Start Adaptive Onboarding</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleDirectLogin}
            className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-base font-bold flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-xs"
            aria-label="Direct Login or Offline Mode"
          >
            <span>Login / Offline Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
