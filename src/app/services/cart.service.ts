import { Injectable, PLATFORM_ID, computed, inject, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem, Product } from '../models/product.model';

const STORAGE_KEY = 'seeds-sr.cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly _items = signal<CartItem[]>(this.load());
  private readonly _open = signal(false);

  readonly items = this._items.asReadonly();
  readonly isOpen = this._open.asReadonly();

  readonly count = computed(() =>
    this._items().reduce((acc, it) => acc + it.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce((acc, it) => acc + it.product.price * it.quantity, 0)
  );

  constructor() {
    effect(() => {
      const items = this._items();
      if (this.isBrowser) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {}
      }
    });
  }

  private load(): CartItem[] {
    if (!this.isBrowser) return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  add(product: Product, quantity = 1) {
    this._items.update((items) => {
      const idx = items.findIndex((it) => it.product.id === product.id);
      if (idx >= 0) {
        const next = [...items];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...items, { product, quantity }];
    });
    this.open();
  }

  setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this._items.update((items) =>
      items.map((it) =>
        it.product.id === productId ? { ...it, quantity } : it
      )
    );
  }

  remove(productId: string) {
    this._items.update((items) => items.filter((it) => it.product.id !== productId));
  }

  clear() {
    this._items.set([]);
  }

  open() { this._open.set(true); }
  close() { this._open.set(false); }
  toggle() { this._open.update((v) => !v); }
}
