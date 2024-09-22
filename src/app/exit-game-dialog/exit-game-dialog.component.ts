import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-game-dialog',

  templateUrl: './exit-game-dialog.component.html',
  styleUrl: './exit-game-dialog.component.css',
})
export class ExitGameDialogComponent {
  constructor(public dialogRef: MatDialogRef<ExitGameDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCanel(): void {
    this.dialogRef.close(false);
  }
}
