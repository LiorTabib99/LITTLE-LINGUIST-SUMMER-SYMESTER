// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { gamePlayed } from '../../shared/model/gamePlayed';

// @Injectable({
//   providedIn: 'root',
// })
// export class pointsScoreService {
//   private scoreSubject = new BehaviorSubject<number>(0);
//   private gamePlayed: gamePlayed[] = [];
//   scoreSubject$ = this.scoreSubject.asObservable();

//   constructor() {
//     //Will take the saved score points on a specipic game
//     this.loadSavedPointsScorce();
//     this.loadGamePlayedHistory();
//   }

//   private loadSavedPointsScorce() {
//     const savedPointsScore = localStorage.getItem('savedScore');
//     if (savedPointsScore !== null) {
//       this.scoreSubject.next(Number(savedPointsScore));
//     }
//   }

//   private loadGamePlayedHistory() {
//     const gamePlayedHistory = localStorage.getItem('gameHistory');
//     if (gamePlayedHistory) {
//       this.gamePlayed =
//       JSON.parse(gamePlayedHistory)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .map((record: any) =>
//         ({
//         ...record,
//         date: new Date(record.date),
//       }));
//     }
//   }

//   updateScore(scoreSubject: number) {
//     this.scoreSubject.next(scoreSubject);

//     //Saved the score and it's key
//     localStorage.setItem('savedScore', scoreSubject.toString());
//   }

//   deleteScore() {
//     this.scoreSubject.next(0);
//     //Delete the score and it's key
//     localStorage.removeItem('savedScore');
//   }

//   getScore() {
//     const score = localStorage.getItem('savedScore');
//     //shows the score
//     return score;
//   }

//   addedGamePlayed(gameType : string, score:number){
//     const gamePlayed : gamePlayed =
//     {gameType,score,date:new Date()}
//     this.gamePlayed.push(gamePlayed)
//     localStorage.setItem('gameHistory', JSON.stringify(this.gamePlayed))
//   }

//   //Will show the current score
//   getCurrentScore(){
//     return this.scoreSubject.getValue()
//   }

//   //Will add previos game
//   getGameHistory(){
//     return [...this.gamePlayed]
//   }

// }

import { Injectable } from '@angular/core';
import {
  Firestore,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  addDoc,
  CollectionReference,
  Timestamp,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { gameHistory } from '../../shared/model/gameHistory';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class pointsScoreService {
  private scorcDocRef = doc(this.firestore, 'gameScores', 'score');
  private scoreSubject = new BehaviorSubject<number>(0);
  score$ = this.scoreSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadSavedScore();
  }

  private async loadSavedScore() {
    try {
      const docSnap = await getDoc(this.scorcDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.updateScoreValue(data['score'] || 0);
      } else {
        console.log('No score found iniatiaze');
        await setDoc(this.scorcDocRef, {
          score: 0,
        });
      }
    } catch (error) {
      console.error("error loading saving score", error)
    }
  }

  private updateScoreValue(newScore : number){
    this.scoreSubject.next(newScore);

  }

  async listGameHistory(): Promise<gameHistory[]>{
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "gameScores") as CollectionReference<gameHistory >);
      const gameHistory : gameHistory[] = [];
      querySnapshot.forEach((doc)=>{
        const gameRecord = doc.data()
        if(gameRecord.date instanceof Timestamp){
          gameRecord.data = gameRecord.date.toDate()
        }
        gameHistory.push(gameRecord)
      })
      return gameHistory             
    } catch (error) {
      console.error('error loading saving score', error);
      throw error
    }
  }


}
