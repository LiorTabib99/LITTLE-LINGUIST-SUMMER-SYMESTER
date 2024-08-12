import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { Router, NavigationEnd } from '@angular/router';
import { routes } from './app.routes';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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

  private routerTitleMaping: {
    [key: string]: {
      showTitle: boolean;
      headerTitle: string;
    };
  } = {
    '/main': {
      showTitle: true,
      headerTitle: 'HomePage-Dashboard',
    },
    '/letsPlay': {
      showTitle: true,
      headerTitle: 'Choose a Game',
    },
    '/trivia-game': {
      showTitle: true,
      headerTitle: 'Play - Trivia',
    },
    '/mixLetter': {
      showTitle: true,
      headerTitle: 'Play - Mixed Letter',
    },
    '/word-sorting-game': {
      showTitle: true,
      headerTitle: 'Play - Word Sorting',
    },
  };


  goBack(): void {
    this.location.back();
  }
}
