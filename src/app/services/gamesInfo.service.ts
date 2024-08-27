import { Injectable } from '@angular/core';
import { gameProfile } from '../../shared/model/gameProfile';

@Injectable({
  providedIn: 'root',
})

export class GamesInfoService {
  private games: gameProfile[] = [
    new gameProfile(
      111,
      'Sort Word game',
      'Sort words',
      'translate-game/category/:id'
    ),

    new gameProfile(
      222,
      'Sort words Game',
      'Sort words Game',
      'word-sorting-game/category/:id'
    ),

    new gameProfile(
      333,
      'Mixed Words game',
      'Mixed words',
      'mixed-words-game/category/:id'
    ),
  ];

  list() : gameProfile[] {
    return this.games
  }
}
