import { PreferredLanguage, AccessibilityConfig } from '../types';

export interface TranslationDictionary {
  [key: string]: {
    English: string;
    Spanish: string;
    Hindi: string;
    French: string;
    German: string;
    'Sign Gloss': string;
    SimpleEnglish?: string;
    SimpleSpanish?: string;
    SimpleHindi?: string;
    SimpleFrench?: string;
    SimpleGerman?: string;
    SimpleSignGloss?: string;
  };
}

// Map language to SpeechSynthesis language code
export const LANGUAGE_SPEECH_CODES: Record<PreferredLanguage, string> = {
  English: 'en-US',
  Spanish: 'es-ES',
  Hindi: 'hi-IN',
  French: 'fr-FR',
  German: 'de-DE',
  'Sign Gloss': 'en-US',
};

// UI Translations dictionary
export const UI_DICTIONARY: TranslationDictionary = {
  // Navigation & General
  'AdaptAble': {
    English: 'AdaptAble',
    Spanish: 'AdaptAble',
    Hindi: 'AdaptAble',
    French: 'AdaptAble',
    German: 'AdaptAble',
    'Sign Gloss': '[ADAPTABLE]',
  },
  'Home Dashboard': {
    English: 'Home Dashboard',
    Spanish: 'Panel Principal',
    Hindi: 'मुख्य डैशबोर्ड',
    French: 'Tableau de Bord',
    German: 'Haupt-Dashboard',
    'Sign Gloss': '[HOME] [DASHBOARD]',
    SimpleEnglish: 'Home Page',
    SimpleSpanish: 'Página Inicio',
    SimpleHindi: 'मुख्य पेज',
    SimpleFrench: 'Page d\'accueil',
    SimpleGerman: 'Startseite',
    SimpleSignGloss: '[HOME] [PAGE]',
  },
  'Workplace Vocabulary': {
    English: 'Workplace Vocabulary',
    Spanish: 'Vocabulario Laboral',
    Hindi: 'कार्यस्थल शब्दावली',
    French: 'Vocabulaire de Travail',
    German: 'Arbeitsplatz-Wortschatz',
    'Sign Gloss': '[WORK] [WORDS] [LEARN]',
    SimpleEnglish: 'Work Words',
    SimpleSpanish: 'Palabras de Trabajo',
    SimpleHindi: 'काम के शब्द',
    SimpleFrench: 'Mots de Travail',
    SimpleGerman: 'Einfache Wörter',
    SimpleSignGloss: '[WORK] [EASY] [WORDS]',
  },
  'AI Speech Coach': {
    English: 'AI Speech Coach',
    Spanish: 'Entrenador de Voz IA',
    Hindi: 'एआई भाषण कोच',
    French: 'Coach Vocal IA',
    German: 'KI Sprech-Coach',
    'Sign Gloss': '[TALK] [COACH] [AI]',
    SimpleEnglish: 'Talking Helper',
    SimpleSpanish: 'Ayudante de Voz',
    SimpleHindi: 'बोलने में मदद',
    SimpleFrench: 'Assistant de Parole',
    SimpleGerman: 'Sprech-Helfer',
    SimpleSignGloss: '[TALK] [HELP]',
  },
  'Workplace Simulator': {
    English: 'Workplace Simulator',
    Spanish: 'Simulador Laboral',
    Hindi: 'कार्यस्थल सिम्युलेटर',
    French: 'Simulateur de Travail',
    German: 'Arbeits-Simulator',
    'Sign Gloss': '[WORK] [PRACTICE] [GAME]',
    SimpleEnglish: 'Practice Conversations',
    SimpleSpanish: 'Práctica de Conversación',
    SimpleHindi: 'बातचीत का अभ्यास',
    SimpleFrench: 'Pratique de Dialogue',
    SimpleGerman: 'Übungs-Gespräche',
    SimpleSignGloss: '[TALK] [PRACTICE]',
  },
  'Social Stories': {
    English: 'Social Stories',
    Spanish: 'Historias Sociales',
    Hindi: 'सामाजिक कहानियाँ',
    French: 'Histoires Sociales',
    German: 'Soziale Geschichten',
    'Sign Gloss': '[SOCIAL] [STORIES] [WATCH]',
    SimpleEnglish: 'Workplace Situations',
    SimpleSpanish: 'Situaciones de Trabajo',
    SimpleHindi: 'काम की स्थितियाँ',
    SimpleFrench: 'Guides de Travail',
    SimpleGerman: 'Arbeits-Beispiele',
    SimpleSignGloss: '[WORK] [STORY]',
  },
  'Accessibility Settings': {
    English: 'Accessibility Settings',
    Spanish: 'Ajustes de Accesibilidad',
    Hindi: 'सुगम्य सेटिंग',
    French: 'Paramètres d\'Accessibilité',
    German: 'Barrierefreie Einstellungen',
    'Sign Gloss': '[SETTINGS] [EASY] [ACCESS]',
    SimpleEnglish: 'Easy Controls',
    SimpleSpanish: 'Controles Fáciles',
    SimpleHindi: 'आसान कंट्रोल',
    SimpleFrench: 'Réglages Simples',
    SimpleGerman: 'Einfache Steuerung',
    SimpleSignGloss: '[EASY] [SETTINGS]',
  },
  'Progress & Stats': {
    English: 'Progress & Stats',
    Spanish: 'Progreso y Estadísticas',
    Hindi: 'प्रगति और आंकड़े',
    French: 'Progrès et Statistiques',
    German: 'Fortschritt & Statistik',
    'Sign Gloss': '[PROGRESS] [SCORES]',
    SimpleEnglish: 'My Scores',
    SimpleSpanish: 'Mis Puntos',
    SimpleHindi: 'मेरा स्कोर',
    SimpleFrench: 'Mes Scores',
    SimpleGerman: 'Meine Punkte',
    SimpleSignGloss: '[MY] [SCORES]',
  },
  'Simple Language Mode': {
    English: 'Simple Language Mode (ELI5)',
    Spanish: 'Modo de Lenguaje Sencillo',
    Hindi: 'सरल भाषा मोड',
    French: 'Mode Langage Simplifié',
    German: 'Einfache Sprache Modus',
    'Sign Gloss': '[EASY] [WORDS] [MODE]',
    SimpleEnglish: 'Easy Words Mode (Active)',
    SimpleSpanish: 'Modo Palabras Fáciles (Activo)',
    SimpleHindi: 'आसान भाषा मोड (चालू)',
    SimpleFrench: 'Mode Mots Simples (Actif)',
    SimpleGerman: 'Modus Einfache Wörter (Aktiv)',
    SimpleSignGloss: '[EASY] [WORDS] [ON]',
  },
  'Preferred Language': {
    English: 'Preferred Language',
    Spanish: 'Idioma Preferido',
    Hindi: 'पसंदीदा भाषा',
    French: 'Langue Préférée',
    German: 'Bevorzugte Sprache',
    'Sign Gloss': '[LANGUAGE] [CHOOSE]',
    SimpleEnglish: 'Choose Your Language',
    SimpleSpanish: 'Elige Tu Idioma',
    SimpleHindi: 'अपनी भाषा चुनें',
    SimpleFrench: 'Choisis Ta Langue',
    SimpleGerman: 'Sprache Wählen',
    SimpleSignGloss: '[LANGUAGE] [SELECT]',
  },
  'Request Workplace Accommodation': {
    English: 'Request Workplace Accommodation',
    Spanish: 'Solicitar Adaptación Laboral',
    Hindi: 'कार्यस्थल समायोजन का अनुरोध करें',
    French: 'Demander un Aménagement de Poste',
    German: 'Arbeitsplatz-Anpassung Anfordern',
    'Sign Gloss': '[WORK] [HELP] [REQUEST]',
    SimpleEnglish: 'Ask for Workplace Help & Tools',
    SimpleSpanish: 'Pedir Ayuda y Herramientas de Trabajo',
    SimpleHindi: 'काम में मदद और उपकरण मांगें',
    SimpleFrench: 'Demander de l\'Aide et des Outils',
    SimpleGerman: 'Hilfe am Arbeitsplatz Anfragen',
    SimpleSignGloss: '[WORK] [HELP] [ASK]',
  },
  'Executive Summary Phrasing': {
    English: 'Executive Summary Phrasing',
    Spanish: 'Fraseo de Resumen Ejecutivo',
    Hindi: 'कार्यकारी सारांश वाक्यांश',
    French: 'Formulation de Résumé Exécutif',
    German: 'Formulierung Zusammenfassung',
    'Sign Gloss': '[SHORT] [SUMMARY] [TALK]',
    SimpleEnglish: 'Short Easy Summary',
    SimpleSpanish: 'Resumen Corto y Fácil',
    SimpleHindi: 'छोटा और आसान सारांश',
    SimpleFrench: 'Résumé Court et Simple',
    SimpleGerman: 'Kurze Einfache Übersicht',
    SimpleSignGloss: '[SHORT] [EASY] [SUMMARY]',
  },
  'Handling Interruptions': {
    English: 'Handling Interruptions',
    Spanish: 'Manejo de Interrupciones',
    Hindi: 'रुकावटों को संभालना',
    French: 'Gérer les Interruptions',
    German: 'Umgang mit Unterbrechungen',
    'Sign Gloss': '[STOP] [WORK] [RESPONSES]',
    SimpleEnglish: 'When Someone Interrupts You',
    SimpleSpanish: 'Cuando Alguien Te Interrumpe',
    SimpleHindi: 'जब कोई बीच में टोके',
    SimpleFrench: 'Quand On Vous Interrompt',
    SimpleGerman: 'Wenn Jemand Unterbricht',
    SimpleSignGloss: '[INTERRUPT] [ANSWER]',
  },
  'Salary Negotiation Tone': {
    English: 'Salary Negotiation Tone',
    Spanish: 'Tono de Negociación Salarial',
    Hindi: 'वेतन बातचीत का स्वर',
    French: 'Ton de Négociation Salariale',
    German: 'Ton der Gehaltsverhandlung',
    'Sign Gloss': '[MONEY] [TALK] [CONFIDENT]',
    SimpleEnglish: 'Talking About Pay Confidentially',
    SimpleSpanish: 'Hablar del Sueldo con Confianza',
    SimpleHindi: 'वेतन की बात आत्मविश्वास से करना',
    SimpleFrench: 'Parler du Salaire avec Assurance',
    SimpleGerman: 'Über Gehalt Sprechen',
    SimpleSignGloss: '[PAY] [TALK] [GOOD]',
  },
  'Communication Score': {
    English: 'Communication Score',
    Spanish: 'Puntuación de Comunicación',
    Hindi: 'संचार स्कोर',
    French: 'Score de Communication',
    German: 'Kommunikations-Punktzahl',
    'Sign Gloss': '[TALK] [SCORE]',
    SimpleEnglish: 'Speaking Score',
    SimpleSpanish: 'Puntos de Habla',
    SimpleHindi: 'बोलने का स्कोर',
    SimpleFrench: 'Score de Parole',
    SimpleGerman: 'Sprech-Punkte',
    SimpleSignGloss: '[TALK] [POINTS]',
  },
  'Interview Readiness': {
    English: 'Interview Readiness',
    Spanish: 'Preparación para Entrevistas',
    Hindi: 'साक्षात्कार की तैयारी',
    French: 'Préparation à l\'Entretien',
    German: 'Interview-Bereitschaft',
    'Sign Gloss': '[JOB] [INTERVIEW] [READY]',
    SimpleEnglish: 'Job Interview Practice Score',
    SimpleSpanish: 'Puntos de Entrevista de Trabajo',
    SimpleHindi: 'जॉब इंटरव्यू अभ्यास स्कोर',
    SimpleFrench: 'Score de Pratique d\'Entretien',
    SimpleGerman: 'Bewerbungs-Punkte',
    SimpleSignGloss: '[JOB] [TALK] [READY]',
  },
  'Start Practice Session': {
    English: 'Start Practice Session',
    Spanish: 'Iniciar Sesión de Práctica',
    Hindi: 'अभ्यास सत्र शुरू करें',
    French: 'Commencer la Pratique',
    German: 'Übungssitzung Starten',
    'Sign Gloss': '[START] [PRACTICE] [NOW]',
    SimpleEnglish: 'Start Easy Practice',
    SimpleSpanish: 'Empezar Práctica Fácil',
    SimpleHindi: 'आसान अभ्यास शुरू करें',
    SimpleFrench: 'Commencer l\'Exercice Simple',
    SimpleGerman: 'Einfache Übung Starten',
    SimpleSignGloss: '[START] [EASY] [PRACTICE]',
  },
  'High Contrast': {
    English: 'High Contrast',
    Spanish: 'Alto Contraste',
    Hindi: 'उच्च विपर्यास',
    French: 'Haut Contraste',
    German: 'Hoher Kontrast',
    'Sign Gloss': '[COLOR] [HIGH] [CONTRAST]',
    SimpleEnglish: 'Bright Clear Colors',
    SimpleSpanish: 'Colores Brillantes y Claros',
    SimpleHindi: 'साफ़ और चमकदार रंग',
    SimpleFrench: 'Couleurs Claires et Nettes',
    SimpleGerman: 'Klare Helle Farben',
    SimpleSignGloss: '[BRIGHT] [COLORS]',
  },
};

