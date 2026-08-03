import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { VOCABULARY_LIST } from '../../data/vocabularyData';
import { VocabularyWord } from '../../types';
import { formatGenericText, getTranslation } from '../../utils/languageUtils';
import {
  BookOpen,
  Search,
  Volume2,
  Copy,
  Check,
  Languages,
  Type,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Play,
  CheckCircle2,
} from 'lucide-react';

export const WorkplaceLearningScreen: React.FC = () => {
  const { setCurrentScreen, config, speakText, progress, setProgress } = useAccessibility();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeWord, setActiveWord] = useState<VocabularyWord>(VOCABULARY_LIST[0]);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const categories = ['All', 'Interview', 'Office', 'Team Meeting', 'HR', 'Emails', 'Professional Behaviour', 'Client Interaction'];

  const filteredWords = VOCABULARY_LIST.filter((w) => {
    const matchesCat = selectedCategory === 'All' || w.category === selectedCategory;
    const matchesSearch =
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.signLanguageGloss.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    setCopiedTemplate(template);
    speakText(`Copied template: ${template}`);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const handleWordSelect = (word: VocabularyWord) => {
    setActiveWord(word);
    speakText(`${word.word}. ${word.meaning}`);
  };

  const markWordMastered = () => {
    setProgress((prev) => ({
      ...prev,
      lessonsCompleted: prev.lessonsCompleted + 1,
      communicationScore: Math.min(100, prev.communicationScore + 1),
    }));
    speakText(`Marked ${activeWord.word} as practiced! Lesson progress updated.`);
  };

  return (
    <div className={`min-h-[calc(100vh-5rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24 ${config.highContrast ? 'text-yellow-300' : 'text-slate-900'}`}>
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
              <BookOpen className="w-4 h-4" />
              <span>MODULE 1 • Workplace Learning</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Workplace Vocabulary & Gloss</h1>
          </div>
        </div>

        <div className="text-xs font-semibold bg-white border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xs">
          <span className="text-indigo-600 font-bold">{VOCABULARY_LIST.length}+ Words</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-600 font-bold">{progress.lessonsCompleted} Mastered</span>
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, sign gloss, or meanings..."
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-xs"
            aria-label="Search vocabulary words"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Vocabulary Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Word List Column */}
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredWords.map((word) => (
            <button
              key={word.id}
              onClick={() => handleWordSelect(word)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                activeWord.id === word.id
                  ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-400 shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
              aria-label={`View word ${word.word}`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-extrabold text-slate-800">{word.word}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 border border-indigo-200">
                    {word.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{word.meaning}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(word.audioText);
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white transition-colors"
                title="Pronounce Word"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </button>
          ))}
        </div>

        {/* Word Detail Card View */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Title Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {activeWord.category}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  {activeWord.difficulty}
                </span>
              </div>
              <h2 className="text-3xl font-black text-slate-900">{activeWord.word}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speakText(`${activeWord.word}. ${activeWord.meaning}. Workplace context: ${activeWord.workplaceContext}`)}
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen Pronunciation</span>
              </button>

              <button
                onClick={markWordMastered}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Practice Complete</span>
              </button>
            </div>
          </div>

          {/* Meaning & Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {getTranslation('Meaning', config.preferredLanguage, config.simpleLanguage)}
              </span>
              <p className="text-sm font-medium text-slate-800">
                {formatGenericText(activeWord.meaning, config.preferredLanguage, config.simpleLanguage)}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {getTranslation('Workplace Context', config.preferredLanguage, config.simpleLanguage)}
              </span>
              <p className="text-sm font-medium text-slate-800">
                {formatGenericText(activeWord.workplaceContext, config.preferredLanguage, config.simpleLanguage)}
              </p>
            </div>
          </div>

          {/* Accessibility Adaptations: Sign Gloss & Dyslexia Phonetics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-indigo-600" />
                Sign Language Gloss
              </span>
              <p className="text-sm font-mono font-bold text-indigo-900 tracking-wider">
                {activeWord.signLanguageGloss}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-sky-600" />
                Dyslexia Phonetic Chunking
              </span>
              <p className="text-sm font-mono font-bold text-sky-900 tracking-wider">
                {activeWord.dyslexiaBreakdown}
              </p>
            </div>
          </div>

          {/* Example Conversation */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              Example Workplace Conversation
            </span>
            <div className="space-y-2 text-xs sm:text-sm">
              {activeWord.exampleConversation.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-indigo-700 shrink-0">{line.speaker}:</span>
                  <span className="text-slate-800">"{line.line}"</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Workplace Response Templates */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1-Click Practice & Quick Response Templates
            </span>
            <div className="space-y-2">
              {activeWord.quickTemplates.map((template, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <span className="text-slate-800 font-medium">"{template}"</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => speakText(template)}
                      className="p-2 rounded-xl bg-indigo-100 hover:bg-indigo-600 text-indigo-700 hover:text-white transition-colors"
                      title="Speak Template Aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopyTemplate(template)}
                      className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
                      title="Copy Template Text"
                    >
                      {copiedTemplate === template ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
