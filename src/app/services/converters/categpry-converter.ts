import { FirestoreDataConverter, Timestamp } from '@angular/fire/firestore';
import { Category } from '../../../shared/model/category';
import { Language } from '../../../shared/model/language';

export const categoryConverter: FirestoreDataConverter<Category> = {
  toFirestore(category: Category) {
    return {
      id: category.id,
      name: category.name,
      origin: category.origin,
      target: category.target,
      lastUpdateDate: Timestamp.fromDate(category.lastUpdateDate), // המרה ל-Timestamp
      words: category.words.map((word) => ({
        origin: word.origin,
        target: word.target,
      })),
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    // יצירת אובייקט Category עם 4 השדות הנדרשים
    const category = new Category(
      snapshot.id,
      data['name'],
      data['origin'] as Language,
      data['target'] as Language
    );

    // עדכון השדות הנוספים לאחר יצירת האובייקט
    category.lastUpdateDate = data['lastUpdateDate']?.toDate(); // המרה מ-Timestamp ל-Date
    category.words = data['words']
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? data['words'].map((word: any) => ({
          origin: word.origin,
          target: word.target,
        }))
      : [];
    category.questions = data['questions'] || [];

    return category;
  },
};
