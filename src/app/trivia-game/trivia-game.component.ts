import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../shared/model/question';
import { TriviaGameService } from '../services/triviaGame.service';
import { pointsScoreService } from '../services/pointsScore.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';

@Component({
  selector: 'app-trivia-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css'],
})
export class TriviaGameComponent implements OnInit {
  categoryId: string | null = null;
  gameType: string | null = null;

  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;
  feedback = '';

  constructor(
    private triviaService: TriviaGameService,
    private scoreService: pointsScoreService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    public dialog: MatDialog // Add MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      const categoryId = params['categoryId'];
      this.categoryId = categoryId;
      if (this.categoryId! >= "0") {
        this.questions = await this.triviaService.getQuestionsByCategoryId(
          this.categoryId!
        );
      } else {
        console.error('Invalid categoryId');
      }

      this.gameType = params['gameType'] || null;
    });

    this.score = 0;
    console.log('GameType:', this.gameType, 'CategoryId:', this.categoryId);
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  selectOption(option: string) {
    if (option === this.currentQuestion.correctAnswer) {
      this.score++;
      this.feedback = 'Correct!';
    } else {
      this.feedback = 'Try again!';
    }
    setTimeout(() => this.nextQuestion(), 1000);
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.endGame();
    } else {
      this.feedback = '';
    }
  }

  async endGame() {
    this.feedback = `Game over! Your score is ${this.score}.`;

    if (this.gameType) {
      await this.scoreService.addedGamePlayed(this.gameType, this.score);
    }

    this.scoreService.updateScore(this.score);
  }

  resetGame() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.feedback = '';
  }
  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitGameDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.goToDashboard();
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/letsPlay']);
  }
}
