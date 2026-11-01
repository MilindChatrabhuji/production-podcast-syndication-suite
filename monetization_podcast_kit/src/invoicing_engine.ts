/**
 * Dual-Currency Invoicing Engine for Podcast Retainers & Sponsorships
 * Supports Domestic Indian UPI (HDFC) and International USD PayPal
 */

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPriceUsd: number;
}

export interface InvoiceRecord {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  currency: 'USD' | 'INR';
  exchangeRate: number; // e.g. 84.0 INR / USD
  items: InvoiceLineItem[];
  subtotalUsd: number;
  totalUsd: number;
  totalInr: number;
  issueDate: string;
  dueDate: string;
  paymentDetails: {
    domesticUpi: string;
    internationalPaypal: string;
  };
  notes: string;
}

export class PodcastInvoicingEngine {
  private readonly UPI_ID = 'milind.chatrabhuji@okhdfcbank';
  private readonly PAYPAL_EMAIL = 'milind.chatrabhuji@gmail.com';
  private readonly EXCHANGE_RATE = 84.0;

  public createRetainerInvoice(
    clientName: string,
    clientEmail: string,
    tier: 'starter' | 'growth' | 'studio' | 'single_pack' | 'master_suite',
    invoiceNumber?: string
  ): InvoiceRecord {
    const invNum = invoiceNumber || `INV-POD-${Date.now().toString().slice(-6)}`;
    const today = new Date().toISOString().split('T')[0];
    const due = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];

    const items: InvoiceLineItem[] = [];

    switch (tier) {
      case 'starter':
        items.push({ description: 'Turnkey Podcast Starter Retainer (2 mastered episodes + show notes + audio leveling)', quantity: 1, unitPriceUsd: 500.0 });
        break;
      case 'growth':
        items.push({ description: 'Turnkey Podcast Growth Retainer (4 episodes + guest dossier + SEO show notes + 8 audiograms)', quantity: 1, unitPriceUsd: 1500.0 });
        break;
      case 'studio':
        items.push({ description: 'Studio Network Retainer (8 episodes/mo + executive guest booking + Podcast 2.0 edge syndication)', quantity: 1, unitPriceUsd: 3000.0 });
        break;
      case 'single_pack':
        items.push({ description: 'Production Interview Podcast Production Engine (Single Commercial Pack)', quantity: 1, unitPriceUsd: 9.0 });
        break;
      case 'master_suite':
      default:
        items.push({ description: 'Production Interview Podcast & Syndication Master Suite (All 3 Packs + Showcase)', quantity: 1, unitPriceUsd: 19.0 });
        break;
    }

    const subtotal = items.reduce((acc, it) => acc + (it.quantity * it.unitPriceUsd), 0);
    const totalInr = Math.round(subtotal * this.EXCHANGE_RATE);

    return {
      invoiceNumber: invNum,
      clientName,
      clientEmail,
      currency: 'USD',
      exchangeRate: this.EXCHANGE_RATE,
      items,
      subtotalUsd: subtotal,
      totalUsd: subtotal,
      totalInr,
      issueDate: today,
      dueDate: due,
      paymentDetails: {
        domesticUpi: this.UPI_ID,
        internationalPaypal: this.PAYPAL_EMAIL
      },
      notes: 'Thank you for partnering with IncomeEngine Media Network. 100% evidence-based clinical and systems engineering integrity guaranteed.'
    };
  }

  public renderInvoiceMarkdown(invoice: InvoiceRecord): string {
    return `# COMMERCIAL INVOICE: ${invoice.invoiceNumber}
**Date:** ${invoice.issueDate} | **Due Date:** ${invoice.dueDate}
**Billed To:** ${invoice.clientName} (${invoice.clientEmail})
**Issued By:** Dr. Milind Chatrabhuji (IncomeEngine Media Network, India)

---

### Itemized Service Breakdown
${invoice.items.map(it => `- **${it.description}**: $${it.unitPriceUsd.toFixed(2)} USD`).join('\n')}

---

### Total Due
- **Total in USD:** $${invoice.totalUsd.toFixed(2)} USD
- **Total in INR (approx @ ₹${invoice.exchangeRate}/USD):** ₹${invoice.totalInr.toLocaleString('en-IN')} INR

### Official Settlement Channels
1. **Domestic UPI (India):** \`${invoice.paymentDetails.domesticUpi}\`
2. **International PayPal:** \`${invoice.paymentDetails.internationalPaypal}\` (https://paypal.me/milindchatrabhuji/${invoice.totalUsd}usd)

*Zero out-of-pocket setup expenditure. Powered by Cloudflare Workers edge isolates.*
`;
  }
}
