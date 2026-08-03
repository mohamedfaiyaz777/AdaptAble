import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  TrendingUp,
  Award,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Zap,
  Target,
  BarChart2,
  Calendar,
} from 'lucide-react';

export const ProgressDashboardScreen: React.FC = () => {
  const { setCurrentScreen, config, progress, speakText } = useAccessibility();

  return (
    <div
      className={`min-h-[calc(100vh-5rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24 ${
        config.highContrast ? 'text-yellow-300' : 'text-slate-900'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
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
              <TrendingUp className="w-4 h-4" />
              <span>MODULE 6 • Progress Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Communication Growth Analytics</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-2 rounded-2xl border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
          <Zap className="w-4 h-4 text-amber-600" />
          <span>{progress.currentStreakDays}-Day Active Streak</span>
        </div>
      </div>

      {/* Primary Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-2 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Communication Score</span>
          <div className="text-4xl font-black text-indigo-600">{progress.communicationScore} / 100</div>
          <p className="text-[11px] text-emerald-600 font-semibold">↑ +6.2% improvement this week</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-2 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interview Readiness Index</span>
          <div className="text-4xl font-black text-sky-600">{progress.interviewScore}%</div>
          <p className="text-[11px] text-sky-700 font-semibold">Ready for HR screening</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-2 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lessons Completed</span>
          <div className="text-4xl font-black text-emerald-600">{progress.lessonsCompleted}</div>
          <p className="text-[11px] text-slate-500">Micro-modules mastered</p>
        </div>

        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-2 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Practice Time</span>
          <div className="text-4xl font-black text-amber-600">{progress.totalPracticeMinutes} Mins</div>
          <p className="text-[11px] text-amber-700 font-semibold">Adaptive practice logged</p>
        </div>
      </div>

      {/* Weekly Progress Bar Visualization */}
      <div className="p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            Weekly Score Consistency Trend
          </h2>
          <span className="text-xs text-slate-500 font-medium">Daily AI evaluation scores</span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-4">
          {progress.weeklyProgress.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-2">
              <div className="text-[11px] font-bold text-indigo-700">{item.score}%</div>
              <div className="w-full bg-slate-100 rounded-t-xl h-32 flex items-end p-1">
                <div
                  className="w-full bg-indigo-600 rounded-lg transition-all duration-500"
                  style={{ height: `${item.score}%` }}
                ></div>
              </div>
              <div className="text-xs font-bold text-slate-500">{item.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Areas & AI Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Areas */}
        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Focus Growth Areas
          </h2>
          <div className="space-y-2">
            {progress.weakAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between"
              >
                <span>{area}</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-300">
                  Targeted Practice
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            AI Adaptive Recommendations
          </h2>
          <div className="space-y-2">
            {progress.aiRecommendations.map((rec, idx) => (
              <div
                key={idx}
                onClick={() => {
                  speakText(`Launching recommendation: ${rec}`);
                  setCurrentScreen('speech-coach');
                }}
                className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 hover:border-indigo-400 text-indigo-950 text-xs font-bold flex items-center justify-between cursor-pointer transition-all shadow-xs"
              >
                <span>{rec}</span>
                <span className="text-[10px] bg-indigo-600 text-white px-2.5 py-1 rounded-xl">
                  Start Now
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
