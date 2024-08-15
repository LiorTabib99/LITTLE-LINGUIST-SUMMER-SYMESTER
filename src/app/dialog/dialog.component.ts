import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule
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
    @Inject(MAT_DIALOG_DATA) public data: { gameType: string },
    private categoriesService: CategoriesService,
    private router: Router
  ) { 
    this.categories = this.categoriesService.list();
  }

  onCategoryChange(event: any): void {
    const categoryId = event.value;
    this.selectedCategoryId = categoryId;
    this.selectedCategory = this.categories.find(category => category.id === categoryId) || null;
  }

  onPlayClick(): void {
    if (this.selectedCategory) {
      const gameRoutes: { [key: string]: string } = {
        'Trivia': '/trivia-game',
        'Mixed Letters': '/mixLetter',
        'Word Sorter': '/word-sorting-game',
      };
      const route = gameRoutes[this.data.gameType];
      if (route) {
        this.dialogRef.close();
        this.router.navigate([route], {
          queryParams: {
            categoryId: this.selectedCategoryId,
            gameType: this.data.gameType
          }
        });
      }
    }
  }

  onNonClick(): void {
    this.dialogRef.close();
  }
}