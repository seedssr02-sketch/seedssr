import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomePage),
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/catalog/catalog').then((m) => m.CatalogPage),
  },
  {
    path: 'catalogo/:category',
    loadComponent: () =>
      import('./pages/catalog/catalog').then((m) => m.CatalogPage),
  },
  {
    path: 'produto/:slug',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then(
        (m) => m.ProductDetailPage
      ),
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/about/about').then((m) => m.AboutPage),
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./pages/contact/contact').then((m) => m.ContactPage),
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then((m) => m.FaqPage),
  },
  { path: '**', redirectTo: '' },
];
