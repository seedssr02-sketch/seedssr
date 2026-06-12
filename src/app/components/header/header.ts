import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SITE } from '../../config/site.config';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  cart = inject(CartService);
  router = inject(Router);
  site = SITE;

  mobileOpen = signal(false);
  searchOpen = signal(false);
  searchQuery = signal('');

  readonly menu: MenuItem[] = [
    { label: 'Feminizadas', link: '/catalogo/feminizadas' },
    { label: 'Autoflorescentes', link: '/catalogo/autoflorescentes' },
    { label: 'CBD', link: '/catalogo/cbd' },
    { label: 'Sementes de Cali', link: '/catalogo/cali' },
    // Entradas temporariamente removidas: Atacado, Headshop
  ];

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile() {
    this.mobileOpen.set(false);
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
}
