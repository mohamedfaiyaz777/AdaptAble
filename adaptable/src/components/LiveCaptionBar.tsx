import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Volume2, VolumeX, Subtitles, Settings, Copy, Check, FastForward, Gauge } from 'lucide-react';
import { formatGenericText } from '../utils/languageUtils';

export const LiveCaptionBar: React.FC = () => {
  const {
    config,
    updateConfig,
    liveCaptionText,
    speakText,
    stopSpeaking,
    isSpeaking,
  } = useAccessibility();

  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!config.liveCaptions) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(liveCaptionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaceChange = (pace: 'normal' | 'slow' | 'very_slow') => {
    updateConfig({ speechPace: pace });
    speakText(`Speech pace set to ${pace.replace('_', ' ')}`);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
        config.highContrast
          ? 'bg-black text-yellow-300 border-t-4 border-yellow-400'
          : 'bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 text-slate-100 shadow-2xl'
      }`}
      role="region"
      aria-label="Live Captions and Audio Controls"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Caption Label & Main Text */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0 mt-0.5">
              <Subtitles className="w-4 h-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Live Captions & Audio Reader
                </span>
                {isSpeaking && (
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md border border-emerald-500/30 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Speaking
                  </span>
                )}
              </div>
              <p
                className={`font-medium tracking-wide leading-snug break-words ${
                  config.fontSize === 'xlarge'
                    ? 'text-xl'
                    : config.fontSize === 'large'
                    ? 'text-lg'
                    : 'text-sm sm:text-base'
                } ${config.dyslexicFont ? 'font-mono' : ''}`}
              >
                {liveCaptionText
                  ? formatGenericText(liveCaptionText, config.preferredLanguage, config.simpleLanguage)
                  : 'Listening for speech or AI responses...'}
              </p>
            </div>
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {/* Play/Stop Audio Button */}
            {isSpeaking ? (
              <button
                onClick={stopSpeaking}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label="Stop Speaking"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                onClick={() => speakText(liveCaptionText)}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Read Captions Aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Read Aloud</span>
              </button>
            )}

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
              title="Copy Caption Text"
              aria-label="Copy Caption Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {/* Pace Settings Expand Button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
              title="Speech Speed Settings"
              aria-label="Speech Speed Settings"
            >
              <Gauge className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Speed Controls Drawer */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <FastForward className="w-3.5 h-3.5 text-purple-400" />
              AI Voice Speed:
            </span>
            <div className="flex items-center gap-1.5">
              {(['normal', 'slow', 'very_slow'] as const).map((pace) => (
                <button
                  key={pace}
                  onClick={() => handlePaceChange(pace)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    config.speechPace === pace
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {pace === 'normal' ? '1.0x Normal' : pace === 'slow' ? '0.75x Slower' : '0.55x Extra Slow'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
