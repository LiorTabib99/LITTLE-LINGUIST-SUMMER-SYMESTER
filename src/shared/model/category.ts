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
