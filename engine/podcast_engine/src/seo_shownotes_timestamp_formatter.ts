/**
 * SEO Show Notes & Timestamp Formatter
 * Generates structured, clickable audio chapters, bullet points, and sponsor read copy
 */

import { ChapterMarker, SeoShowNotes } from './types';

export class SeoShowNotesTimestampFormatter {
  public formatShowNotes(
    episodeId: string,
    title: string,
    guestName: string,
    guestOrg: string,
    sponsorName: string = 'NexusEdge Cloud'
  ): SeoShowNotes {
    const chapters: ChapterMarker[] = [
      { timestampSeconds: 0, timestampFormatted: '00:00:00', chapterTitle: 'Cold Open Hook & Introductions' },
      { timestampSeconds: 120, timestampFormatted: '00:02:00', chapterTitle: `${guestName} on Clinical Telemetry Infrastructure` },
      { timestampSeconds: 900, timestampFormatted: '00:15:00', chapterTitle: `Sponsor Spotlight: ${sponsorName}` },
      { timestampSeconds: 1020, timestampFormatted: '00:17:00', chapterTitle: 'Contrarian Architectural Trade-Offs' },
      { timestampSeconds: 2100, timestampFormatted: '00:35:00', chapterTitle: 'Rapid-Fire Technical Questioning' },
      { timestampSeconds: 2520, timestampFormatted: '00:42:00', chapterTitle: 'Concluding Takeaways & Show Notes' }
    ];

    return {
      episodeId,
      title,
      tagline: `How ${guestName} from ${guestOrg} builds fault-tolerant distributed healthcare infrastructure.`,
      summaryParagraph: `In this episode of IncomeEngine Broadcasts, we sit down with ${guestName} (${guestOrg}) to deconstruct the engineering principles behind deterministic, zero-latency clinical software. We cover formal verification, edge routing safety barriers, and why common web architecture patterns fail in critical health informatics.`,
      clickableChapterMarkers: chapters,
      keyTakeawayBulletPoints: [
        'Deterministic execution is a life-safety requirement in medical devices, not just a performance perk.',
        'Edge isolates provide sub-10ms distributed telemetry without running costly server clusters.',
        'Why formal mathematical verification of state machines prevents fatal concurrency crashes.',
        'How to maintain regulatory compliance (HIPAA, DPDP, CE mark) while iterating software rapidly.'
      ],
      guestLinks: [
        { label: `${guestName} Profile`, url: 'https://podcast.example.com/guest/milind-chatrabhuji' },
        { label: `${guestOrg} Engineering Research`, url: 'https://podcast.example.com/research' }
      ],
      resourcesMentioned: [
        { name: 'Distributed Systems & Clinical Informatics Guidelines', url: 'https://podcast.example.com/guidelines' },
        { name: 'Cloudflare Workers Edge Architecture Whitepaper', url: 'https://podcast.example.com/whitepaper' }
      ],
      sponsorAdReads: [
        {
          sponsorName,
          readCopy: `This episode is powered by ${sponsorName}. Build and deploy high-performance edge isolates across 300+ cities with sub-10ms global execution. Visit nexusedge.example.com and use code PODCAST25 for $25 off your initial deployment credits.`,
          linkUrl: 'https://nexusedge.example.com',
          couponCode: 'PODCAST25'
        }
      ],
      disclaimer: 'This podcast is for educational and engineering purposes only. Contains 100% modern evidence-based clinical informatics and systems engineering. Strictly no alternative health claims.'
    };
  }

  public renderMarkdown(notes: SeoShowNotes): string {
    return `# ${notes.title}
*${notes.tagline}*

---

### Episode Summary
${notes.summaryParagraph}

---

### Clickable Audio Chapters
${notes.clickableChapterMarkers.map(c => `- \`[${c.timestampFormatted}]\` **${c.chapterTitle}**`).join('\n')}

---

### Key Takeaways
${notes.keyTakeawayBulletPoints.map(k => `- ${k}`).join('\n')}

---

### Episode Sponsors
${notes.sponsorAdReads.map(s => `> **${s.sponsorName}**: ${s.readCopy}\n> [Claim Offer with Code ${s.couponCode}](${s.linkUrl})`).join('\n\n')}

---

### Guest & Resources
**Guest Links:**
${notes.guestLinks.map(g => `- [${g.label}](${g.url})`).join('\n')}

**Resources Mentioned:**
${notes.resourcesMentioned.map(r => `- [${r.name}](${r.url})`).join('\n')}

---
*${notes.disclaimer}*
`;
  }
}
