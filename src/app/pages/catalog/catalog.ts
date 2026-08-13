import { Component, computed, effect, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card';

interface CategoryOption {
  slug: ProductCategory | 'todas';
  name: string;
}

type SortKey = 'destaque' | 'preco-asc' | 'preco-desc' | 'nome';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, RouterLinkActive, NgIf, NgFor, ProductCardComponent],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class CatalogPage {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private params = toSignal(this.route.paramMap, { requireSync: true });
  private query = toSignal(this.route.queryParamMap, { requireSync: true });

  sort = signal<SortKey>('destaque');

  readonly categories: CategoryOption[] = [
    { slug: 'todas', name: 'Todas' },
    { slug: 'feminizadas', name: 'Feminizadas' },
    { slug: 'autoflorescentes', name: 'Autoflorescentes' },
    { slug: 'cali', name: 'Sementes de Cali' },
  ];

  category = computed<CategoryOption['slug']>(() => {
    const slug = this.params()?.get('category');
    if (!slug) return 'todas';
    return this.categories.find((c) => c.slug === slug)?.slug ?? 'todas';
  });

  searchTerm = computed(() => this.query()?.get('q') ?? '');

  private hasLoaded = signal(false);

  private scrollOnCategoryChange = effect(() => {
    const category = this.category();
    if (!this.hasLoaded()) {
      this.hasLoaded.set(true);
      return;
    }
    setTimeout(() => this.scrollToProducts(), 120);
  });

  products = computed<Product[]>(() => {
    let list: Product[];
    const cat = this.category();
    if (cat === 'todas') {
      list = this.productService.all();
    } else {
      list = this.productService.byCategory(cat);
    }

    const q = this.searchTerm().trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.genetics?.toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    switch (this.sort()) {
      case 'preco-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'preco-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'nome':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => Number(!!b.bestSeller) - Number(!!a.bestSeller));
    }

    return sorted;
  });

  currentTitle = computed(() => {
    const cat = this.category();
    return this.categories.find((c) => c.slug === cat)?.name ?? 'Catálogo';
  });

  currentDescription = computed(() => {
    const descriptions: Record<CategoryOption['slug'], string> = {
      todas:
        'Veja nosso catálogo completo com todas as categorias e encontre a genética ideal para seu cultivo.',
      feminizadas:
        'Sementes feminizadas são criadas para produzir plantas femininas, com menos risco de flores masculinas e maior consistência na colheita.',
      autoflorescentes:
        'Sementes autoflorescentes crescem rápido e não dependem de mudança de luz, perfeitas para quem busca simplicidade e ciclos mais curtos.',
      cali:
        'Sementes de Cali trazem linhagens inspiradas na Califórnia, com perfil premium, aromas marcantes e estrutura estável.',
      atacado:
        'Atacado reúne ofertas especiais para revenda e growshops, com condições de preço e volume pensadas para compras maiores.',
      headshop:
        'Headshop apresenta acessórios e itens selecionados para cultivo e consumo, com foco em qualidade e conveniência.',
    };

    return descriptions[this.category()] ?? '';
  });

  setSort(event: Event) {
    const value = (event.target as HTMLSelectElement).value as SortKey;
    this.sort.set(value);
  }

  navigateCategory(event: Event, cat: CategoryOption) {
    event.preventDefault();
    const path = cat.slug === 'todas' ? ['/catalogo'] : ['/catalogo', cat.slug];
    this.router.navigate(path).then(() => {
      this.scrollToProducts();
    });
  }

  scrollToProducts() {
    const target = document.getElementById('product-list');
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  trackByCategory(_index: number, item: CategoryOption) {
    return item.slug;
  }

  trackByProduct(_index: number, item: Product) {
    return item.id;
  }
}