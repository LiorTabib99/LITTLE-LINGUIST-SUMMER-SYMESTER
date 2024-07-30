// import { Component } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { gameProfile } from '../shared/model/gameProfile';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';
// import { MatDialogModule } from '@angular/material/dialog';
// import { HeaderComponent } from '../header/header.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { RouterModule } from '@angular/router';
// import { TriviaComponent } from '../trivia/trivia.component';
// import { WordSorterComponent } from '../word-sorter/word-sorter.component';
// import { MixLettersComponent } from '../mix-letters/mix-letters.component';
// import { FooterComponent } from '../footer/footer.component';
// import { GameCardComponent } from '../game-card/game-card.component';
// import { NavigationComponent } from '../navigation/navigation.component';
// import { MatCardModule } from '@angular/material/card';
// import { GameExplnationComponent } from '../game-explnation/game-explnation.component';
// import { MatDialog } from '@angular/material/dialog';
// import { CategoriesListComponent } from '../categories-list/categories-list.component';
// @Component({
//   selector: 'app-game-selecting',
//   standalone: true,
//   imports: [MatFormFieldModule,MatSelectModule ,
//     MatOptionModule,MatButtonModule,
//     MatCardModule,DashboardComponent, GameCardComponent,
//     HeaderComponent ,MatIconModule,NavigationComponent,
//     FooterComponent,MixLettersComponent,TriviaComponent,
//     WordSorterComponent, RouterModule,CommonModule ,MatToolbarModule,
//     MatMenuModule,GameExplnationComponent,CategoriesListComponent
//   ],
//   templateUrl: './game-selecting.component.html',
//   styleUrl: './game-selecting.component.css',
// })
// export class GameSelectingComponent {

//   categories: gameProfile[] = []

// }

//   categories: gameProfile[] = []; // תחליף לפי הדרך שבה תשיג את הקטגוריות

//   constructor(public dialog: MatDialog) {
//     this.categories = this.loadCategories(); // יישם פונקציה זו בהתאם למקורות הנתונים שלך
//   }

//   openCategorySelectDialog(game: string): void {
//     const dialogRef = this.dialog.open(CategorySelectDialog, {
//       width: '250px',
//       data: { game, categories: this.categories }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.onCategorySelected(result);
//       }
//     });
//   }

//   onCategorySelected(gameID: string): void {
//     // נבצע את הפעולה הדרושה עם הקטגוריה שנבחרה
//     console.log('Selected category ID:', gameID);
//     // כאן תוכל לנווט לקומפוננטת המשחק המתאימה
//   }

//   private loadCategories(): gameProfile[] {
//     // הוסף כאן את הלוגיקה להחזרת קטגוריות
//     return [
//       { id: '1', name: 'Category 1', wordCount: 10, lastUpdated: '2023-07-01' },
//       { id: '2', name: 'Category 2', wordCount: 20, lastUpdated: '2023-07-15' }
//     ];
//   }
// }

// @Component({
//   selector: 'category-select-dialog',
//   template: `
//     <h1 mat-dialog-title>בחר קטגוריה</h1>
//     <div mat-dialog-content>
//       <mat-form-field appearance="fill">
//         <mat-label>קטגוריה</mat-label>
//         <mat-select [(value)]="selectedCategoryId">
//           <mat-option *ngFor="let category of data.categories" [value]="category.id">
//             {{ category.name }} - {{ category.wordCount }} מילים (עודכן ב-{{ category.lastUpdated }})
//           </mat-option>
//         </mat-select>
//       </mat-form-field>
//     </div>
//     <div mat-dialog-actions>
//       <button mat-button (click)="onNoClick()">ביטול</button>
//       <button mat-button color="primary" (click)="onPlayClick()">Play</button>
//     </div>
//   `,
// })
// export class CategorySelectDialog {
//   selectedCategoryId: string;

