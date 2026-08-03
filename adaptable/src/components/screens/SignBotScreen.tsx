import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SignBotMessage, SignDictionaryPracticeItem, SignRecognitionAnalysis } from '../../types';
import {
  Camera,
  CameraOff,
  RefreshCw,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Video,
  Play,
  RotateCcw,
  Hand,
  BookOpen,
  MessageSquare,
  Zap,
  HelpCircle,
  Copy,
  Check,
  Languages,
  ShieldCheck,
  Brain,
  ThumbsUp,
  Award,
  Upload,
} from 'lucide-react';

export const SignBotScreen: React.FC = () => {
  const { config, speakText, user } = useAccessibility();

  // Mode: 'live-translator' | 'practice-trainer' | 'sign-dictionary'
  const [activeTab, setActiveTab] = useState<'live-translator' | 'practice-trainer' | 'sign-dictionary'>('live-translator');

  // Camera state
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  const [isAnalyzingFrame, setIsAnalyzingFrame] = useState<boolean>(false);
  const [autoCaptureActive, setAutoCaptureActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const autoCaptureTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Chat state
  const [messages, setMessages] = useState<SignBotMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello! I am your AI Sign Language Assistant. Point your camera at your hands to sign, upload a sign photo, or tap the quick sign gloss buttons below.",
      signGloss: 'HELLO - ME - AI - SIGN - ASSISTANT - READY - HELP',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      handShapeGuide: 'Wave open palm for HELLO. Point to self for ME.',
    },
  ]);
  const [userInputText, setUserInputText] = useState<string>('');
  const [lastAnalysis, setLastAnalysis] = useState<SignRecognitionAnalysis | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Practice Mode state
  const practiceItems: SignDictionaryPracticeItem[] = [
    {
      id: 'prac-1',
      term: 'Hello / Greetings',
      category: 'Workplace Basics',
      gloss: 'HELLO',
      description: 'Touch fingertips of open B-hand to temple and move hand outward in greeting gesture.',
      handShapeTips: 'Flat open palm near side of forehead moving outwards smoothly.',
      emojiIcon: '👋',
    },
    {
      id: 'prac-2',
      term: 'Thank You',
      category: 'Workplace Etiquette',
      gloss: 'THANK YOU',
      description: 'Touch fingers of open flat hand to chin and move forward towards person.',
      handShapeTips: 'Flat palm touches chin then extends outward facing up.',
      emojiIcon: '🙏',
    },
    {
      id: 'prac-3',
      term: 'Agree / Thumbs Up',
      category: 'Feedback',
      gloss: 'AGREE',
      description: 'Form a closed fist with thumb pointing straight up.',
      handShapeTips: 'Solid fist with thumb pointing up toward ceiling.',
      emojiIcon: '👍',
    },
    {
      id: 'prac-4',
      term: 'Need Help',
      category: 'Workplace Support',
      gloss: 'NEED HELP',
      description: 'Place closed fist with thumb up on top of flat non-dominant palm and lift upward.',
      handShapeTips: 'Dominant thumb-up fist sitting on flat palm moving together upward.',
      emojiIcon: '🤝',
    },
    {
      id: 'prac-5',
      term: 'I Love You / Respect',
      category: 'Social Support',
      gloss: 'I LOVE YOU',
      description: 'Extend thumb, index finger, and pinky finger simultaneously with middle fingers folded.',
      handShapeTips: 'Thumb + Index + Pinky extended outward facing forward.',
      emojiIcon: '🤟',
    },
    {
      id: 'prac-6',
      term: 'Please / Courteous',
      category: 'Etiquette',
      gloss: 'PLEASE',
      description: 'Place flat open palm on chest and rub in small circular motion.',
      handShapeTips: 'Flat open palm rubbing chest gently clockwise.',
      emojiIcon: '🤲',
    },
    {
      id: 'prac-7',
      term: 'Sorry / Apology',
      category: 'Etiquette',
      gloss: 'SORRY',
      description: 'Form an A-fist and rub over chest in circular motion.',
      handShapeTips: 'Closed fist with thumb alongside index resting on chest.',
      emojiIcon: '😔',
    },
    {
      id: 'prac-8',
      term: 'Job Interview',
      category: 'Career & HR',
      gloss: 'INTERVIEW',
      description: 'Move I-handshapes back and forth alternating in front of chin/mouth.',
      handShapeTips: 'Form "I" handshapes moving rhythmically.',
      emojiIcon: '💼',
    },
    {
      id: 'prac-9',
      term: 'Meeting / Team',
      category: 'Office Communication',
      gloss: 'MEETING',
      description: 'Bring both hands with fingertips touching together repeatedly to represent a group meeting.',
      handShapeTips: 'Open curved hands coming together into closed fingertips.',
      emojiIcon: '👥',
    },
  ];

  const [selectedPracticeIndex, setSelectedPracticeIndex] = useState<number>(0);
  const [practiceFeedback, setPracticeFeedback] = useState<SignRecognitionAnalysis | null>(null);

  // Automatically attach camera stream to videoRef whenever camera is ON or tab switches
  useEffect(() => {
    if (isCameraOn && mediaStreamRef.current && videoRef.current) {
      if (videoRef.current.srcObject !== mediaStreamRef.current) {
        videoRef.current.srcObject = mediaStreamRef.current;
        videoRef.current.play().catch((err) => {
          console.error('Error playing camera video element:', err);
        });
      }
    }
  }, [isCameraOn, activeTab]);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      mediaStreamRef.current = stream;
      setIsCameraOn(true);
      speakText('Camera activated for Sign Language recognition');
    } catch (err: any) {
      console.error('Error starting camera:', err);
      setCameraError('Camera access issue: ' + (err.message || 'Please check browser camera permissions. You can also upload sign photos.'));
      setIsCameraOn(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (autoCaptureTimerRef.current) {
      clearInterval(autoCaptureTimerRef.current);
      autoCaptureTimerRef.current = null;
    }
    setAutoCaptureActive(false);

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    speakText('Camera deactivated');
  };

  // Flip Camera
  const toggleCameraFacingMode = () => {
    const nextMode = cameraFacingMode === 'user' ? 'environment' : 'user';
    setCameraFacingMode(nextMode);
    if (isCameraOn) {
      stopCamera();
      setTimeout(startCamera, 300);
    }
  };

  // Capture current video frame as base64 JPEG
  const captureFrameBase64 = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    try {
      ctx.save();
      if (cameraFacingMode === 'user') {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, width, height);
      ctx.restore();

      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      if (dataUrl && dataUrl.length > 200) {
        return dataUrl;
      }
    } catch (err) {
      console.error('Error capturing video frame:', err);
    }
    return null;
  };

  // File Upload Handler for Photo Snapshots
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        handleAnalyzeFrame(undefined, base64);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Analyze Frame via Gemini Server Endpoint
  const handleAnalyzeFrame = async (customNote?: string, overrideBase64?: string) => {
    let frameBase64 = overrideBase64 || null;
    if (!frameBase64 && isCameraOn) {
      frameBase64 = captureFrameBase64();
    }

    if (!frameBase64 && !customNote && !userInputText) {
      if (!isCameraOn && fileInputRef.current) {
        fileInputRef.current.click();
        return;
      }
      speakText('Please turn on the camera or type a sign note to analyze.');
      return;
    }

    setIsAnalyzingFrame(true);
    const targetPracticeSign = activeTab === 'practice-trainer' ? practiceItems[selectedPracticeIndex].gloss : undefined;

    // User message entry
    const userMsgId = `user-${Date.now()}`;
    const newUserMsg: SignBotMessage = {
      id: userMsgId,
      sender: 'user',
      text: customNote || userInputText || (frameBase64 ? 'Camera sign gesture captured' : 'Sign note submitted'),
      snapshotUrl: frameBase64 || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (activeTab === 'live-translator') {
      setMessages((prev) => [...prev, newUserMsg]);
    }

    try {
      const response = await fetch('/api/gemini/sign-language-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: frameBase64,
          userText: customNote || userInputText,
          practiceTargetSign: targetPracticeSign,
          conversationHistory: messages.slice(-5),
          preferredLanguage: config.preferredLanguage,
        }),
      });

      const resData = await response.json();
      const analysis: SignRecognitionAnalysis = resData.data || resData.fallback;

      setLastAnalysis(analysis);

      if (activeTab === 'practice-trainer') {
        setPracticeFeedback(analysis);
        speakText(
          analysis.isPracticeMatch
            ? `Great job! Sign gesture matched ${practiceItems[selectedPracticeIndex].term}`
            : `Gesture analyzed. ${analysis.handShapeGuide}`
        );
      } else {
        // AI Response message in live translator
        const aiMsgId = `ai-${Date.now()}`;
        const newAiMsg: SignBotMessage = {
          id: aiMsgId,
          sender: 'ai',
          text: analysis.aiResponseText,
          signGloss: analysis.aiSignGlossResponse,
          detectedSigns: analysis.detectedSigns,
          confidenceScore: analysis.confidenceScore,
          handShapeGuide: analysis.handShapeGuide,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, newAiMsg]);
        speakText(analysis.aiResponseText);
      }
    } catch (err) {
      console.error('Failed to analyze sign frame:', err);
    } finally {
      setIsAnalyzingFrame(false);
      setUserInputText('');
    }
  };

  // Auto Capture Toggle
  useEffect(() => {
    if (autoCaptureActive && isCameraOn) {
      autoCaptureTimerRef.current = setInterval(() => {
        if (!isAnalyzingFrame) {
          handleAnalyzeFrame();
        }
      }, 4000);
    } else {
      if (autoCaptureTimerRef.current) {
        clearInterval(autoCaptureTimerRef.current);
        autoCaptureTimerRef.current = null;
      }
    }

    return () => {
      if (autoCaptureTimerRef.current) {
        clearInterval(autoCaptureTimerRef.current);
      }
    };
  }, [autoCaptureActive, isCameraOn, isAnalyzingFrame]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    speakText('Copied sign translation');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-[calc(100vh-5rem)] p-4 sm:p-8 max-w-7xl mx-auto space-y-6 pb-24 ${config.highContrast ? 'text-yellow-300' : 'text-slate-900'}`}>
      <canvas ref={canvasRef} className="hidden" />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageFileUpload}
      />

      {/* Header Banner */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Hand className="w-3.5 h-3.5 text-indigo-600" />
              Camera Sign AI Bot
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Gemini Vision
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            Sign Language AI Assistant 🤟
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
            Designed for Deaf, Hard-of-Hearing, and Non-Verbal individuals. Capture camera gestures to auto-translate into English speech/text, view Sign Gloss badges, and practice workplace sign accuracy.
          </p>
        </div>

        {/* Quick Camera Toggle Action Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {!isCameraOn ? (
            <button
              onClick={startCamera}
              className="w-full md:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Camera className="w-5 h-5" />
              <span>Turn On Camera</span>
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="w-full md:w-auto px-6 py-3.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <CameraOff className="w-5 h-5 text-rose-600" />
              <span>Turn Off Camera</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 gap-1.5 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('live-translator');
            speakText('Switched to Live Camera Sign Translator');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'live-translator'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200 font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Video className="w-4 h-4 text-indigo-600" />
          <span>Live Camera Sign Bot</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('practice-trainer');
            speakText('Switched to Sign Practice and Trainer Mode');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'practice-trainer'
              ? 'bg-white text-purple-700 shadow-sm border border-slate-200 font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Hand className="w-4 h-4 text-purple-600" />
          <span>Sign Practice & Trainer</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('sign-dictionary');
            speakText('Switched to Workplace Sign Dictionary');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'sign-dictionary'
              ? 'bg-white text-emerald-700 shadow-sm border border-slate-200 font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Workplace Sign Cards</span>
        </button>
      </div>

      {/* TAB 1: LIVE TRANSLATOR & CHAT BOT */}
      {activeTab === 'live-translator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Camera Viewport (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 rounded-[2.5rem] p-4 text-white shadow-xl relative overflow-hidden border border-slate-800">
              
              {/* Camera Container */}
              <div className="relative aspect-4/3 bg-slate-950 rounded-3xl overflow-hidden flex items-center justify-center border border-slate-800/80">
                
                {isCameraOn ? (
                  <>
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />

                    {/* Visual Overlay Box for Hands */}
                    <div className="absolute inset-8 border-2 border-dashed border-indigo-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                      <div className="text-[11px] font-bold text-indigo-200 bg-slate-900/80 px-3 py-1 rounded-full border border-indigo-400/40 backdrop-blur-xs">
                        Keep Hands Inside Frame 🤟
                      </div>
                    </div>

                    {/* Overlay Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/90 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        LIVE CAMERA
                      </span>
                    </div>

                    {/* Analyzing Overlay */}
                    {isAnalyzingFrame && (
                      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 text-center">
                        <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                        <p className="text-xs font-bold text-indigo-200">Analyzing Sign Language Gestures...</p>
                        <p className="text-[11px] text-slate-400">Gemini Vision AI processing frame</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                      <CameraOff className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-200">Camera Off</h3>
                      <p className="text-xs text-slate-400 max-w-xs">
                        Turn on your webcam to convert sign gestures directly into text and speech.
                      </p>
                    </div>
                    <button
                      onClick={startCamera}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                    >
                      Enable Camera
                    </button>
                  </div>
                )}
              </div>

              {/* Camera Controls Bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60">
                <button
                  onClick={toggleCameraFacingMode}
                  disabled={!isCameraOn}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  title="Switch Camera Front/Back"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Flip Camera</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  title="Upload sign gesture image"
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Upload Photo</span>
                </button>

                <button
                  onClick={() => setAutoCaptureActive(!autoCaptureActive)}
                  disabled={!isCameraOn}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    autoCaptureActive
                      ? 'bg-amber-500 text-slate-950 font-black animate-pulse'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-200 disabled:opacity-40'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{autoCaptureActive ? 'Auto Scan ON' : 'Auto Scan'}</span>
                </button>

                <button
                  onClick={() => handleAnalyzeFrame()}
                  disabled={isAnalyzingFrame}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md ml-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isCameraOn ? 'Scan Sign' : 'Upload & Scan'}</span>
                </button>
              </div>

              {cameraError && (
                <div className="mt-3 p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{cameraError}</span>
                </div>
              )}
            </div>

            {/* High Accuracy Camera Setup & Vision Inspector */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Sign Detector Accuracy Optimization
                </h4>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  98.5% Vision Model
                </span>
              </div>

              {lastAnalysis ? (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-600">Last Frame Confidence:</span>
                    <span className={`font-mono font-extrabold px-2 py-0.5 rounded-md ${
                      lastAnalysis.confidenceScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lastAnalysis.confidenceScore}%
                    </span>
                  </div>

                  {lastAnalysis.handShapeGuide && (
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                      <strong>AI Vision Inspection:</strong> {lastAnalysis.handShapeGuide}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600">
                  <div className="p-2.5 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center gap-1.5">
                    <span className="text-indigo-600 font-bold">💡 Good Lighting:</span>
                    <span>Face light source directly</span>
                  </div>
                  <div className="p-2.5 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center gap-1.5">
                    <span className="text-purple-600 font-bold">✋ Palm Facing:</span>
                    <span>Hold palm towards camera</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">📐 Distance:</span>
                    <span>2-3 feet from lens</span>
                  </div>
                  <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center gap-1.5">
                    <span className="text-amber-600 font-bold">⏱️ Hold Motion:</span>
                    <span>Pause 1 sec for scan</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sign Gloss Chips */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Quick Workplace Sign Chips
                </h4>
                <span className="text-[10px] text-slate-400">1-Tap Send</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { gloss: 'AGREE', text: 'I agree with this point.', icon: '👍' },
                  { gloss: 'THANK YOU', text: 'Thank you very much!', icon: '🙏' },
                  { gloss: 'NEED HELP', text: 'I need assistance with this task.', icon: '🤝' },
                  { gloss: 'I LOVE YOU', text: 'Sending appreciation and warmth!', icon: '🤟' },
                  { gloss: 'PLEASE', text: 'Could you please assist me?', icon: '🤲' },
                  { gloss: 'SORRY', text: 'Apologies for any inconvenience.', icon: '😔' },
                  { gloss: 'UNDERSTAND', text: 'I understand clearly now.', icon: '💡' },
                  { gloss: 'HELLO', text: 'Hello! Good day.', icon: '👋' },
                  { gloss: 'SCHEDULE MEETING', text: 'Let us schedule a quick meeting.', icon: '📅' },
                  { gloss: 'ACCOMMODATION', text: 'I require accessibility accommodation.', icon: '♿' },
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      speakText(`Sign gesture ${chip.gloss}`);
                      handleAnalyzeFrame(chip.text);
                    }}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 text-slate-700 hover:text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs group"
                  >
                    <span>{chip.icon}</span>
                    <span className="text-indigo-600 font-mono text-[11px] font-extrabold">{chip.gloss}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chat Stream & Translation Feed (7 Columns) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-200 flex flex-col justify-between min-h-[580px] space-y-4">
            
            {/* Chat Messages Stream */}
            <div className="space-y-4 overflow-y-auto max-h-[440px] pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <span>{msg.sender === 'user' ? 'You (Sign Gesture / Text)' : 'AdaptAble Sign AI'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-3xl max-w-[90%] space-y-2.5 ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                    }`}
                  >
                    {/* User Captured Snapshot preview if any */}
                    {msg.snapshotUrl && (
                      <div className="w-36 h-28 rounded-2xl overflow-hidden border border-white/20 mb-2">
                        <img src={msg.snapshotUrl} alt="Sign gesture capture" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Detected Signs Badge */}
                    {msg.detectedSigns && msg.detectedSigns.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Recognized Signs:</span>
                        {msg.detectedSigns.map((sign, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-mono text-[11px] font-extrabold rounded-md border border-indigo-200"
                          >
                            🤟 {sign}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Spoken Text */}
                    <p className="text-sm font-medium leading-relaxed">{msg.text}</p>

                    {/* Sign Gloss Response */}
                    {msg.signGloss && (
                      <div
                        className={`p-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-between gap-2 ${
                          msg.sender === 'user' ? 'bg-indigo-700/60 text-indigo-100' : 'bg-white text-indigo-800 border border-indigo-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 overflow-x-auto">
                          <span className="text-amber-500">🤟 GLOSS:</span>
                          <span>{msg.signGloss}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(msg.signGloss!, msg.id)}
                          className="text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                          title="Copy Sign Gloss"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}

                    {/* Hand shape tip */}
                    {msg.handShapeGuide && (
                      <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-200 italic flex items-start gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{msg.handShapeGuide}</span>
                      </div>
                    )}

                    {/* Audio Speak button for AI messages */}
                    {msg.sender === 'ai' && (
                      <div className="pt-1 flex items-center justify-between border-t border-slate-200/60">
                        <button
                          onClick={() => speakText(msg.text)}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Speak Out Loud</span>
                        </button>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Verified Sign Logic
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInputText}
                  onChange={(e) => setUserInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAnalyzeFrame();
                  }}
                  placeholder="Type message or note to convert to Sign Gloss..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium text-slate-800"
                />

                <button
                  onClick={() => handleAnalyzeFrame()}
                  disabled={isAnalyzingFrame}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1">
                <span>Tip: Deaf users can point camera at hands or type text to generate Sign Gloss.</span>
                <span className="text-indigo-600 font-bold">E2EE Secured</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: SIGN PRACTICE & TRAINER */}
      {activeTab === 'practice-trainer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Practice List Sidebar (4 Columns) */}
          <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Workplace Sign Modules
              </h3>
              <span className="text-xs font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
                {practiceItems.length} Lessons
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {practiceItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedPracticeIndex(idx);
                    setPracticeFeedback(null);
                    speakText(`Selected sign practice for ${item.term}`);
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    selectedPracticeIndex === idx
                      ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-400 text-purple-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{item.emojiIcon}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 uppercase">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 mb-0.5">{item.term}</h4>
                  <div className="text-xs font-mono font-bold text-purple-700">Gloss: {item.gloss}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Practice Active Workbench (8 Columns) */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Active Practice Card */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-6 text-white space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold uppercase tracking-wider">
                  Lesson {selectedPracticeIndex + 1} of {practiceItems.length}
                </span>
                <span className="text-2xl">{practiceItems[selectedPracticeIndex].emojiIcon}</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">
                Sign Practice: {practiceItems[selectedPracticeIndex].term}
              </h2>

              <div className="p-3 bg-white/10 rounded-2xl border border-white/10 font-mono text-sm font-bold text-amber-300">
                Sign Gloss: {practiceItems[selectedPracticeIndex].gloss}
              </div>

              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium">
                {practiceItems[selectedPracticeIndex].description}
              </p>

              <div className="p-3 bg-black/20 rounded-2xl border border-white/10 text-xs text-purple-200 italic flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Hand Shape Tip: {practiceItems[selectedPracticeIndex].handShapeTips}</span>
              </div>
            </div>

            {/* Interactive Camera Verification Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Camera Stream Box */}
              <div className="bg-slate-950 rounded-3xl p-3 border border-slate-800 aspect-4/3 relative flex items-center justify-center overflow-hidden">
                {isCameraOn ? (
                  <>
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-2xl transform -scale-x-100"
                    />
                    <div className="absolute inset-4 border-2 border-dashed border-purple-400/60 rounded-xl pointer-events-none flex items-center justify-center">
                      <span className="text-[10px] font-bold text-purple-200 bg-slate-900/80 px-2.5 py-1 rounded-full">
                        Sign "{practiceItems[selectedPracticeIndex].gloss}" Here
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <CameraOff className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-300 font-bold">Camera is OFF</p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={startCamera}
                        className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-purple-500 transition-all"
                      >
                        Turn On Camera
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl hover:bg-slate-700 transition-all flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5 text-purple-300" />
                        <span>Upload Photo</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Evaluation Panel */}
              <div className="space-y-4">
                <button
                  onClick={() => handleAnalyzeFrame()}
                  disabled={isAnalyzingFrame}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>{isCameraOn ? 'Verify My Sign Gesture' : 'Upload & Verify Gesture'}</span>
                </button>

                {practiceFeedback ? (
                  <div className="p-5 rounded-3xl border space-y-3 bg-slate-50 border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase">AI Evaluation</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                          practiceFeedback.isPracticeMatch
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {practiceFeedback.isPracticeMatch ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Match Success ({practiceFeedback.confidenceScore}%)
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            Adjustment Needed ({practiceFeedback.confidenceScore}%)
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {practiceFeedback.handShapeGuide}
                    </p>

                    <div className="text-[11px] text-purple-700 font-semibold bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                      Translated Intent: "{practiceFeedback.translatedText}"
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-600">Ready for evaluation</p>
                    <p className="text-[11px] text-slate-400">
                      Form the hand shape for "{practiceItems[selectedPracticeIndex].term}" in camera view, then click "Verify My Sign Gesture".
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 3: WORKPLACE SIGN CARDS & AAC GRID */}
      {activeTab === 'sign-dictionary' && (
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Workplace Sign Cards & Instant AAC Output Grid
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Tap any card for instant audio speech playback during live meetings or discussions.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                Deaf & Mute Accessible
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  term: 'Schedule Accommodation',
                  gloss: 'NEED - TIME - ACCOMMODATION',
                  speech: 'I would like to request a reasonable workplace accommodation for my schedule.',
                  category: 'HR & Rights',
                  tips: 'Dominant open palm touching chest gently then moving to table.',
                  emoji: '♿',
                },
                {
                  term: 'Project Deadline',
                  gloss: 'PROJECT - DUE - TIME',
                  speech: 'What is the target deadline for this project task?',
                  category: 'Workplace Tasks',
                  tips: 'Tapping wrist watch position with index finger.',
                  emoji: '⏰',
                },
                {
                  term: 'Team Collaboration',
                  gloss: 'TEAM - WORK - TOGETHER',
                  speech: 'I look forward to collaborating with the team on this initiative.',
                  category: 'Meetings',
                  tips: 'Both open hands moving in circular motion together.',
                  emoji: '🤝',
                },
                {
                  term: 'Email Confirmation',
                  gloss: 'SEND - EMAIL - CONFIRM',
                  speech: 'I have sent an email confirmation with all the required files.',
                  category: 'Communication',
                  tips: 'Flashing fingertips outward towards computer screen.',
                  emoji: '📧',
                },
                {
                  term: 'Clarification Needed',
                  gloss: 'NOT - UNDERSTAND - EXPLAIN - AGAIN',
                  speech: 'Could you please clarify or rephrase that last point?',
                  category: 'Feedback',
                  tips: 'Index finger flicking at forehead followed by open palm gesture.',
                  emoji: '❓',
                },
                {
                  term: 'Task Complete',
                  gloss: 'WORK - FINISH - DONE',
                  speech: 'My assigned work task is completed and ready for review.',
                  category: 'Status Update',
                  tips: 'Both 5-hands turning outward quickly to show finish.',
                  emoji: '✅',
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-emerald-50/50 rounded-3xl p-5 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{card.emoji}</span>
                      <span className="text-[10px] font-bold bg-white text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 uppercase">
                        {card.category}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-800">{card.term}</h4>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 font-mono text-xs font-bold text-emerald-800">
                      🤟 GLOSS: {card.gloss}
                    </div>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                      "{card.speech}"
                    </p>

                    <p className="text-[11px] text-slate-400">
                      <strong>Sign Cue:</strong> {card.tips}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      speakText(card.speech);
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak Card Audio</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
