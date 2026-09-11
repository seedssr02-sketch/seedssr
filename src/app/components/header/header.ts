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
    { label: 'Home', link: '/' },
    { label: 'Sementes', link: '/catalogo' },
    { label: 'Roupas & Acessórios', link: '/catalogo/headshop' },
    { label: 'Contato', link: '/contato' },
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
