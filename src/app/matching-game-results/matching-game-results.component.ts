import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { GamesResultService } from '../services/gameResults.service';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './matching-game-results.component.html',
  styleUrls: ['./matching-game-results.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class MatchingGameResultsComponent implements OnInit {
  displayColums: string[] = ['englishWord', 'hebrewWord', 'status'];
  wordPairs: {
    englishWord: string;
    hebrewWord: string;
    status: string;
    categoryName: string;
  }[] = [];
  grade: number = 100;
  message: string = '';
  categoryName = '';

  constructor(
    private router: Router,
    private gameResultService: GamesResultService
  ) {}

  ngOnInit(): void {
    const data = this.gameResultService.getResultData();
    console.log(data);
    if (data) {
      this.wordPairs = data.answers || [];
      this.grade = data.grade || 100;
      this.categoryName = data.categoryName;
      this.setMessage();
    } else {
      console.error('Error: No data found in the service');
    }
  }

  private setMessage() {
    if (this.grade > 90) {
      this.message = ` %${this.grade} Excellent`;
      this.grade = 100;
    } else if (this.grade > 80) {
      this.message = ` %${this.grade} Excellent`;
      this.grade = 90;
    } else if (this.grade > 70) {
      this.message = ` %${this.grade} Amazing`;
      this.grade = 80;
    } else if (this.grade > 60) {
      this.message = ` %${this.grade} Perfect`;
      this.grade = 70;
    } else if (this.grade > 50) {
      this.message = ` %${this.grade} Great`;
      this.grade = 60;
    } else if (this.grade > 40) {
      this.message = `%${this.grade} Good`;
      this.grade = 50;
    } else if (this.grade > 30) {
      this.message = `%${this.grade} Worse`;
      this.grade = 40;
    } else if (this.grade > 20) {
      this.message = `%${this.grade} Not good enough`;
      this.grade = 30;
    } else if (this.grade > 10) {
      this.message = `%${this.grade} Not good enough`;
      this.grade = 20;
    } else if (this.grade > 0) {
      this.message = ` %${this.grade} Bad, try again`;
      this.grade = 10;
    } else {
      this.message = 'Bad, try again';
      this.grade = 0;
    }
  }

  roundGradeDown(grade: number): number {
    // Round down to the nearest multiple of 10
    return Math.round(grade/10)*10;
  }

  newGameButton(): void {
    this.router.navigate(['/letplay']);
  }
}
