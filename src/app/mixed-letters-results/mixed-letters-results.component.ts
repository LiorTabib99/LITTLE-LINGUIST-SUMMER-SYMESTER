import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { pointsScoreService } from '../services/pointsScore.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { wordStatus } from '../../shared/model/wordStatus';
import { hebrewWord } from '../../shared/model/hebrewWord';
import { TranslatedWord } from '../../shared/model/translatedWord';
@Component({
  selector: 'app-mixed-letters-results',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './mixed-letters-results.component.html',
  styleUrl: './mixed-letters-results.component.css',
})
export class MixedLettersResultsComponent implements OnInit {
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
