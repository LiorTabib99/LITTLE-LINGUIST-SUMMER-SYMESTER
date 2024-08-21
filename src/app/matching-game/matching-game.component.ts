import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { wordStatus } from '../../shared/model/wordStatus';
// import { hebrewWord } from '../../shared/model/hebrewWord';

import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface DialogData{
  success : boolean;
}

@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [ CommonModule ,MatButtonModule,MatIconModule,
    MatCardModule
  ],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css'
})
export class MatchingGameComponent implements OnInit {
  gameType: string | null = null;
  categoryName: string | null = null;
  
  ngOnInit(): void {
    this.gameType = this.route.snapshot.paramMap.get('gameType');
    this.route.queryParams.subscribe((params) => {
      this.categoryName = params['category'] || null;
    });
  }

  constructor(private route: ActivatedRoute,
    private categoriesService:CategoriesService,
    private router:Router ,
    private dialog : MatDialog,
    private wordStatus : wordStatus
  ) {}


  openDialog(){
   
  }
}
