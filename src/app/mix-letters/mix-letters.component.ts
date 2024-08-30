import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { TranslatedWord } from '../../shared/model/translatedWord';
import { pointsScoreService } from '../services/pointsScore.service';
import { CorrectAnswersComponent } from '../correct-answers/correct-answers.component';
// import { IcorrectAnswersComponent } from '../icorrect-answers/icorrect-answers.component';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { gameResultData } from '../../shared/model/gameResultData';
import { GamesResultService } from '../services/gameResults.service';

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
  mixedWord: string = '';
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

  attemptsLeft: { [key: string]: number } = {}; // Tracks attempts left for each word

  // Tracks words that have been answered
  answeredWords: Set<string> = new Set();
  guess: string = '';

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private scorceService: pointsScoreService,
    private router: Router,
    private dialog: MatDialog,
    private gamesResultService: GamesResultService
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
          this.initializeAttempts();
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
      this.initializeAttempts();
      this.newGame();
    } else {
      this.message = "Default cateogry wan't found";
    }
  }

  initializeAttempts(): void {
    this.words.forEach((word) => {
      this.attemptsLeft[word.origin] = 3;
    });
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
    this.mixedWord = this.scrambelredWord(
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
    const isCorrect =
      this.guess.toLowerCase() === this.currentWord.origin.toLowerCase();

    if (!this.answeredWords.has(this.currentWord.origin)) {
      // Check if this word has already been answered
      if (isCorrect) {
        this.currentQuestion++;
        this.answeredWords.add(this.currentWord.origin); // Mark word as answered
        this.message = 'Correct! 🎉';
        this.dialog.open(CorrectAnswersComponent, {
          data: {
            message: 'Correct! 🎉',
            origin: this.currentWord.origin,
            target: this.currentWord.target,
          },
        });
        this.score++;
        this.scorceService.updateScore(this.score);
        this.answers.push({
          // Push answer
          question: this.mixedWord.replace(/ /g, ''),
          answer: this.currentWord.origin,
          isCorrect: true,
          origin: this.currentWord.origin,
          target: this.currentWord.target,
        });
        this.nextWord();
      } else {
        this.attemptsLeft[this.currentWord.origin]--;
        this.grade -= 8;
        this.message = 'Try Again!';

        if (this.attemptsLeft[this.currentWord.origin] <= 0) {
          this.answeredWords.add(this.currentWord.origin); // Mark word as answered after all attempts
          this.answers.push({
            // Push answer after all attempts
            question: this.mixedWord.replace(/ /g, ''),
            answer: this.currentWord.origin,
            isCorrect: false,
            origin: this.currentWord.origin,
            target: this.currentWord.target,
          });
          this.currentQuestion++;
        }

        this.dialog.open, {
          data: {
            message: 'Incorrect! Try Again!',
            origin: this.currentWord.origin,
            target: this.currentWord.target,
            width: ""
          },
        };

        if (this.grade <= 0) {
          this.grade = 0;
          this.endGame();
        }
      }
    }

    if (this.attemptsLeft[this.currentWord.origin] <= 0) {
      this.nextWord();
    }
  }

  endGame(): void {
    this.scorceService.addedGamePlayed('Mixed Letters', this.score);
    this.message = `You translared ${this.currentQuestion} out of ${this.totalQuestions} words correctly`;
    const gameResultsData: gameResultData = {
      message: this.message,
      answers: this.answers,
      grade: this.grade,
      score: this.score,
      categoryName: this.categoryName,
    };
    this.gamesResultService.setResultData(gameResultsData);
    this.router.navigate(['/mix-letters-results']);
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
