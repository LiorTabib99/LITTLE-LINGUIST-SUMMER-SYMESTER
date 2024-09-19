import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { Router, NavigationEnd } from '@angular/router';

import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { routerTitleMaping } from '../shared/model/routerTitleMaping';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    MatIconModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private routerTitleMaping = routerTitleMaping;
  showTitle = true; //הראה את כותרת העמוד

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeader(event.urlAfterRedirects);
      }
    });
    this.updateHeader(this.router.url);
  }

  updateHeader(url: string) {
    const routerMaping = Object.keys(this.routerTitleMaping).find((route) =>
      url.startsWith(route)
    );
    if (routerMaping) {
      const { showTitle, headerTitle } = this.routerTitleMaping[routerMaping];
      this.showTitle = showTitle; //boleen האם להראות את זה
      this.headerTitle = headerTitle; // the title itself
    } else {
      this.showTitle = false;
      this.headerTitle = '';
    }
  }

  headerTitle = '';
}
