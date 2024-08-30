import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { MatDialog} from '@angular/material/dialog';
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
  words: TranslatedWord[] = []; // Array to store TranslatedWord objects
  currentWordIndex: number = 0;
  currentWord: TranslatedWord = { origin: '', target: '', guess: '' }; // TranslatedWord object for the current word
  mixedword: string = '';
  guessInput: string = '';
  message: string = '';
  score: number = 0;
  grade: number = 100;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: any[] = [];
  categoryName: string = '';
  totalQuestions: number = 0; // Total number of questions
  currentQuestion: number = 0; // Index of the current question
  attemptsLeft: { [key: string]: number } = {}; // Tracks attempts left for each word
  answeredWords: Set<string> = new Set(); // Tracks words that have been answered
  
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private scoreService:pointsScoreService,
    private router: Router,
    private gameResultService: GamesResultService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = +params['categoryId'];
      this.loadWordsFromCategory(categoryId);
    });
    this.score = this.scoreService.getCurrentScore();
  }

  loadWordsFromCategory(categoryId: number): void {
    if (categoryId >= 0) {
      if (categoryId === 0) {
        this.handleSpecialCategory();
      } else {
        const category = this.categoriesService.get(categoryId);
        if (category) {
          this.words = category.words; // Load TranslatedWord objects directly
          this.categoryName = category.name;
          this.totalQuestions = this.words.length; // Set the total number of questions
          this.initializeAttempts(); // Initialize attempts for each word
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
    if (defaultCategory) {
      this.words = defaultCategory.words;
      this.totalQuestions = this.words.length; // Set the total number of questions
      this.initializeAttempts(); // Initialize attempts for each word
      this.newGame();
    } else {
      this.message = 'Default category not found!';
    }
  }

  initializeAttempts(): void {
    this.words.forEach(word => {
      this.attemptsLeft[word.origin] = 3; // Set 3 attempts for each word
    });
  }

  newGame(): void {
    this.currentQuestion = 0; // Reset the current question index
    this.currentWordIndex = 0;
    this.grade = 100;
    this.answers = [];
    this.answeredWords.clear();
    this.message = '';
    this.loadWord();
  }

  loadWord(): void {
    this.currentWord = this.words[this.currentWordIndex]; // Set the current TranslatedWord object
    this.mixedword = this.shuffle(this.currentWord.origin.split('')).join(' '); // Shuffle the origin word
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
    const isCorrect = this.guessInput.toLowerCase() === this.currentWord.origin.toLowerCase();

    if (!this.answeredWords.has(this.currentWord.origin)) {
      // Check if this word has already been answered
      if (isCorrect) {
        this.currentQuestion++
        this.answeredWords.add(this.currentWord.origin); // Mark word as answered
        this.message = 'Correct! 🎉';
        this.dialog.open(CorrectAnswersComponent, {
          data: {
            message: 'Correct! 🎉',
            origin: this.currentWord.origin,
            target: this.currentWord.target
          },
        });
        this.score++;
        this.scoreService.updateScore(this.score);
        this.answers.push({ // Push answer
          question: this.mixedword.replace(/ /g, ''),
          answer: this.currentWord.origin,
          isCorrect: true,
          origin: this.currentWord.origin,
          target: this.currentWord.target
        });
        this.nextWord();
      } else {
        this.attemptsLeft[this.currentWord.origin]--;
        this.grade -= 8;
        this.message = 'Try Again!';

        if (this.attemptsLeft[this.currentWord.origin] <= 0) {
          this.answeredWords.add(this.currentWord.origin); // Mark word as answered after all attempts
          this.answers.push({ // Push answer after all attempts
            question: this.mixedword.replace(/ /g, ''),
            answer: this.currentWord.origin,
            isCorrect: false,
            origin: this.currentWord.origin,
            target: this.currentWord.target
          });
          this.currentQuestion++
        }

        this.dialog.open(IcorrectAnswersComponent, {
          data: {
            message: 'Incorrect! Try Again!',
            origin: this.currentWord.origin,
            target: this.currentWord.target
          },
        });

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
    this.message = `You translared ${this.currentQuestion} out of ${this.totalQuestions} words correctly`;
    const gameResultData: gameResultData = {
      message: this.message,
      answers: this.answers,
      grade: this.grade,
      score: this.score,
      categoryName: this.categoryName
    };
    this.gameResultService.setResultData(gameResultData);
    this.router.navigate(['/mix-letters-results']);
  }

  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/main']);
      }
    });
  }

  isHebrewWord(word: string): boolean {
    return /[\u0590-\u05FF]/.test(word);
  }

  get proccess(): number {
    return (this.currentQuestion / this.totalQuestions) * 100;
}

}




