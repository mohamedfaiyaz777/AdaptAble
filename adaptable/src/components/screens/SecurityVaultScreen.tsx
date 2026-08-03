import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Lock, ShieldCheck, ArrowLeft, Key, Download, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

export const SecurityVaultScreen: React.FC = () => {
  const { setCurrentScreen, config, auditLogs, exportEncryptedVault, speakText } = useAccessibility();

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] p-4 sm:p-8 max-w-6xl mx-auto space-y-6 pb-24 ${
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
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ENTERPRISE SECURITY & DATA PRIVACY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">E2EE Data Vault & Audit Log</h1>
          </div>
        </div>

        <button
          onClick={exportEncryptedVault}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Vault (.cbv)</span>
        </button>
      </div>

      {/* Security Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Encryption Cipher</span>
          <div className="text-2xl font-black text-emerald-400">AES-GCM-256</div>
          <p className="text-[11px] text-slate-400">Client-side WebCrypto API Key Derivation</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Storage Location</span>
          <div className="text-2xl font-black text-purple-400">Local Vault</div>
          <p className="text-[11px] text-slate-400">Zero Server Practice Audio Retention</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Audit Trail State</span>
          <div className="text-2xl font-black text-blue-400">{auditLogs.length} Events</div>
          <p className="text-[11px] text-slate-400">Tamper-evident system event log</p>
        </div>
      </div>

      {/* System Security Audit Logs Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Security & Session Audit Trail
          </h2>
          <span className="text-xs text-slate-400 font-mono">ENCRYPTED LOG LOG-8820</span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {auditLogs.map((log, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{log.event}</span>
              </div>
              <span className="text-slate-500 font-sans text-[11px] shrink-0 ml-2">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
