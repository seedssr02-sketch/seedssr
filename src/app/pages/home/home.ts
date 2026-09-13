import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { FAQ, FaqItem } from '../../data/faq.data';
import { SITE } from '../../config/site.config';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  private productService = inject(ProductService);
  private whatsapp = inject(WhatsappService);
  private router = inject(Router);
  site = SITE;

  // Seleção manual: lista de slugs que devem aparecer na home
  // Ajuste essa lista conforme quiser destacar outros produtos
  featuredSlugs = [
    'amnesia-haze-fem',
    'purple-punch-fem',
    'gorilla-glue-fem',
  ];

  // Mapear slugs para produtos, filtrar vazios e sem imagem, limitar a 4
  bestSellers = this.featuredSlugs
    .map((s) => this.productService.bySlug(s))
    .filter((p): p is Product => !!p && !!p.image)
    .slice(0, 4);
  promos = this.productService.promos();
  faq = FAQ;

  readonly seedGallery = [
    { slug: 'feminizadas', image: '/logo/img-crsse01.png', alt: 'CrssE01', route: '/catalogo/feminizadas' },
    { slug: 'autoflorescentes', image: '/logo/img-crsse03.png', alt: 'CrssE03', route: '/catalogo/autoflorescentes' },
    { slug: 'cali', image: '/logo/img-crsse02.png', alt: 'CrssE02', route: '/catalogo/cali' },
  ];

  // Título animado: cada letra entra sequencialmente e espaços são preservados
  heroTitle = 'Sementes selecionadas, as melhores!';
  heroChars = Array.from(this.heroTitle.replace(/ /g, '\u00A0'));

  carouselIndex = signal(0);
  private touchStartX = 0;

  nextSlide() {
    this.carouselIndex.update((index) => (index + 1) % this.seedGallery.length);
  }

  prevSlide() {
    this.carouselIndex.update((index) => (index - 1 + this.seedGallery.length) % this.seedGallery.length);
  }

  goToSlide(index: number) {
    this.carouselIndex.set(index);
  }

  trackBySlug(_: number, item: { slug: string }) {
    return item.slug;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0]?.clientX ?? this.touchStartX;
    const distance = touchEndX - this.touchStartX;
    if (Math.abs(distance) < 40) return;
    distance < 0 ? this.nextSlide() : this.prevSlide();
  }

  isCategoryActive(category: string) {
    return this.router.url === `/catalogo/${category}`;
  }

  trackByProductId(_: number, product: Product) {
    return product.id;
  }

  trackByFaqQuestion(_: number, item: FaqItem) {
    return item.question;
  }

  openFaq = signal<number | null>(0);

  toggleFaq(i: number) {
    this.openFaq.update((cur) => (cur === i ? null : i));
  }

  talkOnWhatsapp() {
    this.whatsapp.openChat(
      'Olá! Vim pelo site da Neerland Seeds bank BR e gostaria de conhecer as genéticas disponíveis.'
    );
  }

  readonly categories = [
    { slug: 'feminizadas', name: 'Feminizadas', icon: '🌸' },
    { slug: 'autoflorescentes', name: 'Autoflorescentes', icon: '⚡' },
    { slug: 'cbd', name: 'CBD', icon: '🌿' },
    { slug: 'cali', name: 'Sementes de Cali', icon: '🌴' },
    { slug: 'atacado', name: 'Atacado', icon: '📦' },
    { slug: 'headshop', name: 'Headshop', icon: '🛍️' },
  ];
}
