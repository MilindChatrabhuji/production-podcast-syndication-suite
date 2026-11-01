/**
 * Audio & Audiogram Snippet Extractor
 * Identifies high-retention 15s-60s pull-quotes and formats social waveforms and copy
 */

import { AudiogramPullQuote } from './types';

export class AudioAudiogramSnippetExtractor {
  public extractPullQuote(
    speaker: string,
    quoteText: string,
    startSeconds: number,
    endSeconds: number,
    episodeUrl: string = 'https://podcast.example.com/episodes/72'
  ): AudiogramPullQuote {
    const duration = Math.max(15, Math.min(60, endSeconds - startSeconds));
    
    // Viral hook calculation based on contrast words
    const contrastKeywords = ['never', 'mistake', 'fatal', 'zero', 'critical', 'truth', 'architecture', 'latency'];
    let matches = 0;
    contrastKeywords.forEach(k => {
      if (quoteText.toLowerCase().includes(k)) matches++;
    });
    const viralityScore = Math.min(98, 70 + matches * 6);

    return {
      quoteId: `audio-${Date.now().toString().slice(-6)}`,
      speaker,
      quoteText,
      audioStartSeconds: startSeconds,
      audioEndSeconds: endSeconds,
      durationSeconds: duration,
      viralityHookScore: viralityScore,
      waveformSubtitlePreset: 'neon_glow',
      socialPlatformCopy: {
        twitter: `"${quoteText.slice(0, 180)}..." - @${speaker.replace(/\s+/g, '')}\n\nListen to the full deep dive on clinical software architecture: ${episodeUrl} #Podcasting #SystemsEngineering #TechAudio`,
        linkedin: `"${quoteText}"\n\nIn our latest technical conversation, ${speaker} broke down why distributed healthcare systems cannot compromise on deterministic latency. Full episode link in the comments.\n\n#EngineeringLeadership #HealthcareTechnology #DistributedSystems`,
        shortsDescription: `Why 10ms latency is a safety boundary with ${speaker}. Full conversation linked in bio! #Shorts #PodcastClips #TechPodcast`
      }
    };
  }
}
