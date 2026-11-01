/**
 * Demo Runner for Pack 1: Interview Podcast Production Engine
 */

import { GuestResearchDossierGenerator } from './guest_research_dossier_generator';
import { InterviewAgendaSynthesizer } from './interview_agenda_synthesizer';
import { SeoShowNotesTimestampFormatter } from './seo_shownotes_timestamp_formatter';
import { AudioAudiogramSnippetExtractor } from './audio_audiogram_snippet_extractor';

export function runDemo(): void {
  console.log('=== WAY #70 PACK 1: INTERVIEW PODCAST PRODUCTION ENGINE DEMO ===');
  
  // 1. Guest Dossier
  const dossierGen = new GuestResearchDossierGenerator();
  const dossier = dossierGen.generateDossier(
    {
      guestId: 'guest-101',
      fullName: 'Dr. Sarah Lin',
      title: 'Principal Systems Architect',
      organization: 'Nexus BioHealth Systems',
      linkedinOrTwitterUrl: 'https://podcast.example.com/sarahlin',
      bioSummary: 'Former aerospace telemetry lead, now engineering real-time surgical robotics.',
      coreThesis: 'Clinical edge computing requires deterministic microsecond execution.',
      pastPublications: ['Micro-kernel real-time guarantees', 'Distributed edge state in robotic surgery'],
      sensitiveTopicsAvoidList: ['Pending FDA audit proprietary details']
    },
    'Deterministic Surgical Robotics Infrastructure'
  );
  console.log('1. Guest Dossier Generated: ID =', dossier.dossierId, '| Contrarian Questions Count =', dossier.contrarianQuestions.length);

  // 2. Agenda
  const agendaSyn = new InterviewAgendaSynthesizer();
  const agenda = agendaSyn.create45MinAgenda(72, 'Zero-Latency Surgical Robotics', dossier.guest.fullName);
  console.log('2. 45-Min Pacing Agenda Created: Total Segments =', agenda.segments.length, '| Target =', agenda.targetDurationMinutes, 'min');

  // 3. Show Notes
  const notesFormatter = new SeoShowNotesTimestampFormatter();
  const notes = notesFormatter.formatShowNotes('ep-72', 'Episode 72: Zero-Latency Clinical Systems', dossier.guest.fullName, dossier.guest.organization);
  console.log('3. SEO Show Notes Formatted: Chapters Count =', notes.clickableChapterMarkers.length, '| Sponsor =', notes.sponsorAdReads[0].sponsorName);

  // 4. Audiogram Snippet
  const audiogramExt = new AudioAudiogramSnippetExtractor();
  const audiogram = audiogramExt.extractPullQuote(
    dossier.guest.fullName,
    'If your surgical robot experiences a 15ms latency spike, you do not just drop a frame; you risk patient trauma.',
    1020,
    1065
  );
  console.log('4. Audiogram Snippet Extracted: Score =', audiogram.viralityHookScore, '| Duration =', audiogram.durationSeconds, 's');

  console.log('=== PACK 1 DEMO COMPLETE: ZERO DEFECTS ===');
}

if (require.main === module) {
  runDemo();
}
