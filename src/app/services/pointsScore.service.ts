import { Injectable } from '@angular/core';
import {
  Firestore,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  CollectionReference,
  Timestamp,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { gameHistory } from '../../shared/model/gameHistory';
import {
  BehaviorSubject,
  // throwError
} from 'rxjs';
import { GameResult } from '../../shared/model/gameResult';

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
        console.log('No score found, initializing');
        await setDoc(this.scorcDocRef, {
          score: 0,
        });
      }
    } catch (error) {
      console.error('Error loading saved score', error);
    }
  }

  private updateScoreValue(newScore: number) {
    this.scoreSubject.next(newScore);
  }

  getCurrentScore() {
    return this.scoreSubject.getValue();
  }

  async listGameHistory(): Promise<gameHistory[]> {
    try {
      const querySnapshot = await getDocs(
        collection(
          this.firestore,
          'gameScores'
        ) as CollectionReference<gameHistory>
      );
      const gameHistory: gameHistory[] = [];
      querySnapshot.forEach((doc) => {
        const gameRecord = doc.data();
        //checks if there is date which was found on the data
        if (gameRecord.date instanceof Timestamp) {
          gameRecord.date = gameRecord.date.toDate();
        }
        gameHistory.push(gameRecord);
      });
      return gameHistory;
    } catch (error) {
      console.error('Error updating score in Firestore', error);
      throw error;
    }
  }

  // פונקציה ציבורית לעדכון הניקוד ושמירה ב-Firestore
  async updateScore(newScore: number): Promise<void> {
    this.updateScoreValue(newScore); // עדכון מקומי
    try {
      await updateDoc(this.scorcDocRef, { score: newScore });
    } catch (error) {
      console.error('Error updating score in Firestore', error);
    }
  }

  async addedGamePlayed(
    categoryId : string,
    gameId : number,
    totalPoints :number,
    grade :number
  ): Promise<void> {
    try {
      const gameRecord: GameResult = {
        categoryId,
        gameId,
        totalPoints,
        grade,
        date: new Date
      };
      await setDoc(doc(this.firestore, "gameScores",new Date().toString()),gameRecord);
      console.log("gameRecord has been added successfully");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // async setPoints
}
