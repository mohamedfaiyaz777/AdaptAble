import { SocialStory, VideoScene } from '../types';

export function buildVideoScenesFromStory(story: SocialStory): VideoScene[] {
  if (story.videoScenes && story.videoScenes.length > 0) {
    return story.videoScenes;
  }

  const scenes: VideoScene[] = [];
  let sceneIndex = 1;

  // Scene 1: Situation
  scenes.push({
    id: `${story.id}-scene-${sceneIndex}`,
    sceneNumber: sceneIndex++,
    title: 'Workplace Situation',
    type: 'situation',
    speaker: 'Narrator',
    avatarType: 'narrator',
    voiceoverText: `Let us understand this workplace situation: ${story.situation}`,
    captionText: story.situation,
    visualTheme: 'indigo',
    illustrationType: 'meeting',
    visualDescription: 'Setting the scene in a modern inclusive office space.',
  });

  // Scene 2: Expected Behavior
  scenes.push({
    id: `${story.id}-scene-${sceneIndex}`,
    sceneNumber: sceneIndex++,
    title: 'Expected Behavior',
    type: 'behavior',
    speaker: 'Cognitive Coach',
    avatarType: 'manager',
    voiceoverText: `Here is the expected workplace etiquette: ${story.expectedBehaviour}`,
    captionText: story.expectedBehaviour,
    visualTheme: 'purple',
    illustrationType: 'desk',
    visualDescription: 'Understanding the social dynamics and professional expectations.',
  });

  // Action Steps (Scenes 3..)
  story.stepByStepGuide.forEach((step, idx) => {
    scenes.push({
      id: `${story.id}-scene-${sceneIndex}`,
      sceneNumber: sceneIndex++,
      title: `Step ${idx + 1}: Action Guide`,
      type: 'action_step',
      speaker: 'You (Alex)',
      avatarType: 'user',
      voiceoverText: `Step ${idx + 1}: ${step}`,
      captionText: step,
      visualTheme: 'emerald',
      illustrationType: idx % 2 === 0 ? 'question' : 'presentation',
      visualDescription: `Actionable step ${idx + 1} to navigate the situation with confidence.`,
    });
  });

  // Dialogue Scenes
  if (story.exampleConversation && story.exampleConversation.length > 0) {
    story.exampleConversation.forEach((item, idx) => {
      const isUser = item.speaker.toLowerCase().includes('you') || item.speaker.toLowerCase().includes('candidate') || item.speaker.toLowerCase().includes('alex');
      scenes.push({
        id: `${story.id}-scene-${sceneIndex}`,
        sceneNumber: sceneIndex++,
        title: `Dialogue Practice (${item.speaker})`,
        type: 'dialogue',
        speaker: item.speaker,
        avatarType: isUser ? 'user' : 'colleague',
        voiceoverText: `${item.speaker} says: "${item.dialogue}"`,
        captionText: `${item.speaker}: "${item.dialogue}"`,
        visualTheme: isUser ? 'teal' : 'amber',
        illustrationType: 'feedback',
        visualDescription: `Realistic conversation turn between ${item.speaker} and team members.`,
      });
    });
  }

  // Final Scene: Takeaway & Tips
  const tipsText = story.sensoryAndCommunicationTips.join(' ');
  scenes.push({
    id: `${story.id}-scene-${sceneIndex}`,
    sceneNumber: sceneIndex++,
    title: 'Key Takeaway & Sensory Tip',
    type: 'takeaway',
    speaker: 'Cognitive Coach',
    avatarType: 'narrator',
    voiceoverText: `Key Takeaway: ${story.keyLearning}. Sensory tip: ${tipsText}`,
    captionText: `${story.keyLearning} • Tips: ${tipsText}`,
    visualTheme: 'purple',
    illustrationType: 'applause',
    visualDescription: 'Mastering the key learning for long-term workplace inclusion.',
  });

  return scenes;
}
