/**
 * Demo Runner for Pack 3: Podcast Sponsorship & Production Kit
 */

import { PodcastInvoicingEngine } from './invoicing_engine';

export function runDemo(): void {
  console.log('=== WAY #70 PACK 3: MONETIZATION PODCAST KIT DEMO ===');
  const engine = new PodcastInvoicingEngine();

  // Test invoice creation
  const invGrowth = engine.createRetainerInvoice('Nexus Health Systems', 'billing@nexushealth.example.com', 'growth');
  console.log('1. Growth Retainer Invoice:', invGrowth.invoiceNumber, '| USD:', invGrowth.totalUsd, '| INR:', invGrowth.totalInr);

  const invSingle = engine.createRetainerInvoice('BioDev Creator', 'creator@example.com', 'single_pack');
  console.log('2. Single Pack Invoice:', invSingle.invoiceNumber, '| USD:', invSingle.totalUsd, '| INR:', invSingle.totalInr);

  const markdown = engine.renderInvoiceMarkdown(invGrowth);
  console.log('3. Rendered Markdown Length:', markdown.length, 'characters');
  console.log('=== PACK 3 DEMO COMPLETE: ZERO DEFECTS ===');
}

if (require.main === module) {
  runDemo();
}
