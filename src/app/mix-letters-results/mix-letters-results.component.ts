import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { GamesResultService } from '../services/gameResults.service';
@Component({
  selector: 'app-mix-letters-results',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatTableModule],
  templateUrl: './mix-letters-results.component.html',
  styleUrl: './mix-letters-results.component.css',
})
export class MixLettersResultsComponent implements OnInit {
  displayColums: string[] = ['origin', 'target', 'guess', 'isCorrect'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any[] = [];
  message: string = '';
  grade: number = 0;
  categoryName: string | null = null;
  correctAnswerAmount = 0;
  constructor(
    private router: Router,
    private gameResultService: GamesResultService
  ) {}

  ngOnInit(): void {
    const data = this.gameResultService.getResultData();
    console.log(data);
    if (data) {
      this.correctAnswerAmount = data.answers.filter(
        (item: { isCorrect: boolean }) => item.isCorrect
      ).length;
      this.dataSource = data.answers || [];
      this.grade = Math.round(data.grade) || 100; // עיגול למספר שלם
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
    if (this.grade < 0) {
      this.message = 'Bad, try again';
      this.grade = 0;
    }
  }

  roundGradeDown(grade: number): number {
    // Round down to the nearest multiple of 10
    return Math.round(grade);
  }

  newGameButton(): void {
    this.router.navigate(['/letsPlay']);
  }
}
