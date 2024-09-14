import { CommonModule } from '@angular/common';
import { Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../shared/model/translatedWord';
import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { Language } from '../../shared/model/language';
@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit {
  currentCategory = new Category('', '', Language.Hebrew, Language.English);
  displayedColumns: string[] = ['Origin', 'Target', 'Actions'];

  @Input()
  id?: string;

  @ViewChild('wordsGroup') wordsGroup?: NgModelGroup;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.id) {
      const categoryData = await this.categoriesService.get(this.id);

      if (categoryData) {
        this.currentCategory = categoryData;
      }
    }
  }

  addWord() {
    this.currentCategory.words = [
      ...this.currentCategory.words,
      new TranslatedWord('', ''),
    ];
  }

  onSubmitRegistration() {
    if (this.id) {
      this.categoriesService.update(this.currentCategory);
      this.router.navigate(['']);
    } else {
      this.categoriesService
        .add(this.currentCategory)
        .then(() => this.router.navigate(['']));
    }
  }

  deleteWord(index: number) {
    const extendedWordsList = Array.from(this.currentCategory.words);
    extendedWordsList.splice(index, 1);
    this.currentCategory.words = extendedWordsList;
    this.wordsGroup!.control.markAsDirty();
  }

  saveCategory() {
    if (this.id) {
      this.categoriesService.update(this.currentCategory);
    } else {
      this.categoriesService.add(this.currentCategory);
    }

    this.router.navigate(['']);
  }

  async onSubmit() {
    try {
      await this.categoriesService.add(this.currentCategory); // Use currentCategory
      // Handle success
    } catch (error) {
      console.error('Error adding category:', error);
      // Handle error
    }
  }


}
