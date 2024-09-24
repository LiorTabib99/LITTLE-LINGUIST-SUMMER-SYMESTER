import { Component, OnInit } from '@angular/core';
import { pointsScoreService } from '../services/pointsScore.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { gameCards } from '../../shared/model/gameCards';
import { GameResult } from '../../shared/model/gameResult';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule],
})
export class DashboardComponent implements OnInit {
  gameHistory: {
    totalPoints: number;
    gameTitle: string;
    grade: number;
    date: Date | null;
    categoryId: string;
  }[] = [];
  lastGame: { gameTitle: string; totalPoints: number } = {
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

  lowestGradeGame: { gameTitle: string; grade: number } = {
    gameTitle: '',
    grade: 0,
  };

  highestGradeGame: { gameTitle: string; grade: number } = {
    gameTitle: '',
    grade: 0,
  };

  playedCategories: Category[] = [];

  unPlayedCategories: Category[] = [];

  constructor(
    private scoreService: pointsScoreService,
    private categoriesService: CategoriesService
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
      const allCategories: Category[] = await this.categoriesService.list();
      const playedCategoriesId = new Set(
        this.gameHistory.map((game) => game.categoryId)
      );

      this.playedCategories = allCategories.filter((category) => {
        playedCategoriesId.has(category.id);
      });

      this.unPlayedCategories = allCategories.filter((category) => {
        !playedCategoriesId.has(category.id);
      });

      this.gameHistory = this.gameHistory
        .filter((game) => game.date !== null)
        .sort(
          (a, b) => (b.date as Date).getTime() - (a.date as Date).getTime()
        );

      if (this.gameHistory.length > 0) {
        this.lastGame = {
          gameTitle: this.gameHistory[0].gameTitle,
          totalPoints: this.gameHistory[0].grade,
        };

        this.highestGradeGame = this.gameHistory.reduce(
          (highest, game) => (game.grade > highest.grade ? game : highest),
          { gameTitle: '', grade: 0 }
        );

        this.lowestGradeGame = this.calculateLowestGradeGame();
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
      const totalGames = this.gameHistory.length;
      const perefectGrades = this.gameHistory.filter(
        (game) => game.grade == 100
      ).length;
      const presentGame =
        totalGames > 0 ? (perefectGrades / totalGames) * 100 : 0;
      this.perfectGrades = Math.round(presentGame);

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

  calculateLowestGradeGame(): { gameTitle: string; grade: number } {
    const gradeByGame: { [key: string]: number[] } = {};
    this.gameHistory.forEach((game) => {
      if (!gradeByGame[game.gameTitle]) {
        gradeByGame[game.gameTitle] = [];
      }
      gradeByGame[game.gameTitle].push(game.grade);
    });

    const averageGrade = Object.entries(gradeByGame).map(([title, grade]) => ({
      gameTitle: title,
      averageGrade: grade.reduce((a, b) => a + b, 0) / grade.length,
    }));

    return averageGrade.reduce(
      (lowest, game) =>
        game.averageGrade < lowest.grade
          ? { gameTitle: game.gameTitle, grade: game.averageGrade }
          : lowest,
      { gameTitle: '', grade: Infinity }
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
