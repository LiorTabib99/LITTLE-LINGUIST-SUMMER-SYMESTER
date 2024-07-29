import { Component } from '@angular/core';
import {  MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogActions
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})

export class DialogComponent {

}
