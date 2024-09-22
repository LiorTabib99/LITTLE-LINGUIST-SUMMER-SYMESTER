import { Component, OnInit } from '@angular/core';
import { pointsScoreService } from '../services/pointsScore.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { gameCards } from '../../shared/model/gameCards';
import { GameResult } from '../../shared/model/gameResult'; // Import your game result interface

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, MatCardModule],
})
export class DashboardComponent implements OnInit {
  gameHistory: {
    gameTitle: string;
    totalPoints: number;
    grade: number;
    date: Date | null;
    categoryId: string;
  }[] = [];
  lastGame: { gameTitle: string; totalPoints: number } = {
    gameTitle: '',
    totalPoints: 0,
  };
  highestScoreGame: { gameTitle: string; totalPoints: number } = {
    gameTitle: '',
    totalPoints: 0,
  };
  totalGamesPlayed = 0;
  totalGameScore = 0;
  totalCategories = 0;
  perfectGrades = 0;
  gamesNeeded = 0;
  totalRequirdGames = 15;
  totalGamePlayEachMonth = 0;
  consecutiveDays = 0;
  gamesNeededForChallenge = 0;
  uniqueCategoryIds: Set<number> = new Set();

  constructor(
    private scoreService: pointsScoreService,
    private datePipe: DatePipe
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const gameHistoryFromService: GameResult[] =
        await this.scoreService.listGameHistory();

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

      // Filter and sort by date, ignoring null values for date
      this.gameHistory = this.gameHistory
        .filter((game) => game.date !== null)
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

      this.totalGamesPlayed = this.gameHistory.length;
      console.log(this.gameHistory);
      this.totalGameScore = this.gameHistory.reduce((total, game) => {
        const validPoints =
          isNaN(game.totalPoints) || game.totalPoints == null
            ? 0
            : game.totalPoints;
        return total + validPoints;
      }, 0);
      console.log(this.totalGameScore);
      this.totalCategories = new Set(
        this.gameHistory.map((game) => game.gameTitle)
      ).size;
      this.perfectGrades = this.gameHistory.filter(
        (game) => game.grade === 100
      ).length;

      this.calculateConsecutiveDaysStreak();

      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      this.totalGamePlayEachMonth = this.gameHistory.filter((game) => {
        const gameDate = new Date(game.date as Date);
        return gameDate >= start && gameDate <= end;
      }).length;
      this.gamesNeeded = this.totalRequirdGames - this.totalGamePlayEachMonth;
      // this.gamesNeeded = this.totalRequiredGames - this.totalGamePlayEachMonth;
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  calculateConsecutiveDaysStreak(): void {
    const today = new Date();
    let consecutiveDays = 0;
    const currentDate = new Date(today);

    // Use a condition that checks if there are games on the current date
    while (
      this.gameHistory.some((game) => {
        const gameDate = new Date(game.date as Date);
        return gameDate.toDateString() === currentDate.toDateString();
      })
    ) {
      consecutiveDays++;
      currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
    }

    this.consecutiveDays = consecutiveDays;
    console.log('Consecutive days of games played:', this.consecutiveDays);
  }
}
