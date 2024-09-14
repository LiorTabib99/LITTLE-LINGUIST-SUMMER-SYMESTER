import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Word } from '../../shared/model/wordSorter';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translatedWord';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CorrectAnswersComponent } from '../correct-answers/correct-answers.component';
import { IcorrectAnswersComponent } from '../icorrect-answers/icorrect-answers.component';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { gameResultData } from '../../shared/model/gameResultData';
import { GamesResultService } from '../services/gameResults.service';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  templateUrl: './word-sorter.component.html',
  styleUrls: ['./word-sorter.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
  ],
})
export class WordSorterComponent implements OnInit {
  words: Word[] = [];
  currentCategory?: Category;
  randomCategory?: Category;
  currentQuestionIndex: number = 0;
  grade: number = 0;
  pointsForScore: number = 0;
  score: number = 0;
  correctAnswers: number = 0;
  categoryName: string = '';
  message: string = '';
  totalQuestions: number = 0; // Total number of questions
  correctlyGuessedIndices: Set<number> = new Set(); // To track correctly guessed words
  attemptsMap: Map<
    number,
    { attempts: number; status: 'active' | 'incorrect' | 'correct' }
  > = new Map();

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private gamesResultService: GamesResultService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.loadCategories(categoryId);
      } else {
        console.error('Category ID not provided in query params');
      }
    });
  }

  async loadCategories(categoryId: string): Promise<void> {
    const allCategories = await this.categoriesService.list(); // Fetch all categories from the service

    if ((allCategories).length < 2) {
      this.message = 'Need at least 2 categories to play this game!';
      alert(this.message);
      this.router.navigate(['/letplay']);
      return;
    }

    if (categoryId >= '0') {
      if (categoryId === '0') {
        this.handleSpecialCategory(); // Handle the case where categoryId is 0
      } else {
        const category = await this.categoriesService.get(
          categoryId.toString()
        );
        if (category) {
          this.currentCategory = category;
          this.randomCategory = this.getRandomCategory(
            allCategories,
            categoryId
          );

          if (this.randomCategory) {
            const currentCategoryWords = this.getWordsFromCategory(
              this.currentCategory,
              3
            );
            const randomCategoryWords = this.getWordsFromCategory(
              this.randomCategory,
              3
            );

            this.words = [
              ...currentCategoryWords.map((word, index) =>
                this.convertToWord(word, index + 1, this.currentCategory!.name)
              ),
              ...randomCategoryWords.map((word, index) =>
                this.convertToWord(
                  word,
                  index + 1 + currentCategoryWords.length,
                  this.randomCategory!.name
                )
              ),
            ];
            this.pointsForScore = 100 / this.words.length;
            this.totalQuestions = this.words.length;
            this.words = this.shuffleArray(this.words); // Shuffle words to randomize order
            this.categoryName = this.currentCategory.name ?? '';
            this.resetGame(); // Initialize a new game
          } else {
            this.message = 'Random category not found!';
            console.error('Random category not found');
          }
        } else {
          this.message = 'Category not found!';
          console.error('Category not found');
        }
      }
    } else {
      this.message = 'Invalid category ID!';
      console.error('Invalid category ID');
    }
  }

  private getRandomCategory(
    allCategories: Category[],
    excludeId: string
  ): Category | undefined {
    const eligibleCategories = allCategories.filter(
      (category) => category.id !== excludeId
    );
    if (eligibleCategories.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleCategories.length);
      return eligibleCategories[randomIndex];
    }
    return undefined;
  }

  private getWordsFromCategory(
    category: Category,
    count: number
  ): TranslatedWord[] {
    if (!category.words) {
      console.error('Category does not have words');
      return [];
    }
    return category.words.slice(0, count);
  }

  private convertToWord(
    translatedWord: TranslatedWord,
    id: number,
    category: string
  ): Word {
    return {
      id: id,
      text: translatedWord.origin,
      category: category,
    };
  }

  private async handleSpecialCategory(): Promise<void> {
    // Fetch the special category with ID 0
    const specialCategory = await this.categoriesService.get('0');

    if (specialCategory) {
      this.currentCategory = specialCategory;
      // Load a random category for comparison
      const allCategories = this.categoriesService.list();
      this.randomCategory = this.getRandomCategory(await allCategories, '0');

      if (this.randomCategory) {
        const currentCategoryWords = this.getWordsFromCategory(
          this.currentCategory,
          3
        );
        const randomCategoryWords = this.getWordsFromCategory(
          this.randomCategory,
          3
        );

        this.words = [
          ...currentCategoryWords.map((word, index) =>
            this.convertToWord(word, index + 1, this.currentCategory!.name)
          ),
          ...randomCategoryWords.map((word, index) =>
            this.convertToWord(
              word,
              index + 1 + currentCategoryWords.length,
              this.randomCategory!.name
            )
          ),
        ];
        this.totalQuestions = this.words.length;
        this.pointsForScore = 100 / this.words.length;
        this.words = this.shuffleArray(this.words); // Shuffle words to randomize order
        this.categoryName = this.currentCategory.name ?? '';
        this.resetGame(); // Initialize a new game
      } else {
        this.message = 'Random category not found!';
        console.error('Random category not found');
      }
    } else {
      this.message = 'Special category not found!';
      console.error('Special category not found');
    }
  }

  resetGame(): void {
    console.log('Initializing new game with words:', this.words);
    this.currentQuestionIndex = 0; // Reset question index
    this.grade = 0; // Reset grade
    this.score = 0; // Reset score
    this.correctAnswers = 0; // Reset correct answers
    this.correctlyGuessedIndices.clear(); // Clear previously guessed indices
    this.initializeTracking(); // Initialize tracking data
  }

  private initializeTracking(): void {
    this.words.forEach((word) => {
      this.attemptsMap.set(word.id, { attempts: 3, status: 'active' });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkAnswer(userGuess: boolean): void {
    if (!this.currentCategory || !this.randomCategory) {
      console.error('Current or random category is undefined');
      return;
    }

    const word = this.words[this.currentQuestionIndex];
    const trackingData = this.attemptsMap.get(word.id);
    const wordInCurrentCategory = word.category === this.currentCategory.name;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const wordInRandomCategory = word.category === this.randomCategory.name;

    // Determine if the user's guess is correct
    const isCorrect =
      (wordInCurrentCategory && userGuess) ||
      (!wordInCurrentCategory && !userGuess);

    if (isCorrect) {
      this.grade += this.pointsForScore;
      this.currentQuestionIndex++;
      this.correctlyGuessedIndices.add(this.currentQuestionIndex);
      this.score++;
      this.correctAnswers++;
      if (trackingData) trackingData.status = 'correct'; // Update status to correct
      this.openCorrectAnswerDialog();
    } else {
      if (trackingData) {
        trackingData.attempts--; // Decrease attempts
        this.grade -= 2;
        if (trackingData.attempts <= 0) {
          trackingData.status = 'incorrect'; // Update status to incorrect after 3 attempts
          this.grade -= 10;
          this.openIncorrectAnswerDialog();
          this.moveToNextWord(); // Move to the next word
          return; // Exit early as we need to handle moving to the next word
        }
      }
      this.openIncorrectAnswerDialog();
    }

    // this.currentQuestionIndex++;

    // Move to next word if the index is out of bounds
    if (this.currentQuestionIndex >= this.words.length) {
      this.endGame();
    }
    if (this.grade >= 100) {
      this.grade = 100;
    }
    if (this.grade < 0) {
      this.message = 'Bad, try again';
      this.grade = 0;
    }
  }

  private moveToNextWord(): void {
    this.currentQuestionIndex++;
    // Ensure we don't go beyond the bounds
    if (this.currentQuestionIndex >= this.words.length) {
      this.endGame();
    }
  }

  endGame(): void {
    this.message = `You classified ${this.correctAnswers} out of ${this.totalQuestions} words correctly `;
    // Format the results according to GameResultData
    const results = this.words.map((word) => {
      const trackingData = this.attemptsMap.get(word.id);
      return {
        origin: word.text,
        category: word.category,
        guess: trackingData?.status === 'correct', // Use status to determine correctness
      };
    });

    // Create the GameResultData object
    const resultData: gameResultData = {
      message: this.message, // Set your message here
      answers: results, // Populate with the formatted results
      grade: this.grade,
      score: this.score,
      categoryName: this.categoryName,
    };

    // Use the gameResultService to set the result data
    this.gamesResultService.setResultData(resultData);

    // Navigate to the results page
    this.router.navigate(['/word-sorter-results']);
  }

  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/letsPlay']);
      }
    });
  }

  openCorrectAnswerDialog(): void {
    this.dialog.open(CorrectAnswersComponent, {
      data: { message: 'Correct!' },
      width: '200px',
      height: '200px',
    });
  }

  openIncorrectAnswerDialog(): void {
    this.dialog.open(IcorrectAnswersComponent, {
      data: { message: 'Incorrect!' },
      width: '200px',
      height: '200px',
    });
  }

  get progress(): number {
    return (this.currentQuestionIndex / this.words.length) * 100;
  }
}
