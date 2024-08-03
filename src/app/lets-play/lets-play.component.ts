
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { gameProfile } from '../../shared/model/gameProfile';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { WordSorterComponent } from '../word-sorter/word-sorter.component';
import { MixLettersComponent } from '../mix-letters/mix-letters.component';
import { FooterComponent } from '../footer/footer.component';
import { GameCardComponent } from '../game-card/game-card.component';

import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-lets-play',
  standalone: true,
  imports: [GameCardComponent,MatToolbarModule ,WordSorterComponent,
    MixLettersComponent,FooterComponent,
    MatCardModule ,RouterModule ,
    MatMenuModule,MatIconModule,
    HeaderComponent,MatButtonModule,CommonModule
  ],
  templateUrl: './lets-play.component.html',
  styleUrl: './lets-play.component.css'
})
export class LetsPlayComponent {
 
}
