import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { HelpComponent } from './help/help.component';
import { gameProfile } from './shared/model/gameProfile';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameSelectingComponent } from './game-selecting/game-selecting.component';
import { WordSorterComponent } from './word-sorter/word-sorter.component';
import { MixLettersComponent } from './mix-letters/mix-letters.component';
import { TriviaComponent } from './trivia/trivia.component';
import { ScrambledWordsGameComponent } from './scrambled-words-game/scrambled-words-game.component';


export const routes: Routes = 
[
  { path: 'admin', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: 'help', component: HelpComponent },
  // { path: 'newCategory', component: gameProfile },
  { path: 'gameSelecting', component: GameSelectingComponent },
  { path: 'mixLetter', component: MixLettersComponent },
  { path: 'word-sorting-game/category/:id', component: WordSorterComponent },
  { path: '', component: DashboardComponent },
  { path: 'trivia', component: TriviaComponent },
  { path: 'scrambled-words-game/:categoryId', component: ScrambledWordsGameComponent },


];



