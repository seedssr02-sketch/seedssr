import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../config/site.config';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutPage {
  site = SITE;
}
