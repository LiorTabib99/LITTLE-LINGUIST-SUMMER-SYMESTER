import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-icorrect-answers',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './icorrect-answers.component.html',
  styleUrl: './icorrect-answers.component.css',
})
export class IcorrectAnswersComponent {
  message = '';
  constructor(
    public dialogRef: MatDialogRef<IcorrectAnswersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.message = data.message;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
