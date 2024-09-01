import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { HelpComponent } from './help/help.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameSelectingComponent } from './game-selecting/game-selecting.component';
import { WordSorterComponent } from './word-sorter/word-sorter.component';
import { MixLettersComponent } from './mix-letters/mix-letters.component';
import { TriviaGameComponent } from './trivia-game/trivia-game.component';
import { LetsPlayComponent } from './lets-play/lets-play.component';
import { MatchingGameComponent } from './matching-game/matching-game.component';
import { WordSorterResultsComponent } from './word-sorter-results/word-sorter-results.component';
import { MixLettersResultsComponent } from './mix-letters-results/mix-letters-results.component';
import { MatchingGameResultsComponent } from './matching-game-results/matching-game-results.component';


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
  { path: 'matching-game', component: MatchingGameComponent },
  { path: 'word-sorter-results', component: WordSorterResultsComponent },
  { path: 'mix-letters-results', component: MixLettersResultsComponent },
  { path: 'matching-game-results', component: MatchingGameResultsComponent },
];
