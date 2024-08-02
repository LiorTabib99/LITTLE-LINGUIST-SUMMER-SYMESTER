// import { Component } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { DialogComponent } from '../dialog/dialog.component';
// import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-game-card',
//   standalone: true,
//   imports: [MatCardModule, MatButtonModule, CommonModule],
//   templateUrl: './game-card.component.html',
//   styleUrls: ['./game-card.component.css'],
// })
// export class GameCardComponent {
  // items = [
  //   {
  //     title: 'Trivia',
  //     description: "Choose every word's translation from a list of 4 options",
  //   },
  //   {
  //     title: 'Mixed Letters',
  //     description:
  //       'Practice spelling, by finding the right order of letters for every word in the category',
  //   },
  //   { title: 'Word Sorter', description: 'Generate the game description' },
  // ];

  // getCardClass(item: any): string {
  //   if (item.title === 'Trivia') {
  //     return 'mat-card-trivia';
  //   } else if (item.title === 'Mixed Letters') {
  //     return 'mat-card-mixed-letters';
  //   } else if (item.title === 'Word Sorter') {
  //     return 'mat-card-word-sorter';
  //   }
  //   return '';
  // }

  // constructor(public dialog: MatDialog) {}

  // openDialog(item: any) {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: '250px',
  //     data: item,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }
// }

// import { Component } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { DialogComponent } from '../dialog/dialog.component';
// import { MatDialog } from '@angular/material/dialog';
// import { gameCards } from '../../shared/model/gameCards';


// @Component({
//   selector: 'app-game-card',
//   standalone: true,
//   imports: [MatCardModule, MatButtonModule, CommonModule],
//   templateUrl: './game-card.component.html',
//   styleUrls: ['./game-card.component.css'],
// })
// export class GameCardComponent {
//   gameCards = gameCards;
  
//   constructor(private dialog : MatDialog){
    
//   }
  
//   openDialog(card:any): void{
//     this.dialog.open(DialogComponent,
//     {width: "400px", height: "300px",data: {gameType:card.title}})
//   }
// }


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
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  gameCards = gameCards

  constructor(private dialog: MatDialog) {}

  openDialog(card: any): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '300px',
      data: { gameType: card.title }
    });
  }
}