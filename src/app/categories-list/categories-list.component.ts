// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// // import { categories } from '../../shared/data/categories';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterModule } from '@angular/router';
// import { Category } from '../../shared/model/category';
// import { CategoriesService } from '../services/categories.service';
// import { MatDialog } from '@angular/material/dialog';
// import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

// @Component({
//   selector: 'app-categories-list',
//   standalone: true,
//   imports: [
//     CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterModule
//   ],
//   templateUrl: './categories-list.component.html',
//   styleUrl: './categories-list.component.css',
// })
// export class CategoriesListComponent implements OnInit {
//   displayedColumns: string[] = ['id', 'name', 'numOfWords', 'lastUpdateDate', 'actions'];
//   dataSource : Category[] = [];

//   constructor(private categoriesService : CategoriesService, private dialogService : MatDialog) {}

//  async ngOnInit(): Promise<void> {
//   this.dataSource = await this.categoriesService.list(); // Use await to resolve the Promise
//   this.categoriesService
//   .list()
//   then((result: Category[])) => (this.allCategories = result)
// }

//   deleteCategory(id : string, name: string) {
//     const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, {data: name});

//     dialogRef.afterClosed().subscribe(async result => {
//       if (result) {
//         this.categoriesService.delete(id);
//         this.dataSource = await this.categoriesService.list();
//       }});
//   }

//   this.categoriesServiceService = this.categoriesServiceService.list();

//    this.categoriesServiceService.list().then((result: Category[]) => (this.allCategoires = result));
// }





import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'], // תיקון styleUrl ל styleUrls
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'numOfWords',
    'lastUpdateDate',
    'actions',
  ];
  dataSource: Category[] = []; // משתמשים במשתנה dataSource עבור טבלת הקטגוריות

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.dataSource = await this.categoriesService.list(); // טוען את הקטגוריות בעת טעינת הקומפוננטה
  }

  async deleteCategory(id: string, name: string) {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, {
      data: name,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.categoriesService.delete(id); // מחכה שהקטגוריה תימחק
        this.dataSource = await this.categoriesService.list(); // מרענן את הרשימה לאחר מחיקה
      }
    });
  }
}
