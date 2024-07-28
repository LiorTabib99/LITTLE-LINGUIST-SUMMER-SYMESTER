import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { GameSelectingComponent } from '../game-selecting/game-selecting.component';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,
  GameSelectingComponent,],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})
export class TriviaComponent {

}



// import { MatButtonModule } from '@angular/material/button'; 
// import { MatToolbarModule } from '@angular/material/toolbar'; 
// import { MatIconModule } from '@angular/material/icon'; 
// @NgModule({ imports: [ MatButtonModule, MatToolbarModule, MatIconModule,
//    ],  }) export class AppModule { }