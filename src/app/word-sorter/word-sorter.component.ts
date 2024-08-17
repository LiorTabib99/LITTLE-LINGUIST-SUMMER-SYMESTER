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
@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [MatButtonModule, 
    MatIconModule, CommonModule,
     MatProgressBarModule],
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
  categoryName: any;

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

  openCorrectAnswerDialog(): void {
    this.dialog.open(CorrectDialogComponent)
  }

  matchWord(hebrewWord: hebrewWord) {
    if (this.selectedEnglishWords !== null) {
      const { word, status, attemptsLeft } = this.selectedEnglishWords;
      const matchWord = this.hebrewWords.find(
        (item) =>
          ((item.translated === hebrewWord.translated) 
        && (item.origin === word))
      );
      if (matchWord) {
        this.selectedEnglishWords.status = wordStatus.CorrectAnswer;
        matchWord.status = wordStatus.CorrectAnswer;
        this.score++;
        this.selectedEnglishWords = null;
        this.openCorrectAnswerDialog();
        if (
          this.englishWords.every((word) => word.status !== wordStatus.Normal)
        ) {
          this.endgame()
        }else{
          this.grade-=8
        }if(this.grade<=0){
          this.grade =0
          this.englishWords.forEach(word=>{
            word.status = wordStatus.Disabled
            word.attemptsLeft = 0
          })
          this.hebrewWords.forEach(hebrewWord=>{
            hebrewWord.status = wordStatus.Disabled
          })
          this.endgame()
          return
        }
        // this.selectedEnglishWords.attemptsLeft--
      }

    }
  }

  endgame(){

    this.feedback = `This game is over your final score is:${this.score}`
    this.pointScore.addedGamePlayed("Word sorter", this.score)


    const dataResult = this.englishWords.map(englishWord=>{
      const hebrewWord = this.hebrewWords.find(hebrewWord=>{
        hebrewWord.origin === englishWord.word
      })
      return{
        englishWord : englishWord.word,
        hebrewWord : hebrewWord ? hebrewWord.translated : "NaN",
        //checking if the string is correct or incorrect 
        status: englishWord.status === wordStatus.CorrectAnswer ? "correct" : "incorrect" 
      }
    })

    this.dialog.open(GameResultComponent,{data: {score : this.score,
      grade: this.grade, wordParis : dataResult
    }})


  }

  resetGame() : void{
    this.grade =100;
    this.score = 0;
    this.englishWords = this.englishWords.map(word=>({
      ...word, status : wordStatus.Normal, attemptsLeft : 4
    }))
    this.hebrewWords = this.hebrewWords.map(word=>({
      ...word, status : wordStatus.Normal, attemptsLeft : 4
    }))


    this.selectedEnglishWords = null
    this.feedback = ''
    this.englishWords =  this.mixWordsArray(this.englishWords)
    this.hebrewWords =  this.mixWordsArray(this.hebrewWords)
  }

  exitDialog(){
    const dialogRef= this.dialog.open(ExitGameDialogComponent)
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.router.navigate(["/main"])
      }
    })
  }

}
