import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,DialogComponent,
    CommonModule, MatButtonModule, MatCardModule],
    
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})

export class GameCardComponent {
  items = [
    { title: 'Trivia', description: 'Choose every word\'s translation from a list of 4 options' },
    { title: 'Mixed Letters', description: 'Practice spelling, by finding the right order of letters for every word in the category' },
    { title: 'Word Sorter', description: 'Generate the game description' }
  ];

  constructor(public dialog: MatDialog) {}

  openDialog(item: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}