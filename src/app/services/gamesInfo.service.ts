import { Injectable } from '@angular/core';
import { gameProfile } from '../shared/model/gameProfile';



@Injectable({
  providedIn: 'root'
})


export class GamesInfoService {
  public games: gameProfile[] = []
  constructor() { }

}
