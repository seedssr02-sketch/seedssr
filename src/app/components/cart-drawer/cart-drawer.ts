import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { CheckoutService } from '../../services/checkout.service';
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
  checkout = inject(CheckoutService);
  site = SITE;

  inc(id: string, current: number) {
    this.cart.setQuantity(id, current + 1);
  }

  dec(id: string, current: number) {
    this.cart.setQuantity(id, current - 1);
  }

  openCheckout() {
    this.checkout.open();
  }
}
