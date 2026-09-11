import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-fab',
  template: `
    <button class="fab" (click)="open()" aria-label="WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1.1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1.1 2.7.1.2 1.9 2.9 4.7 4 .7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.5.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.2 14.7 4 13.4 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/>
      </svg>
    </button>
  `,
  styles: `
    .fab {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: var(--color-whatsapp);
      color: #fff;
      display: grid;
      place-items: center;
      box-shadow: 0 6px 16px rgba(37, 211, 102, 0.45);
      z-index: 40;
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .fab:hover {
      background: var(--color-whatsapp-dark);
      transform: scale(1.05);
    }
  `,
})
export class WhatsappFabComponent {
  private whatsapp = inject(WhatsappService);

  open() {
    this.whatsapp.openChat(
      'Olá! Vim pelo site da Neerland Seeds bank BR e gostaria de tirar uma dúvida.'
    );
  }
}
