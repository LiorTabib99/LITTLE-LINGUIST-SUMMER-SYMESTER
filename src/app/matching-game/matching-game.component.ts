import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CategoriesService } from '../services/categories.service';
import { pointsScoreService } from '../services/pointsScore.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { wordStatus } from '../../shared/model/wordStatus';
import { hebrewWord } from '../../shared/model/hebrewWord';
import { CorrectAnswersComponent } from '../correct-answers/correct-answers.component';
import { IcorrectAnswersComponent } from '../icorrect-answers/icorrect-answers.component';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { DialogComponent } from '../dialog/dialog.component';
import { gameResultData } from '../../shared/model/gameResultData';
import { GamesResultService } from '../services/gameResults.service';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    DialogComponent,
  ],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
})
export class MatchingGameComponent implements OnInit {
  englishWords: {
    word: string;
    status: wordStatus;
    attemptsLeft: number;
    isCorrect: boolean;
  }[] = [];
  hebrewWords: hebrewWord[] = [];
  feedback = '';
  grade = 0;
  score = 0;
  showBackButton = false;
  selectedEnglishWords: {
    word: string;
    status: wordStatus;
    attemptsLeft: number;
    isCorrect: boolean;
  } | null = null;
  wordStatus = wordStatus;
  categoryName: string = '';
  categoryHasEnoughWords = false; // משתנה בוליאני חדש לבדיקת האם יש מספיק מילים בקטגוריה
  pointsForScore: number = 0;
  progress = 0;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private pointScore: pointsScoreService,
    private router: Router,
    private dialog: MatDialog,
    private gamesResultService: GamesResultService
  ) {}

  async ngOnInit(): Promise<void> {
    const categoryId = String(
      this.route.snapshot.queryParamMap.get('categoryId')
    );
    if (categoryId >= "0") {
      const category = await this.categoryService.get(categoryId.toString());
      this.categoryName = category?.name || 'Unknown Category';

      if (category && category.words.length >= 5) {
        this.categoryHasEnoughWords = true; // עדכון משתנה כאשר יש מספיק מילים
        this.englishWords = this.mixWordsArray(
          category.words.map((word) => ({
            word: word.origin,
            status: wordStatus.Normal,
            attemptsLeft: 3,
            isCorrect: false,
          }))
        );
        this.hebrewWords = this.mixWordsArray(
          category.words.map((word) => ({
            origin: word.origin,
            translated: word.target,
            status: wordStatus.Normal,
            guess: word.guess,
            attemptsLeft: 3,
          }))
        );
        this.pointsForScore = 100 / this.englishWords.length;
      } else {
        this.categoryHasEnoughWords = false; // פחות מחמש מילים, משחק לא יופעל
        this.feedback =
          'To use this game, a category must contain a minimum of five words.';
        this.showBackButton = true;
      }
    } else {
      this.feedback = 'No category selected.';
      this.showBackButton = true;
    }
  }

  private mixWordsArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectedEnglishWord(word: {
    word: string;
    status: wordStatus;
    attemptsLeft: number;
    isCorrect: boolean;
  }) {
    if (word.status === wordStatus.Normal) {
      this.selectedEnglishWords = word;
    }
  }

  openCorrectAnswers(): void {
    this.dialog.open(CorrectAnswersComponent, {
      data: { message: 'Great Job!' },
      width: '200px',
      height: '200px',
    });
  }

  openIncorretAnswers(): void {
    this.dialog.open(IcorrectAnswersComponent, {
      data: { message: 'Incorrect, Give it another try' },
      width: '200px',
      height: '200px',
    });
  }

  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/letsPlay']);
    });
  }

  navigationToSelectedCateogry(): void {
    this.router.navigate(['/letsPlay']);
  }

  matchWord(hebrewWord: hebrewWord) {
    if (this.selectedEnglishWords) {
      const { word } = this.selectedEnglishWords;

      // Find a matching Hebrew word
      const matchedWord = this.hebrewWords.find(
        (item) =>
          item.translated === hebrewWord.translated && item.origin === word
      );

      if (matchedWord) {
        // Correct match
        this.selectedEnglishWords.isCorrect = true;
        this.selectedEnglishWords.status = wordStatus.Disabled;
        matchedWord.status = wordStatus.Disabled;
        this.score++; // Increase score for correct match
        this.selectedEnglishWords = null;
        this.openCorrectAnswers();
        this.grade += this.pointsForScore;

        // Check if all English words are matched
        if (
          this.englishWords.every((word) => word.status !== wordStatus.Normal)
        ) {
          this.endGame();
        }
      } else {
        // Incorrect match
        this.grade -= 2; // Decrease grade by 8 for incorrect match

        // if (this.grade <= 0) {
        //   this.grade = 0;
        //   this.englishWords.forEach((word) => {
        //     word.status = wordStatus.Disabled;
        //     word.attemptsLeft = 0;
        //   });
        //   this.hebrewWords.forEach((hebrew) => {
        //     hebrew.status = wordStatus.Disabled;
        //   });
        //   this.endGame();
        //   return;
        // }

        this.selectedEnglishWords.attemptsLeft--;

        if (this.selectedEnglishWords.attemptsLeft <= 0) {
          this.selectedEnglishWords.status = wordStatus.Disabled;

          this.hebrewWords.forEach((hebrew) => {
            if (hebrew.origin === this.selectedEnglishWords?.word) {
              hebrew.status = wordStatus.Disabled;
            }
          });
        }

        this.feedback = `Incorrect! Grade remaining: ${this.grade}`;
        this.selectedEnglishWords = null;

        if (
          this.englishWords.every((word) => word.status === wordStatus.Disabled)
        ) {
          this.endGame();
        } else {
          this.openIncorretAnswers();
        }
      }
    }
  }

  endGame() {
    this.feedback = `This game is over. Your final score is: ${this.score}`;
    this.pointScore.addedGamePlayed('Word sorter', this.score);
    const dataResult = this.englishWords.map((englishWord) => {
      const hebrewWord = this.hebrewWords.find((hebrewWord) => {
        return hebrewWord.origin === englishWord.word;
      });
      return {
        englishWord: englishWord.word,
        hebrewWord: hebrewWord ? hebrewWord.translated : 'NaN',
        status: englishWord.isCorrect ? 'Correct' : 'Incorrect', // Use isCurrect here
      };
    });

    // Create the game result data
    const resultData: gameResultData = {
      message: this.feedback,
      answers: dataResult,
      grade: this.grade,
      score: this.score,
      categoryName: this.categoryName,
    };

    // Use the service to set the result data
    this.gamesResultService.setResultData(resultData);

    // Navigate to GameResultComponent
    this.router.navigate(['/matching-game-results']);
  }

  resetGame() {
    this.englishWords = [];
    this.hebrewWords = [];
    this.selectedEnglishWords = null;
    this.feedback = '';
    this.score = 0;
    this.grade = 0;
  }

  navigateToCategorySelection() {
    this.router.navigate(['/letsPlay']);
  }
}
