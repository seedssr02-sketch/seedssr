import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { SITE } from '../../config/site.config';

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawerComponent {
  cart = inject(CartService);
  whatsapp = inject(WhatsappService);
  site = SITE;

  inc(id: string, current: number) {
    this.cart.setQuantity(id, current + 1);
  }

  dec(id: string, current: number) {
    this.cart.setQuantity(id, current - 1);
  }

  checkout() {
    const items = this.cart.items();
    if (items.length === 0) return;
    const msg = this.whatsapp.buildCartMessage(items, this.cart.subtotal());
    this.whatsapp.openChat(msg);
  }
}
