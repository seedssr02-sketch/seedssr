import { Component, computed, effect, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink, ProductCardComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetailPage {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  cart = inject(CartService);
  private whatsapp = inject(WhatsappService);

  private params = toSignal(this.route.paramMap, { requireSync: true });

  product = signal<Product | undefined>(undefined);

  related = computed(() => {
    const p = this.product();
    return p ? this.productService.related(p) : [];
  });

  qty = signal(1);

  constructor() {
    effect(() => {
      const slug = this.params()?.get('slug') ?? '';
      this.product.set(this.productService.bySlug(slug));
      this.qty.set(1);
    });
  }

  inc() { this.qty.update((v) => v + 1); }
  dec() { this.qty.update((v) => Math.max(1, v - 1)); }

  addToCart() {
    const p = this.product();
    if (!p) return;
    this.cart.add(p, this.qty());
  }

  buyOnWhatsapp() {
    const p = this.product();
    if (!p) return;
    this.cart.add(p, this.qty());
    const msg = this.whatsapp.buildCartMessage(
      this.cart.items(),
      this.cart.subtotal()
    );
    this.whatsapp.openChat(msg);
  }
}
