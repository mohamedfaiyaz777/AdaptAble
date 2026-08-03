import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { BADGES_LIST } from '../../data/badgesData';
import { Award, ArrowLeft, CheckCircle2, Lock, Sparkles, Trophy } from 'lucide-react';

export const AchievementsScreen: React.FC = () => {
  const { setCurrentScreen, config, speakText } = useAccessibility();

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24 ${
        config.highContrast ? 'text-yellow-300' : 'text-white'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
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
              <Trophy className="w-4 h-4" />
              <span>MODULE 7 • Achievements & Badges</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Milestones & Certificates</h1>
          </div>
        </div>

        <div className="text-xs font-bold bg-amber-500/10 px-3.5 py-2 rounded-2xl border border-amber-500/30 text-amber-300">
          🏆 6 of 8 Badges Unlocked
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BADGES_LIST.map((badge) => (
          <div
            key={badge.id}
            onClick={() =>
              speakText(`Badge: ${badge.title}. ${badge.description}. ${badge.unlocked ? 'Unlocked!' : 'Locked'}`)
            }
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 cursor-pointer ${
              badge.unlocked
                ? 'bg-slate-900 border-purple-500/50 shadow-xl shadow-purple-600/10 hover:border-purple-400'
                : 'bg-slate-950/60 border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${
                    badge.unlocked
                      ? 'bg-gradient-to-tr from-amber-500 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {badge.unlocked ? '🏅' : <Lock className="w-5 h-5" />}
                </div>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                    badge.unlocked
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {badge.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white mb-1">{badge.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
              </div>
            </div>

            {badge.unlocked && (
              <div className="text-[10px] font-bold text-slate-500 border-t border-slate-800 pt-3">
                Unlocked on {badge.unlockedAt}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
