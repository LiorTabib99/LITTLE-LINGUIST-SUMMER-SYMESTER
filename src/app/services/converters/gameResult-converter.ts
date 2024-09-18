// import { FirestoreDataConverter, Timestamp } from '@angular/fire/firestore';
// import { GameResult } from '../../../shared/model/gameResult';

// export const gameResultConverter: FirestoreDataConverter<GameResult> = {
//   toFirestore(gameResult: GameResult) {
//     return {
//       categoryId: gameResult.categoryId,
//       gameId: gameResult.gameId,
//       date: Timestamp.fromDate(new Date(gameResult.date)), // המרה ל-Timestamp
//       totalPoints: gameResult.totalPoints,
//     };
//   },

//   fromFirestore(snapshot, options) {
//     const data = snapshot.data(options);
//     return new GameResult(
//       data['categoryId'],
//       data['gameId'],
//       data['date'].toDate().toISOString(), // המרה מתאריך ל-ISO string
//       data['totalPoints']
//     );
//   },
// };
