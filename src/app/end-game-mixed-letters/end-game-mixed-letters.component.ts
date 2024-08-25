import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from '@angular/cdk/dialog';
import { gameResultData } from '../../shared/model/gameResultData';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-end-game-mixed-letters',
  standalone: true,
  imports: [MatTableModule, DialogModule, CommonModule,MatIconModule],
  templateUrl: './end-game-mixed-letters.component.html',
  styleUrl: './end-game-mixed-letters.component.css',
})
export class EndGameMixedLettersComponent {
  dataSocre: any[];
  displayedColumns: string[] = ['question', 'answer', 'isCorrect'];
  categoryName: string = '';
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<EndGameMixedLettersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: gameResultData
  ) {
    this.dataSocre = data.answers;
    this.message = data.message;
    this.categoryName = data.categoryName;
  }

  onclose(): void {
    this.dialogRef.close();
  }
}
