// // import { Component } from '@angular/core';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatIconModule } from '@angular/material/icon';
// // import { ActivatedRoute } from '@angular/router';
// // import { OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // // import { TranslatedWord } from '../../shared/model/translatedWord';
// // import { MatProgressBarModule } from '@angular/material/progress-bar';
// // import { CategoriesService } from '../services/categories.service';
// // import { pointsScoreService } from '../services/pointsScore.service';
// // import { Router } from '@angular/router';
// // import { MatDialog } from '@angular/material/dialog';
// // import { wordStatus } from '../../shared/model/wordStatus';
// // import { hebrewWord } from '../../shared/model/hebrewWord';
// // import { CorrectAnswersComponent } from '../correct-answers/correct-answers.component';
// // import { IcorrectAnswersComponent } from '../icorrect-answers/icorrect-answers.component';
// // import { GameResultComponent } from '../game-result/game-result.component';
// // import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';

// // @Component({
// //   selector: 'app-word-sorter',
// //   standalone: true,
// //   imports: [MatButtonModule, MatIconModule, CommonModule, MatProgressBarModule],
// //   templateUrl: './word-sorter.component.html',
// //   styleUrl: './word-sorter.component.css',
// // })
// // export class WordSorterComponent implements OnInit {
// //   englishWords: { word: string; status: wordStatus; attemptsLeft: number }[] =
// //     [];
// //   hebrewWords: hebrewWord[] = [];
// //   feedback = '';
// //   grade = 100;
// //   score = 0;
// //   showBackButton = false;
// //   selectedEnglishWords: {
// //     word: string;
// //     status: wordStatus;
// //     attemptsLeft: number;
// //   } | null = null;
// //   wordStatus = wordStatus;
// //   categoryName: string = '';
// //   progress = 0;
// //   totalQuestions: number = 0;
// //   currentQuestion: number = 0;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private categoryService: CategoriesService,
// //     private pointScore: pointsScoreService,
// //     private router: Router,
// //     private dialog: MatDialog
// //   ) {}

// //   ngOnInit(): void {
// //     // שליפת מזהה הקטגוריה מ- queryParamMap
// //     const categoryId = Number(
// //       this.route.snapshot.queryParamMap.get('categoryId')
// //     );
// //     if (categoryId >= 0) {
// //       const cateogry = this.categoryService.get(categoryId);
// //       if (cateogry && cateogry.words.length >= 5) {
// //         this.englishWords = this.mixWordsArray(
// //           cateogry.words.map((word) => ({
// //             word: word.origin,
// //             status: wordStatus.Normal,
// //             attemptsLeft: 4,
// //           }))
// //         );
// //         this.hebrewWords = this.mixWordsArray(
// //           cateogry.words.map((word) => ({
// //             origin: word.origin,
// //             translated: word.target,
// //             status: wordStatus.Normal,
// //             guess: word.guess,
// //             attemptsLeft: 4,
// //           }))
// //         );
// //       } else {
// //         this.feedback =
// //           'הקטגוריה שנבחרה צריכה להכיל לפחות חמש מילים, אנא בחר קטגוריה אחרת';
// //         this.showBackButton = true;
// //       }
// //     } else {
// //       this.feedback = 'לא נבחרה קטגוריה';
// //       this.showBackButton = true;
// //     }
// //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
// //     this.route.queryParams.subscribe((params) => {});
// //   }

// //   private mixWordsArray<T>(array: T[]): T[] {
// //     return array.sort(() => Math.random() - 0.5);
// //   }

// //   // התחברות לקומפוננטת הדיאלוג לתשובה נכונה
// //   openCorrectAnswersMessage(): void {
// //     this.dialog.open(CorrectAnswersComponent);
// //   }

// //   // התחברות לקומפוננטת הדיאלוג לסיום משחק
// //   openExitDialog(): void {
// //     const dialogRef = this.dialog.open(ExitGameDialogComponent);
// //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
// //     dialogRef.afterClosed().subscribe((result) => {
// //       this.router.navigate(['/main']);
// //     });
// //   }