/**
 * Get translated text for a specific UI key or dictionary entry.
 */
export function getTranslation(
  key: string,
  preferredLanguage: PreferredLanguage = 'English',
  simpleLanguage: boolean = false
): string {
  const item = UI_DICTIONARY[key];
  if (!item) {
    // If not in predefined UI dictionary, apply string transformation helper
    return formatGenericText(key, preferredLanguage, simpleLanguage);
  }

  // Handle Simple Language Mode (ELI5)
  if (simpleLanguage) {
    if (preferredLanguage === 'Spanish' && item.SimpleSpanish) return item.SimpleSpanish;
    if (preferredLanguage === 'Hindi' && item.SimpleHindi) return item.SimpleHindi;
    if (preferredLanguage === 'French' && item.SimpleFrench) return item.SimpleFrench;
    if (preferredLanguage === 'German' && item.SimpleGerman) return item.SimpleGerman;
    if (preferredLanguage === 'Sign Gloss' && item.SimpleSignGloss) return item.SimpleSignGloss;
    if (item.SimpleEnglish) return item.SimpleEnglish;
  }

  // Preferred Language lookup
  switch (preferredLanguage) {
    case 'Spanish':
      return item.Spanish || item.English;
    case 'Hindi':
      return item.Hindi || item.English;
    case 'French':
      return item.French || item.English;
    case 'German':
      return item.German || item.English;
    case 'Sign Gloss':
      return item['Sign Gloss'] || item.English;
    case 'English':
    default:
      return item.English;
  }
}

