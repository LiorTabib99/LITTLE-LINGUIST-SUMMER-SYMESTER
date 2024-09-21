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
    totalPoints: number;
    grade: number;
    date: Date | null;
  }[] = [];
  lastGame: {
    gameTitle: string;
    totalPoints: number;
  } = { gameTitle: '', totalPoints: 0 };
  highestScoreGame: { gameTitle: string; totalPoints: number } = {
    gameTitle: '',
    totalPoints: 0,
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
      this.gameHistory = gameHistoryFromService.map((gameResult) => {
        const gameCard = gameCards.find(
          (card) => card.id === gameResult.gameId
        );
        const gameTitle = gameCard ? gameCard.title : 'Unknown Game';

        const date = new Date(gameResult.date);
        const validDate = isNaN(date.getTime()) ? null : date;

        return {
          gameTitle: gameTitle,
          totalPoints: gameResult.totalPoints,
          grade: gameResult.grade,
          date: validDate,
          categoryId: gameResult.categoryId,
        };
      });
      this.gameHistory = this.gameHistory
        .filter(
          (game) => game.date !== null
          // Filter and sort by date, ignoring null values for date
        )
        .sort(
          (a, b) => (b.date as Date).getTime() - (a.date as Date).getTime()
        );
      if (this.gameHistory.length > 0) {
        this.lastGame = {
          gameTitle: this.gameHistory[0].gameTitle,
          totalPoints: this.gameHistory[0].totalPoints,
        };
        this.highestScoreGame = this.gameHistory.reduce(
          (highest, game) =>
            game.totalPoints > highest.totalPoints ? game : highest,
          { gameTitle: '', totalPoints: 0 }
        );
      }
      this.totalGamePlayEachMonth = this.gameHistory.length;
      this.totalGameScore = this.gameHistory.reduce((total, game) => {
        const validPoints =
          isNaN(game.totalPoints) || game.totalPoints == null
            ? 0
            : game.totalPoints;
        return total + validPoints;
      }, 0);

      //to be fixed
    } catch (error) {
      console.log(error);
    }
  }
}