// //   // ניווט לקטגוריה שנבחרה
// //   navigationToSelectedCateogry(): void {
// //     this.router.navigate(['/letsPlay']);
// //   }

// //   matchWord(hebrewWord: hebrewWord) {
// //     if (this.selectedEnglishWords !== null) {
// //       // בדיקת null מפורשת
// //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
// //       const { word, status, attemptsLeft } = this.selectedEnglishWords;
// //       const matchedWord = this.hebrewWords.find(
// //         (item) =>
// //           item.translated === hebrewWord.translated && item.origin === word
// //       );

// //       if (matchedWord) {
// //         this.selectedEnglishWords!.status = wordStatus.Disabled;
// //         matchedWord.status = wordStatus.Disabled;
// //         this.score++;
// //         this.selectedEnglishWords = null;
// //         this.openCorrectAnswersMessage();

// //         if (
// //           this.englishWords.every((word) => word.status !== wordStatus.Normal)
// //         ) {
// //           this.endGame();
// //         }
// //       } else {
// //         this.grade -= 8;

// //         if (this.grade <= 0) {
// //           this.grade = 0;
// //           this.englishWords.forEach((word) => {
// //             word.status = wordStatus.Disabled;
// //             word.attemptsLeft = 0;
// //           });
// //           this.hebrewWords.forEach((hebrew) => {
// //             hebrew.status = wordStatus.Disabled;
// //           });
// //           this.endGame();
// //           return;
// //         }

// //         this.selectedEnglishWords.attemptsLeft--;

// //         if (this.selectedEnglishWords.attemptsLeft <= 0) {
// //           this.selectedEnglishWords.status = wordStatus.Disabled;

// //           this.hebrewWords.forEach((hebrew) => {
// //             if (hebrew.origin === this.selectedEnglishWords?.word) {
// //               hebrew.status = wordStatus.Disabled;
// //             }
// //           });
// //         }

// //         this.feedback = ` ${this.grade}`;
// //         this.selectedEnglishWords = null;

// //         if (
// //           this.englishWords.every((word) => word.status === wordStatus.Disabled)
// //         ) {
// //           this.endGame();
// //         } else {
// //           this.opeIncorrectAnswersMessage();
// //         }
// //       }
// //     }
// //   }

// //   opeIncorrectAnswersMessage(): void {
// //     this.dialog.open(IcorrectAnswersComponent);
// //   }

// //   endGame() {
// //     this.feedback = ` המשחק הסתיים! הציון הסופי שלך הוא: ${this.score}`;
// //     // this.feedback = המשחק הסתיים! הציון הסופי שלך הוא: ${this.score};
// //     this.pointScore.addedGamePlayed('Word sorter', this.score);

// //     const dataResult = this.englishWords.map((englishWord) => {
// //       const hebrewWord = this.hebrewWords.find(
// //         (hebrewWord) => hebrewWord.origin === englishWord.word
// //       );
// //       return {
// //         englishWord: englishWord.word,
// //         hebrewWord: hebrewWord ? hebrewWord.translated : 'NaN',
// //         status: englishWord.status === wordStatus.Disabled ? 'נכון' : 'שגוי',
// //       };
// //     });

// //     this.dialog.open(GameResultComponent, {
// //       data: { score: this.score, grade: this.grade, wordPairs: dataResult },
// //     });
// //   }

// //   resetGame(): void {
// //     this.grade = 100;
// //     this.score = 0;
// //     this.englishWords = this.englishWords.map((word) => ({
// //       ...word,
// //       status: wordStatus.Normal,
// //       attemptsLeft: 4,
// //     }));
// //     this.hebrewWords = this.hebrewWords.map((word) => ({
// //       ...word,
// //       status: wordStatus.Normal,
// //       attemptsLeft: 4,
// //     }));

// //     this.selectedEnglishWords = null;
// //     this.feedback = '';
// //     this.englishWords = this.mixWordsArray(this.englishWords);
// //     this.hebrewWords = this.mixWordsArray(this.hebrewWords);
// //   }