/**
 * Transforms generic text based on preferredLanguage and simpleLanguage settings.
 */
export function formatGenericText(
  text: string,
  preferredLanguage: PreferredLanguage = 'English',
  simpleLanguage: boolean = false
): string {
  if (!text) return '';

  let output = text;

  // Apply ELI5 / Simple Language replacements if simpleLanguage is true
  if (simpleLanguage) {
    output = simplifyString(output);
  }

  // Convert to Sign Gloss format if preferred language is Sign Gloss
  if (preferredLanguage === 'Sign Gloss') {
    return convertToSignGloss(output);
  }

  // Translate common words/phrases dynamically for non-English languages
  if (preferredLanguage === 'Spanish') {
    return translateToSpanish(output);
  } else if (preferredLanguage === 'Hindi') {
    return translateToHindi(output);
  } else if (preferredLanguage === 'French') {
    return translateToFrench(output);
  } else if (preferredLanguage === 'German') {
    return translateToGerman(output);
  }

  return output;
}

/**
 * ELI5 / Plain Language Simplification Helper
 */
export function simplifyString(text: string): string {
  if (!text) return '';

  let s = text;
  s = s.replace(/accommodation/gi, 'help tool');
  s = s.replace(/accommodations/gi, 'help tools');
  s = s.replace(/deliverable/gi, 'finished task');
  s = s.replace(/deliverables/gi, 'finished tasks');
  s = s.replace(/action item/gi, 'step to do');
  s = s.replace(/action items/gi, 'steps to do');
  s = s.replace(/circulate/gi, 'send around to all');
  s = s.replace(/synergy/gi, 'working together');
  s = s.replace(/executive summary/gi, 'short quick summary');
  s = s.replace(/bandwidth/gi, 'free time to work');
  s = s.replace(/touch base/gi, 'talk briefly');
  s = s.replace(/stakeholder/gi, 'team partner');
  s = s.replace(/stakeholders/gi, 'team partners');
  s = s.replace(/optics/gi, 'how it looks to others');
  s = s.replace(/pivot/gi, 'change plans quickly');
  s = s.replace(/low-hanging fruit/gi, 'easy quick tasks');
  s = s.replace(/quantitative/gi, 'number-based');
  s = s.replace(/qualitative/gi, 'descriptive');
  s = s.replace(/paradigm/gi, 'way of thinking');
  s = s.replace(/implementation/gi, 'putting into action');
  s = s.replace(/articulate/gi, 'state clearly');
  s = s.replace(/proactively/gi, 'ahead of time');
  s = s.replace(/impairment/gi, 'ability needs');
  s = s.replace(/augmentative/gi, 'easy helper');

  return s;
}

