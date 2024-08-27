import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TranslatedWord } from '../../shared/model/translatedWord';
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

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatProgressBarModule],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css',
})
export class WordSorterComponent implements OnInit {
  englishWords: { word: string; status: wordStatus; attemptsLeft: number }[] =
    [];
  hebrewWords: hebrewWord[] = [];
  feedback = '';
  grade = 100;
  score = 0;
  showBackButton = false;
  selectedEnglishWords: {
    word: string;
    status: wordStatus;
    attemptsLeft: number;
  } | null = null;
  wordStatus = wordStatus;
  categoryName: string = '';
  progress = 0;
  totalQuestions: number = 0;
  currentQuestion: number = 0;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private pointScore: pointsScoreService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // שליפת מזהה הקטגוריה מ- queryParamMap
    const categoryId = Number(
      this.route.snapshot.queryParamMap.get('categoryId')
    );
    if (categoryId >= 0) {
      const cateogry = this.categoryService.get(categoryId);
      if (cateogry && cateogry.words.length >= 5) {
        this.englishWords = this.mixWordsArray(
          cateogry.words.map((word) => ({
            word: word.origin,
            status: wordStatus.Normal,
            attemptsLeft: 4,
          }))
        );
        this.hebrewWords = this.mixWordsArray(
          cateogry.words.map((word) => ({
            origin: word.origin,
            translated: word.target,
            status: wordStatus.Normal,
            guess: word.guess,
            attemptsLeft: 4,
          }))
        );
      } else {
        this.feedback =
          'הקטגוריה שנבחרה צריכה להכיל לפחות חמש מילים, אנא בחר קטגוריה אחרת';
        this.showBackButton = true;
      }
    } else {
      this.feedback = 'לא נבחרה קטגוריה';
      this.showBackButton = true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.route.queryParams.subscribe((params) => {});
  }

  private mixWordsArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  // התחברות לקומפוננטת הדיאלוג לתשובה נכונה
  openCorrectAnswersMessage(): void {
    this.dialog.open(CorrectAnswersComponent);
  }

  // התחברות לקומפוננטת הדיאלוג לסיום משחק
  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/main']);
    });
  }

  // ניווט לקטגוריה שנבחרה
  navigationToSelectedCateogry(): void {
    this.router.navigate(['/letsPlay']);
  }

  matchWord(hebrewWord: hebrewWord) {
    if (this.selectedEnglishWords !== null) {
      // בדיקת null מפורשת
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { word, status, attemptsLeft } = this.selectedEnglishWords;
      const matchedWord = this.hebrewWords.find(
        (item) =>
          item.translated === hebrewWord.translated && item.origin === word
      );

      if (matchedWord) {
        this.selectedEnglishWords!.status = wordStatus.Correct;
        matchedWord.status = wordStatus.Correct;
        this.score++;
        this.selectedEnglishWords = null;
        this.openCorrectAnswersMessage();

        if (
          this.englishWords.every((word) => word.status !== wordStatus.Normal)
        ) {
          this.endGame();
        }
      } else {
        this.grade -= 8;

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

        this.feedback = ` ${this.grade}`;
        this.selectedEnglishWords = null;

        if (
          this.englishWords.every((word) => word.status === wordStatus.Disabled)
        ) {
          this.endGame();
        } else {
          this.opeIncorrectAnswersMessage();
        }
      }
    }
  }

  opeIncorrectAnswersMessage(): void{
    this.dialog.open(IcorrectAnswersComponent);
  }


  endGame() {
    this.feedback = ` המשחק הסתיים! הציון הסופי שלך הוא: ${this.score}`;
    // this.feedback = המשחק הסתיים! הציון הסופי שלך הוא: ${this.score};
    this.pointScore.addedGamePlayed('Word sorter', this.score);

    const dataResult = this.englishWords.map((englishWord) => {
      const hebrewWord = this.hebrewWords.find(
        (hebrewWord) => hebrewWord.origin === englishWord.word
      );
      return {
        englishWord: englishWord.word,
        hebrewWord: hebrewWord ? hebrewWord.translated : 'NaN',
        status: englishWord.status === wordStatus.Correct ? 'נכון' : 'שגוי',
      };
    });

    this.dialog.open(GameResultComponent, {
      data: { score: this.score, grade: this.grade, wordPairs: dataResult },
    });
  }

  resetGame(): void {
    this.grade = 100;
    this.score = 0;
    this.englishWords = this.englishWords.map((word) => ({
      ...word,
      status: wordStatus.Normal,
      attemptsLeft: 4,
    }));
    this.hebrewWords = this.hebrewWords.map((word) => ({
      ...word,
      status: wordStatus.Normal,
      attemptsLeft: 4,
    }));

    this.selectedEnglishWords = null;
    this.feedback = '';
    this.englishWords = this.mixWordsArray(this.englishWords);
    this.hebrewWords = this.mixWordsArray(this.hebrewWords);
  }

  // איפוס המילה שנבחרה כאשר לוחצים על "לא"
  resetSelectedWord(): void {
    this.selectedEnglishWords = null;
    this.feedback = '';
  }

  exitDialog() {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/main']);
      }
    });
  }

  get proccess(): number {
    return (this.currentQuestion / this.totalQuestions) * 100;
  }
}