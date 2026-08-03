import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { SocialStory, VideoScene } from '../types';
import { buildVideoScenesFromStory } from '../utils/socialStoryVideoBuilder';
import { AnimatedSceneCanvas } from './AnimatedSceneCanvas';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  Sparkles,
  Users,
  MessageSquare,
  CheckCircle2,
  Brain,
  Lightbulb,
  FileText,
  Video,
  Gauge,
  Headphones,
  Award,
} from 'lucide-react';

interface SocialStoryVideoPlayerProps {
  story: SocialStory;
  onSwitchToTextMode?: () => void;
}

export const SocialStoryVideoPlayer: React.FC<SocialStoryVideoPlayerProps> = ({
  story,
  onSwitchToTextMode,
}) => {
  const { config, speakText, stopSpeaking } = useAccessibility();
  const scenes: VideoScene[] = buildVideoScenesFromStory(story);

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.75 | 1 | 1.25>(1);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const currentScene = scenes[currentSceneIndex] || scenes[0];
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Play voiceover when scene changes or when Play button is pressed
  const playCurrentSceneVoiceover = (autoPlayNext = autoAdvance) => {
    stopSpeaking();
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const textToSpeak = currentScene.voiceoverText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Speed adjustment
    if (config.speechPace === 'very_slow') utterance.rate = 0.65 * playbackSpeed;
    else if (config.speechPace === 'slow') utterance.rate = 0.8 * playbackSpeed;
    else utterance.rate = 1.0 * playbackSpeed;

    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      if (autoPlayNext && currentSceneIndex < scenes.length - 1) {
        setTimeout(() => {
          setCurrentSceneIndex((prev) => prev + 1);
        }, 1200);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Trigger voiceover whenever scene index changes if currently in playing state
  useEffect(() => {
    if (isPlaying) {
      playCurrentSceneVoiceover(autoAdvance);
    } else {
      // Announce scene change briefly via screen reader/speech if not auto-playing
      speakText(`${currentScene.title}: ${currentScene.captionText}`);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSceneIndex]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      playCurrentSceneVoiceover(autoAdvance);
    }
  };

  const handlePrevScene = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  const handleNextScene = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const handleReplayScene = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    playCurrentSceneVoiceover(false);
  };

  // Avatar Icon and Label selector
  const getAvatarMeta = (avatarType?: string, speaker?: string) => {
    switch (avatarType) {
      case 'user':
        return {
          name: speaker || 'Alex (You)',
          role: 'Employee / Learner',
          bg: 'bg-indigo-600',
          ring: 'ring-indigo-400',
          icon: <Users className="w-8 h-8 text-white" />,
        };
      case 'colleague':
        return {
          name: speaker || 'Sam (Colleague)',
          role: 'Team Coworker',
          bg: 'bg-amber-600',
          ring: 'ring-amber-400',
          icon: <Users className="w-8 h-8 text-white" />,
        };
      case 'manager':
        return {
          name: speaker || 'Morgan (Supervisor)',
          role: 'Team Lead / Manager',
          bg: 'bg-teal-600',
          ring: 'ring-teal-400',
          icon: <Award className="w-8 h-8 text-white" />,
        };
      default:
        return {
          name: 'AI Cognitive Guide',
          role: 'Workplace Inclusion Coach',
          bg: 'bg-purple-600',
          ring: 'ring-purple-400',
          icon: <Brain className="w-8 h-8 text-white" />,
        };
    }
  };

  const avatarMeta = getAvatarMeta(currentScene.avatarType, currentScene.speaker);

  // Background Theme colors
  const getThemeGradient = (theme?: string) => {
    switch (theme) {
      case 'emerald':
        return 'from-emerald-950 via-slate-900 to-emerald-900 border-emerald-500/40';
      case 'amber':
        return 'from-amber-950 via-slate-900 to-amber-900 border-amber-500/40';
      case 'teal':
        return 'from-teal-950 via-slate-900 to-teal-900 border-teal-500/40';
      case 'purple':
        return 'from-purple-950 via-slate-900 to-purple-900 border-purple-500/40';
      default:
        return 'from-indigo-950 via-slate-900 to-slate-950 border-indigo-500/40';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <span>Scene {currentSceneIndex + 1} of {scenes.length}</span>
              <span>•</span>
              <span className="text-slate-400">{currentScene.type.replace('_', ' ')}</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">{currentScene.title}</h3>
          </div>
        </div>

        {/* Mode Switcher & Speed Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {([0.75, 1, 1.25] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                  playbackSpeed === spd
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Auto Advance Toggle */}
          <button
            onClick={() => setAutoAdvance(!autoAdvance)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              autoAdvance
                ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Auto Play: {autoAdvance ? 'ON' : 'OFF'}
          </button>

          {/* Switch to Text View */}
          {onSwitchToTextMode && (
            <button
              onClick={onSwitchToTextMode}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Text View</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Video Theater Canvas */}
      <div
        className={`relative w-full rounded-[2.5rem] bg-gradient-to-b ${getThemeGradient(
          currentScene.visualTheme
        )} border p-4 sm:p-6 space-y-6 shadow-2xl transition-all duration-500 overflow-hidden`}
      >
        {/* Animated Scene Canvas Graphic with 2D Puppets & AI Backdrops */}
        <AnimatedSceneCanvas
          currentScene={currentScene}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          storyTitle={story.title}
          sceneIndex={currentSceneIndex + 1}
          totalScenes={scenes.length}
        />

        {/* Dialogue / Voiceover Text Stage Callout */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-white space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-400">
            <span className="flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-indigo-400" />
              Voiceover Script
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px]">
              Speaker: {currentScene.speaker || 'Narrator'}
            </span>
          </div>

          <p className="text-base sm:text-lg font-bold leading-relaxed text-slate-100">
            "{currentScene.voiceoverText}"
          </p>
        </div>

        {/* Subtitle / Karaoke Subtitle Bar (High-contrast for Cognitive Ease) */}
        <div className="p-4 rounded-2xl bg-black/90 border border-yellow-400/40 text-yellow-300 font-bold text-xs sm:text-sm flex items-start gap-3 shadow-md">
          <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] uppercase font-black text-yellow-400 tracking-wider mb-0.5">
              Accessible Captions Subtitle Mode
            </div>
            <div className="leading-snug">{currentScene.captionText}</div>
          </div>
        </div>

        {/* Interactive Scrubbing Timeline Track */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>Video Timeline</span>
            <span>{Math.round(((currentSceneIndex + 1) / scenes.length) * 100)}% Complete</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
            {scenes.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => {
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  setIsPlaying(false);
                  setCurrentSceneIndex(i);
                }}
                className={`h-full flex-1 transition-all border-r border-slate-950 ${
                  i === currentSceneIndex
                    ? 'bg-indigo-500'
                    : i < currentSceneIndex
                    ? 'bg-emerald-500'
                    : 'bg-slate-700/60'
                }`}
                title={`Jump to Scene ${i + 1}: ${sc.title}`}
              />
            ))}
          </div>

          {/* Clickable Scene Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
            {scenes.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => {
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  setIsPlaying(false);
                  setCurrentSceneIndex(i);
                }}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold shrink-0 transition-all ${
                  i === currentSceneIndex
                    ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {i + 1}. {sc.title.slice(0, 18)}...
              </button>
            ))}
          </div>
        </div>

        {/* Video Player Main Action Control Bar */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <button
            onClick={handlePrevScene}
            disabled={currentSceneIndex === 0}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
            title="Previous Scene"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReplayScene}
              className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
              title="Replay Voiceover"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Big Play / Pause Trigger */}
            <button
              onClick={handleTogglePlay}
              className={`px-8 py-4 rounded-2xl font-black text-base flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-6 h-6 fill-current" />
                  <span>Pause Video</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current" />
                  <span>Play Animated Video</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleNextScene}
            disabled={currentSceneIndex === scenes.length - 1}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
            title="Next Scene"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
