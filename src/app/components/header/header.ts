import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SITE } from '../../config/site.config';

interface MenuItem {
  label: string;
  link?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgIf, NgFor],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  cart = inject(CartService);
  router = inject(Router);
  site = SITE;

  seedsOpen = signal(false);
  mobileOpen = signal(false);
  searchOpen = signal(false);
  searchQuery = signal('');

  readonly menu: MenuItem[] = [
    { label: 'Home', link: '/' },
    {
      label: 'Sementes',
      children: [
        { label: 'Feminizadas', link: '/catalogo/feminizadas' },
        { label: 'Autoflorescentes', link: '/catalogo/autoflorescentes' },
        { label: 'Sementes Especiais', link: '/catalogo/cali' },
      ],
    },
    { label: 'Sobre', link: '/sobre' },
    { label: 'Contato', link: '/contato' },
  ];

  toggleSeedsMenu() {
    this.seedsOpen.update((v) => !v);
  }

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile() {
    this.mobileOpen.set(false);
    this.seedsOpen.set(false);
  }

  toggleSearch() {
    this.searchOpen.update((v) => !v);
  }

  submitSearch(event: Event) {
    event.preventDefault();
    const q = this.searchQuery().trim();
    this.searchOpen.set(false);
    if (q) {
      this.router.navigate(['/catalogo'], { queryParams: { q } });
    } else {
      this.router.navigate(['/catalogo']);
    }
  }

  openCart() {
    this.cart.open();
  }

  trackByLabel(_index: number, item: { label: string }) {
    return item.label;
  }
}
