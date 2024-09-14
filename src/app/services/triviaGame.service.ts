import { Injectable } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Question } from '../../shared/model/question';
import { generateOptions } from '../../shared/helper/optionsHelper';
import { HEBREW_WORDS_POOL } from '../../shared/data/words';

@Injectable({
  providedIn: 'root',
})
export class TriviaGameService {
  constructor(private categoryService: CategoriesService) {}

  //bring the other questions of a game
  // according to the length of the words on a category

  //קובעים קטגוריה לפי ID
  // We will take the words that the user added and 
  //we will do generate options by the helper and we 
  //will see that there are 4 options which of 3 of them are 
  //random and one of them will be from the cateogry

  
  async getQuestionsByCategoryId(categoryId:string): Promise<Question[]> {
    const category = await this.categoryService.get(categoryId.toString());
    if (category) {
      return category.words.map(word => ({
        question: `Translate  "${word.origin}"`,
        options: generateOptions(word.target, 4, HEBREW_WORDS_POOL), 
        correctAnswer: word.target
      }));
    }
  return[];
}
}
