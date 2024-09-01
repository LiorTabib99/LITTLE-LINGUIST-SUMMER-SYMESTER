import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { GamesResultService } from '../services/gameResults.service';
import { pointsScoreService } from '../services/pointsScore.service';

@Component({
  selector: 'app-word-sorter-results',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatTableModule],
  templateUrl: './word-sorter-results.component.html',
  styleUrls: ['./word-sorter-results.component.css'],
})
export class WordSorterResultsComponent implements OnInit {
  displayedColumns: string[] = ['origin', 'category', 'guess'];
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

  chooseNewGame(): void {
    this.router.navigate(['/letsPlay']);
  }
}
