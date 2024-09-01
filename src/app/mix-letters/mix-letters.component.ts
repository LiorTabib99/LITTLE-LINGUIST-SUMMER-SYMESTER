import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { pointsScoreService } from '../services/pointsScore.service';
import { CorrectAnswersComponent } from '../correct-answers/correct-answers.component';
import { IcorrectAnswersComponent } from '../icorrect-answers/icorrect-answers.component';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { TranslatedWord } from '../../shared/model/translatedWord';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { gameResultData } from '../../shared/model/gameResultData';
import { GamesResultService } from '../services/gameResults.service';

@Component({
  selector: 'app-mixed-letters-game',
  templateUrl: './mix-letters.component.html',
  styleUrls: ['./mix-letters.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
  ],
})
export class MixLettersComponent implements OnInit {
  words: TranslatedWord[] = []; // מערך לאחסון המילים
  currentWordIndex: number = 0;
  currentWord: TranslatedWord = { origin: '', target: '', guess: '' }; // מילת המשחק הנוכחית
  mixedword: string = '';
  guessInput: string = '';
  message: string = '';
  score: number = 0;
  grade: number = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: any[] = [];
  categoryName: string = ''; // שם הקטגוריה הנבחרת
  totalQuestions: number = 0; // סך כל השאלות במשחק
  currentQuestion: number = 0; // אינדקס השאלה הנוכחית
  pointsForQuestion: number = 0; // נקודות לכל שאלה
  totalScoure: number = 0;
  attemptsLeft: number = 1; // מספר הניסיונות שנותרו לכל מילה
  answeredWords: Set<string> = new Set(); // מעקב אחר מילים שנענו
  currectAnswers = 0;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private scoreService: pointsScoreService,
    private router: Router,
    private gameResultService: GamesResultService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = +params['categoryId'];
      this.loadWordsFromCategory(categoryId);
    });
    this.score = 0;
  }

  loadWordsFromCategory(categoryId: number): void {
    if (categoryId >= 0) {
      if (categoryId === 0) {
        this.handleSpecialCategory();
      } else {
        const category = this.categoriesService.get(categoryId);
        if (category) {
          if (category.words.length === 0) {
            this.message = 'The category is empty. No words to display!';
            return;
          }
          this.words = category.words;
          this.categoryName = category.name; // Setting the category name
          this.totalQuestions = this.words.length;
          this.pointsForQuestion = 100 / this.words.length;
          this.newGame();
        } else {
          this.message = 'Category not found!';
        }
      }
    } else {
      this.message = 'Invalid category ID!';
    }
  }

  handleSpecialCategory(): void {
    const defaultCategory = this.categoriesService.get(0);
    this.categoryName = defaultCategory!.name;
    if (defaultCategory) {
      this.words = defaultCategory.words;
      this.totalQuestions = this.words.length;
      this.pointsForQuestion = 100 / this.words.length;
      this.newGame();
    } else {
      this.message = 'Default category not found!';
    }
  }

  newGame(): void {
    this.currentQuestion = 0;
    this.currentWordIndex = 0;
    this.grade = 0;
    this.answers = [];
    this.answeredWords.clear();
    this.message = '';
    this.score = 0;
    this.loadWord();
  }

  loadWord(): void {
    this.currentWord = this.words[this.currentWordIndex];
    this.mixedword = this.shuffle(this.currentWord.origin.split('')).join(' ');
    this.guessInput = '';
    this.message = '';
  }

  shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkGuess(): void {
    const isCorrect =
      this.guessInput.toLowerCase() === this.currentWord.origin.toLowerCase();

    if (!this.answeredWords.has(this.currentWord.origin)) {
      if (isCorrect) {
        this.currentQuestion++;
        this.currectAnswers++;
        this.grade += this.pointsForQuestion;
        this.answeredWords.add(this.currentWord.origin);
        this.message = 'Correct! 🎉';
        this.dialog.open(CorrectAnswersComponent, {
          data: {
            message: 'Correct! 🎉',
            origin: this.currentWord.origin,
            target: this.currentWord.target,
          },
          width: '200px',
          height: '200px',
        });
        this.score++;
        this.scoreService.updateScore(this.score);
        this.answers.push({
          question: this.mixedword.replace(/ /g, ''),
          answer: this.currentWord.origin,
          isCorrect: true,
          origin: this.currentWord.origin,
          target: this.currentWord.target,
        });
        this.nextWord();
      } else {
        this.attemptsLeft--;
        this.grade -= 2;
        this.message = 'Try again!';
        if (this.attemptsLeft <= 0) {
          this.answeredWords.add(this.currentWord.origin);
          this.answers.push({
            question: this.mixedword.replace(/ /g, ''),
            answer: this.currentWord.origin,
            isCorrect: false,
            origin: this.currentWord.origin,
            target: this.currentWord.target,
          });
          this.currentQuestion++;
        }
        this.dialog.open(IcorrectAnswersComponent, {
          data: {
            message: 'Incorrect,try again!',
            origin: this.currentWord.origin,
            target: this.currentWord.target,
          },
          width: '200px',
          height: '200px',
        });
        if (this.grade >= 100) {
          this.grade = 100;
        }
        if (this.grade < 0) {
          this.message = 'Bad, try again';
          this.grade = 0;
        }
      }
    }

    if (this.attemptsLeft <= 0) {
      this.nextWord();
    }
  }

  nextWord(): void {
    this.currentWordIndex++;
    if (this.currentWordIndex < this.words.length) {
      this.loadWord();
    } else {
      this.endGame();
    }
  }

  resetGame(): void {
    this.newGame();
  }

  endGame(): void {
    this.scoreService.addedGamePlayed('Mixed Letters', this.score);
    this.message = `You translated ${this.currectAnswers} out of ${this.totalQuestions} words correctly `;
    const gameResultData: gameResultData = {
      message: this.message,
      answers: this.answers,
      grade: this.grade,
      score: this.score,
      categoryName: this.categoryName,
    };
    this.gameResultService.setResultData(gameResultData);
    this.router.navigate(['/mix-letters-results']);
  }

  resetInput(): void {
    this.guessInput = '';
  }

  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/letsPlay']);
      }
    });
  }

  isHebrewWord(word: string): boolean {
    return /[\u0590-\u05FF]/.test(word);
  }

  get proccess(): number {
    return (this.currentQuestion / this.totalQuestions) * 100;
  }
}
