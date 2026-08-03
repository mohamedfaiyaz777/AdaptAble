import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Check, ArrowLeft, ShieldCheck, Heart, Sparkles, Building, Users } from 'lucide-react';

export const PricingScreen: React.FC = () => {
  const { setCurrentScreen, config, speakText } = useAccessibility();

  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'free',
      name: 'Individual Learner',
      price: '$0',
      period: 'Always Free for PwDs',
      desc: 'Full adaptive access for individual Persons with Disabilities.',
      features: [
        'All 7 Core Adaptive Modules',
        'Personal Speech Baseline Calibration',
        'Offline Local Data Vault',
        'AAC Augmentative Tile Board',
        'Unlimited AI Roleplay Practice',
      ],
      cta: 'Current Active Plan',
      highlighted: false,
    },
    {
      id: 'ngo',
      name: 'Rehabilitation & NGO',
      price: isAnnual ? '$39' : '$49',
      period: 'per month / up to 50 learners',
      desc: 'For vocational centers, colleges, and PwD support organizations.',
      features: [
        'Everything in Individual Plan',
        'Trainer & Mentorship Portal',
        '50 Learner Cohort Management',
        'Weak Area Bottleneck Analytics',
        'CSV / PDF Progress Export',
      ],
      cta: 'Start 14-Day Free NGO Trial',
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Inclusive Employer',
      price: isAnnual ? '$159' : '$199',
      period: 'per month / unlimited learners',
      desc: 'For enterprise workplaces committed to inclusive hiring & WCAG AAA compliance.',
      features: [
        'Unlimited PwD Employee Accounts',
        'Enterprise Google / SAML SSO Integration',
        'Institution Inclusion Analytics',
        'Custom Workplace Scenario Creation',
        'Dedicated WCAG Accessibility Audit Team',
      ],
      cta: 'Contact Enterprise Sales',
      highlighted: false,
    },
  ];

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-8 pb-24 ${
        config.highContrast ? 'text-yellow-300' : 'text-white'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-0.5">
              <Heart className="w-4 h-4 text-pink-400" />
              <span>INCLUSIVE PRICING FOR EQUAL OPPORTUNITY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Fair Plans for Individuals & Organizations</h1>
          </div>
        </div>

        {/* Annual Toggle */}
        <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-bold">
          <span className={!isAnnual ? 'text-white' : 'text-slate-400'}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
              isAnnual ? 'bg-purple-600 justify-end' : 'bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white"></div>
          </button>
          <span className={isAnnual ? 'text-purple-300 font-extrabold' : 'text-slate-400'}>
            Annual <span className="text-emerald-400 font-bold text-[10px]">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 transition-all relative ${
              plan.highlighted
                ? 'bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-900 border-purple-500 shadow-2xl ring-2 ring-purple-500'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                Most Popular for NGOs & Colleges
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 pt-4 text-xs font-medium text-slate-200">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                speakText(`Selected plan: ${plan.name}`);
                alert(`Redirecting to secure signup for ${plan.name}`);
              }}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all focus:outline-none focus:ring-4 focus:ring-purple-400 ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
