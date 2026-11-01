/**
 * Interview Agenda Synthesizer
 * Formats a dynamic 45-minute broadcast pacing structure with transition hooks and safety boundaries
 */

import { AgendaSegment, InterviewAgenda } from './types';

export class InterviewAgendaSynthesizer {
  public create45MinAgenda(
    episodeNumber: number,
    episodeTitle: string,
    guestName: string,
    sponsorName: string = 'NexusEdge Cloud'
  ): InterviewAgenda {
    const segments: AgendaSegment[] = [
      {
        segmentIndex: 1,
        timecodeStart: '00:00',
        timecodeEnd: '02:00',
        durationMinutes: 2,
        segmentTitle: 'Cold Open Hook & Host Introduction',
        coreTalkingPoints: [
          'High-stakes audio teaser from later in the conversation',
          `Welcome listeners and introduce ${guestName}`,
          'Episode premise and key breakthrough topic'
        ],
        transitionHookPhrase: 'Before we uncover the technical core, let us see where the journey began.',
        isSponsorBreak: true,
        sponsorSlotType: 'pre_roll'
      },
      {
        segmentIndex: 2,
        timecodeStart: '02:00',
        timecodeEnd: '15:00',
        durationMinutes: 13,
        segmentTitle: 'Origin & Core Engineering Thesis',
        coreTalkingPoints: [
          'Guest technical background and foundational problems solved',
          'Why conventional distributed systems fail under strict clinical SLAs',
          'Deconstructing the architectural trade-offs'
        ],
        transitionHookPhrase: 'Which brings us directly to the hardest trade-off in production.',
        isSponsorBreak: false
      },
      {
        segmentIndex: 3,
        timecodeStart: '15:00',
        timecodeEnd: '17:00',
        durationMinutes: 2,
        segmentTitle: 'Mid-Roll Sponsor Endorsement & Break',
        coreTalkingPoints: [
          `Host-read sponsor endorsement: ${sponsorName}`,
          'Live production demonstration of sponsor capability',
          'Listener exclusive promo code and link'
        ],
        transitionHookPhrase: 'Now back to our deep dive with our guest.',
        isSponsorBreak: true,
        sponsorSlotType: 'mid_roll'
      },
      {
        segmentIndex: 4,
        timecodeStart: '17:00',
        timecodeEnd: '35:00',
        durationMinutes: 18,
        segmentTitle: 'Contrarian Debate & Edge Case Failure Analysis',
        coreTalkingPoints: [
          'Contrarian thesis exploration: Why standard advice is incomplete',
          'Anatomy of a real-world edge crash and systematic recovery',
          'Formal verification vs ad-hoc integration testing'
        ],
        transitionHookPhrase: 'Let us pivot to what this means for builders in the next decade.',
        isSponsorBreak: false
      },
      {
        segmentIndex: 5,
        timecodeStart: '35:00',
        timecodeEnd: '42:00',
        durationMinutes: 7,
        segmentTitle: 'Rapid-Fire Insight Round',
        coreTalkingPoints: [
          'Most underrated developer tool or clinical instrumentation',
          'One contrarian book or paper every engineer must read',
          'The biggest myth in modern software architecture'
        ],
        transitionHookPhrase: 'Finally, how can our audience follow your ongoing work?',
        isSponsorBreak: false
      },
      {
        segmentIndex: 6,
        timecodeStart: '42:00',
        timecodeEnd: '45:00',
        durationMinutes: 3,
        segmentTitle: 'Key Takeaways & Outro Call to Action',
        coreTalkingPoints: [
          'Summary of 3 foundational takeaways',
          'Where to find guest research and show notes',
          'Subscribe, review, and join the developer community'
        ],
        transitionHookPhrase: 'Thank you for listening to IncomeEngine Engineering Broadcasts.',
        isSponsorBreak: true,
        sponsorSlotType: 'post_roll'
      }
    ];

    return {
      agendaId: `agenda-${episodeNumber}-${Date.now().toString().slice(-4)}`,
      episodeNumber,
      episodeTitle,
      targetDurationMinutes: 45,
      segments,
      hostBriefingNotes: `Maintain assertive curiosity. Prevent monologues over 2.5 minutes by weaving in contrarian prompts. Protect guest sensitive topic list.`
    };
  }
}
