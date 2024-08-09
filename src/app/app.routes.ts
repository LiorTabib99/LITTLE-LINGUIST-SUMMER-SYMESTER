import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { HelpComponent } from './help/help.component';
import { gameProfile } from '../shared/model/gameProfile';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameSelectingComponent } from './game-selecting/game-selecting.component';
import { WordSorterComponent } from './word-sorter/word-sorter.component';
import { MixLettersComponent } from './mix-letters/mix-letters.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';
import { LetsPlayComponent } from './lets-play/lets-play.component';

export const routes: Routes = [
  { path: 'letsPlay', component: LetsPlayComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // נתיב ברירת המחדל
  { path: 'admin', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: 'help', component: HelpComponent },
  { path: 'gameSelecting', component: GameSelectingComponent },
  { path: 'mixLetter', component: MixLettersComponent },
  { path: 'word-sorting-game', component: WordSorterComponent },
  { path: 'main', component: DashboardComponent },
  { path: 'trivia-game', component: TriviaGameComponent },
];
