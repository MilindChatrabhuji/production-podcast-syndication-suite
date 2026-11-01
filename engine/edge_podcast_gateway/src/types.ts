/**
 * Edge Podcast Gateway Types
 */

export interface Env {
  DB: any; // Cloudflare D1 Database binding
  PODCAST_ENV: string;
  GATEWAY_DOMAIN: string;
}

export interface PodcastEpisodeMeta {
  episodeId: string;
  title: string;
  description: string;
  audioUrl: string;
  audioSizeBytes: number;
  durationSeconds: number;
  pubDateUtc: string;
  explicit: boolean;
  guid: string;
  chaptersJsonUrl?: string;
  transcriptUrl?: string;
}

export interface PodcastShowMeta {
  showTitle: string;
  showDescription: string;
  authorName: string;
  ownerEmail: string;
  feedUrl: string;
  websiteUrl: string;
  coverImageUrl: string;
  category: string;
  subcategory?: string;
  language: string;
  copyright: string;
}

export interface SponsorImpressionEvent {
  sponsorCampaignId: string;
  sponsorName: string;
  episodeId: string;
  slotType: 'pre_roll' | 'mid_roll' | 'post_roll';
  listenerIpHash: string;
  timestamp: string;
}

export interface SponsorClickRedirect {
  sponsorCode: string;
  destinationUrl: string;
  affiliateCommissionPct: number;
}