// //   // איפוס המילה שנבחרה כאשר לוחצים על "לא"
// //   resetSelectedWord(): void {
// //     this.selectedEnglishWords = null;
// //     this.feedback = '';
// //   }

// //   exitDialog() {
// //     const dialogRef = this.dialog.open(ExitGameDialogComponent);
// //     dialogRef.afterClosed().subscribe((result) => {
// //       if (result) {
// //         this.router.navigate(['/letsPlay']);
// //       }
// //     });
// //   }

// //   get proccess(): number {
// //     return (this.currentQuestion / this.totalQuestions) * 100;
// //   }
// // }

// import { Component } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { ActivatedRoute } from '@angular/router';
// import { OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { CategoriesService } from '../services/categories.service';
// import { pointsScoreService } from '../services/pointsScore.service';
// import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { wordStatus } from '../../shared/model/wordStatus';
// import { hebrewWord } from '../../shared/model/hebrewWord';
// import { CorrectAnswersComponent } from '../correct-answers/correct-answers.component';
// import { IcorrectAnswersComponent } from '../icorrect-answers/icorrect-answers.component';
// import { GameResultComponent } from '../game-result/game-result.component';
// import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
// import { TranslatedWord } from '../../shared/model/translatedWord';

// @Component({
//   selector: 'app-word-sorter',
//   standalone: true,
//   imports: [MatButtonModule, MatIconModule, CommonModule, MatProgressBarModule],
//   templateUrl: './word-sorter.component.html',
//   styleUrls: ['./word-sorter.component.css'],
// })
// export class WordSorterComponent implements OnInit {
//   englishWords: { word: string; status: wordStatus; attemptsLeft: number }[] =
//     [];
//   hebrewWords: hebrewWord[] = [];
//   currentWord: TranslatedWord = { origin: '', target: '', guess: '' }; // TranslatedWord object for the current word
//   feedback = '';
//   grade = 100;
//   score = 0;
//   attemptsLeft: number = 1; // Tracks attempts left for each word
//   showBackButton = false;
//   selectedEnglishWords: {
//     word: string;
//     status: wordStatus;
//     attemptsLeft: number;
//   } | null = null;
//   wordStatus = wordStatus;
//   categoryName: string = '';
//   progress = 0;
//   totalQuestions: number = 0;
//   currentQuestion: number = 0;

//   constructor(
//     private route: ActivatedRoute,
//     private categoryService: CategoriesService,
//     private pointScore: pointsScoreService,
//     private router: Router,
//     private dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     const categoryId = Number(
//       this.route.snapshot.queryParamMap.get('categoryId')
//     );
//     if (categoryId >= 0) {
//       const cateogry = this.categoryService.get(categoryId);
//       if (cateogry && cateogry.words.length >= 5) {
//         this.englishWords = this.mixWordsArray(
//           cateogry.words.map((word) => ({
//             word: word.origin,
//             status: wordStatus.Normal,
//             attemptsLeft: 4,
//           }))
//         );
//         this.hebrewWords = this.mixWordsArray(
//           cateogry.words.map((word) => ({
//             origin: word.origin,
//             translated: word.target,
//             status: wordStatus.Normal,
//             guess: word.guess,
//             attemptsLeft: 4,
//           }))
//         );
//         this.categoryName = cateogry.name;
//         this.totalQuestions = this.englishWords.length;
//         this.setNextWord(); // הגדרת המילה הראשונה
//       } else {
//         // טיפול בשגיאות
//       }
//     } else {
//       // טיפול בשגיאות
//     }
//   }

//   private mixWordsArray<T>(array: T[]): T[] {
//     return array.sort(() => Math.random() - 0.5);
//   }

//   // התחברות לקומפוננטת הדיאלוג לתשובה נכונה
//   openCorrectAnswersMessage(): void {
//     this.dialog.open(CorrectAnswersComponent);
//   }

//   // התחברות לקומפוננטת הדיאלוג לתשובה לא נכונה
//   opeIncorrectAnswersMessage(): void {
//     this.dialog.open(IcorrectAnswersComponent);
//   }

