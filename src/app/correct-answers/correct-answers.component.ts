import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-correct-answers',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './correct-answers.component.html',
  styleUrl: './correct-answers.component.css',
})
export class CorrectAnswersComponent {
  message = '';
  constructor(
    public dialogRef: MatDialogRef<CorrectAnswersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.message = data.message;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
