// import { Injectable } from '@angular/core';
// import { gameResult } from '../../shared/model/gameResult';
// import {
//   addDoc,
//   collection,
//   Firestore,
//   getDocs,
//   QuerySnapshot,
// } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class CategoriesService {
//   constructor(private firestoreService: Firestore) {}

//   async addGameResultadd(newGameResultData: gameResult) {
//     await addDoc(
//       collection(this.firestoreService, 'categories')
//         .withConverter
//         // categoryConverter
//         (),
//       newGameResultData
//     );
//   }

//   async list(): Promise<Category[]> {
//     const collectionConnection = collection(
//       this.firestoreService,
//       'categories'
//     ).withConverter(categoryConverter);
//     const querySnapshot: QuerySnapshot<Category> = await getDocs(
//       collectionConnection
//     );
//     return querySnapshot.docs.map((doc) => doc.data()); // מחזיר את המידע ישירות מפיירסטור
//   }

// }




// import { Injectable } from '@angular/core';
// import { gameResult } from '../../shared/model/gameResult';
// import {
//   addDoc,
//   collection,
//   Firestore,
//   getDocs,
//   QuerySnapshot,
// } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class GameResultService {
//   constructor(private firestoreService: Firestore) {}

//   // i. מתודה שמוסיפה תוצאה חדשה של משחק
//   async addGameResult(newGameResultData: gameResult): Promise<void> {
//     await addDoc(
//       collection(this.firestoreService, 'gameResults'), // שמירת תוצאות המשחקים
//       newGameResultData
//     );
//   }

//   // ii. מתודה שמחזירה את רשימת המשחקים ששוחקו
//   async list(): Promise<gameResult[]> {
//     const collectionRef = collection(this.firestoreService, 'gameResults');
//     const querySnapshot: QuerySnapshot<gameResult> = await getDocs(
//       collectionRef
//     );

//     return querySnapshot.docs.map((doc) => doc.data()); // מחזיר את המידע כ- gameResult[]
//   }
// }