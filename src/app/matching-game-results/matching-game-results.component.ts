import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-matching-game-results',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './matching-game-results.component.html',
  styleUrl: './matching-game-results.component.css',
})
export class MatchingGameResultsComponent implements OnInit {
  gameType: string | null = null;
  categoryName: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameType = this.route.snapshot.paramMap.get('gameType');
    this.route.queryParams.subscribe((params) => {
      this.categoryName = params['category'] || null;
    });
  }






}
