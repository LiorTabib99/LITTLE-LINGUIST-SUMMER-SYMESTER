import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { addDoc, collection, Firestore, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { categoryConverter } from './converters/categpry-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestoreService: Firestore) {}

  // async list(): Promise<Category[]> {
  //   return []; // You can later implement fetching categories from Firestore
  //   const collectionConnection = collection(
  //     //  this.firestoreService,
  //     'words'
  //   ).withConverter(categoryConverter);
  //   const querySnapshot: QuerySnapshot<Category> = await getDocs(
  //   collectionConnection
  //   );
  //   const result: Category[] = [];
  //   querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
  //   const data = docSnap.data();
  //   if (data) {
  //   result.push(data);
  // }

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
  get(id: string): Category | undefined {
    return undefined; // Logic for getting a category by id can be added here
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(existingCategoryId: string): void {
    // Logic for deletion can be added here
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(existingCategory: Category): void {
  
  }

  async add(newCategoryData: Category) {
    await addDoc(
      collection(this.firestoreService, 'categories').withConverter(
        categoryConverter
      ),
      newCategoryData
    );
  }
}
  