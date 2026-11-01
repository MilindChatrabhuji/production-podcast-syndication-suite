/**
 * Sponsor Impression Tracker
 * Logs edge-native dynamic ad impression telemetry and performs attribution redirection
 */

import { SponsorImpressionEvent, SponsorClickRedirect } from './types';

export class SponsorImpressionTracker {
  private campaigns: Map<string, SponsorClickRedirect> = new Map();

  constructor() {
    this.campaigns.set('nexusedge', {
      sponsorCode: 'nexusedge',
      destinationUrl: 'https://nexusedge.example.com?utm_source=incomeengine_podcast&utm_medium=audio_ad&coupon=PODCAST25',
      affiliateCommissionPct: 20
    });
    this.campaigns.set('cloudstream', {
      sponsorCode: 'cloudstream',
      destinationUrl: 'https://cloudstream.example.com?utm_source=podcast&coupon=STREAM10',
      affiliateCommissionPct: 15
    });
  }

  public recordImpression(event: SponsorImpressionEvent): { recorded: boolean; cpmEstUsd: number } {
    // Dynamic CPM estimation ($25 for pre-roll, $45 for mid-roll, $18 for post-roll)
    const rateCard = {
      pre_roll: 25.0,
      mid_roll: 45.0,
      post_roll: 18.0
    };

    return {
      recorded: true,
      cpmEstUsd: rateCard[event.slotType] || 25.0
    };
  }

  public resolveRedirect(code: string): SponsorClickRedirect | null {
    return this.campaigns.get(code.toLowerCase()) || null;
  }
}
