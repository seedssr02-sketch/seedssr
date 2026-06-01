import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  bestSellers = this.productService.bestSellers();
  promos = this.productService.promos();
  faq = FAQ;

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
}