//   constructor(
//     public dialogRef: MatDialogRef<CategorySelectDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: { game: string, categories: gameProfile[] }
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onPlayClick(): void {
//     this.dialogRef.close(this.selectedCategoryId);
//   }
// }

// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { gameProfile } from '../shared/model/gameProfile';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';
// import { MatDialogModule } from '@angular/material/dialog';
// import { HeaderComponent } from '../header/header.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { RouterModule } from '@angular/router';
// import { TriviaComponent } from '../trivia/trivia.component';
// import { WordSorterComponent } from '../word-sorter/word-sorter.component';
// import { MixLettersComponent } from '../mix-letters/mix-letters.component';
// import { FooterComponent } from '../footer/footer.component';
// import { GameCardComponent } from '../game-card/game-card.component';
// import { NavigationComponent } from '../navigation/navigation.component';
// import { MatCardModule } from '@angular/material/card';
// import { GameExplnationComponent } from '../game-explnation/game-explnation.component';
// import { CategoriesListComponent } from '../categories-list/categories-list.component';
// import { CategoriesService } from '../services/categories.service';

// @Component({
//   selector: 'app-game-selecting',
//   standalone: true,
//   imports: [
//     MatFormFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, MatCardModule,
//     DashboardComponent, GameCardComponent, HeaderComponent, MatIconModule, NavigationComponent,
//     FooterComponent, MixLettersComponent, TriviaComponent, WordSorterComponent, RouterModule,
//     CommonModule, MatToolbarModule, MatMenuModule, GameExplnationComponent, CategoriesListComponent
//   ],
//   templateUrl: './game-selecting.component.html',
//   styleUrls: ['./game-selecting.component.css'],
// })

// export class CategorySelectDialog {
// openCategorySelectDialog(arg0: string) {
// throw new Error('Method not implemented.');
// }
//   selectedCategoryId: string | undefined;

//   constructor(
//     public dialogRef: MatDialogRef<CategorySelectDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: { game: string, categories: gameProfile[] }
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onPlayClick(): void {
//     this.dialogRef.close(this.selectedCategoryId);
//   }
// }

// export class GameSelectingComponent {
//   categories: gameProfile[] = [];

//   constructor(public dialog: MatDialog, public categoriesService: CategoriesService) {
//     this.categories = this.loadCategories(); // יישם פונקציה זו בהתאם למקורות הנתונים שלך
//   }

//   openCategorySelectDialog(game: string): void {
//     const dialogRef = this.dialog.open(CategorySelectDialog, {
//       width: '250px',
//       data: { game, categories: this.categories }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.onCategorySelected(result);
//       }
//     });
//   }

//   onCategorySelected(categoryId: string): void {
//     // נבצע את הפעולה הדרושה עם הקטגוריה שנבחרה
//     console.log('Selected category ID:', categoryId);
//     // כאן תוכל לנווט לקומפוננטת המשחק המתאימה
//   }

//   private loadCategories(): gameProfile[] {
//     return this.categoriesService.list(); // הוסף כאן את הלוגיקה להחזרת קטגוריות
//   }
// }

import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { gameProfile } from '../../shared/model/gameProfile';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { WordSorterComponent } from '../word-sorter/word-sorter.component';
import { MixLettersComponent } from '../mix-letters/mix-letters.component';
import { FooterComponent } from '../footer/footer.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { MatCardModule } from '@angular/material/card';
import { GameExplnationComponent } from '../game-explnation/game-explnation.component';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { Inject } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-game-selecting',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule,
    DashboardComponent,
    GameCardComponent,
    HeaderComponent,
    MatIconModule,
    NavigationComponent,
    FooterComponent,
    MixLettersComponent,
    WordSorterComponent,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    GameExplnationComponent,
    CategoriesListComponent
  ],
  templateUrl: './game-selecting.component.html',
  styleUrl: './game-selecting.component.css',
})
export class GameSelectingComponent {
  constructor(
    private dialogService : MatDialog
  ){
    
  }

  OpenDialog(){
    this.dialogService.open(DialogComponent)
    
  }
  
}
