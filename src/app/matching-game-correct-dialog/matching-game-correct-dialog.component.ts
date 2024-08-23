import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-matching-game-correct-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './matching-game-correct-dialog.component.html',
  styleUrl: './matching-game-correct-dialog.component.css'
})
export class MatchingGameCorrectDialogComponent {
  message  = "";
  constructor(
    public dialogRef: MatDialogRef<MatchingGameCorrectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.message = data.message
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
