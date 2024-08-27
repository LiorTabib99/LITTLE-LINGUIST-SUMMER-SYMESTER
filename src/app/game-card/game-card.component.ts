import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { gameCards } from '../../shared/model/gameCards';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  gameCards = gameCards;

  constructor(private dialog: MatDialog) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openDialog(card: any): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '300px',
      data: { gameId: card.id,gameCard : card },
    });
  }
}
