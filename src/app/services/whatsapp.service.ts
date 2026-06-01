import { Injectable } from '@angular/core';
import { SITE } from '../config/site.config';
import { CartItem } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private readonly currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  buildCartMessage(items: CartItem[], subtotal: number): string {
    const lines: string[] = [];
    lines.push('*Olá! Quero finalizar este pedido:*');
    lines.push('');
    items.forEach((it, i) => {
      const total = it.product.price * it.quantity;
      lines.push(
        `${i + 1}. ${it.product.name}` +
          `\n   Qtd: ${it.quantity} x ${this.currency.format(it.product.price)} = *${this.currency.format(total)}*`
      );
    });
    lines.push('');
    lines.push(`*Subtotal: ${this.currency.format(subtotal)}*`);
    lines.push('');
    lines.push('Pode me passar formas de pagamento e prazo de entrega? 🌱');
    return lines.join('\n');
  }

  buildProductMessage(productName: string): string {
    return `Olá! Tenho interesse no produto: *${productName}*. Pode me passar mais informações?`;
  }

  openChat(message: string) {
    const url = this.buildUrl(message);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener');
    }
  }

  buildUrl(message: string): string {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
  }
}