/**
 * Convert sentences to uppercase bracketed Sign Language Gloss
 */
export function convertToSignGloss(text: string): string {
  if (!text) return '';

  // Clean words, filter stop words, convert to uppercase gloss
  const words = text
    .toUpperCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .split(/\s+/)
    .filter((w) => !['A', 'AN', 'THE', 'IS', 'ARE', 'AM', 'WAS', 'WERE', 'TO', 'OF', 'FOR'].includes(w));

  if (words.length === 0) return text;
  return words.map((w) => `[${w}]`).join(' ');
}

/**
 * Dynamic Spanish translations for phrases and common patterns
 */
export function translateToSpanish(text: string): string {
  if (!text) return '';
  let s = text;
  s = s.replace(/Welcome to/gi, 'Bienvenido a');
  s = s.replace(/Workplace/gi, 'Lugar de trabajo');
  s = s.replace(/Accommodation/gi, 'Adaptación');
  s = s.replace(/Deliverable/gi, 'Entregable');
  s = s.replace(/Action Item/gi, 'Tarea pendiente');
  s = s.replace(/Dashboard/gi, 'Panel');
  s = s.replace(/Practice/gi, 'Práctica');
  s = s.replace(/Score/gi, 'Puntuación');
  s = s.replace(/Settings/gi, 'Ajustes');
  s = s.replace(/Help/gi, 'Ayuda');
  s = s.replace(/Question/gi, 'Pregunta');
  s = s.replace(/Feedback/gi, 'Retroalimentación');
  s = s.replace(/Module/gi, 'Módulo');
  s = s.replace(/Lesson/gi, 'Lección');
  s = s.replace(/Scenario/gi, 'Escenario');
  s = s.replace(/Job Interview/gi, 'Entrevista de Trabajo');
  s = s.replace(/Request Leave/gi, 'Solicitar Permiso');
  s = s.replace(/Meeting/gi, 'Reunión');
  return s;
}

