import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SITE } from '../../config/site.config';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactPage {
  private whatsapp = inject(WhatsappService);

  site = SITE;

  name = signal('');
  message = signal('');

  get whatsappDisplay(): string {
    const n = SITE.whatsappNumber;
    // 55 (11) 99999-9999
    if (n.length >= 12) {
      const cc = n.slice(0, 2);
      const ddd = n.slice(2, 4);
      const rest = n.slice(4);
      const half = Math.ceil(rest.length / 2);
      return `+${cc} (${ddd}) ${rest.slice(0, half)}-${rest.slice(half)}`;
    }
    return n;
  }

  send() {
    const name = this.name().trim();
    const message = this.message().trim();
    const parts: string[] = ['*Olá! Vim pelo site da Neerland Seeds bank BR.*', ''];
    if (name) parts.push(`Meu nome é *${name}*.`);
    parts.push(message || 'Gostaria de mais informações.');
    this.whatsapp.openChat(parts.join('\n'));
  }
}
