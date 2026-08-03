import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  Mic,
  Briefcase,
  BookOpen,
  Brain,
  TrendingUp,
  Award,
  Settings,
  GraduationCap,
  Building,
  Sparkles,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Volume2,
} from 'lucide-react';

export const HomeDashboardScreen: React.FC = () => {
  const { setCurrentScreen, config, progress, user, speakText } = useAccessibility();

  const cards = [
    {
      id: 'sign-bot',
      emoji: '🤟',
      title: 'Sign Language AI Bot',
      badge: 'Camera Vision AI',
      desc: 'Real-time camera sign translation, Sign Gloss generation, and gesture practice for Deaf & Hard-of-Hearing.',
      borderAccent: 'border-b-8 border-indigo-200 hover:border-indigo-400',
      iconBg: 'bg-indigo-100 text-indigo-700',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200',
      btnText: 'Open Camera Sign Bot',
      screen: 'sign-bot',
    },
    {
      id: 'speech-coach',
      emoji: '🎤',
      title: 'AI Speech Coach',
      badge: 'Personalized AI',
      desc: 'Real-time feedback on clarity & confidence based on your unique baseline.',
      borderAccent: 'border-b-8 border-indigo-100 hover:border-indigo-300',
      iconBg: 'bg-indigo-100 text-indigo-600',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200',
      btnText: 'Start Practice',
      screen: 'speech-coach',
    },
    {
      id: 'simulator',
      emoji: '💼',
      title: 'Workplace Sim',
      badge: 'Interactive Roleplay',
      desc: 'Roleplay with AI HR Managers and Team Leaders in safe environments.',
      borderAccent: 'border-b-8 border-purple-100 hover:border-purple-300',
      iconBg: 'bg-purple-100 text-purple-600',
      btnBg: 'bg-purple-600 hover:bg-purple-700 shadow-purple-200',
      btnText: 'Enter Simulation',
      screen: 'simulator',
    },
    {
      id: 'vocabulary',
      emoji: '📚',
      title: 'Workplace Vocab',
      badge: '200+ Terms & Gloss',
      desc: 'Master professional jargon, audio glosses, sign gloss, and communication templates.',
      borderAccent: 'border-b-8 border-indigo-100 hover:border-indigo-300',
      iconBg: 'bg-indigo-100 text-indigo-600',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200',
      btnText: 'Explore Vocab',
      screen: 'vocabulary',
    },
    {
      id: 'social-stories',
      emoji: '🧠',
      title: 'Social Stories',
      badge: 'Neurodivergent Friendly',
      desc: 'Learn professional behavior through interactive situational guidance.',
      borderAccent: 'border-b-8 border-rose-100 hover:border-rose-300',
      iconBg: 'bg-rose-100 text-rose-600',
      btnBg: 'bg-rose-500 hover:bg-rose-600 shadow-rose-100',
      btnText: 'Browse Stories',
      screen: 'social-stories',
    },
    {
      id: 'achievements',
      emoji: '🏆',
      title: 'Achievements',
      badge: `${progress.currentStreakDays}-Day Streak 🔥`,
      desc: 'Review your badges and weekly milestones. 85% ready for interviews!',
      borderAccent: 'border-b-8 border-emerald-100 hover:border-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-600',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100',
      btnText: 'View Badges',
      screen: 'achievements',
    },
    {
      id: 'progress',
      emoji: '📈',
      title: 'Progress Analytics',
      badge: 'Analytics & Trends',
      desc: 'Track communication growth, interview readiness index, and AI recommendations.',
      borderAccent: 'border-b-8 border-amber-100 hover:border-amber-300',
      iconBg: 'bg-amber-100 text-amber-600',
      btnBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-100',
      btnText: 'Open Analytics',
      screen: 'progress',
    },
    {
      id: 'accessibility',
      emoji: '♿',
      title: 'AAC & Accessibility',
      badge: 'Augmentative AAC Tiles',
      desc: 'Customize High Contrast, Dyslexia Font, audio pace, or non-verbal AAC tile board.',
      borderAccent: 'border-b-8 border-sky-100 hover:border-sky-300',
      iconBg: 'bg-sky-100 text-sky-600',
      btnBg: 'bg-sky-600 hover:bg-sky-700 shadow-sky-100',
      btnText: 'Open Settings',
      screen: 'accessibility',
    },
  ];

  return (
    <div
      className={`min-h-[calc(100vh-5rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-8 pb-24 ${
        config.highContrast ? 'text-yellow-300' : 'text-slate-900'
      }`}
    >
      {/* Welcome & Adaptive Setup Banner */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Adaptive Engine Active
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              E2EE Secured
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, {user.name} 👋
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm max-w-xl font-medium">
            AdaptAble has calibrated the interface for your{' '}
            <strong className="text-indigo-700 uppercase">{config.disabilityType} Mode</strong> setup ({config.preferredLanguage}).
          </p>
        </div>

        {/* Quick Metrics Header Widget */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 w-full md:w-auto justify-around">
          <div className="text-center px-3">
            <div className="text-2xl font-black text-indigo-600">{progress.communicationScore}%</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Comm Score</div>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="text-center px-3">
            <div className="text-2xl font-black text-amber-500">{progress.currentStreakDays} Days</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Streak 🔥</div>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="text-center px-3">
            <div className="text-2xl font-black text-emerald-600">{progress.lessonsCompleted}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lessons</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Modules + Right Column Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Modules Grid (2 Columns) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                speakText(`Opening ${card.title}`);
                setCurrentScreen(card.screen as any);
              }}
              className={`bg-white rounded-[2rem] p-6 shadow-sm ${card.borderAccent} transition-all cursor-pointer flex flex-col justify-between group hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xs`}>
                    {card.emoji}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {card.title}
                </h3>

                <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(`Opening ${card.title}`);
                  setCurrentScreen(card.screen as any);
                }}
                className={`mt-auto w-full py-3 ${card.btnBg} text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-sm`}
              >
                <span>{card.btnText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Daily Performance Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white h-full shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>

            <div>
              <h4 className="text-xs font-black tracking-widest text-indigo-400 mb-6 uppercase flex items-center justify-between">
                <span>Daily Performance</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">Live Sync</span>
              </h4>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-200">Communication Score</span>
                    <span className="text-indigo-400 font-bold">{progress.communicationScore}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress.communicationScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-200">Professional Vocab</span>
                    <span className="text-purple-400 font-bold">78%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[78%] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-200">Fluency Index</span>
                    <span className="text-emerald-400 font-bold">91%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[91%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Box */}
              <div className="mt-8 p-5 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                <p className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  AI Recommendation
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-300 italic">
                  "Based on your recent practice, we suggest focusing on <strong>Asking for Deadline Extensions</strong> in the Workplace Simulator today."
                </p>
              </div>
            </div>

            {/* Offline Sync Status Button */}
            <div className="mt-8">
              <button
                onClick={() => speakText('Offline Mode is active. All data syncs automatically with end to end encryption.')}
                className="w-full py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-tight flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <span>Offline Mode: Sync Active</span>
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Role Access Portals (Trainer & Institution Switching) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <button
          onClick={() => {
            speakText('Opening Trainer & Mentor Portal');
            setCurrentScreen('trainer');
          }}
          className="p-6 rounded-[2rem] bg-white border border-slate-200 hover:border-indigo-400 text-left transition-all shadow-sm flex items-center justify-between group focus:outline-none focus:ring-4 focus:ring-indigo-400"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 group-hover:text-indigo-600 transition-colors">👨‍🏫 Trainer & Rehabilitation Portal</h3>
              <p className="text-xs text-slate-500 font-medium">View student rosters, weak area insights, and assign practice.</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
        </button>

        <button
          onClick={() => {
            speakText('Opening Institution Analytics Portal');
            setCurrentScreen('institution');
          }}
          className="p-6 rounded-[2rem] bg-white border border-slate-200 hover:border-purple-400 text-left transition-all shadow-sm flex items-center justify-between group focus:outline-none focus:ring-4 focus:ring-purple-400"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 group-hover:text-purple-600 transition-colors">🏢 Institution & Employer Analytics</h3>
              <p className="text-xs text-slate-500 font-medium">View completion rates, readiness indexes, and export compliance reports.</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};