/**
 * Dynamic Hindi translations for phrases and common patterns
 */
export function translateToHindi(text: string): string {
  if (!text) return '';
  let s = text;
  s = s.replace(/Welcome to/gi, 'स्वागत है');
  s = s.replace(/Workplace/gi, 'कार्यस्थल');
  s = s.replace(/Accommodation/gi, 'समायोजन');
  s = s.replace(/Deliverable/gi, 'कार्य परिणाम');
  s = s.replace(/Action Item/gi, 'कार्य सूची');
  s = s.replace(/Dashboard/gi, 'डैशबोर्ड');
  s = s.replace(/Practice/gi, 'अभ्यास');
  s = s.replace(/Score/gi, 'स्कोर');
  s = s.replace(/Settings/gi, 'सेटिंग्स');
  s = s.replace(/Help/gi, 'मदद');
  s = s.replace(/Question/gi, 'प्रश्न');
  s = s.replace(/Feedback/gi, 'प्रतिक्रिया');
  s = s.replace(/Module/gi, 'मॉड्यूल');
  s = s.replace(/Lesson/gi, 'पाठ');
  s = s.replace(/Scenario/gi, 'परिदृश्य');
  s = s.replace(/Job Interview/gi, 'जॉब इंटरव्यू');
  s = s.replace(/Request Leave/gi, 'छुट्टी का अनुरोध');
  s = s.replace(/Meeting/gi, 'बैठक');
  return s;
}

