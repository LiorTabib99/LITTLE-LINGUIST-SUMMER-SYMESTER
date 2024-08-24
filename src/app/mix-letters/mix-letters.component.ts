import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../services/categories.service';
import { wordStatus } from '../../shared/model/wordStatus';
import { hebrewWord } from '../../shared/model/hebrewWord';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mix-letters',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
  ],
  templateUrl: './mix-letters.component.html',
  styleUrls: ['./mix-letters.component.css'],
})
export class MixLettersComponent implements OnInit {
  englishWords: { word: string; status: wordStatus; attemptsLeft: number }[] =
    [];
  hebrewWords: hebrewWord[] = [];
  isLoading = true;
  index = 0;
  mixLetter: string = '';
  gameType: string | null = null;
  categoryName: string | null = null;
  inputText: string = '';
  hebrewWord: string = ''; // המילה בעברית
  scrambledEnglishWord: string = ''; // המילה באנגלית אחרי ערבוב
  progress = 0;
  feedback = '';
  grade = 100;
  score = 0;
  showBackButton = false;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    const categoryId = Number(
      this.route.snapshot.queryParamMap.get('categoryId')
    );
    if (categoryId >= 0) {
      const category = this.categoriesService.get(categoryId);
      if (category && category.words.length >= 5) {
        this.englishWords = this.mixWordsArray(
          category.words.map((word) => ({
            word: word.target, // מילת היעד באנגלית
            status: wordStatus.Normal,
            attemptsLeft: 4,
          }))
        );
        this.hebrewWords = this.mixWordsArray(
          category.words.map((word) => ({
            origin: word.origin, // המילה בעברית
            translated: word.target, // המילה באנגלית
            status: wordStatus.Normal,
            guess: word.guess,
            attemptsLeft: 4,
          }))
        );
        this.loadWords();
      } else {
        this.feedback =
          'הקטגוריה שנבחרה חייבת להכיל לפחות חמש מילים. אנא בחר קטגוריה אחרת.';
        this.showBackButton = true;
      }
    } else {
      this.feedback = 'לא נבחרה קטגוריה.';
      this.showBackButton = true;
    }
  }

  private mixWordsArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  private loadWords(): void {
    if (this.index < this.hebrewWords.length) {
      const word = this.hebrewWords[this.index];
      this.hebrewWord = word.translated; // הצגת המילה בעברית בצורה תקינה
      this.scrambledEnglishWord = this.scrambleWord(word.origin); // ערבוב המילה באנגלית
      this.progressBarLength();
    }
  }

  onSubmit(): void {
    const currentWord = this.hebrewWords[this.index];
    // בודק אם הקלט תואם למילה האנגלית המעורבבת ולא למילה בעברית
    if (
      this.inputText.trim().toLowerCase() === currentWord.origin.toLowerCase()
    ) {
      this.englishWords[this.index].status = wordStatus.Correct;
      this.index++;
      if (this.index < this.hebrewWords.length) {
        this.inputText = '';
        this.loadWords();
      } else {
        this.feedback = 'השלמת את כל המילים בקטגוריה!';
        this.showBackButton = true;
      }
    } else {
      this.feedback = 'לא נכון! נסה שוב.';
    }
  }

  onReset(): void {
    this.inputText = '';
    this.feedback = '';
  }

  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/main']);
    });
  }

  progressBarLength(): void {
    const totalWords = this.englishWords.length;
    const matchWords = this.englishWords.filter(
      (word) => word.status === wordStatus.Correct
    ).length;
    this.progress = (matchWords / totalWords) * 100;
  }

  private scrambleWord(word: string): string {
    return word
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }
}
