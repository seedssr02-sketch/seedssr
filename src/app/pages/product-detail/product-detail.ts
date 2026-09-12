import { Component, computed, effect, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product, ProductCategory } from '../../models/product.model';
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
  private readonly quantityOptions = [3, 5, 10];

  private readonly categoryLabels: Record<ProductCategory, string> = {
    feminizadas: 'Feminizadas',
    autoflorescentes: 'Autoflorescentes',
    cali: 'Sementes Especiais',
    atacado: 'Atacado',
    headshop: 'Headshop',
  };

  product = signal<Product | undefined>(undefined);

  related = computed(() => {
    const p = this.product();
    return p ? this.productService.related(p) : [];
  });

  qty = signal(5);

  constructor() {
    effect(() => {
      const slug = this.params()?.get('slug') ?? '';
      this.product.set(this.productService.bySlug(slug));
      this.qty.set(5);
    });
  }

  categoryLabel(category: ProductCategory): string {
    return this.categoryLabels[category] ?? category;
  }

  getSelectedPrice(product: Product): number {
    const quantity = this.qty();
    if (quantity === 3) return Number((product.price * 0.8).toFixed(2));
    if (quantity === 10) return Number((product.price * 2).toFixed(2));
    return Number(product.price.toFixed(2));
  }

  get canDecrease(): boolean {
    return this.qty() > 3;
  }

  get canIncrease(): boolean {
    return this.qty() < 10;
  }

  inc() {
    if (!this.canIncrease) return;
    const current = this.qty();
    const index = this.quantityOptions.indexOf(current);
    const nextIndex = Math.min(index + 1, this.quantityOptions.length - 1);
    this.qty.set(this.quantityOptions[nextIndex]);
  }

  dec() {
    if (!this.canDecrease) return;
    const current = this.qty();
    const index = this.quantityOptions.indexOf(current);
    const nextIndex = Math.max(index - 1, 0);
    this.qty.set(this.quantityOptions[nextIndex]);
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    this.cart.add({ ...p, price: this.getSelectedPrice(p) }, 1);
  }

  buyOnWhatsapp() {
    const p = this.product();
    if (!p) return;
    this.cart.add({ ...p, price: this.getSelectedPrice(p) }, 1);
    const msg = this.whatsapp.buildCartMessage(
      this.cart.items(),
      this.cart.subtotal()
    );
    this.whatsapp.openChat(msg);
  }
}
