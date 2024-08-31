import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { GamesResultService } from '../services/gameResults.service';
import { pointsScoreService } from '../services/pointsScore.service';
@Component({
  selector: 'app-mix-letters-results',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatTableModule],
  templateUrl: './mix-letters-results.component.html',
  styleUrl: './mix-letters-results.component.css',
})
export class MixLettersResultsComponent implements OnInit {
  displayColums: string[] = ['origin', 'target', 'isCorrect'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any[] = [];
  message: string = '';
  grade: number = 0;
  categoryName: string | null = null;

  constructor(
    private router: Router,
    private gameResultService: GamesResultService,
    private pointsScoreService: pointsScoreService
  ) {}

  ngOnInit(): void {
    const data = this.gameResultService.getResultData();
    if (data) {
      this.dataSource = data.answers;
      this.message = data.message;
      this.categoryName = data.categoryName;
      this.grade = data.grade;
    } else {
      console.error('No data was found on the service');
    }
  }

  onClose(): void {
    
    this.router.navigate(['/letsPlay']);
    
  }

  
}
