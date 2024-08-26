import { Language } from './language';
import { Question } from './question';
import { TranslatedWord } from './translatedWord';

export class Category {
  lastUpdateDate = new Date();
  words: TranslatedWord[] = [];
  questions: Question[] = [];

  constructor(
    public id: number,
    public name: string,
    public origin: Language,
    public target: Language
  ) {}
}
