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
import { GameResultComponent } from '../game-result/game-result.component';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { DialogComponent } from '../dialog/dialog.component';
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
  englishWords: { word: string; status: wordStatus; attemptsLeft: number }[] =
    [];
  hebrewWords: hebrewWord[] = [];
  feedback = '';
  grade = 100;
  score = 0;
  showBackButton = false; // Flag to control visibility of the back button
  selectedEnglishWords: {
    word: string;
    status: wordStatus;
    attemptsLeft: number;
  } | null = null;
  wordStatus = wordStatus;
  categoryName: string = ''; // שימו לב שהגדרתי את categoryName כמחרוזת ריקה

  progress = 0;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private pointScore: pointsScoreService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const categoryId = Number(
      this.route.snapshot.queryParamMap.get('categoryId')
    );
    if (categoryId >= 0) {
      const category = this.categoryService.get(categoryId);
      this.categoryName = category?.name || 'Unknown Category'; // שימוש בערך ברירת מחדל במקרה ששם הקטגוריה undefined

      if (category && category.words.length >= 5) {
        // Load the game words as usual
        this.englishWords = this.mixWordsArray(
          category.words.map((word) => ({
            word: word.origin,
            status: wordStatus.Normal,
            attemptsLeft: 4,
          }))
        );
        this.hebrewWords = this.mixWordsArray(
          category.words.map((word) => ({
            origin: word.origin,
            translated: word.target,
            status: wordStatus.Normal,
            guess: word.guess,
            attemptsLeft: 4,
          }))
        );
      } else {
        // Insufficient words, show feedback and back button only
        this.feedback =
          'To use this game, a cateogry must contain a minimum of five words.';
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
  }) {
    if (word.status === wordStatus.Normal) {
      this.selectedEnglishWords = word;
    }
  }

  openCorrectAnswers(): void {
    this.dialog.open(CorrectAnswersComponent, {
      data: { message: 'Great Job!' },
    });
  }

  openIncorretAnswers(): void {
    this.dialog.open(IcorrectAnswersComponent, {
      data: { message: 'Incorrect, Give it another try' },
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
    if (this.selectedEnglishWords !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { word, status, attemptsLeft } = this.selectedEnglishWords;
      const matchedWord = this.hebrewWords.find(
        (item) =>
          item.translated === hebrewWord.translated && item.origin === word
      );

      if (matchedWord) {
        //would have th eoption to click twice one the word
        this.selectedEnglishWords.status = wordStatus.Disabled;
        matchedWord.status = wordStatus.Disabled;
        this.score++; // Increase score for correct match
        this.selectedEnglishWords = null;
        this.openCorrectAnswers();

        if (
          this.englishWords.every((word) => word.status !== wordStatus.Normal)
        ) {
          this.endGame();
        }
      } else {
        this.grade -= 8; // Decrease grade by 8 for incorrect match

        if (this.grade <= 0) {
          this.grade = 0;
          this.englishWords.forEach((word) => {
            word.status = wordStatus.Disabled;
            word.attemptsLeft = 0;
          });
          this.hebrewWords.forEach((hebrew) => {
            hebrew.status = wordStatus.Disabled;
          });
          this.endGame();
          return;
        }

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
    this.feedback = `This game is over your final score is: ${this.score}`;
    this.pointScore.addedGamePlayed('Word sorter', this.score);

    const dataResult = this.englishWords.map((englishWord) => {
      const hebrewWord = this.hebrewWords.find((hebrewWord) => {
        return hebrewWord.origin === englishWord.word;
      });
      return {
        englishWord: englishWord.word,
        hebrewWord: hebrewWord ? hebrewWord.translated : 'NaN',
        status:
          englishWord.status === wordStatus.Disabled ? 'Correct' : 'Incorrect',
      };
    });

    const dialogRef = this.dialog.open(GameResultComponent, {
      data: {
        score: this.score,
        grade: this.grade,
        wordPairs: dataResult,
        categoryName: this.categoryName,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.resetGame();
    });
  }

  resetGame(): void {
    this.grade = 100;
    this.score = 0;
    this.englishWords = this.englishWords.map((word) => ({
      ...word,
      status: wordStatus.Normal,
      attemptsLeft: 3,
    }));
    this.hebrewWords = this.hebrewWords.map((word) => ({
      ...word,
      status: wordStatus.Normal,
      attemptsLeft: 3,
    }));

    this.selectedEnglishWords = null;
    this.feedback = '';
    this.englishWords = this.mixWordsArray(this.englishWords);
    this.hebrewWords = this.mixWordsArray(this.hebrewWords);
  }

  exitDialog() {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/letsPlay']);
      }
    });
  }

  navigateToCategorySelection() {
    this.router.navigate(['/letsPlay']);
  }
}
