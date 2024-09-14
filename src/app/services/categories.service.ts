import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { categoryConverter } from './converters/categpry-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestoreService: Firestore) {}

  async list(): Promise<Category[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'categories'
    ).withConverter(categoryConverter);
    const querySnapshot: QuerySnapshot<Category> = await getDocs(
      collectionConnection
    );
    return querySnapshot.docs.map((doc) => doc.data()); // מחזיר את המידע ישירות מפיירסטור
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: string): Promise<Category | undefined> {
    const docRef = doc(this.firestoreService, 'categories', id).withConverter(
      categoryConverter
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such category');
      return undefined; // Logic for getting a category by id can be added here
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(existingCategoryId: string): void {
    // Logic for deletion can be added here
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(existingCategory: Category): void {}

  async add(newCategoryData: Category) {
    await addDoc(
      collection(this.firestoreService, 'categories').withConverter(
        categoryConverter
      ),
      newCategoryData
    );
  }
}
