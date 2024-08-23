import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-matching-game-incorrect-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './matching-game-incorrect-dialog.component.html',
  styleUrl: './matching-game-incorrect-dialog.component.css',
})
export class MatchingGameIncorrectDialogComponent {
  message  = "";
  constructor(
    public dialogRef: MatDialogRef<MatchingGameIncorrectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.message = data.message
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
