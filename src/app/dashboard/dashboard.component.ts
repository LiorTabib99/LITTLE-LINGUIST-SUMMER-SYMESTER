import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameCardComponent } from '../game-card/game-card.component';
import { pointsScoreService } from '../services/pointsScore.service';
import { MatCardModule } from '@angular/material/card';
import { GameResult } from '../../shared/model/gameResult';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [DatePipe],
  imports: [
    CommonModule,
    GameCardComponent,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  gameHistory: {
    gameTitle: string;
    score: number;
    grade: number;
    date: Date | null;
  }[] = [];
  lastGame: {
    gameTitle: string;
    score: number;
  } = { gameTitle: '', score: 0 };
  highestScoreGame: { gameTitle: string; score: number } = {
    gameTitle: '',
    score: 0,
  };
  totalGameScore = 0;
  totalCategories = 0;
  perfetGrades = 0;
  totalGamePlayEachMonth = 0;
  consecutiveDays = 0;
  constructor(private pointsScoreService: pointsScoreService) {}
  async ngOnInit(): Promise<void> {
    try {
      const gameHistoryFromService: GameResult[] =
        await this.pointsScoreService.listGameHistory();
        this.gameHistory = gameHistoryFromService.map(gameResult=>{
          const gameCard = gameCard.find(card=>{
            card.id === gameResult.gameId;
            const gameTitle = gameCard ? gameCard.title : 'uknown game'

            const date = new Date(gameResult.date)
            const validate = isNaN(date.getTime()) ? null : date

            return {
              gameTitle : gameTitle,
              score : gameResult.totalPoints,
              grade : gameResult.grade,
              date : validate
            }
          })
          
        })
    } catch (error) {
      console.log(error);
    }
  }
}
