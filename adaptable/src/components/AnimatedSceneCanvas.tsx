import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoScene } from '../types';
import {
  Sparkles,
  Users,
  Brain,
  MessageSquare,
  Lightbulb,
  CheckCircle2,
  Volume2,
  Eye,
  Smile,
  X,
  Zap,
  Info,
  Check,
  Coffee,
  Monitor,
  Building,
  UserCheck,
  Briefcase,
  Layers,
  HelpCircle,
  Video,
  Play,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';

import stickOfficeImg from '../assets/images/stick_figure_office_1785572692241.jpg';
import stickDeskImg from '../assets/images/stick_figure_desk_1785572705788.jpg';
import breakroomImg from '../assets/images/breakroom_coffee_scene_1785573819216.jpg';
import conferenceImg from '../assets/images/conference_scene_1785573835609.jpg';
import managerOfficeImg from '../assets/images/manager_office_scene_1785573849223.jpg';

interface AnimatedSceneCanvasProps {
  currentScene: VideoScene;
  isPlaying: boolean;
  playbackSpeed: number;
  storyTitle: string;
  sceneIndex: number;
  totalScenes: number;
}

type CharacterEmotion = 'happy' | 'focused' | 'thinking' | 'excited';
type WorkplaceSituation = 'auto' | 'breakroom' | 'conference' | 'desk' | 'team_office' | 'manager_office';
type VideoLayoutMode = 'interactive_duo' | 'group_discussion' | 'art_storyboard';

export const AnimatedSceneCanvas: React.FC<AnimatedSceneCanvasProps> = ({
  currentScene,
  isPlaying,
  playbackSpeed,
  storyTitle,
  sceneIndex,
  totalScenes,
}) => {
  const [videoLayout, setVideoLayout] = useState<VideoLayoutMode>('interactive_duo');
  const [mouthOpen, setMouthOpen] = useState(false);
  const [alexEmotion, setAlexEmotion] = useState<CharacterEmotion>('happy');
  const [activePropTooltip, setActivePropTooltip] = useState<string | null>(null);
  const [characterMessage, setCharacterMessage] = useState<{ speaker: string; text: string } | null>(null);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [selectedSituation, setSelectedSituation] = useState<WorkplaceSituation>('auto');
  const [activeSpeakerOverride, setActiveSpeakerOverride] = useState<'alex' | 'morgan' | 'sam' | null>(null);

  // Lip-sync loop for talking cartoon characters
  useEffect(() => {
    if (!isPlaying && !activeSpeakerOverride) {
      setMouthOpen(false);
      return;
    }

    const interval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 140 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeSpeakerOverride]);

  // Reset states when scene changes
  useEffect(() => {
    setUserChoice(null);
    setCharacterMessage(null);
    setActiveSpeakerOverride(null);
  }, [currentScene.id]);

  const isAlexSpeaking =
    activeSpeakerOverride === 'alex' ||
    (!activeSpeakerOverride &&
      (currentScene.avatarType === 'user' ||
        currentScene.speaker?.toLowerCase().includes('you') ||
        currentScene.speaker?.toLowerCase().includes('alex')));

  const isMorganSpeaking =
    activeSpeakerOverride === 'morgan' ||
    (!activeSpeakerOverride &&
      (currentScene.avatarType === 'colleague' ||
        currentScene.avatarType === 'manager' ||
        currentScene.speaker?.toLowerCase().includes('morgan') ||
        currentScene.speaker?.toLowerCase().includes('manager')));

  const isSamSpeaking =
    activeSpeakerOverride === 'sam' ||
    (!activeSpeakerOverride &&
      (currentScene.avatarType === 'narrator' ||
        currentScene.speaker?.toLowerCase().includes('sam') ||
        currentScene.speaker?.toLowerCase().includes('peer')));

  // Automatically determine situation backdrop from current scene type if auto mode
  const getEffectiveSituation = (): WorkplaceSituation => {
    if (selectedSituation !== 'auto') return selectedSituation;

    if (currentScene.type === 'dialogue' || currentScene.illustrationType === 'desk') {
      return 'breakroom';
    }
    if (currentScene.type === 'action_step') {
      return 'conference';
    }
    if (currentScene.type === 'behavior') {
      return 'desk';
    }
    if (currentScene.avatarType === 'manager') {
      return 'manager_office';
    }
    return 'team_office';
  };

  const effectiveSituation = getEffectiveSituation();

  // Get corresponding storybook cartoon background image
  const getSituationImage = () => {
    switch (effectiveSituation) {
      case 'breakroom':
        return breakroomImg;
      case 'conference':
        return conferenceImg;
      case 'manager_office':
        return managerOfficeImg;
      case 'desk':
        return stickDeskImg;
      case 'team_office':
      default:
        return stickOfficeImg;
    }
  };

  const handleAlexClick = () => {
    setActiveSpeakerOverride('alex');
    const messages = [
      "Alex: 'I feel comfortable using clear boundaries and asking for clarification!'",
      "Alex: 'Taking a deep breath helps me process unexpected workplace requests.'",
      "Alex: 'Checking the agenda before meetings helps me participate with confidence!'",
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setCharacterMessage({ speaker: 'Alex', text: randomMsg });

    setTimeout(() => setActiveSpeakerOverride(null), 4000);
  };

  const handleCoachClick = () => {
    setActiveSpeakerOverride('morgan');
    const messages = [
      "Coach Morgan: 'Proactive communication builds psychological safety for everyone!'",
      "Coach Morgan: 'Great job observing tone and non-verbal cues in this interaction!'",
      "Coach Morgan: 'Clear, direct statements reduce anxiety in busy team meetings.'",
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setCharacterMessage({ speaker: 'Coach Morgan', text: randomMsg });

    setTimeout(() => setActiveSpeakerOverride(null), 4000);
  };

  const handleSamClick = () => {
    setActiveSpeakerOverride('sam');
    const messages = [
      "Sam (Peer): 'Hey Alex! Whenever you want to brainstorm, I'm glad to collaborate!'",
      "Sam (Peer): 'Checking in before starting a new task keeps our team aligned!'",
      "Sam (Peer): 'Taking coffee breaks together is a great way to bond relaxed!'",
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setCharacterMessage({ speaker: 'Sam', text: randomMsg });

    setTimeout(() => setActiveSpeakerOverride(null), 4000);
  };

  return (
    <div className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/50 overflow-hidden shadow-2xl select-none group">
      {/* 16:9 Viewport Box */}
      <div className="relative w-full aspect-video min-h-[420px] sm:min-h-[520px] flex flex-col justify-between p-3 sm:p-5 overflow-hidden">

        {/* TOP VIDEO HUD & INTERACTIVE CONTROLS */}
        <div className="relative z-30 flex flex-col gap-2 bg-slate-950/90 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-slate-700/80 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-black tracking-wider uppercase">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                <span>{isPlaying ? '2D ANIMATED CARTOON VIDEO' : 'PAUSED'}</span>
              </span>

              <span className="hidden md:inline-block text-xs font-bold text-slate-200 truncate max-w-[180px]">
                {storyTitle}
              </span>
            </div>

            {/* Video Layout Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setVideoLayout('interactive_duo')}
                className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-extrabold flex items-center gap-1 transition-all ${
                  videoLayout === 'interactive_duo'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>2 Cartoon Dialogue</span>
              </button>

              <button
                onClick={() => setVideoLayout('group_discussion')}
                className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-extrabold flex items-center gap-1 transition-all ${
                  videoLayout === 'group_discussion'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Group Discussion (3 Cartoons)</span>
              </button>

              <button
                onClick={() => setVideoLayout('art_storyboard')}
                className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-extrabold flex items-center gap-1 transition-all ${
                  videoLayout === 'art_storyboard'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Scene Image</span>
              </button>
            </div>

            {/* Scene Index counter */}
            <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-indigo-300 font-mono font-bold">
              Scene {sceneIndex}/{totalScenes}
            </span>
          </div>

          {/* WORKPLACE SITUATION SELECTOR BAR (Exhibits different cartoon scenes) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-[10px] sm:text-xs font-bold scrollbar-none border-t border-slate-800/80">
            <span className="text-slate-400 font-extrabold shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Workplace Situation:
            </span>

            {[
              { id: 'auto', label: '⚡ Auto (Scene Fit)', icon: Sparkles },
              { id: 'breakroom', label: '☕ Coffee Breakroom', icon: Coffee },
              { id: 'conference', label: '📊 Conference Room', icon: Monitor },
              { id: 'manager_office', label: '💼 Manager 1-on-1', icon: Briefcase },
              { id: 'desk', label: '💻 Focus Desk Area', icon: UserCheck },
              { id: 'team_office', label: '🏢 Team Meeting Room', icon: Building },
            ].map((sit) => {
              const IconComp = sit.icon;
              const isSelected = selectedSituation === sit.id;
              return (
                <button
                  key={sit.id}
                  onClick={() => setSelectedSituation(sit.id as WorkplaceSituation)}
                  className={`px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md scale-105'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  <IconComp className="w-3 h-3" />
                  <span>{sit.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE TOOLTIP MODAL OVERLAY */}
        <AnimatePresence>
          {activePropTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-40 bg-black/85 backdrop-blur-md p-6 flex items-center justify-center"
            >
              <div className="bg-slate-900 border-2 border-indigo-500/80 rounded-3xl p-5 max-w-md w-full text-white shadow-2xl relative space-y-3">
                <button
                  onClick={() => setActivePropTooltip(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-indigo-400 font-black text-sm uppercase tracking-wider">
                  <Brain className="w-5 h-5 text-indigo-400" />
                  <span>Workplace Interactive Solution</span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed whitespace-pre-line">
                  {activePropTooltip}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActivePropTooltip(null)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md"
                  >
                    Got It! Continue Video
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CHARACTER CLICK REACTION TOAST */}
        <AnimatePresence>
          {characterMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-yellow-300 text-slate-950 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm shadow-2xl flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
              <span>{characterMessage.text}</span>
              <button
                onClick={() => setCharacterMessage(null)}
                className="ml-2 text-slate-900 hover:text-black font-bold text-xs"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE CANVAS: CARTOON CHARACTERS & SITUATIONAL BACKDROPS */}
        <AnimatePresence mode="wait">
          {videoLayout === 'art_storyboard' ? (
            <motion.div
              key={effectiveSituation}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 flex items-center justify-center"
            >
              <img
                src={getSituationImage()}
                alt="Cartoon Situation Backdrop"
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            </motion.div>
          ) : (
            <motion.div
              key="cartoon_canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 bg-gradient-to-b from-sky-300 via-indigo-100 to-amber-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 flex flex-col justify-end p-2 sm:p-6"
            >
              {/* ANIMATED VECTOR ENVIRONMENT ACCORDING TO SITUATION */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                
                {/* Breakroom environment */}
                {effectiveSituation === 'breakroom' && (
                  <div className="absolute inset-0 bg-amber-900/10 dark:bg-amber-950/40">
                    <div
                      onClick={() =>
                        setActivePropTooltip(
                          "Breakroom Lounge: Taking short breaks with coffee or tea helps regulate sensory energy and provides natural opportunities for friendly small talk."
                        )
                      }
                      className="absolute top-12 left-8 p-2.5 rounded-2xl bg-amber-100 dark:bg-amber-900/80 border-2 border-amber-400 shadow-xl pointer-events-auto cursor-pointer hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-300" />
                      <div>
                        <div className="text-[10px] font-black text-amber-900 dark:text-amber-200 uppercase">
                          Breakroom Lounge
                        </div>
                        <div className="text-[9px] text-amber-700 dark:text-amber-400 font-bold">
                          ☕ Click for Social Tip
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Conference Presentation Environment */}
                {effectiveSituation === 'conference' && (
                  <div className="absolute inset-0 bg-purple-900/10 dark:bg-purple-950/40">
                    <div
                      onClick={() =>
                        setActivePropTooltip(
                          "Conference Presentation: Visual slides, clear bullet points, and written action items make meetings accessible for all neurotypes!"
                        )
                      }
                      className="absolute top-12 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-28 rounded-2xl bg-indigo-900 border-4 border-indigo-400 shadow-2xl p-3 pointer-events-auto cursor-pointer hover:border-amber-400 transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-indigo-200">
                        <span className="text-[10px] font-black uppercase">📊 Team Agenda Slide</span>
                        <Monitor className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div className="bg-indigo-950/80 p-2 rounded-xl text-[10px] font-bold text-indigo-200 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <span>✓</span> Project Milestones & Goal
                        </div>
                        <div className="flex items-center gap-1.5 text-yellow-300">
                          <span>⏱️</span> Q&A & Open Discussion
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Manager 1-on-1 Office Environment */}
                {effectiveSituation === 'manager_office' && (
                  <div className="absolute inset-0 bg-teal-900/10 dark:bg-teal-950/40">
                    <div
                      onClick={() =>
                        setActivePropTooltip(
                          "Manager 1-on-1 Office: Private check-ins provide a quiet space to discuss career progress, express needs, and request workplace accommodations."
                        )
                      }
                      className="absolute top-12 right-8 p-2.5 rounded-2xl bg-teal-100 dark:bg-teal-900/80 border-2 border-teal-400 shadow-xl pointer-events-auto cursor-pointer hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      <Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-300" />
                      <div>
                        <div className="text-[10px] font-black text-teal-900 dark:text-teal-200 uppercase">
                          Manager Office
                        </div>
                        <div className="text-[9px] text-teal-700 dark:text-teal-400 font-bold">
                          🤝 1-on-1 Check-in
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sun & Ambient Lighting Accent */}
                <div className="absolute top-6 left-6 flex items-center gap-2 opacity-80">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-12 h-12 rounded-full bg-amber-400 border-4 border-amber-300 shadow-xl"
                  />
                  <div className="text-2xl animate-pulse">☁️</div>
                </div>

                {/* Floor Line */}
                <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-amber-200 via-amber-100 to-transparent dark:from-slate-900 dark:via-indigo-950 border-t-4 border-amber-300 dark:border-indigo-800" />
              </div>

              {/* MAIN CARTOON CHARACTER STAGE (2 or 3 Talking Cartoon Figures) */}
              <div className="relative z-10 my-auto flex items-end justify-between px-1 sm:px-8 w-full max-w-5xl mx-auto gap-2">

                {/* CARTOON CHARACTER 1: ALEX (Primary Employee/Learner) */}
                <div className="flex flex-col items-center">
                  {/* Floating Speech Bubble */}
                  <AnimatePresence>
                    {isAlexSpeaking && (
                      <motion.div
                        initial={{ scale: 0.7, y: 15, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.7, y: 15, opacity: 0 }}
                        className="mb-2 max-w-[200px] sm:max-w-[260px] p-2.5 sm:p-3 rounded-2xl bg-indigo-600 border-2 border-indigo-300 text-white shadow-2xl relative z-30"
                      >
                        <div className="flex items-center justify-between text-[10px] font-black text-indigo-200 uppercase mb-0.5">
                          <span className="flex items-center gap-1">
                            <Smile className="w-3.5 h-3.5 text-yellow-300" />
                            Alex (You)
                          </span>
                          <span className="text-[9px] bg-indigo-800 px-1.5 py-0.5 rounded-full text-indigo-200">
                            Talking
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold leading-snug">
                          "{currentScene.captionText}"
                        </p>
                        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-600 rotate-45 border-r-2 border-b-2 border-indigo-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Alex SVG Cartoon Character */}
                  <motion.div
                    onClick={handleAlexClick}
                    animate={{
                      y: isAlexSpeaking ? [0, -6, 0] : [0, -2, 0],
                    }}
                    transition={{
                      duration: isAlexSpeaking ? 0.5 : 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative cursor-pointer group/alex hover:scale-105 transition-transform"
                    title="Click Alex to hear Alex speak!"
                  >
                    <svg
                      className="w-32 h-44 sm:w-40 sm:h-56 drop-shadow-2xl"
                      viewBox="0 0 180 240"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* HEAD & HAIR */}
                      <ellipse cx="90" cy="55" rx="30" ry="34" fill="#FDE047" stroke="#1E1B4B" strokeWidth="4" />
                      <path
                        d="M 60 50 C 60 25, 80 15, 100 20 C 120 25, 125 45, 122 55 C 115 40, 95 30, 75 35 C 65 38, 60 50, 60 50 Z"
                        fill="#2563EB"
                        stroke="#1E1B4B"
                        strokeWidth="3"
                      />

                      {/* EYES */}
                      <circle cx="76" cy="52" r="6" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2.5" />
                      <circle cx="104" cy="52" r="6" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2.5" />
                      <circle cx="77" cy="52" r="3" fill="#1E1B4B" />
                      <circle cx="105" cy="52" r="3" fill="#1E1B4B" />

                      {/* Rosy Cheeks */}
                      <circle cx="68" cy="62" r="5" fill="#F472B6" opacity="0.6" />
                      <circle cx="112" cy="62" r="5" fill="#F472B6" opacity="0.6" />

                      {/* Talking Mouth */}
                      {isAlexSpeaking ? (
                        <path
                          d={mouthOpen ? 'M 78 68 Q 90 82 102 68 Z' : 'M 78 68 Q 90 74 102 68'}
                          fill={mouthOpen ? '#EF4444' : '#1E1B4B'}
                          stroke="#1E1B4B"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      ) : (
                        <path d="M 78 66 Q 90 78 102 66" fill="none" stroke="#1E1B4B" strokeWidth="3.5" strokeLinecap="round" />
                      )}

                      {/* TORSO & HOODIE */}
                      <rect x="83" y="86" width="14" height="12" fill="#FDE047" stroke="#1E1B4B" strokeWidth="3" />
                      <path d="M 52 98 L 128 98 L 132 165 L 48 165 Z" fill="#3B82F6" stroke="#1E1B4B" strokeWidth="4" />
                      <path d="M 90 98 L 90 165" stroke="#1E1B4B" strokeWidth="3" />

                      {/* ARMS */}
                      {isAlexSpeaking ? (
                        <g>
                          <path d="M 52 105 L 30 85 L 20 60" stroke="#3B82F6" strokeWidth="14" strokeLinecap="round" />
                          <path d="M 52 105 L 30 85 L 20 60" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="20" cy="60" r="8" fill="#FDE047" stroke="#1E1B4B" strokeWidth="3" />

                          <path d="M 128 105 L 150 125 L 160 145" stroke="#3B82F6" strokeWidth="14" strokeLinecap="round" />
                          <path d="M 128 105 L 150 125 L 160 145" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="160" cy="145" r="8" fill="#FDE047" stroke="#1E1B4B" strokeWidth="3" />
                        </g>
                      ) : (
                        <g>
                          <path d="M 52 105 L 35 135 L 30 155" stroke="#3B82F6" strokeWidth="14" strokeLinecap="round" />
                          <path d="M 52 105 L 35 135 L 30 155" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="30" cy="155" r="8" fill="#FDE047" stroke="#1E1B4B" strokeWidth="3" />

                          <path d="M 128 105 L 145 135 L 150 155" stroke="#3B82F6" strokeWidth="14" strokeLinecap="round" />
                          <path d="M 128 105 L 145 135 L 150 155" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="150" cy="155" r="8" fill="#FDE047" stroke="#1E1B4B" strokeWidth="3" />
                        </g>
                      )}

                      {/* LEGS */}
                      <path d="M 64 165 L 60 220" stroke="#1E293B" strokeWidth="16" strokeLinecap="round" />
                      <path d="M 64 165 L 60 220" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />

                      <path d="M 116 165 L 120 220" stroke="#1E293B" strokeWidth="16" strokeLinecap="round" />
                      <path d="M 116 165 L 120 220" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />

                      <rect x="46" y="218" width="26" height="12" rx="6" fill="#EF4444" stroke="#1E1B4B" strokeWidth="3" />
                      <rect x="108" y="218" width="26" height="12" rx="6" fill="#EF4444" stroke="#1E1B4B" strokeWidth="3" />
                    </svg>

                    <div className="mt-1 px-3 py-1 rounded-full bg-indigo-600 text-white font-black text-xs shadow-lg border border-indigo-300 flex items-center gap-1 group-hover/alex:bg-amber-400 group-hover/alex:text-slate-950 transition-colors">
                      <Sparkles className="w-3 h-3 text-yellow-300 group-hover/alex:text-slate-950" />
                      Alex
                    </div>
                  </motion.div>
                </div>

                {/* CENTER WORKPLACE DESK & INTERACTIVE CHOICE PANEL */}
                <div className="flex flex-col items-center gap-2 mb-2">
                  {/* Interactive Choice Scenario Box */}
                  {currentScene.type === 'dialogue' && userChoice === null && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-3 rounded-2xl bg-slate-900/95 border-2 border-indigo-400 text-white shadow-2xl max-w-[220px] text-center space-y-2 z-30"
                    >
                      <div className="text-[10px] font-black text-indigo-300 uppercase tracking-wider flex items-center justify-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Interactive Video Choice
                      </div>
                      <p className="text-xs font-bold text-slate-200">
                        How should the team respond?
                      </p>
                      <div className="space-y-1.5">
                        <button
                          onClick={() => {
                            setUserChoice(1);
                            setCharacterMessage({ speaker: 'System', text: "Great choice! Clear direct feedback keeps meetings productive." });
                          }}
                          className="w-full p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-left transition-colors flex items-center gap-1.5"
                        >
                          <span className="w-4 h-4 rounded-full bg-indigo-800 text-indigo-200 flex items-center justify-center text-[9px] font-black">
                            A
                          </span>
                          <span>"State idea clearly & directly"</span>
                        </button>

                        <button
                          onClick={() => {
                            setUserChoice(2);
                            setCharacterMessage({ speaker: 'System', text: "Good choice! Taking a moment allows everyone to align." });
                          }}
                          className="w-full p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-left transition-colors flex items-center gap-1.5"
                        >
                          <span className="w-4 h-4 rounded-full bg-purple-800 text-purple-200 flex items-center justify-center text-[9px] font-black">
                            B
                          </span>
                          <span>"Ask for 2 mins to prepare"</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Choice Selected Feedback */}
                  {userChoice !== null && (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 z-30"
                    >
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Option {userChoice === 1 ? 'A' : 'B'} Selected!</span>
                    </motion.div>
                  )}

                  {/* Workstation Desk */}
                  <div className="w-32 sm:w-44 h-16 rounded-2xl bg-amber-800 border-4 border-amber-950 shadow-xl p-2 flex flex-col justify-end items-center relative">
                    <div className="w-18 h-10 rounded-t-lg bg-teal-500 border-2 border-teal-200 flex items-center justify-center text-white text-[8px] font-bold shadow-xs">
                      💻 Workplace
                    </div>
                    <div className="w-20 h-2 rounded-b-md bg-teal-700 border-x-2 border-b-2 border-teal-200" />
                  </div>
                </div>

                {/* CARTOON CHARACTER 2: COACH MORGAN (Manager / Mentor) */}
                <div className="flex flex-col items-center">
                  {/* Floating Speech Bubble */}
                  <AnimatePresence>
                    {isMorganSpeaking && (
                      <motion.div
                        initial={{ scale: 0.7, y: 15, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.7, y: 15, opacity: 0 }}
                        className="mb-2 max-w-[200px] sm:max-w-[260px] p-2.5 sm:p-3 rounded-2xl bg-purple-600 border-2 border-purple-300 text-white shadow-2xl relative z-30"
                      >
                        <div className="flex items-center justify-between text-[10px] font-black text-purple-200 uppercase mb-0.5">
                          <span className="flex items-center gap-1">
                            <Brain className="w-3.5 h-3.5 text-yellow-300" />
                            Coach Morgan
                          </span>
                          <span className="text-[9px] bg-purple-800 px-1.5 py-0.5 rounded-full text-purple-200">
                            Talking
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold leading-snug">
                          "{currentScene.captionText}"
                        </p>
                        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-600 rotate-45 border-r-2 border-b-2 border-purple-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Coach Morgan SVG Cartoon Character */}
                  <motion.div
                    onClick={handleCoachClick}
                    animate={{
                      y: isMorganSpeaking ? [0, -6, 0] : [0, -2, 0],
                    }}
                    transition={{
                      duration: isMorganSpeaking ? 0.5 : 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative cursor-pointer group/morgan hover:scale-105 transition-transform"
                    title="Click Coach Morgan to trigger dialogue!"
                  >
                    <svg
                      className="w-32 h-44 sm:w-40 sm:h-56 drop-shadow-2xl"
                      viewBox="0 0 180 240"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse cx="90" cy="55" rx="30" ry="34" fill="#FCD34D" stroke="#1E1B4B" strokeWidth="4" />
                      <path
                        d="M 55 50 C 50 20, 130 20, 125 50 C 130 65, 125 75, 120 75 C 115 50, 65 50, 60 75 C 55 75, 50 65, 55 50 Z"
                        fill="#10B981"
                        stroke="#1E1B4B"
                        strokeWidth="3"
                      />

                      {/* Glasses */}
                      <rect x="68" y="46" width="16" height="12" rx="3" fill="#E0E7FF" stroke="#1E1B4B" strokeWidth="3" />
                      <rect x="96" y="46" width="16" height="12" rx="3" fill="#E0E7FF" stroke="#1E1B4B" strokeWidth="3" />
                      <line x1="84" y1="52" x2="96" y2="52" stroke="#1E1B4B" strokeWidth="3" />

                      <circle cx="76" cy="52" r="3" fill="#1E1B4B" />
                      <circle cx="104" cy="52" r="3" fill="#1E1B4B" />

                      {/* Talking Mouth */}
                      {isMorganSpeaking ? (
                        <path
                          d={mouthOpen ? 'M 78 68 Q 90 82 102 68 Z' : 'M 78 68 Q 90 74 102 68'}
                          fill={mouthOpen ? '#EF4444' : '#1E1B4B'}
                          stroke="#1E1B4B"
                          strokeWidth="3"
                        />
                      ) : (
                        <path d="M 78 66 Q 90 76 102 66" fill="none" stroke="#1E1B4B" strokeWidth="3.5" />
                      )}

                      {/* Purple Blazer */}
                      <rect x="83" y="86" width="14" height="12" fill="#FCD34D" stroke="#1E1B4B" strokeWidth="3" />
                      <path d="M 50 98 L 130 98 L 134 165 L 46 165 Z" fill="#8B5CF6" stroke="#1E1B4B" strokeWidth="4" />
                      <path d="M 75 98 L 90 125 L 105 98 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2.5" />

                      {/* Arms & Legs */}
                      <path d="M 50 105 L 35 135 L 30 155" stroke="#8B5CF6" strokeWidth="14" strokeLinecap="round" />
                      <path d="M 130 105 L 145 135 L 150 155" stroke="#8B5CF6" strokeWidth="14" strokeLinecap="round" />

                      <path d="M 64 165 L 60 220" stroke="#1E1B4B" strokeWidth="16" strokeLinecap="round" />
                      <path d="M 116 165 L 120 220" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />

                      <rect x="46" y="218" width="26" height="12" rx="6" fill="#10B981" stroke="#1E1B4B" strokeWidth="3" />
                      <rect x="108" y="218" width="26" height="12" rx="6" fill="#10B981" stroke="#1E1B4B" strokeWidth="3" />
                    </svg>

                    <div className="mt-1 px-3 py-1 rounded-full bg-purple-600 text-white font-black text-xs shadow-lg border border-purple-300 flex items-center gap-1 group-hover/morgan:bg-amber-400 group-hover/morgan:text-slate-950 transition-colors">
                      <Brain className="w-3 h-3 text-yellow-300" />
                      Coach Morgan
                    </div>
                  </motion.div>
                </div>

                {/* CARTOON CHARACTER 3: SAM (Peer / Teammate) - Rendered in Group Discussion mode */}
                {videoLayout === 'group_discussion' && (
                  <div className="flex flex-col items-center">
                    {/* Floating Speech Bubble */}
                    <AnimatePresence>
                      {isSamSpeaking && (
                        <motion.div
                          initial={{ scale: 0.7, y: 15, opacity: 0 }}
                          animate={{ scale: 1, y: 0, opacity: 1 }}
                          exit={{ scale: 0.7, y: 15, opacity: 0 }}
                          className="mb-2 max-w-[200px] sm:max-w-[260px] p-2.5 sm:p-3 rounded-2xl bg-orange-600 border-2 border-orange-300 text-white shadow-2xl relative z-30"
                        >
                          <div className="flex items-center justify-between text-[10px] font-black text-orange-200 uppercase mb-0.5">
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-yellow-300" />
                              Sam (Peer)
                            </span>
                            <span className="text-[9px] bg-orange-800 px-1.5 py-0.5 rounded-full text-orange-200">
                              Talking
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-extrabold leading-snug">
                            "{currentScene.captionText}"
                          </p>
                          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-600 rotate-45 border-r-2 border-b-2 border-orange-300" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Sam SVG Cartoon Character */}
                    <motion.div
                      onClick={handleSamClick}
                      animate={{
                        y: isSamSpeaking ? [0, -6, 0] : [0, -2, 0],
                      }}
                      transition={{
                        duration: isSamSpeaking ? 0.5 : 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="relative cursor-pointer group/sam hover:scale-105 transition-transform"
                      title="Click Sam to trigger dialogue!"
                    >
                      <svg
                        className="w-32 h-44 sm:w-40 sm:h-56 drop-shadow-2xl"
                        viewBox="0 0 180 240"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse cx="90" cy="55" rx="30" ry="34" fill="#FDBA74" stroke="#1E1B4B" strokeWidth="4" />
                        <path d="M 60 45 C 60 20, 120 20, 120 45" fill="#EA580C" stroke="#1E1B4B" strokeWidth="3" />

                        {/* Headset */}
                        <path d="M 52 55 C 52 25, 128 25, 128 55" fill="none" stroke="#1E1B4B" strokeWidth="5" />
                        <rect x="48" y="48" width="10" height="18" rx="4" fill="#10B981" stroke="#1E1B4B" strokeWidth="2.5" />
                        <rect x="122" y="48" width="10" height="18" rx="4" fill="#10B981" stroke="#1E1B4B" strokeWidth="2.5" />

                        <circle cx="76" cy="52" r="3" fill="#1E1B4B" />
                        <circle cx="104" cy="52" r="3" fill="#1E1B4B" />

                        {/* Talking Mouth */}
                        {isSamSpeaking ? (
                          <path
                            d={mouthOpen ? 'M 78 68 Q 90 82 102 68 Z' : 'M 78 68 Q 90 74 102 68'}
                            fill={mouthOpen ? '#EF4444' : '#1E1B4B'}
                            stroke="#1E1B4B"
                            strokeWidth="3"
                          />
                        ) : (
                          <path d="M 78 66 Q 90 76 102 66" fill="none" stroke="#1E1B4B" strokeWidth="3.5" />
                        )}

                        {/* Orange Sweater */}
                        <rect x="83" y="86" width="14" height="12" fill="#FDBA74" stroke="#1E1B4B" strokeWidth="3" />
                        <path d="M 50 98 L 130 98 L 134 165 L 46 165 Z" fill="#F97316" stroke="#1E1B4B" strokeWidth="4" />

                        {/* Arms & Legs */}
                        <path d="M 50 105 L 35 135 L 30 155" stroke="#F97316" strokeWidth="14" strokeLinecap="round" />
                        <path d="M 130 105 L 145 135 L 150 155" stroke="#F97316" strokeWidth="14" strokeLinecap="round" />

                        <path d="M 64 165 L 60 220" stroke="#1E1B4B" strokeWidth="16" strokeLinecap="round" />
                        <path d="M 116 165 L 120 220" stroke="#1E1B4B" strokeWidth="16" strokeLinecap="round" />

                        <rect x="46" y="218" width="26" height="12" rx="6" fill="#10B981" stroke="#1E1B4B" strokeWidth="3" />
                        <rect x="108" y="218" width="26" height="12" rx="6" fill="#10B981" stroke="#1E1B4B" strokeWidth="3" />
                      </svg>

                      <div className="mt-1 px-3 py-1 rounded-full bg-orange-600 text-white font-black text-xs shadow-lg border border-orange-300 flex items-center gap-1 group-hover/sam:bg-amber-400 group-hover/sam:text-slate-950 transition-colors">
                        <Users className="w-3 h-3 text-yellow-300" />
                        Sam (Peer)
                      </div>
                    </motion.div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM AUDIO EQUALIZER & ACCESSIBLE SUBTITLES */}
        <div className="relative z-30 space-y-2 mt-auto pt-2">
          {isPlaying && (
            <div className="flex items-center justify-center gap-1.5 h-5">
              {[40, 80, 30, 95, 60, 100, 45, 85, 40, 90, 55, 35, 80].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, (h / 100) * 20, 4] }}
                  transition={{
                    duration: 0.35 + (i % 3) * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 rounded-full bg-gradient-to-t from-yellow-400 via-amber-300 to-emerald-400 shadow-xs"
                />
              ))}
            </div>
          )}

          {/* Karaoke High-Contrast Subtitle Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-black/95 border-2 border-yellow-400 text-yellow-300 font-extrabold text-xs sm:text-sm flex items-center gap-3 shadow-2xl backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-0.5 flex items-center justify-between">
                <span>ACCESSIBLE CARTOON CAPTIONS & VOICE SCRIPT</span>
                <span className="text-[9px] text-yellow-300/80">Interactive Video Mode</span>
              </div>
              <p className="text-white font-black leading-snug">
                {currentScene.captionText}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
