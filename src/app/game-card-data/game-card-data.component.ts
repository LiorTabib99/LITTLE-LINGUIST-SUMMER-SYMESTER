 import { Component, OnInit } from '@angular/core';
 import { MatCardModule } from '@angular/material/card';
 import { MatButtonModule } from '@angular/material/button';
 import { CommonModule } from '@angular/common';
 import { MatDialog } from '@angular/material/dialog';
 import { DialogComponent } from '../dialog/dialog.component';
 import { GameResult } from '../../shared/model/gameResult';
 import { GamesResultService } from '../services/gameResults.service';

 interface AverageScore {
   total: number;
   count: number;
 }

 @Component({
   selector: 'app-game-card-data',
   standalone: true,
   imports: [MatCardModule, MatButtonModule, CommonModule],
   templateUrl: './game-card-data.component.html',
   styleUrls: ['./game-card-data.component.css'],
 })
 export class GameCardDataComponent implements OnInit {
   gameResults: GameResult[] = [];
   totalPoints: number = 0;
   totalGames: number = 0;
   averageScores: { [key: string]: AverageScore } = {};
   categoriesLearned: Set<string> = new Set();

   constructor(
     private dialog: MatDialog,
     private gamesResultService: GamesResultService
   ) {}

   ngOnInit(): void {
     this.loadGameResults();
   }

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   openDialog(card: any): void {
     this.dialog.open(DialogComponent, {
       width: '400px',
       height: '300px',
       data: { card },
     });
   }

   async loadGameResults() {
     // Assuming the service fetches all game results without filtering by userId
     this.gameResults = await this.gamesResultService.listAll(); // Change this method in your service accordingly
     this.totalPoints = this.gameResults.reduce(
       (sum, result) => sum + result.totalPoints,
       0
     );
     this.totalGames = this.gameResults.length;

     this.calculateStatistics();
   }

   calculateStatistics() {
     this.gameResults.forEach((result) => {
       const category = result.categoryId;
       this.categoriesLearned.add(category);

       if (!this.averageScores[category]) {
         this.averageScores[category] = { total: 0, count: 0 };
       }

       this.averageScores[category].total += result.totalPoints;
       this.averageScores[category].count += 1;
     });
   }

   getHighestAverageScoreCategory() {
     return Object.keys(this.averageScores).reduce((highest, category) => {
       return this.getAverageScore(category) > this.getAverageScore(highest)
         ? category
         : highest;
     }, Object.keys(this.averageScores)[0]);
   }

   getLowestAverageScoreCategory() {
     return Object.keys(this.averageScores).reduce((lowest, category) => {
       return this.getAverageScore(category) < this.getAverageScore(lowest)
         ? category
         : lowest;
     }, Object.keys(this.averageScores)[0]);
   }

   getAverageScore(category: string) {
     const stats = this.averageScores[category];
     return stats ? stats.total / stats.count : 0;
   }
 }