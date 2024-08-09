import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { gamePlayed } from '../../shared/model/gamePlayed';

@Injectable({
  providedIn: 'root',
})
export class pointsScoreService {
  private scoreSubject = new BehaviorSubject<number>(0);
  private gamePlayed: gamePlayed[] = [];
  scoreSubject$ = this.scoreSubject.asObservable();

  constructor() {
    //Will take the saved score points on a specipic game
    this.loadSavedPointsScorce();
    this.loadGamePlayedHistory();
  }

  private loadSavedPointsScorce() {
    const savedPointsScore = localStorage.getItem('savedScore');
    if (savedPointsScore !== null) {
      this.scoreSubject.next(Number(savedPointsScore));
    }
  }

  private loadGamePlayedHistory() {
    const gamePlayedHistory = localStorage.getItem('gameHistory');
    if (gamePlayedHistory) {
      this.gamePlayed = 
      JSON.parse(gamePlayedHistory)
      .map((record: any) => 
        ({
        ...record,
        date: new Date(record.date),
      }));
    }
  }

  updateScore(scoreSubject: number) {
    this.scoreSubject.next(scoreSubject);

    //Saved the score and it's key
    localStorage.setItem('savedScore', scoreSubject.toString());
  }

  deleteScore() {
    this.scoreSubject.next(0);
    //Delete the score and it's key
    localStorage.removeItem('savedScore');
  }

  getScore() {
    const score = localStorage.getItem('savedScore');
    //shows the score
    return score;
  }

  addedGamePlayed(gameType : string, score:number){
    const gamePlayed : gamePlayed = 
    {gameType,score,date:new Date()} 
    this.gamePlayed.push(gamePlayed)
    localStorage.setItem
    ('gameHistory', JSON.stringify(this.gamePlayed))
  }

  //Will show the current score
  getCurrentScore(){
    return this.scoreSubject.getValue()
  }

  //Will add previos game
  getGameHistory(){
    return [...this.gamePlayed]
  }



}
