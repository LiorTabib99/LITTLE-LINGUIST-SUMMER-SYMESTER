import { Component, OnInit } from '@angular/core';
import { pointsScoreService } from '../services/pointsScore.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { gameCards } from '../../shared/model/gameCards';
import { GameResult } from '../../shared/model/gameResult';

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
  lowestScoreGame: { gameTitle: string; totalPoints: number } = {
    gameTitle: '',
    totalPoints: 0,
  };
  categoryPlayedMost: { categoryId: string; name: string; count: number } = {
    categoryId: '',
    name: '',
    count: 0,
  };
  totalGamesPlayed = 0;
  totalGameScore = 0;
  totalCategories = 0;
  perfectGrades = 0;
  gamesNeeded = 0;
  totalRequirdGames = 20;
  totalGamePlayEachMonth = 0;
  consecutiveDays = 0;

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
          gameTitle,
          totalPoints: gameResult.totalPoints,
          grade: gameResult.grade,
          date: validDate,
          categoryId: gameResult.categoryId,
        };
      });

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

        this.lowestScoreGame = this.calculateLowestScoreGame();
        this.categoryPlayedMost = this.calculateMostPlayedCategory();
      }

      this.totalGamesPlayed = this.gameHistory.length;
      this.totalGameScore = this.gameHistory.reduce((total, game) => {
        const validPoints =
          isNaN(game.totalPoints) || game.totalPoints == null
            ? 0
            : game.totalPoints;
        return total + validPoints;
      }, 0);
      this.totalCategories = new Set(
        this.gameHistory.map((game) => game.categoryId)
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
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  calculateLowestScoreGame(): { gameTitle: string; totalPoints: number } {
    const scoresByGame: { [key: string]: number[] } = {};
    this.gameHistory.forEach((game) => {
      if (!scoresByGame[game.gameTitle]) {
        scoresByGame[game.gameTitle] = [];
      }
      scoresByGame[game.gameTitle].push(game.totalPoints);
    });

    const averageScores = Object.entries(scoresByGame).map(
      ([title, scores]) => ({
        gameTitle: title,
        averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
      })
    );

    return averageScores.reduce(
      (lowest, game) =>
        game.averageScore < lowest.totalPoints
          ? { gameTitle: game.gameTitle, totalPoints: game.averageScore }
          : lowest,
      { gameTitle: '', totalPoints: Infinity }
    );
  }

  calculateMostPlayedCategory(): {
    categoryId: string;
    name: string;
    count: number;
  } {
    const categoryCount: { [key: string]: number } = {};
    this.gameHistory.forEach((game) => {
      if (!categoryCount[game.categoryId]) {
        categoryCount[game.categoryId] = 0;
      }
      categoryCount[game.categoryId]++;
    });

    const mostPlayedCategory = Object.entries(categoryCount).reduce(
      (mostPlayed, [categoryId, count]) =>
        count > mostPlayed.count ? { categoryId, count } : mostPlayed,
      { categoryId: '', count: 0 }
    );

    const categoryIdAsNumber = Number(mostPlayedCategory.categoryId);
    const category = gameCards.find((card) => card.id === categoryIdAsNumber);

    console.log('Game History:', this.gameHistory);
    console.log('Game Cards:', gameCards);

    return {
      categoryId: mostPlayedCategory.categoryId,
      name: category ? category.title : 'Unknown Category',
      count: mostPlayedCategory.count,
    };
  }

  

  

  calculateConsecutiveDaysStreak(): void {
    const today = new Date();
    let consecutiveDays = 0;
    const currentDate = new Date(today);

    while (
      this.gameHistory.some((game) => {
        const gameDate = new Date(game.date as Date);
        return gameDate.toDateString() === currentDate.toDateString();
      })
    ) {
      consecutiveDays++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    this.consecutiveDays = consecutiveDays;
  }
}
