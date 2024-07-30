import { Component } from '@angular/core';
import { gameProfile } from '../../shared/model/gameProfile';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    DashboardComponent,
    CommonModule,
  ],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css',
})
export class GameViewComponent {
  // Create an instance of gameProfile
  game: gameProfile;

  constructor() {
    // Initialize the gameProfile instance
    this.game = new gameProfile(
      1,
      'Example Game',
      'This is an example game description.',
      'http://example.com'
    );
  }
}
