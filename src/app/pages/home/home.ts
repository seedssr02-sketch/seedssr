import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  site = SITE;

  @ViewChild('heroVideo', { static: true }) heroVideo?: ElementRef<HTMLVideoElement>;
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
    { slug: 'amnesia-haze-fem', image: '/img1.jpeg', alt: 'Amnesia Haze Feminizada' },
    { slug: 'purple-punch-fem', image: '/img2.jpeg', alt: 'Purple Punch Feminizada' },
    { slug: 'wedding-cake-auto', image: '/img3.jpeg', alt: 'Wedding Cake Autoflorescente' },
    { slug: 'gorilla-glue-fem', image: '/img4.jpeg', alt: 'Gorilla Glue #4 Feminizada' },
  ];

  // Título animado: cada letra entra sequencialmente e espaços são preservados
  heroTitle = 'Sementes selecionadas, as melhores!';
  heroChars = Array.from(this.heroTitle.replace(/ /g, '\u00A0'));

  openFaq = signal<number | null>(0);

  toggleFaq(i: number) {
    this.openFaq.update((cur) => (cur === i ? null : i));
  }

  talkOnWhatsapp() {
    this.whatsapp.openChat(
      'Olá! Vim pelo site da Señores SEEDS BANK e gostaria de conhecer as genéticas disponíveis.'
    );
  }

  readonly categories = [
    { slug: 'feminizadas', name: 'Feminizadas', icon: '🌸' },
    { slug: 'autoflorescentes', name: 'Autoflorescentes', icon: '⚡' },
    { slug: 'cbd', name: 'CBD', icon: '🌿' },
    { slug: 'cali', name: 'Cali Seeds', icon: '🌴' },
    { slug: 'atacado', name: 'Atacado', icon: '📦' },
    { slug: 'headshop', name: 'Headshop', icon: '🛍️' },
  ];

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
