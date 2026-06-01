import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer';
import { WhatsappFabComponent } from './components/whatsapp-fab/whatsapp-fab';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CartDrawerComponent,
    WhatsappFabComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
