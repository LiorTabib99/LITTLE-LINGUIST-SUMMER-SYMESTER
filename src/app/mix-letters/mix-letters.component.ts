import { Category } from '../../shared/model/category';
import { Component, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { wordStatus } from '../../shared/model/wordStatus';
import { hebrewWord } from '../../shared/model/hebrewWord';
import { Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslatedWord } from '../../shared/model/translated-word';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';


@Component({
  selector: 'app-mix-letters',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './mix-letters.component.html',
  styleUrls: ['./mix-letters.component.css'], // Changed styleUrl to styleUrls
})
export class MixLettersComponent implements OnInit {
  englishWords: { word: string; status: wordStatus; attemptsLeft: number }[] =
    [];
  isLoading = true;
  index = 1;
  mixLetter: string = '';
  gameType: string | null = null;
  categoryName: string | null = null;
  inputText: string = ''; // Added inputText to bind to the input field
  hebrewWord: string = '';
  scrambledEnglishWord: string = '';

  progress = 0;
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router,
    private dialog: MatDialog,
    private location: Location
  ) {}

  hebrewWords: hebrewWord[] = [];

  feedback = '';

  grade = 100;

  score = 0;

  showBackButton = false;

  // ngOnInit(): void {
  //   this.gameType = this.route.snapshot.paramMap.get('gameType');
  //   this.route.queryParams.subscribe((params) => {
  //     this.categoryName = params['category'] || null;
  //     this.loadWords(); // טעינת מילים כאשר קטגוריה זמינה
  //   });
  // }

  ngOnInit(): void {
    //navigate to the cateogry id from queryParamMap and take it
    const categoryId = Number(
      this.route.snapshot.queryParamMap.get('categoryId')
    );
    if (categoryId >= 0) {
      const cateogry = this.categoriesService.get(categoryId);
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
          'The selected category need to have atleast five words,please select different category';
        this.showBackButton = true;
      }
    } else {
      this.feedback = 'This is no a selected cateogory';
      this.showBackButton = true;
    }
    this.route.queryParams.subscribe((params) => {});
  }


  private mixWordsArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  onSubmit(): void {
    console.log('Submitted:', this.inputText);
    // Add your submit logic here
  }

  // פונקציה שקוראת לשירות למחוק את כל הנתונים
  onReset(): void {
    this.inputText = ''; // איפוס שדה הטקסט
  }

  private loadWords(): void {
    if (this.categoryName) {
      const category = this.categoriesService
        .list()
        .find((cat) => cat.name === this.categoryName);

      if (category && category.words.length > 0) {
        const word = category.words[this.index % category.words.length];
        this.hebrewWord = word.origin;
        this.scrambledEnglishWord = this.scrambleWord(word.target);
        this.progressBarLength(); // עדכון פס ההתקדמות לאחר טעינת המילים
      }
    }
  }

   //connects to the exit game dialog component
   openExitDialog() : void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent)
    dialogRef.afterClosed().subscribe(result=>{
      this.router.navigate(["/main"])
    })
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
