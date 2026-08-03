import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SOCIAL_STORIES_LIST } from '../../data/socialStoriesData';
import { SocialStory } from '../../types';
import { SocialStoryVideoPlayer } from '../SocialStoryVideoPlayer';
import { buildVideoScenesFromStory } from '../../utils/socialStoryVideoBuilder';
import { formatGenericText, getTranslation } from '../../utils/languageUtils';
import {
  Brain,
  Sparkles,
  Volume2,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Lightbulb,
  Plus,
  Video,
  FileText,
} from 'lucide-react';

export const SocialStoriesScreen: React.FC = () => {
  const { setCurrentScreen, config, speakText } = useAccessibility();

  const [activeStory, setActiveStory] = useState<SocialStory>(SOCIAL_STORIES_LIST[0]);
  const [viewMode, setViewMode] = useState<'video' | 'text'>('video');
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);

  const handleSelectStory = (story: SocialStory) => {
    setActiveStory(story);
    speakText(`Selected Social Story: ${story.title}`);
  };

  const handleGenerateCustomStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim() || isGenerating) return;

    setIsGenerating(true);
    speakText(`Generating animated AI video social story for topic: ${customTopic}`);

    try {
      const res = await fetch('/api/gemini/social-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: customTopic,
          userDisabilityType: config.disabilityType,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const rawStory: SocialStory = {
          id: `custom-${Date.now()}`,
          title: json.data.title || customTopic,
          category: 'AI Animated Story',
          situation: json.data.situation,
          expectedBehaviour: json.data.expectedBehaviour,
          stepByStepGuide: json.data.stepByStepGuide || [],
          exampleConversation: json.data.exampleConversation || [],
          keyLearning: json.data.keyLearning,
          sensoryAndCommunicationTips: json.data.sensoryAndCommunicationTips || [],
          videoScenes: json.data.videoScenes,
        };

        // Ensure video scenes are populated
        const generatedStory: SocialStory = {
          ...rawStory,
          videoScenes: buildVideoScenesFromStory(rawStory),
        };

        setActiveStory(generatedStory);
        setViewMode('video');
        setShowGeneratorModal(false);
        setCustomTopic('');
        speakText(`Animated AI Social Story created! Title: ${generatedStory.title}`);
      } else {
        throw new Error('AI social story generation failed');
      }
    } catch (err) {
      alert('Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
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
              <Brain className="w-4 h-4" />
              <span>MODULE 4 • Animated AI Social Stories</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Workplace Behavior & Etiquette</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Mode Switcher Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setViewMode('video')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'video'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Animated Video</span>
            </button>

            <button
              onClick={() => setViewMode('text')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'text'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Text View</span>
            </button>
          </div>

          <button
            onClick={() => setShowGeneratorModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Generate AI Social Story</span>
            <span className="sm:hidden">New Story</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Story List Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Workplace Situation Stories
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold">
              Cognitive Friendly
            </span>
          </div>

          <div className="space-y-2">
            {SOCIAL_STORIES_LIST.map((story) => (
              <button
                key={story.id}
                onClick={() => handleSelectStory(story)}
                className={`w-full text-left p-4 rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  activeStory.id === story.id
                    ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-400 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                    {story.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <Video className="w-3 h-3" />
                    <span>Video Ready</span>
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-800 line-clamp-2">{story.title}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Social Story Viewer / Animated Video Player */}
        <div className="lg:col-span-2">
          {viewMode === 'video' ? (
            <SocialStoryVideoPlayer
              story={activeStory}
              onSwitchToTextMode={() => setViewMode('text')}
            />
          ) : (
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {activeStory.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{activeStory.title}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('video')}
                    className="px-3 py-2 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center gap-1.5 hover:bg-indigo-100 transition-colors shadow-xs"
                  >
                    <Video className="w-4 h-4 text-indigo-600" />
                    <span>Play Animated Video</span>
                  </button>

                  <button
                    onClick={() =>
                      speakText(
                        `Title: ${activeStory.title}. Situation: ${activeStory.situation}. Expected behavior: ${activeStory.expectedBehaviour}. Key learning: ${activeStory.keyLearning}`
                      )
                    }
                    className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
                    title="Read Full Social Story Aloud"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Situation Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  1. The Situation
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-800">
                  {formatGenericText(activeStory.situation, config.preferredLanguage, config.simpleLanguage)}
                </p>
              </div>

              {/* Expected Behaviour Box */}
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  2. Expected Workplace Behaviour
                </span>
                <p className="text-xs sm:text-sm font-medium text-indigo-950">
                  {formatGenericText(activeStory.expectedBehaviour, config.preferredLanguage, config.simpleLanguage)}
                </p>
              </div>

              {/* Step-by-step Guide */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  3. Step-by-Step Action Guide
                </span>
                <ol className="text-xs sm:text-sm text-slate-800 space-y-2 list-decimal list-inside font-medium">
                  {activeStory.stepByStepGuide.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {formatGenericText(step, config.preferredLanguage, config.simpleLanguage)}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Example Conversation */}
              {activeStory.exampleConversation.length > 0 && (
                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    4. Example Dialogue
                  </span>
                  <div className="space-y-2 text-xs sm:text-sm">
                    {activeStory.exampleConversation.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-indigo-700 shrink-0">{item.speaker}:</span>
                        <span className="text-slate-800">
                          "{formatGenericText(item.dialogue, config.preferredLanguage, config.simpleLanguage)}"
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Learning & Sensory Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    Key Learning Takeaway
                  </span>
                  <p className="text-xs text-amber-950 font-medium">{activeStory.keyLearning}</p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-1">
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                    Sensory & Communication Tips
                  </span>
                  <ul className="text-xs text-teal-950 list-disc list-inside space-y-1">
                    {activeStory.sensoryAndCommunicationTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Custom Story Generator Modal */}
      {showGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 max-w-md w-full space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-800">Generate AI Animated Social Story</h3>
              </div>
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Type any workplace scenario you feel unsure about (e.g., "Handling sudden schedule changes", "Asking for salary feedback"). AdaptAble will create an animated video with voiceovers and captions.
            </p>

            <form onSubmit={handleGenerateCustomStory} className="space-y-4">
              <input
                type="text"
                required
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g. Managing sensory noise during open-office meetings"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                type="submit"
                disabled={isGenerating || !customTopic.trim()}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Creating Animated Video Story...</span>
                  </>
                ) : (
                  <span>Generate Animated Video Story</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
