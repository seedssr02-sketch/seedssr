import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { FAQ } from '../../data/faq.data';
import { SITE } from '../../config/site.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIf, NgFor, ProductCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private productService = inject(ProductService);
  private whatsapp = inject(WhatsappService);
  private router = inject(Router);
  site = SITE;

  @ViewChild('heroVideo', { static: true }) heroVideo?: ElementRef<HTMLVideoElement>;
  @ViewChild('carouselContainer') carouselContainer?: ElementRef<HTMLDivElement>;
  private intersectionObserver?: IntersectionObserver;
  private unlistenScroll?: () => void;
  private unlistenVisibility?: () => void;
  private unlistenResize?: () => void;

  // Seleção manual: lista de slugs que devem aparecer na home
  // Ajuste essa lista conforme quiser destacar outros produtos
  featuredSlugs = [
    'amnesia-haze-fem',
    'purple-punch-fem',
    'wedding-cake-auto',
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

  // Controle do carrossel
  carouselIndex = signal(0);
  private touchStartX = 0;
  private touchEndX = 0;
  private isDragging = false;

  // Título animado: cada letra entra sequencialmente e espaços são preservados
  heroTitle = 'Sementes selecionadas, as melhores!';
  heroChars = Array.from(this.heroTitle.replace(/ /g, '\u00A0'));

  openFaq = signal<number | null>(0);

  toggleFaq(i: number) {
    this.openFaq.update((cur) => (cur === i ? null : i));
  }

  talkOnWhatsapp() {
    this.whatsapp.openChat(
      'Olá! Vim pelo site Señores SEEDS BANK e gostaria de conhecer as genéticas disponíveis.'
    );
  }

  readonly categories = [
    { slug: 'feminizadas', name: 'Feminizadas', icon: '🌸' },
    { slug: 'autoflorescentes', name: 'Autoflorescentes', icon: '⚡' },
    { slug: 'cali', name: 'Cali Seeds', icon: '🌴' },
    { slug: 'atacado', name: 'Atacado', icon: '📦' },
    { slug: 'headshop', name: 'Headshop', icon: '🛍️' },
  ];

  isCategoryActive(category: 'feminizadas' | 'autoflorescentes' | 'cali') {
    const url = this.router.url;
    return url === `/catalogo/${category}` || url.startsWith(`/catalogo/${category}?`) || url.startsWith(`/catalogo/${category}/`);
  }

  // Métodos do carrossel
  nextSlide() {
    this.carouselIndex.update((i) => (i + 1) % this.seedGallery.length);
  }

  prevSlide() {
    this.carouselIndex.update((i) => (i - 1 + this.seedGallery.length) % this.seedGallery.length);
  }

  goToSlide(index: number) {
    this.carouselIndex.set(index);
  }

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
    this.isDragging = true;
  }

  onTouchEnd(e: TouchEvent) {
    this.touchEndX = e.changedTouches[0].clientX;
    this.isDragging = false;
    this.handleSwipe();
  }

  private handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    const threshold = 50; // Mínimo de pixels para considerar um swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe para esquerda = próxima imagem
        this.nextSlide();
      } else {
        // Swipe para direita = imagem anterior
        this.prevSlide();
      }
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const video = this.heroVideo?.nativeElement;
    if (!video) return;

    video.muted = true;
    video.play?.().catch(() => {});

    const keepPlaying = () => {
      if (video.paused && !document.hidden) {
        video.play?.().catch(() => {});
      }
    };

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          keepPlaying();
        }
      },
      { threshold: 0 }
    );

    this.intersectionObserver.observe(video);

    window.addEventListener('scroll', keepPlaying, { passive: true });
    window.addEventListener('resize', keepPlaying);
    window.addEventListener('visibilitychange', keepPlaying);

    this.unlistenScroll = () => window.removeEventListener('scroll', keepPlaying);
    this.unlistenResize = () => window.removeEventListener('resize', keepPlaying);
    this.unlistenVisibility = () => window.removeEventListener('visibilitychange', keepPlaying);
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
    this.unlistenScroll?.();
    this.unlistenResize?.();
    this.unlistenVisibility?.();
  }

  trackBySlug(_index: number, item: { slug: string }) {
    return item.slug;
  }

  trackByProductId(_index: number, item: Product) {
    return item.id;
  }

  trackByFaqQuestion(_index: number, item: { question: string }) {
    return item.question;
  }
}
