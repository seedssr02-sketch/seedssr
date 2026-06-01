import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../config/site.config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  site = SITE;
  year = new Date().getFullYear();
}
