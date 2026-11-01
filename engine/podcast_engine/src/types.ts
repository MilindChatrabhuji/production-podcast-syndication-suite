/**
 * Way #70: Production Interview Podcast Production & Multi-Channel Syndication Suite
 * Core TypeScript Type Definitions
 */

export interface GuestProfile {
  guestId: string;
  fullName: string;
  title: string;
  organization: string;
  linkedinOrTwitterUrl: string;
  bioSummary: string;
  coreThesis: string;
  pastPublications: string[];
  sensitiveTopicsAvoidList: string[];
}

export interface ContrarianQuestion {
  questionId: string;
  targetThesisPoint: string;
  pastQuoteReference: string;
  questionText: string;
  expectedTensionLevel: 'mild' | 'deep_technical' | 'high_contrarian';
  followUpPrompt: string;
}

export interface GuestResearchDossier {
  dossierId: string;
  guest: GuestProfile;
  contrarianQuestions: ContrarianQuestion[];
  quickIcebreaker: string;
  verifiedFactChecks: { statement: string; sourceUrl: string; verifiedStatus: boolean }[];
  recommendedDiscussionTracks: string[];
  generatedAt: string;
}

export interface AgendaSegment {
  segmentIndex: number;
  timecodeStart: string; // e.g. "00:00"
  timecodeEnd: string;   // e.g. "02:30"
  durationMinutes: number;
  segmentTitle: string;
  coreTalkingPoints: string[];
  transitionHookPhrase: string;
  isSponsorBreak: boolean;
  sponsorSlotType?: 'pre_roll' | 'mid_roll' | 'post_roll';
}

export interface InterviewAgenda {
  agendaId: string;
  episodeNumber: number;
  episodeTitle: string;
  targetDurationMinutes: number; // default 45 mins
  segments: AgendaSegment[];
  hostBriefingNotes: string;
}

export interface ChapterMarker {
  timestampSeconds: number;
  timestampFormatted: string; // "00:02:15"
  chapterTitle: string;
}

export interface SeoShowNotes {
  episodeId: string;
  title: string;
  tagline: string;
  summaryParagraph: string;
  clickableChapterMarkers: ChapterMarker[];
  keyTakeawayBulletPoints: string[];
  guestLinks: { label: string; url: string }[];
  resourcesMentioned: { name: string; url: string }[];
  sponsorAdReads: { sponsorName: string; readCopy: string; linkUrl: string; couponCode: string }[];
  disclaimer: string;
}

export interface AudiogramPullQuote {
  quoteId: string;
  speaker: string;
  quoteText: string;
  audioStartSeconds: number;
  audioEndSeconds: number;
  durationSeconds: number; // 15-60 seconds optimal
  viralityHookScore: number; // 0-100
  waveformSubtitlePreset: 'neon_glow' | 'minimalist_box' | 'editorial_serif';
  socialPlatformCopy: {
    twitter: string;
    linkedin: string;
    shortsDescription: string;
  };
}
