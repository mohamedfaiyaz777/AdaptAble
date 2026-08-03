import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SIMULATION_SCENARIOS } from '../../data/simulationsData';
import { SimulationRole, SimulationScenario, SimulationMessage } from '../../types';
import { formatGenericText, getTranslation } from '../../utils/languageUtils';
import {
  Briefcase,
  UserCheck,
  Clock,
  Calendar,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
  Send,
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  Award,
  RotateCcw,
} from 'lucide-react';

export const SimulatorScreen: React.FC = () => {
  const { setCurrentScreen, config, speakText, progress, setProgress, user } = useAccessibility();

  const [activeScenario, setActiveScenario] = useState(SIMULATION_SCENARIOS[0]);
  const [selectedRole, setSelectedRole] = useState<SimulationRole>(SIMULATION_SCENARIOS[0].defaultRole);
  const [messages, setMessages] = useState<SimulationMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: SIMULATION_SCENARIOS[0].initialPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [overallSessionScore, setOverallSessionScore] = useState<number | null>(null);

  const rolesList: SimulationRole[] = ['HR Manager', 'Boss', 'Team Leader', 'Client', 'Coworker'];

  const handleSelectScenario = (sc: typeof activeScenario) => {
    setActiveScenario(sc);
    setSelectedRole(sc.defaultRole);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: sc.initialPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setSessionCompleted(false);
    setOverallSessionScore(null);
    speakText(`Selected scenario: ${sc.title}. ${sc.initialPrompt}`);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const newMsgUser: SimulationMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, newMsgUser];
    setMessages(updatedMessages);
    setIsSending(true);

    try {
      const res = await fetch('/api/gemini/simulation-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: selectedRole,
          scenario: activeScenario.scenario,
          conversationHistory: updatedMessages,
          userMessage: userText,
          userDisabilityType: config.disabilityType,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const aiResponseText = json.data.aiRoleResponse;
        const score = json.data.communicationScore || 85;
        const betterAlt = json.data.betterAlternative;

        const newMsgAi: SimulationMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          score,
          betterAlternative: betterAlt,
        };

        setMessages((prev) => [...prev, newMsgAi]);
        speakText(`${selectedRole} says: ${aiResponseText}`);

        if (json.data.isScenarioComplete || updatedMessages.length >= 6) {
          setSessionCompleted(true);
          setOverallSessionScore(score);
          setProgress((prev) => ({
            ...prev,
            interviewScore: Math.round((prev.interviewScore + score) / 2),
            lessonsCompleted: prev.lessonsCompleted + 1,
          }));
        }
      } else {
        throw new Error('Simulation endpoint failed');
      }
    } catch (err) {
      // Fallback
      const fallbackAiMsg: SimulationMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Thank you for presenting your perspective so clearly. Let us move forward with those agreed guidelines.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        score: 88,
        betterAlternative: 'I appreciate your feedback and am fully aligned on our execution plan.',
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
      speakText(fallbackAiMsg.text);
      if (updatedMessages.length >= 4) {
        setSessionCompleted(true);
        setOverallSessionScore(88);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-5rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24 ${
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
              <Briefcase className="w-4 h-4" />
              <span>MODULE 3 • Workplace Simulator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">AI Roleplay & Workplace Scenarios</h1>
          </div>
        </div>

        {/* Selected Role Badge */}
        <div className="flex items-center gap-2 bg-indigo-50 px-3.5 py-2 rounded-2xl border border-indigo-200 text-indigo-700 text-xs font-bold">
          <UserCheck className="w-4 h-4 text-indigo-600" />
          <span>Roleplaying as: {selectedRole}</span>
        </div>
      </div>

      {/* Scenario Selection Cards Bar */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Select Workplace Scenario
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SIMULATION_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`p-3.5 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                activeScenario.id === sc.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <div className="text-xs font-extrabold line-clamp-1">{sc.title}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{sc.defaultRole}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Role Selection Switcher */}
      <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200 w-fit">
        <span className="text-xs font-bold text-slate-500 px-2 uppercase tracking-wider">Change AI Role:</span>
        {rolesList.map((r) => (
          <button
            key={r}
            onClick={() => {
              setSelectedRole(r);
              speakText(`Changed AI role to ${r}`);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              selectedRole === r
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Main Simulation Chat Window */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-4 sm:p-6 shadow-sm flex flex-col min-h-[450px] max-h-[600px] justify-between">
        {/* Messages Stream */}
        <div className="overflow-y-auto space-y-4 pr-2 flex-1 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {msg.sender === 'user' ? user.name : selectedRole}
                </span>
                <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => speakText(`${selectedRole} says: ${msg.text}`)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Read Aloud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-br-none shadow-md'
                    : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-bl-none shadow-md'
                }`}
              >
                {formatGenericText(msg.text, config.preferredLanguage, config.simpleLanguage)}
              </div>

              {/* Better Alternative Tip box */}
              {msg.betterAlternative && (
                <div className="mt-2 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs max-w-xl">
                  <span className="font-bold text-amber-400">💡 Polished Alternative:</span> "{formatGenericText(msg.betterAlternative, config.preferredLanguage, config.simpleLanguage)}"
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 text-xs text-purple-400 animate-pulse font-medium">
              <Sparkles className="w-4 h-4" />
              <span>{selectedRole} is formulating workplace response...</span>
            </div>
          )}
        </div>

        {/* Completed Session Overlay Banner */}
        {sessionCompleted && (
          <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/40 text-emerald-200 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm text-white">Scenario Completed!</span>
              </div>
              <p className="text-xs text-slate-300">Communication Score: {overallSessionScore || 88} / 100</p>
            </div>
            <button
              onClick={() => handleSelectScenario(activeScenario)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Scenario</span>
            </button>
          </div>
        )}

        {/* Input Controls Form */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t border-slate-800 pt-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isSending || sessionCompleted}
            placeholder={`Type your response to ${selectedRole}...`}
            className="flex-1 bg-slate-800 border border-slate-700/80 rounded-2xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isSending || !inputMessage.trim() || sessionCompleted}
            className="py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
