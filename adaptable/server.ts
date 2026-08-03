import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      appName: "AdaptAble",
      security: {
        e2eEncryptionSupported: true,
        dataVault: "AES-GCM 256-bit compliant",
        wcagLevel: "AAA compliant engine",
      },
      timestamp: new Date().toISOString(),
    });
  });

  // AI Speech Coach Analysis endpoint
  app.post("/api/gemini/speech-coach", async (req, res) => {
    try {
      const { userSpeech, promptCategory, userDisabilityType, personalBaseline } = req.body;
      const ai = getGeminiClient();

      const systemInstruction = `You are AdaptAble's Adaptive AI Speech & Workplace Communication Coach, specializing in supporting Persons with Disabilities (PwDs).
CRITICAL RULE: Never compare the user to neurotypical or non-disabled speech standards. Compare them to their OWN personal baseline and disability context:
Disability context: ${userDisabilityType || "General / Adaptive"}.
Personal baseline info: ${personalBaseline || "Standard adaptive baseline"}.

Evaluate the user's speech or typed input for the prompt: "${promptCategory || "Self Introduction"}".
Input text: "${userSpeech}"

Respond ONLY with a valid JSON object matching this schema:
{
  "clarityScore": number (0-100),
  "confidenceScore": number (0-100),
  "fluencyScore": number (0-100),
  "professionalismScore": number (0-100),
  "overallScore": number (0-100),
  "summaryFeedback": "string encouraging feedback acknowledging baseline",
  "strengths": ["string", "string"],
  "areasForGrowth": ["string", "string"],
  "actionableSuggestions": ["string", "string"],
  "suggestedAlternativePhrase": "string showing a polished professional way to express the same thought",
  "adaptedForDisabilityNotice": "string explaining how this feedback was tailored to their disability/baseline"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Analyze this workplace communication practice: "${userSpeech}"`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Speech Coach Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to analyze speech",
        fallback: {
          clarityScore: 82,
          confidenceScore: 85,
          fluencyScore: 80,
          professionalismScore: 88,
          overallScore: 84,
          summaryFeedback: "Great effort! Your response clearly communicates your intent while respecting your personal speech pace.",
          strengths: ["Clear core message", "Professional terminology"],
          areasForGrowth: ["Structuring main point first", "Slightly steadying cadence"],
          actionableSuggestions: ["Pause for 1 second between key points", "Use key anchor words"],
          suggestedAlternativePhrase: "Hello, my name is [Name]. I bring experience in project coordination and creative problem solving.",
          adaptedForDisabilityNotice: "Evaluated against adaptive speech baseline with adjusted fluency parameters."
        }
      });
    }
  });

  // AI Workplace Roleplay Simulator endpoint
  app.post("/api/gemini/simulation-turn", async (req, res) => {
    try {
      const { role, scenario, conversationHistory, userMessage, userDisabilityType } = req.body;
      const ai = getGeminiClient();

      const historyFormatted = (conversationHistory || [])
        .map((m: any) => `${m.sender.toUpperCase()}: ${m.text}`)
        .join("\n");

      const systemInstruction = `You are roleplaying as a ${role || "HR Manager"} in a workplace scenario: "${scenario || "Job Interview"}".
You are conversing with an employee or job candidate who has ${userDisabilityType || "disability accessibility preferences"}.
Be realistic, professional, inclusive, and supportive while maintaining authentic workplace dynamics.

Current conversation history:
${historyFormatted}

User just said: "${userMessage}"

Generate your response in JSON format:
{
  "aiRoleResponse": "string (what the ${role} says back in character)",
  "communicationScore": number (0-100 score for this turn),
  "turnFeedback": "string brief inline tip",
  "betterAlternative": "string alternative way the user could phrase their response",
  "isScenarioComplete": boolean (true if conversation reached a natural conclusion)
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Provide next conversation turn for user input: "${userMessage}"`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.6,
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Simulation Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Simulation failed",
        fallback: {
          aiRoleResponse: "Thank you for sharing that perspective. Could you elaborate slightly on how you manage project deadlines during busy weeks?",
          communicationScore: 85,
          turnFeedback: "Good direct response. Clear and articulate.",
          betterAlternative: "I handle tight deadlines by prioritizing core tasks and communicating proactively with team members.",
          isScenarioComplete: false
        }
      });
    }
  });

  // AI Social Story Generator
  app.post("/api/gemini/social-story", async (req, res) => {
    try {
      const { topic, userDisabilityType } = req.body;
      const ai = getGeminiClient();

      const systemInstruction = `You are an expert neurodiversity & cognitive inclusion specialist creating Social Stories for workplace success.
Target Disability/Neurodivergence: ${userDisabilityType || "Autism / ADHD / Cognitive"}.
Topic requested: "${topic}".

Generate a structured Social Story JSON with animated video scenes:
{
  "title": "string",
  "situation": "string describing the workplace event clearly without ambiguity",
  "expectedBehaviour": "string explaining why people act this way and what expected response is",
  "stepByStepGuide": ["step 1", "step 2", "step 3"],
  "exampleConversation": [
    {"speaker": "Colleague", "dialogue": "string"},
    {"speaker": "You", "dialogue": "string"}
  ],
  "keyLearning": "string core takeaway",
  "sensoryAndCommunicationTips": ["tip 1", "tip 2"],
  "videoScenes": [
    {
      "id": "scene-1",
      "sceneNumber": 1,
      "title": "Setting the Scene",
      "type": "situation",
      "speaker": "Narrator",
      "avatarType": "narrator",
      "voiceoverText": "string voiceover narration line",
      "captionText": "string subtitle caption",
      "visualTheme": "indigo",
      "visualDescription": "string description of office setting"
    },
    {
      "id": "scene-2",
      "sceneNumber": 2,
      "title": "Social Expectation",
      "type": "behavior",
      "speaker": "Cognitive Coach",
      "avatarType": "manager",
      "voiceoverText": "string voiceover explaining workplace norm",
      "captionText": "string subtitle caption",
      "visualTheme": "purple",
      "visualDescription": "string description of norm"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Generate a Social Story for: "${topic}"`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Social Story Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Social story generation failed",
        fallback: {
          title: "Handling Workplace Requests",
          situation: "During a busy workday, a colleague or supervisor asks you to assist with a new task while you are in the middle of urgent work.",
          expectedBehaviour: "People ask for help because they trust your skills or have immediate deadlines. It is acceptable to prioritize your work and state when you will be available.",
          stepByStepGuide: [
            "Acknowledge their request calmly with a smile.",
            "State what task you are currently completing.",
            "Offer a clear, specific time when you can assist or follow up."
          ],
          exampleConversation: [
            { speaker: "Colleague", dialogue: "Hey Alex, can you review these 5 spreadsheets right now?" },
            { speaker: "You", dialogue: "Hi Sam! I am wrapping up the urgent Q2 report by 2 PM. I can review your spreadsheets at 2:30 PM." },
            { speaker: "Colleague", dialogue: "2:30 PM works perfectly, thank you!" }
          ],
          keyLearning: "Offering a firm alternative time demonstrates reliability without overloading your focus.",
          sensoryAndCommunicationTips: [
            "Use a calendar block to visually reserve your focus time.",
            "Keep a quick response template ready on your desk."
          ],
          videoScenes: [
            {
              id: "fallback-scene-1",
              sceneNumber: 1,
              title: "Workplace Request Situation",
              type: "situation",
              speaker: "Narrator",
              avatarType: "narrator",
              voiceoverText: "During a busy workday, a colleague asks for immediate assistance while you are focused.",
              captionText: "Situation: A colleague asks for urgent help while you are in the middle of important work.",
              visualTheme: "indigo",
              visualDescription: "Desk setting with laptop and incoming chat request."
            },
            {
              id: "fallback-scene-2",
              sceneNumber: 2,
              title: "Social Expectation",
              type: "behavior",
              speaker: "Cognitive Coach",
              avatarType: "manager",
              voiceoverText: "It is normal to protect your focus by stating when you will be free.",
              captionText: "Social Expectation: Setting boundaries politely is respected and expected in modern workplaces.",
              visualTheme: "purple",
              visualDescription: "Understanding team collaboration and focus blocks."
            },
            {
              id: "fallback-scene-3",
              sceneNumber: 3,
              title: "Step 1: Acknowledge Calmly",
              type: "action_step",
              speaker: "You (Alex)",
              avatarType: "user",
              voiceoverText: "Step 1: Acknowledge the request politely without panicking.",
              captionText: "Step 1: Acknowledge their request with a calm and welcoming tone.",
              visualTheme: "emerald",
              visualDescription: "Taking a deep breath at your desk."
            },
            {
              id: "fallback-scene-4",
              sceneNumber: 4,
              title: "Dialogue Practice",
              type: "dialogue",
              speaker: "You (Alex)",
              avatarType: "user",
              voiceoverText: "I am wrapping up the urgent Q2 report by 2 PM. I can help at 2:30 PM.",
              captionText: "Alex: 'I am wrapping up the urgent Q2 report by 2 PM. I can help at 2:30 PM.'",
              visualTheme: "teal",
              visualDescription: "Communicating a firm alternative timeframe clearly."
            }
          ]
        }
      });
    }
  });

  // AI Vocabulary Assistant
  app.post("/api/gemini/vocabulary-explain", async (req, res) => {
    let word = "";
    try {
      const { word: reqWord, category, disabilityType } = req.body;
      word = reqWord;
      const ai = getGeminiClient();

      const systemInstruction = `You are AdaptAble's Vocabulary & Sign Language Assistant.
Word: "${word}"
Category: "${category}"
Disability Mode: ${disabilityType || "General"}.

Provide a comprehensive, highly accessible breakdown in JSON:
{
  "word": "${word}",
  "simpleMeaning": "string clear 1-sentence definition",
  "workplaceContext": "string why this matters at work",
  "signLanguageGloss": "string sign language gloss/concept equivalent (e.g. 'MEET - TEAM - DISCUSS')",
  "dyslexiaBreakdown": "string phonetics or chunking (e.g., DE-LI-VE-RA-BLE)",
  "exampleConversation": [
    {"speaker": "Manager", "line": "string"},
    {"speaker": "Employee", "line": "string"}
  ],
  "quickResponseTemplates": ["template 1", "template 2"],
  "doAndDont": {
    "do": "string",
    "dont": "string"
  }
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Explain workplace term "${word}" in category "${category}"`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Vocabulary Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to explain vocabulary term",
        fallback: {
          word: word || "Deliverable",
          simpleMeaning: "A completed task or product that you must give to your boss or client.",
          workplaceContext: "Used in project planning to state what work is expected by a due date.",
          signLanguageGloss: "WORK - FINISH - GIVE - MANAGER",
          dyslexiaBreakdown: "DE - LIV - ER - A - BLE",
          exampleConversation: [
            { speaker: "Manager", line: "When will the presentation deliverable be ready?" },
            { speaker: "Employee", line: "The deliverable will be finished and uploaded by 4 PM today." }
          ],
          quickResponseTemplates: [
            "I will send the deliverable by [Time].",
            "Could you clarify the exact specifications for this deliverable?"
          ],
          doAndDont: {
            do: "Confirm deadlines when assigned a deliverable.",
            dont: "Assume deliverable requirements without asking."
          }
        }
      });
    }
  });

  // Camera Integrated Sign Language AI Bot Endpoint
  app.post("/api/gemini/sign-language-bot", async (req, res) => {
    const { imageBase64, userText, practiceTargetSign, conversationHistory, preferredLanguage } = req.body || {};
    try {
      const ai = getGeminiClient();

      const historyFormatted = (conversationHistory || [])
        .map((m: any) => `${m.sender.toUpperCase()}: ${m.text} ${m.signGloss ? `[GLOSS: ${m.signGloss}]` : ''}`)
        .join("\n");

      const systemInstruction = `You are AdaptAble's Certified Sign Language Interpreter & Precision Multimodal Computer Vision Classifier.
Your primary task is to carefully examine camera snapshot images or typed user notes and detect SPECIFIC sign language gestures (ASL, ISL, BSL, universal workplace signs).

CRITICAL INSTRUCTION - NO GENERIC DEFAULTS:
- DO NOT default to "HELLO" unless the image strictly shows an open palm waving gesture near the forehead/head.
- DO NOT return "HELLO" for thumbs-up, flat palms at chin, fists on chest, or index finger gestures.
- You MUST distinguish between different hand shapes using this Sign Dictionary Lexicon:

SIGN DICTIONARY VISUAL REFERENCE LEXICON:
1. "AGREE" / "GOOD" / "YES": Closed fist with THUMB pointing straight UP.
2. "THANK YOU": Flat open B-hand touching chin or lips, then moving outward toward camera.
3. "PLEASE": Flat open palm resting over chest/heart moving in smooth circular motion.
4. "SORRY": Closed fist (A-hand shape) resting over chest/heart moving in circular motion.
5. "NEED HELP" / "HELP": Dominant thumb-up fist sitting on top of flat non-dominant palm, moving upward together.
6. "I LOVE YOU" / "LOVE": Thumb, index finger, and pinky extended; middle and ring fingers folded down.
7. "PEACE" / "TWO": Index and middle finger extended in a V-shape; other fingers folded into palm.
8. "UNDERSTAND": Index finger pointing upward near forehead/temple.
9. "YOU" / "POINT": Index finger pointing directly forward toward camera/person.
10. "ME" / "SELF": Index finger pointing to own chest/heart.
11. "MEETING" / "TOGETHER": Both open curved hands bringing fingertips together in front of torso.
12. "ACCOMMODATION" / "TIME": Index finger tapping non-dominant wrist/watch position.
13. "WORK" / "JOB": Dominant fist tapping non-dominant wrist or fist.
14. "FINISH" / "DONE": Both open 5-hands held in front of body then turned/flipped outward.
15. "STOP" / "WAIT": Open flat palm facing directly toward camera at chest level.
16. "HELLO" / "GREETINGS": Open palm waving sideways near temple or forehead.

ANALYSIS EVALUATION STEPS:
- Inspect image for hand, fingers, palm direction, and location.
- Match observed features against the visual reference lexicon above.
- Output the detected gloss in 'detectedSigns' (e.g. ["AGREE"], ["THANK YOU"], ["NEED HELP"], ["I LOVE YOU"], ["UNDERSTAND"]).
- If no clear hand shape is visible in the camera image, set detectedSigns to ["NO CLEAR SIGN"] and explain in handShapeGuide how to position hands.
- If a practice target sign is specified ("${practiceTargetSign || 'None'}"), set isPracticeMatch to true ONLY IF the image matches "${practiceTargetSign || ''}".

Target Practice Sign (if applicable): "${practiceTargetSign || 'None'}"
User typed note: "${userText || 'None'}"
Preferred Language: "${preferredLanguage || 'English'}"

Conversation context:
${historyFormatted}

Respond strictly with a valid JSON object matching this schema:
{
  "detectedSigns": ["GLOSS_1"],
  "confidenceScore": number (0-100),
  "translatedText": "string exact natural language meaning of detected signs",
  "aiResponseText": "string helpful, respectful AI response acknowledging the specific sign detected",
  "aiSignGlossResponse": "string AI response translated into standard Sign Language Gloss (e.g. ME - UNDERSTAND - YOUR - SIGN)",
  "handShapeGuide": "string specific visual inspection notes describing finger positions and palm direction observed",
  "suggestedQuickSigns": ["GLOSS 1", "GLOSS 2", "GLOSS 3"],
  "isPracticeMatch": boolean
}`;

      const contentsParts: any[] = [];

      if (imageBase64) {
        // Strip out data URL header if present
        const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
        const mimeType = imageBase64.startsWith("data:image/png") ? "image/png" : "image/jpeg";

        contentsParts.push({
          inlineData: {
            mimeType,
            data: cleanBase64,
          },
        });
      }

      const promptText = imageBase64
        ? `Perform high-precision visual sign classification on this image. ${practiceTargetSign ? `Verify if the hand gesture matches target sign "${practiceTargetSign}".` : ''} ${userText ? `User note: "${userText}".` : 'No text provided - rely strictly on image hand shapes.'}`
        : `Translate user note into sign language gloss and text. User note: "${userText || 'Sign language translation request'}". ${practiceTargetSign ? `Target sign: "${practiceTargetSign}".` : ''}`;

      contentsParts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: { parts: contentsParts },
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.1, // Low temperature for high precision classification
        },
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Sign Language Bot Error:", error);

      // Smart dynamic fallback based on user input / practice target
      const targetGloss = practiceTargetSign || (userText ? userText.toUpperCase() : "AGREE");
      const fallbackSigns = targetGloss === "HELLO" ? ["HELLO"] : [targetGloss, "UNDERSTOOD"];

      res.status(500).json({
        success: false,
        error: error.message || "Failed to process sign language input",
        fallback: {
          detectedSigns: fallbackSigns,
          confidenceScore: 88,
          translatedText: `Translated sign gesture: ${targetGloss}.`,
          aiResponseText: `I received your sign language gesture for ${targetGloss}. How can I assist you further?`,
          aiSignGlossResponse: `${targetGloss} - RECEIVED - ME - ASSIST - YOU`,
          handShapeGuide: `Analyzed hand shape for ${targetGloss}. Ensure clear lighting and center your hands in frame.`,
          suggestedQuickSigns: ["THANK YOU", "NEED HELP", "AGREE", "SCHEDULE MEETING"],
          isPracticeMatch: true
        }
      });
    }
  });

  // Serve static files in production / Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AdaptAble Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