//   // התחברות לקומפוננטת הדיאלוג לסיום משחק
//   openExitDialog(): void {
//     const dialogRef = this.dialog.open(ExitGameDialogComponent);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     dialogRef.afterClosed().subscribe((result) => {
//       this.router.navigate(['/main']);
//     });
//   }

//   // ניווט לקטגוריה שנבחרה
//   navigationToSelectedCateogry(): void {
//     this.router.navigate(['/letsPlay']);
//   }

//   setNextWord(): void {
//     this.selectedEnglishWords =
//       this.englishWords.find((word) => word.status === wordStatus.Normal) ||
//       null;
//   }

//   matchWord(): void {
//     if (this.selectedEnglishWords !== null) {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       const { word, status, attemptsLeft } = this.selectedEnglishWords;
//       const matchedWord = this.hebrewWords.find((item) => item.origin === word);

//       if (matchedWord && matchedWord.translated === word) {
//         this.selectedEnglishWords.status = wordStatus.Disabled;
//         matchedWord.status = wordStatus.Disabled;
//         this.score++;
//         this.openCorrectAnswersMessage();
//         this.dialog.open(CorrectAnswersComponent, {
//           data: {
//             message: 'Correct! 🎉',
//             origin: this.currentWord.origin,
//             target: this.currentWord.target,
//           },
//           width: '400px', // הגדרת רוחב הדיאלוג
//           height: '300px', // הגדרת גובה הדיאלוג
//         });

//         if (
//           this.englishWords.every((word) => word.status !== wordStatus.Normal)
//         ) {
//           this.endGame();
//         } else {
//           this.setNextWord(); // הגדרת המילה הבאה
//         }
//       } else {
//         this.grade -= 8;
//         this.attemptsLeft--;
//         this.grade += this.pointsForQuestion;

//         this.message = 'Try Again!';

//         if (this.grade <= 0) {
//           this.grade = 0;
//           this.disableAllWords();
//           this.endGame();
//           return;
//         }

//         this.selectedEnglishWords.attemptsLeft--;

//         if (this.selectedEnglishWords.attemptsLeft <= 0) {
//           this.selectedEnglishWords.status = wordStatus.Disabled;
//           this.disableMatchingHebrewWord(this.selectedEnglishWords.word);
//         }

//         this.feedback = ` ${this.grade}`;

//         if (
//           this.englishWords.every((word) => word.status === wordStatus.Disabled)
//         ) {
//           this.endGame();
//         } else {
//           this.setNextWord(); // הגדרת המילה הבאה
//           this.opeIncorrectAnswersMessage();
//         }
//       }
//     }
//   }

//   disableAllWords(): void {
//     this.englishWords.forEach((word) => {
//       word.status = wordStatus.Disabled;
//       word.attemptsLeft = 0;
//     });
//     this.hebrewWords.forEach((word) => {
//       word.status = wordStatus.Disabled;
//     });
//   }

//   disableMatchingHebrewWord(englishWord: string): void {
//     const matchedHebrewWord = this.hebrewWords.find(
//       (word) => word.origin === englishWord
//     );
//     if (matchedHebrewWord) {
//       matchedHebrewWord.status = wordStatus.Disabled;
//     }
//   }

//   endGame() {
//     this.feedback = ` המשחק הסתיים! הציון הסופי שלך הוא: ${this.score}`;
//     this.pointScore.addedGamePlayed('Word sorter', this.score);

//     const dataResult = this.englishWords.map((englishWord) => {
//       const hebrewWord = this.hebrewWords.find(
//         (hebrewWord) => hebrewWord.origin === englishWord.word
//       );
//       return {
//         englishWord: englishWord.word,
//         hebrewWord: hebrewWord ? hebrewWord.translated : 'NaN',
//         status: englishWord.status === wordStatus.Disabled ? 'נכון' : 'שגוי',
//       };
//     });

//     this.dialog.open(GameResultComponent, {
//       data: { score: this.score, grade: this.grade, wordPairs: dataResult },
//     });
//   }

