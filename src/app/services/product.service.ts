import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';
import {
  PRODUCTS,
  getBestSellers,
  getProductBySlug,
  getProductsByCategory,
  getPromos,
} from '../data/products.data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  all(): Product[] {
    return PRODUCTS;
  }

  byCategory(category: ProductCategory): Product[] {
    return getProductsByCategory(category);
  }

  bySlug(slug: string): Product | undefined {
    return getProductBySlug(slug);
  }

  bestSellers(): Product[] {
    return getBestSellers();
  }

  promos(): Product[] {
    return getPromos();
  }

  search(query: string): Product[] {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.genetics?.toLowerCase().includes(q)
    );
  }

  related(product: Product, limit = 4): Product[] {
    return PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, limit);
  }
}
