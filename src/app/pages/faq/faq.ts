import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQ } from '../../data/faq.data';
import { SITE } from '../../config/site.config';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-faq',
  imports: [RouterLink],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class FaqPage {
  private whatsapp = inject(WhatsappService);

  site = SITE;
  faq = FAQ;
  open = signal<number | null>(0);

  toggle(i: number) {
    this.open.update((cur) => (cur === i ? null : i));
  }

  askOnWhatsapp() {
    this.whatsapp.openChat(
      'Olá! Tenho uma dúvida que não encontrei nas perguntas frequentes do site.'
    );
  }
}