/**
 * Dynamic French translations for phrases and common patterns
 */
export function translateToFrench(text: string): string {
  if (!text) return '';
  let s = text;
  s = s.replace(/Welcome to/gi, 'Bienvenue sur');
  s = s.replace(/Workplace/gi, 'Lieu de travail');
  s = s.replace(/Accommodation/gi, 'Aménagement');
  s = s.replace(/Deliverable/gi, 'Livrable');
  s = s.replace(/Action Item/gi, 'Point d\'action');
  s = s.replace(/Dashboard/gi, 'Tableau de bord');
  s = s.replace(/Practice/gi, 'Pratique');
  s = s.replace(/Score/gi, 'Score');
  s = s.replace(/Settings/gi, 'Paramètres');
  s = s.replace(/Help/gi, 'Aide');
  s = s.replace(/Question/gi, 'Question');
  s = s.replace(/Feedback/gi, 'Retour');
  s = s.replace(/Module/gi, 'Module');
  s = s.replace(/Lesson/gi, 'Leçon');
  s = s.replace(/Scenario/gi, 'Scénario');
  s = s.replace(/Job Interview/gi, 'Entretien d\'embauche');
  s = s.replace(/Request Leave/gi, 'Demande de congé');
  s = s.replace(/Meeting/gi, 'Réunion');
  return s;
}

/**
 * Dynamic German translations for phrases and common patterns
 */
export function translateToGerman(text: string): string {
  if (!text) return '';
  let s = text;
  s = s.replace(/Welcome to/gi, 'Willkommen bei');
  s = s.replace(/Workplace/gi, 'Arbeitsplatz');
  s = s.replace(/Accommodation/gi, 'Anpassung');
  s = s.replace(/Deliverable/gi, 'Arbeitsergebnis');
  s = s.replace(/Action Item/gi, 'Aufgabe');
  s = s.replace(/Dashboard/gi, 'Übersicht');
  s = s.replace(/Practice/gi, 'Übung');
  s = s.replace(/Score/gi, 'Punktzahl');
  s = s.replace(/Settings/gi, 'Einstellungen');
  s = s.replace(/Help/gi, 'Hilfe');
  s = s.replace(/Question/gi, 'Frage');
  s = s.replace(/Feedback/gi, 'Rückmeldung');
  s = s.replace(/Module/gi, 'Modul');
  s = s.replace(/Lesson/gi, 'Lektion');
  s = s.replace(/Scenario/gi, 'Szenario');
  s = s.replace(/Job Interview/gi, 'Bewerbungsgespräch');
  s = s.replace(/Request Leave/gi, 'Urlaub Beantragen');
  s = s.replace(/Meeting/gi, 'Besprechung');
  return s;
}

/**
 * Helper function that takes text and AccessibilityConfig to return localized & simplified text.
 */
export function getLocalizedText(text: string, config: AccessibilityConfig): string {
  if (!text) return '';
  const pref = config?.preferredLanguage || 'English';
  const simple = !!config?.simpleLanguage;
  return getTranslation(text, pref, simple);
}

