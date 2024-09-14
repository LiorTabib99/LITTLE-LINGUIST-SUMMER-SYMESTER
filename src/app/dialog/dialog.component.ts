import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  selectedCategory: Category | null = null;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: { gameId: number,gameCard : any },
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.categoriesService.list().then(
      (categories) =>{
        this.categories = categories
      }
    ).catch((error)=>{
      console.error("error loading categories",error)
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCategoryChange(event: any): void {
    const categoryId = event.value;
    this.selectedCategoryId = categoryId;
    this.selectedCategory =
      this.categories.find((category) => category.id === categoryId) || null;
  }

  onPlayClick(): void {
    if (this.selectedCategory) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { route } = this.data.gameCard;
      this.dialogRef.close()
      this,this.router.navigate([route], {
        queryParams : {
         categoryId :this.selectedCategoryId,
         gameType :this.data.gameCard.title 
        }
      })
    }
  }

  onNonClick(): void {
    this.dialogRef.close();
  }
}
