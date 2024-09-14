import { Language } from './language';
import { Question } from './question';
import { TranslatedWord } from './translatedWord';

export class Category {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  static lastModifiedDate(lastModifiedDate: any) {
    throw new Error('Method not implemented.');
  }
  lastUpdateDate = new Date();
  words: TranslatedWord[] = [];
  questions: Question[] = [];

  constructor(
    public id: string,
    public name: string,
    public origin: Language,
    public target: Language
  ) {}
}

// import { Language } from './language';
// import { TranslatedWord } from './translatedWord';

// export class Category {
//   [x: string]: any;
//   id: string;
//   name: string;
//   origin: Language;
//   target: Language;
//   lastUpdateDate: Date;
//   words: TranslatedWord[];

//   constructor(
//     id: string,
//     name: string,
//     origin: Language,
//     target: Language,
//     lastUpdateDate: Date, // Include lastUpdateDate in the constructor
//     words: TranslatedWord[] // Include words in the constructor
//   ) {
//     this.id = id;
//     this.name = name;
//     this.origin = origin;
//     this.target = target;
//     this.lastUpdateDate = lastUpdateDate;
//     this.words = words;
//   }
// }
