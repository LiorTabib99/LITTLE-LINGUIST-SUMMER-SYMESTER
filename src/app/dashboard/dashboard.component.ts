import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { gameProfile } from '../shared/model/gameProfile';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TriviaComponent } from '../trivia/trivia.component';
import { WordSorterComponent } from '../word-sorter/word-sorter.component';
import { MixLettersComponent } from '../mix-letters/mix-letters.component';
import { FooterComponent } from '../footer/footer.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { NavigationComponent } from '../navigation/navigation.component';
// import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameExplnationComponent } from '../game-explnation/game-explnation.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,GameCardComponent,
    MatButtonModule,MatIconModule,
    MatMenuModule,MatToolbarModule,NavigationComponent,
    RouterModule,TriviaComponent,WordSorterComponent,
    MixLettersComponent,FooterComponent ,MatCardModule,
    GameExplnationComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})   
export class DashboardComponent {
  // Create an instance of gameProfile
  // game: gameProfile;

  // constructor() {
  //   // Initialize the gameProfile instance
  //   this.game = new gameProfile(
  //     1, 
  //     'Example Game',
  //     'This is an example game description.',
  //     'http://example.com'
  //   );
  // }
}


export class AppModule { 

}



