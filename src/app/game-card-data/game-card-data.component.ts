
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GamesInfoService } from '../services/gamesInfo.service';
import { GamesResultService } from '../services/gameResults.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gameResult } from '../../shared/model/gameResult';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gameCards } from '../../shared/model/gameCards';
@Component({
  selector: 'app-game-card-data',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './game-card-data.component.html',
  styleUrl: './game-card-data.component.css',
})
export class GameCardDataComponent {
  constructor(private dialog: MatDialog,
    private gamesResultService : GamesResultService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  openDialog(card: any): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '300px',
    });
  }
}
