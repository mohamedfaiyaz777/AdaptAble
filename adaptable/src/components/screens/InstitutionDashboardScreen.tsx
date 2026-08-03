import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { MOCK_INSTITUTION_DATA } from '../../data/institutionData';
import { Building, ArrowLeft, Download, ShieldCheck, TrendingUp, Users, Award, CheckCircle2 } from 'lucide-react';

export const InstitutionDashboardScreen: React.FC = () => {
  const { setCurrentScreen, config, speakText } = useAccessibility();

  const handleExportReport = () => {
    speakText('Exporting WCAG 2.1 AAA Compliance and Inclusion Analytics Report');
    alert('Compliance Report Exported! (Saved as PDF / CSV bundle)');
  };

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24 ${
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
              <Building className="w-4 h-4" />
              <span>INSTITUTION & ENTERPRISE ANALYTICS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Apex Rehabilitation & Employer Alliance
            </h1>
          </div>
        </div>

        <button
          onClick={handleExportReport}
          className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Inclusion Report</span>
        </button>
      </div>

      {/* Macro Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Enrolled PwD Learners</span>
          <div className="text-4xl font-black text-purple-400">{MOCK_INSTITUTION_DATA.totalLearners}</div>
          <p className="text-[11px] text-purple-300 font-semibold">{MOCK_INSTITUTION_DATA.activeThisWeek} Active This Week</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Program Completion Rate</span>
          <div className="text-4xl font-black text-emerald-400">{MOCK_INSTITUTION_DATA.completionRate}%</div>
          <p className="text-[11px] text-emerald-300 font-semibold">↑ +4.8% YoY Retention</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Interview Readiness</span>
          <div className="text-4xl font-black text-blue-400">{MOCK_INSTITUTION_DATA.interviewReadinessPercentage}%</div>
          <p className="text-[11px] text-blue-300 font-semibold">Qualified for Inclusive Employer Placement</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Communication Score</span>
          <div className="text-4xl font-black text-amber-400">{MOCK_INSTITUTION_DATA.avgCommunicationScore} / 100</div>
          <p className="text-[11px] text-amber-300 font-semibold">Verified Across 4 Disability Types</p>
        </div>
      </div>

      {/* Cohorts Breakdown Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Department Cohort Performance Breakdown
          </h2>
          <span className="text-xs text-slate-400 font-medium">Real-time Segment Metrics</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                <th className="pb-3">Cohort Name</th>
                <th className="pb-3">Learners</th>
                <th className="pb-3">Avg Score</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {MOCK_INSTITUTION_DATA.departmentBreakdown.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 font-bold text-white text-sm">{dept.department}</td>
                  <td className="py-4 text-purple-300 font-bold">{dept.learners}</td>
                  <td className="py-4 text-emerald-400 font-bold">{dept.avgScore}%</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
                      Active Progress
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
