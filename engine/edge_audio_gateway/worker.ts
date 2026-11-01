/**
 * Cloudflare Workers Edge Router for Podcast Gateway
 */

import { Env } from './types';
import { RssFeedSyndicator } from './rss_feed_syndicator';
import { SponsorImpressionTracker } from './sponsor_impression_tracker';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check
    if (path === '/health' || path === '/api/v1/status') {
      return new Response(JSON.stringify({
        status: 'healthy',
        service: 'edge-podcast-gateway',
        version: '1.0.0',
        edgeColo: request.cf?.colo || 'LOCAL',
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Podcast RSS Feed
    if (path === '/feed.xml' || path === '/rss') {
      const syndicator = new RssFeedSyndicator();
      const rss = syndicator.generatePodcastRss(
        {
          showTitle: 'IncomeEngine Engineering Broadcasts',
          showDescription: 'Deep technical conversations on clinical informatics, surgical robotics, and zero-latency software architecture.',
          authorName: 'Dr. Milind Chatrabhuji',
          ownerEmail: 'milind.chatrabhuji@gmail.com',
          feedUrl: 'https://podcast.example.com/feed.xml',
          websiteUrl: 'https://podcast.example.com',
          coverImageUrl: 'https://podcast.example.com/assets/cover.jpg',
          category: 'Technology',
          subcategory: 'Software How-To',
          language: 'en-US',
          copyright: '2026 IncomeEngine Media Network'
        },
        [
          {
            episodeId: 'ep-72',
            title: 'Episode 72: Deterministic Clinical Telemetry Architecture',
            description: 'Why healthcare robotics require 2ms deterministic execution and zero-latency edge compute.',
            audioUrl: 'https://podcast.example.com/audio/ep-72-master.mp3',
            audioSizeBytes: 42100800,
            durationSeconds: 2700,
            pubDateUtc: new Date().toISOString(),
            explicit: false,
            guid: 'incomeengine-podcast-ep72-2026'
          }
        ]
      );
      return new Response(rss, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    // Sponsor Redirect Attribution
    if (path.startsWith('/sponsor/')) {
      const code = path.split('/')[2];
      const tracker = new SponsorImpressionTracker();
      const redirect = tracker.resolveRedirect(code);

      if (redirect) {
        return Response.redirect(redirect.destinationUrl, 302);
      }
      return new Response('Sponsor campaign expired or invalid', { status: 404 });
    }

    return new Response(JSON.stringify({ error: 'Endpoint not found', available: ['/health', '/feed.xml', '/sponsor/:code'] }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
