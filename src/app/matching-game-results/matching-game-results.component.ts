import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { GamesResultService } from '../services/gameResults.service';
import { pointsScoreService } from '../services/pointsScore.service';
@Component({
  selector: 'app-matching-game-results',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatTableModule,
  ],
  templateUrl: './matching-game-results.component.html',
  styleUrl: './matching-game-results.component.css',
})
export class MatchingGameResultsComponent implements OnInit {
  gameType: string | null = null;
  categoryName: string | null = null;
  displayColums: string[] = ['origin', 'target'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any[] = [];
  message: string = '';
  grade: number = 0;

  constructor(
    private route: ActivatedRoute,
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