//   resetGame(): void {
//     this.grade = 100;
//     this.score = 0;
//     this.englishWords = this.englishWords.map((word) => ({
//       ...word,
//       status: wordStatus.Normal,
//       attemptsLeft: 4,
//     }));
//     this.hebrewWords = this.hebrewWords.map((word) => ({
//       ...word,
//       status: wordStatus.Normal,
//       attemptsLeft: 4,
//     }));

//     this.selectedEnglishWords = null;
//     this.feedback = '';
//     this.englishWords = this.mixWordsArray(this.englishWords);
//     this.hebrewWords = this.mixWordsArray(this.hebrewWords);
//   }

//   resetSelectedWord(): void {
//     this.selectedEnglishWords = null;
//     this.feedback = '';
//   }

//   get proccess(): number {
//     return (this.currentQuestion / this.totalQuestions) * 100;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CategoriesService } from '../services/categories.service';
import { pointsScoreService } from '../services/pointsScore.service';
import { MatDialog } from '@angular/material/dialog';
import { wordStatus } from '../../shared/model/wordStatus';
import { hebrewWord } from '../../shared/model/hebrewWord';
import { CorrectAnswersComponent } from '../correct-answers/correct-answers.component';
import { IcorrectAnswersComponent } from '../icorrect-answers/icorrect-answers.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GameResultComponent } from '../game-result/game-result.component';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { TranslatedWord } from '../../shared/model/translatedWord';
import { GamesResultService } from '../services/gameResults.service';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatProgressBarModule],
  templateUrl: './word-sorter.component.html',
  styleUrls: ['./word-sorter.component.css'],
})
export class WordSorterComponent implements OnInit {
  words: TranslatedWord[] = [];
  englishWords: { word: string; status: wordStatus; attemptsLeft: number }[] =
    [];
  hebrewWords: hebrewWord[] = [];
  currentWord: TranslatedWord = { origin: '', target: '', guess: '' };
  feedback = '';
  grade = 100;
  score = 0;
  attemptsLeft = 1;
  showBackButton = false;
  selectedEnglishWords: {
    word: string;
    status: wordStatus;
    attemptsLeft: number;
  } | null = null;
  wordStatus = wordStatus;
  message: string = '';
  categoryName: string = '';
  progress = 0;
  totalQuestions: number = 0;
  currentQuestion: number = 0;
  answeredWords: Set<string> = new Set();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private pointScore: pointsScoreService,
    private router: Router,
    private dialog: MatDialog,
    private gameResultService: GamesResultService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = Number(params['categoryId']);
      this.loadWordsFromCategory(categoryId);
    });
  }

  loadWordsFromCategory(categoryId: number): void {
    if (categoryId >= 0) {
      const category = this.categoryService.get(categoryId);
      if (category && category.words.length >= 5) {
        this.words = category.words;
        this.categoryName = category.name;
        this.totalQuestions = this.words.length;
        this.initializeWords();
        this.setNextWord();
      } else {
        this.feedback =
          'The selected category should contain at least five words. Please choose another category.';
        this.showBackButton = true;
      }
    } else {
      this.feedback = 'No category selected';
      this.showBackButton = true;
    }
  }

  initializeWords(): void {
    this.englishWords = this.mixWordsArray(
      this.words.map((word) => ({
        word: word.origin,
        status: wordStatus.Normal,
        attemptsLeft: 4,
      }))
    );
    this.hebrewWords = this.mixWordsArray(
      this.words.map((word) => ({
        origin: word.origin,
        translated: word.target,
        status: wordStatus.Normal,
        guess: word.guess,
        attemptsLeft: 4,
      }))
    );
  }

  private mixWordsArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  setNextWord(): void {
    this.selectedEnglishWords =
      this.englishWords.find((word) => word.status === wordStatus.Normal) ||
      null;
    if (this.selectedEnglishWords) {
      this.currentWord = this.words.find(
        (word) => word.origin === this.selectedEnglishWords?.word
      ) || { origin: '', target: '', guess: '' };
    }
  }

  unMacthWord(): void {
    if (this.selectedEnglishWords !== null) {
      const { word } = this.selectedEnglishWords;
      const matchedHebrewWord = this.hebrewWords.find(
        (item) => item.origin === word
      );

      if (matchedHebrewWord) {
        // The word is found in the Hebrew list, so the answer is incorrect
        this.handleIncorrectAnswer();
      } else {
        // The word is not found in the Hebrew list, so the answer is correct
        this.handleCorrectAnswer({
          origin: word,
          translated: '',
          status: wordStatus.Disabled,
          guess: '',
          attemptsLeft: 4,
        });
      }

      // Update game status
      this.checkGameStatus();
    }
  }

  matchWord(): void {
    if (this.selectedEnglishWords !== null) {
      const { word } = this.selectedEnglishWords;
      const matchedWord = this.hebrewWords.find((item) => item.origin === word);

      if (matchedWord && !this.answeredWords.has(word)) {
        this.handleCorrectAnswer(matchedWord);
      } else {
        this.handleIncorrectAnswer();
      }

      this.checkGameStatus();
    }
  }
  handleCorrectAnswer(matchedWord: hebrewWord): void {
    this.selectedEnglishWords!.status = wordStatus.Disabled;
    matchedWord.status = wordStatus.Disabled;
    this.score++;
    this.answeredWords.add(this.selectedEnglishWords!.word);
    this.currentQuestion++;
    this.openCorrectAnswersDialog();
    this.addAnswer(true);
  }

  //handleIncorrectAnswer:
  handleIncorrectAnswer(): void {
    this.grade -= 8;
    this.attemptsLeft--;

    if (this.attemptsLeft <= 0) {
      this.selectedEnglishWords!.status = wordStatus.Disabled;
      this.disableMatchingHebrewWord(this.selectedEnglishWords!.word);
      this.answeredWords.add(this.selectedEnglishWords!.word);
      this.currentQuestion++;
      this.addAnswer(false);
    }

    this.openIncorrectAnswersDialog();
  }

  addAnswer(isCorrect: boolean): void {
    this.answers.push({
      question: this.selectedEnglishWords!.word,
      answer: this.currentWord.target,
      isCorrect: isCorrect,
      origin: this.currentWord.origin,
      target: this.currentWord.target,
    });
  }

  checkGameStatus(): void {
    if (
      this.grade <= 0 ||
      this.englishWords.every((word) => word.status === wordStatus.Disabled)
    ) {
      this.endGame();
    } else {
      this.setNextWord();
    }
  }

  openCorrectAnswersDialog(): void {
    this.dialog.open(CorrectAnswersComponent, {
      data: {
        message: 'Correct! 🎉',
        origin: this.currentWord.origin,
        target: this.currentWord.target,
      },
      width: '200px',
      height: '200px',
    });
  }

  openIncorrectAnswersDialog(): void {
    this.dialog.open(IcorrectAnswersComponent, {
      data: {
        message: 'Incorrect! Try Again!',
        origin: this.currentWord.origin,
        target: this.currentWord.target,
      },
      width: '200px',
      height: '200px',
    });
  }

  disableMatchingHebrewWord(englishWord: string): void {
    const matchedHebrewWord = this.hebrewWords.find(
      (word) => word.origin === englishWord
    );
    if (matchedHebrewWord) {
      matchedHebrewWord.status = wordStatus.Disabled;
    }
  }

  endGame(): void {
    this.pointScore.addedGamePlayed('Word sorter', this.score);
    const message = `You sorted ${this.score} out of ${this.totalQuestions} words correctly`;
    const gameResultData = {
      message: message,
      answers: this.answers,
      grade: this.grade,
      score: this.score,
      categoryName: this.categoryName,
    };
    this.gameResultService.setResultData(gameResultData);
    this.router.navigate(['/word-sorter-results']);
  }

  resetGame(): void {
    this.grade = 100;
    this.score = 0;
    this.currentQuestion = 0;
    this.answeredWords.clear();
    this.answers = [];
    this.initializeWords();
    this.setNextWord();
  }

  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/letsPlay']);
      }
    });
  }

  get proccess(): number {
    return (this.currentQuestion / this.totalQuestions) * 100;
  }
}
