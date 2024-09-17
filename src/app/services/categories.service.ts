import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import {
  // addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
  updateDoc,
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
  async delete(existingCategoryId: string): Promise<void> {
    const docRef = doc(this.firestoreService, 'categories', existingCategoryId);
    await deleteDoc(docRef);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async update(existingCategory: Category): Promise<void> {
  //   if (!existingCategory.id) {
  //     throw new Error('Category must have an ID to be updated.');
  //   }
  //   const docRef = doc(
  //     this.firestoreService,
  //     'categories',
  //     existingCategory.id
  //   ).withConverter(categoryConverter);
  //   const { ...updateData } = existingCategory;
  //   await updateDoc(docRef, updateData);
  // }

  // async update(existingCategory: Category): Promise<void> {
  //   if (!existingCategory.id) {
  //     throw new Error('Category must have an ID to be updated.');
  //   }

  //   const docRef = doc(
  //     this.firestoreService,
  //     'categories',
  //     existingCategory.id
  //   ).withConverter(categoryConverter);

  //   // Update the entire existingCategory object directly
  //   const { ...updateData } = existingCategory;
  //   await updateDoc(docRef, updateData);
  // }

  // async update(existingCategory: Category): Promise<void> {
  //   if (!existingCategory.id) {
  //     throw new Error('Category must have an ID to be updated.');
  //   }

  //   // Get the reference to the existing category document by its ID
  //   const docRef = doc(
  //     this.firestoreService,
  //     'categories',
  //     existingCategory.id
  //   );

  //   // Convert the existingCategory to a Firestore-friendly format
  //   const updateData = categoryConverter.toFirestore(existingCategory);

  //   // Update the Firestore document with the converted data, keeping the same ID
  //   await updateDoc(docRef, updateData);
  // }

  async update(existingCategory: Category): Promise<void> {
    if (!existingCategory.id) {
      throw new Error('Category must have an ID to be updated.');
    }

    // Get a reference to the existing category document by its ID
    const docRef = doc(
      this.firestoreService,
      'categories',
      existingCategory.id
    );

    // Use the converter to transform the Category object to a Firestore-compatible format
    const updateData = categoryConverter.toFirestore(existingCategory);

    // Update the Firestore document with the converted data
    await updateDoc(docRef, updateData);
  }

  async add(newCategoryData: Category) {
    const docRef = doc(collection(this.firestoreService, 'categories')); // Create a reference with a generated ID
    newCategoryData.id = docRef.id; // Assign the generated ID to your category object

    await setDoc(docRef.withConverter(categoryConverter), newCategoryData); // Use setDoc to assign the ID and the data
    console.log(newCategoryData);
  }
}
