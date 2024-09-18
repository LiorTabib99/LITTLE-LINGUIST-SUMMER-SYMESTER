import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { lastValueFrom } from 'rxjs';
import { GameResult } from '../../shared/model/gameResult';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameResultsCollection: AngularFirestoreCollection<GameResult>;

  constructor(private firestore: AngularFirestore) {
    this.gameResultsCollection = this.firestore.collection('gameResults');
  }

  async addGameResult(gameResult: GameResult): Promise<void> {
    try {
      await this.gameResultsCollection.add(gameResult);
      console.log('Game result added successfully');
    } catch (error) {
      console.error('Error adding game result:', error);
    }
  }

  async list(userId: string): Promise<GameResult[]> {
    try {
      const querySnapshot = await lastValueFrom(
        this.firestore
          .collection('gameResults', (ref) => ref.where('userId', '==', userId))
          .get()
      );

      // ודא שהנתונים חוזרים במבנה של GameResult
      return querySnapshot.docs.map((doc) => {
        const data = doc.data() as GameResult; // טען את הנתונים כ-GameResult

        return {
          categoryId: data.categoryId,
          gameId: data.gameId,
          date: data.date,
          totalPoints: data.totalPoints,
          // אם לא צריך userId, אפשר להוציא אותו
          // userId: data.userId,
        };
      });
    } catch (error) {
      console.error('Error fetching game results:', error);
      return [];
    }
  }
}
