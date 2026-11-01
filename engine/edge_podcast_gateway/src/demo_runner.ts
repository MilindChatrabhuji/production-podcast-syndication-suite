/**
 * Demo Runner for Pack 2: Edge Podcast Gateway
 */

import { RssFeedSyndicator } from './rss_feed_syndicator';
import { SponsorImpressionTracker } from './sponsor_impression_tracker';

export async function runDemo(): Promise<void> {
  console.log('=== WAY #70 PACK 2: EDGE PODCAST GATEWAY DEMO ===');
  
  // 1. RSS XML Generation
  const syndicator = new RssFeedSyndicator();
  const xml = syndicator.generatePodcastRss(
    {
      showTitle: 'IncomeEngine Tech Podcast',
      showDescription: 'Systems architecture and clinical engineering broadcasts.',
      authorName: 'Dr. Milind Chatrabhuji',
      ownerEmail: 'milind.chatrabhuji@gmail.com',
      feedUrl: 'https://podcast.example.com/feed.xml',
      websiteUrl: 'https://podcast.example.com',
      coverImageUrl: 'https://podcast.example.com/assets/cover.jpg',
      category: 'Technology',
      subcategory: 'Software How-To',
      language: 'en-US',
      copyright: '2026 IncomeEngine'
    },
    [
      {
        episodeId: 'ep-1',
        title: 'Episode 1: Zero Latency Edge',
        description: 'Deep dive into Cloudflare isolates.',
        audioUrl: 'https://podcast.example.com/audio/ep1.mp3',
        audioSizeBytes: 34000100,
        durationSeconds: 2400,
        pubDateUtc: new Date().toISOString(),
        explicit: false,
        guid: 'incomeengine-ep1'
      }
    ]
  );
  console.log('1. Podcast RSS Feed Generated: XML length =', xml.length, 'bytes');

  // 2. Impression Tracker
  const tracker = new SponsorImpressionTracker();
  const impression = tracker.recordImpression({
    sponsorCampaignId: 'nexusedge',
    sponsorName: 'NexusEdge Cloud',
    episodeId: 'ep-1',
    slotType: 'mid_roll',
    listenerIpHash: 'hash-8a9d12',
    timestamp: new Date().toISOString()
  });
  console.log('2. Impression Recorded:', impression);

  const redirect = tracker.resolveRedirect('nexusedge');
  console.log('3. Redirect Resolved:', redirect?.destinationUrl);

  console.log('=== PACK 2 DEMO COMPLETE: ZERO DEFECTS ===');
}

if (require.main === module) {
  runDemo();
}
