import { Component, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatedWord } from '../../shared/model/translated-word';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CategoriesService } from '../services/categories.service';
import { pointsScoreService } from '../services/pointsScore.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { wordStatus } from '../../shared/model/wordStatus';
import { hebrewWord } from '../../shared/model/hebrewWord';
import { CorrectDialogComponent } from '../correct-dialog/correct-dialog.component';
import { IncorrectDialogComponent } from '../incorrect-dialog/incorrect-dialog.component';
import { GameResultComponent } from '../game-result/game-result.component';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule,
    MatCardModule, MatProgressBarModule,DialogComponent],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css'
})
export class MatchingGameComponent implements OnInit {
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
  categoryName: any;

  progress = 0;
  

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private pointScore: pointsScoreService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //navigate to the cateogry id from queryParamMap and take it
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

  
  selectedEnglishWord(word : {word: string,status: wordStatus,attemptsLeft: number}){
    if(word.status === wordStatus.Normal){
      this.selectedEnglishWords = word
    }
  }

  //connects to the correct dialog component
  openCorrectAnswerDialog(): void {
    this.dialog.open(CorrectDialogComponent);
  }

   //connects to the exit game dialog component
  openExitDialog() : void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent)
    dialogRef.afterClosed().subscribe(result=>{
      this.router.navigate(["/main"])
    })
  }

  navigationToSelectedCateogry(): void {
      this.router.navigate(["/letsPlay"])
  }




  matchWord(hebrewWord: hebrewWord) {
    //checking if selectedEnglishWords is not null and if it was selected
    if (this.selectedEnglishWords !== null) { // Explicit null check
      const { word, status, attemptsLeft } = this.selectedEnglishWords;
      const matchedWord = this.hebrewWords.find(
        item => item.translated === 
        hebrewWord.translated &&
        item.origin === word
      );
  
      //checking the selected word is matching
      if (matchedWord) {
        // Handle correct match
        this.selectedEnglishWords.status = wordStatus.Correct;
        matchedWord.status = wordStatus.Correct;
        this.score++; // Increase score for correct match
        this.selectedEnglishWords = null;
        this.openCorrectAnswerDialog();
  
        // Check if all words are used
        if (this.englishWords.every(word => word.status !== wordStatus.Normal)) {
          this.endGame();
        }

        //otherwise the game continues
      } else {
        // Handle incorrect match
        this.grade -= 8; // Decrease grade by 8 for incorrect match
  


        //checking if the grade equells to 0 so the game is over
        if (this.grade <= 0) {
          this.grade = 0;
          // Disable all words when grade reaches 0
          this.englishWords.forEach(word => {
            word.status = wordStatus.Disabled;
            word.attemptsLeft = 0;
          });
          this.hebrewWords.forEach(hebrew => {
            hebrew.status = wordStatus.Disabled;
          });
          this.endGame();
          return;
        }

        //it will decreace attempts of the selected words that I chose
        this.selectedEnglishWords.attemptsLeft--;
  
        if (this.selectedEnglishWords.attemptsLeft <= 0) {
          this.selectedEnglishWords.status = wordStatus.Disabled;
  
          // Disable the corresponding Hebrew word once we choose the correct word
          this.hebrewWords.forEach(hebrew => {
            if (hebrew.origin === this.selectedEnglishWords?.word) {
              hebrew.status = wordStatus.Disabled;
            }
          });
        }

        
        this.feedback = `Incorrect! Grade remaining: ${this.grade}`;
        this.selectedEnglishWords = null;
  
        // Check if all English words are disabled
        if (this.englishWords.every(word => word.status === wordStatus.Disabled)) {
          this.endGame();
        } else {
          this.openCorrectAnswerDialog();
        }
      }
    }
  }


  endGame() {

    this.feedback = `This game is over your final score is:${this.score}`;
    this.pointScore.addedGamePlayed('Word sorter', this.score);

    const dataResult = this.englishWords.map((englishWord) => {
      const hebrewWord = this.hebrewWords.find((hebrewWord) => {
        hebrewWord.origin === englishWord.word;
      });
      return {
        englishWord: englishWord.word,
        hebrewWord: hebrewWord ? hebrewWord.translated : 'NaN',
        //checking if the string is correct or incorrect
        status:
          englishWord.status === wordStatus.CorrectAnswer
            ? 'correct'
            : 'incorrect',
      };
    });

    this.dialog.open(GameResultComponent, {
      data: { score: this.score, grade: this.grade, wordParis: dataResult },
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




  exitDialog() {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/main']);
      }
    });
  }



  progressBarLength() : void{
    const totalWords= this.englishWords.length
    const matchWords = this.englishWords.filter(word=>
      word.status == wordStatus.Correct
    ).length
    this.progress = ((matchWords/totalWords) * 100)
  }
  


}
