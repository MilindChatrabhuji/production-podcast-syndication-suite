/**
 * RSS Feed Syndicator
 * Generates Apple Podcasts & Spotify compliant Podcast 2.0 XML feeds
 */

import { PodcastShowMeta, PodcastEpisodeMeta } from './types';

export class RssFeedSyndicator {
  public generatePodcastRss(
    show: PodcastShowMeta,
    episodes: PodcastEpisodeMeta[]
  ): string {
    const itemsXml = episodes.map(ep => {
      return `    <item>
      <title><![CDATA[${ep.title}]]></title>
      <description><![CDATA[${ep.description}]]></description>
      <pubDate>${new Date(ep.pubDateUtc).toUTCString()}</pubDate>
      <guid isPermaLink="false">${ep.guid}</guid>
      <enclosure url="${ep.audioUrl}" length="${ep.audioSizeBytes}" type="audio/mpeg" />
      <itunes:duration>${ep.durationSeconds}</itunes:duration>
      <itunes:explicit>${ep.explicit ? 'yes' : 'no'}</itunes:explicit>
      ${ep.chaptersJsonUrl ? `<podcast:chapters url="${ep.chaptersJsonUrl}" type="application/json+chapters" />` : ''}
      ${ep.transcriptUrl ? `<podcast:transcript url="${ep.transcriptUrl}" type="text/vtt" />` : ''}
    </item>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:podcast="https://podcastindex.org/namespace/1.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${show.showTitle}]]></title>
    <description><![CDATA[${show.showDescription}]]></description>
    <link>${show.websiteUrl}</link>
    <language>${show.language}</language>
    <copyright>${show.copyright}</copyright>
    <itunes:author>${show.authorName}</itunes:author>
    <itunes:owner>
      <itunes:name>${show.authorName}</itunes:name>
      <itunes:email>${show.ownerEmail}</itunes:email>
    </itunes:owner>
    <itunes:image href="${show.coverImageUrl}" />
    <itunes:category text="${show.category}">
      ${show.subcategory ? `<itunes:category text="${show.subcategory}" />` : ''}
    </itunes:category>
    <itunes:explicit>no</itunes:explicit>
${itemsXml}
  </channel>
</rss>`;
  }
}
