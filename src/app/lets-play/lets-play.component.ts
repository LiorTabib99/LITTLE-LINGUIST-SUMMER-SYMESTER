
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { pointsScoreService } from '../services/pointsScore.service';

@Component({
  selector: 'app-lets-play',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    WordSorterComponent,
    MixLettersComponent,
    FooterComponent,
    MatCardModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    GameCardComponent
  ],
  templateUrl: './lets-play.component.html',
  styleUrls: ['./lets-play.component.css']
})
export class LetsPlayComponent implements OnInit {
  score: number = 0;

  constructor(private pointsScoreService: pointsScoreService) {}

  ngOnInit(): void {
    this.score = this.pointsScoreService.getCurrentScore(); // Retrieve the score from the service
  }
}