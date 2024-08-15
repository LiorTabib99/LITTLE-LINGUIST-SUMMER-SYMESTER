import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MixLettersComponent } from '../mix-letters/mix-letters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TriviaGameComponent } from '../trivia-game/trivia-game.component';
import { WordSorterComponent } from '../word-sorter/word-sorter.component';
@Component({
  selector: 'app-exit-game-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    
    MixLettersComponent,
    MatSelectModule,
    TriviaGameComponent,
    WordSorterComponent,
  ],
  templateUrl: './exit-game-dialog.component.html',
  styleUrl: './exit-game-dialog.component.css',
})
export class ExitGameDialogComponent {
  constructor(public dialogRef: MatDialogRef <ExitGameDialogComponent>){
  
  }

  onConfirm() : void{
    this.dialogRef.close(true);

  }

  onCanel() : void{
    this.dialogRef.close(false);
  }

}
