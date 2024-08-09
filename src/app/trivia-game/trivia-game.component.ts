import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriviaGameService } from '../services/triviaGame.service';
import { Question } from '../../shared/model/question';
import { pointsScoreService } from '../services/pointsScore.service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-trivia-game',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,MatCardModule , CommonModule],
  templateUrl: './trivia-game.component.html',
  styleUrl: './trivia-game.component.css',
})
export class TriviaGameComponent implements OnInit {
  gameType: string | null = null;
  categoryName: string | null = null;
  categoryId: number | null = null;
  questions: Question[] = [];

  currentQuestionsIndex = 0;
  score = 0;
  feedBack = '';
currentQuestion: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private triviaService: TriviaGameService,
    private scoreService: pointsScoreService
  ) {}

  ngOnInit(): void {
    // this.gameType = this.route.snapshot.paramMap.get('gameType');
    // this.route.queryParams.subscribe((params) => {
    //   this.categoryName = params['category'] || null;
    // });

    this.route.queryParams.subscribe((parameter) => {
      this.categoryId = +parameter['cateoryId'] || null;
      this.gameType = parameter['gameType'] || null;

      if (this.categoryId) {
        this.questions = this.triviaService.getQuestionsByCategoryId(
          this.categoryId
        );
      }
    });

    this.score =0;

  }



  get currectQuestion(){
    return this.questions[this.currentQuestionsIndex]
  }

  endGame(){
    this.feedBack = `Game over, your score is ${this.score}`
    if(this.gameType){
      this.scoreService.addedGamePlayed
      (
        this.gameType,
        this.score
      )
    }
  }

  resetGame(){
    this.currentQuestionsIndex = 0;
    this.score = 0;
    this.feedBack = "";
  }



  nextQuestion(){
    this.currentQuestionsIndex++
    if(this.currentQuestionsIndex>= this.questions.length){
      this.endGame()
    }else{
      this.feedBack = ""
    }
  }


  selectOption(option:string){
    if(option === this.currectQuestion.correctAnswer){
      this.score++
      this.feedBack = "Correct!"
    }else{
      this.feedBack = "Wrong,try again!"
    }

    setTimeout(()=>this.nextQuestion(),1000)
  }

  goToDashboard(){
    this.router.navigate(["/main"])
  }




}
