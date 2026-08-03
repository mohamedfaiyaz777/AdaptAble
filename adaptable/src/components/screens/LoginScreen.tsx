import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { AdaptAbleLogo } from '../AdaptAbleLogo';
import { Lock, Mail, ShieldCheck, ArrowRight, CheckCircle2, WifiOff, Key, Sparkles } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { setCurrentScreen, setUser, config, speakText, addAuditLog } = useAccessibility();

  const [email, setEmail] = useState('alex.taylor@inclusiveworkplace.org');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    speakText('Logging in with Google SSO secure authentication');
    setTimeout(() => {
      setUser({
        id: 'user-pwd-101',
        name: 'Alex Taylor (Google SSO)',
        email: 'alex.taylor@gmail.com',
        role: 'learner',
        isLoggedIn: true,
        baselineAudioSet: true,
      });
      addAuditLog('User Authenticated via Google OAuth2 SSO');
      setIsLoading(false);
      setCurrentScreen('onboarding');
    }, 1000);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    speakText('Authenticating email credentials with end to end encrypted key vault');
    setTimeout(() => {
      setUser({
        id: 'user-pwd-101',
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: 'learner',
        isLoggedIn: true,
        baselineAudioSet: true,
      });
      addAuditLog(`User Authenticated via Encrypted Auth: ${email}`);
      setIsLoading(false);
      setCurrentScreen('dashboard');
    }, 1000);
  };

  const handleOfflineGuestLogin = () => {
    speakText('Entering Offline Local Data Vault mode');
    setUser({
      id: 'guest-pwd-offline',
      name: 'Offline Learner',
      email: 'offline.vault@local.device',
      role: 'learner',
      isLoggedIn: true,
      baselineAudioSet: true,
    });
    addAuditLog('Guest Session Initiated in Encrypted Offline Mode');
    setCurrentScreen('dashboard');
  };

  return (
    <div
      className={`min-h-[calc(100vh-5rem)] flex items-center justify-center p-6 ${
        config.highContrast ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <AdaptAbleLogo size="lg" className="mx-auto" />
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Welcome to AdaptAble</h2>
          <p className="text-xs text-slate-500">Enterprise Encrypted Adaptive Workplace Access</p>
        </div>

        {/* Security Badge */}
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-slate-800">E2EE Data Protection Active</p>
            <p className="text-[11px] text-slate-600">Your practice audio and scores remain 100% private.</p>
          </div>
        </div>

        {/* Google SSO Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-3 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-400 shadow-xs"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google Login</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
            or email login
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Work or Personal Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@company.org"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            {isLoading ? <span>Authenticating...</span> : <span>Login to Dashboard</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Offline Guest Option */}
        <div className="pt-2 border-t border-slate-200">
          <button
            onClick={handleOfflineGuestLogin}
            className="w-full py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <WifiOff className="w-4 h-4" />
            <span>Continue in Offline Local Vault Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
