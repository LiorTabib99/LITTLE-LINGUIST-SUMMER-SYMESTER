import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoriesService } from '../services/categories.service';
// import { wordStatus } from '../../shared/model/wordStatus';
// import { hebrewWord } from '../../shared/model/hebrewWord';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { TranslatedWord } from '../../shared/model/translatedWord';
import { pointsScoreService } from '../services/pointsScore.service';
import { CorrectAnswersComponent } from '../correct-answers/correct-answers.component';
import { IcorrectAnswersComponent } from '../icorrect-answers/icorrect-answers.component';
import { EndGameMixedLettersComponent } from '../end-game-mixed-letters/end-game-mixed-letters.component';
// import { AnimationDriver } from '@angular/animations/browser';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-mix-letters',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  templateUrl: './mix-letters.component.html',
  styleUrls: ['./mix-letters.component.css'],
})
export class MixLettersComponent implements OnInit {
  words: TranslatedWord[] = [];
  currentWordIndex: number = 0;
  currentWord: TranslatedWord = {
    origin: '',
    target: '',
    guess: '',
  };
  mixedword: string = '';
  guessInput: string = '';
  message: string = '';
  attempts: number = 0;
  score: number = 0;
  grade: number = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: any[] = [];
  categoryName: string = '';
  totalQuestions: number = 0;
  currentQuestion: number = 0;
  private dialogConfig: MatDialogConfig = { width: '700px', height: '700px' };

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private scorceService: pointsScoreService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = +params['categoryId'];
      this.loadWordsFromCategory(categoryId);
    });
  }

  loadWordsFromCategory(categoryId: number): void {
    if (categoryId >= 0) {
      if (categoryId === 0) {
        this.handleSpecialCategory();
      } else {
        const cateogry = this.categoryService.get(categoryId);
        if (cateogry) {
          this.words = cateogry.words;
          this.categoryName = cateogry.name;
          console.log(this.categoryName);
          this.totalQuestions = this.words.length;
          this.newGame();
        } else {
          this.message = 'category not found';
        }
      }
    } else {
      this.message = 'Invalid cateogryId';
    }
  }

  //handle the first cateogry and start the game to a new game
  handleSpecialCategory(): void {
    const defualtCateogry = this.categoryService.get(0);

    if (defualtCateogry) {
      this.categoryName = defualtCateogry.name;
      this.words = defualtCateogry.words;
      this.totalQuestions = this.words.length;
      this.newGame();
    } else {
      this.message = "Default cateogry wan't found";
    }
  }

  //Will create a new game
  newGame(): void {
    this.attempts = 0;
    this.currentQuestion = 0;
    this.currentWordIndex = 0;
    this.loadWord();
  }

  loadWord(): void {
    this.currentWord = this.words[this.currentWordIndex];
    this.mixedword = this.scrambelredWord(
      this.currentWord.origin.split('')
    ).join(' ');
    this.guessInput = '';
    this.message = '';
  }

  scrambelredWord(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkGuess(): void {
    this.attempts++;
    this.currentQuestion++;
    const isCorrect =
      this.guessInput.toLowerCase() === this.currentWord.origin.toLowerCase();
    this.answers.push({
      //global to the all word  on this word
      question: this.mixedword.replace(/ /g, ''),
      answer: this.guessInput,
      isCorrect: isCorrect,
    });
    if (isCorrect) {
      this.attempts++;
      this.message = 'Correct';
      this.dialog.open(CorrectAnswersComponent, {
        data: { message: 'Correct' },
      });
      this.score++;
      this.scorceService.updateScore(this.score);
      this.nextWord();
    } else {
      this.grade -= 8;
      this.message = 'Try again';
      this.dialog.open(IcorrectAnswersComponent, {
        data: {
          message: 'inCorrect',
        },
      });
      if (this.grade <= 0 || this.attempts === 3) {
        this.grade = 0;
        this.endGame();
      }
    }
  }

  endGame(): void {
    this.scorceService.addedGamePlayed('Mixed Letters', this.score);
    this.message = `Congratulations, we have completed ${
      this.currentQuestion + 1
    } of ${this.totalQuestions}`;
    const dialogRef = this.dialog.open(EndGameMixedLettersComponent, {
      ...this.dialogConfig,
      data: {
        grade: this.grade,
        score: this.score,
        answers: this.answers,
        message: this.message,
        categoryName: this.categoryName,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.resetGame();
    });
  }

  //Will reset thee game to a new game
  resetGame(): void {
    this.newGame();
  }

  //checks if the lengeth of the words on the array
  nextWord(): void {
    this.currentWordIndex++;
    if (this.currentWordIndex < this.words.length) {
      this.loadWord();
    } else {
      this.endGame();
    }
  }

  //exiting the game
  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/main']);
      }
    });
  }

  //returning true if it is hebrew word
  isHebrewWord(word: string): boolean {
    return /[\u0590-\u05FF]/.test(word);
  }

  get proccess(): number {
    return (this.currentQuestion / this.totalQuestions) * 100;
  }
}
