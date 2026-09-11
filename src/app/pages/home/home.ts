import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { FAQ } from '../../data/faq.data';
import { SITE } from '../../config/site.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  private productService = inject(ProductService);
  private whatsapp = inject(WhatsappService);
  site = SITE;

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
  heroBackground =
    'https://neerlandseedsbank.com/wp-content/uploads/2025/02/wietzaden-actie-neerland.jpg';
  heroTitle = 'Neerland Seeds bank BR';
  heroChars = Array.from(this.heroTitle.replace(/ /g, '\u00A0'));

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
