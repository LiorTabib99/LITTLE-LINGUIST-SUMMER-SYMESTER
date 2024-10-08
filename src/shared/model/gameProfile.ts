export class gameProfile {
  gameID: number;
  gameName: string;
  description: string;
  urlAddress: string;

  constructor(
    gameID: number,
    gameName: string,
    description: string,
    urlAddress: string
  ) {
    this.gameID = gameID;
    this.gameName = gameName;
    this.description = description;
    this.urlAddress = urlAddress;
  }

  TranslateGame = new gameProfile(
    1,
    'Translate Game',
    'Translate Words from English To Hebrew',
    'translate'
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TranslateGasme = new gameProfile(
  111,
  'Translate Game',
  'Translate words',
  'translate-game/category/:id'
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SortWords = new gameProfile(
  222,
  'Sort words Game',
  'Sort words Game',
  'word-sorting-game/category/:id'
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MixedWordsGame = new gameProfile(
  333,
  'Mixed words Game',
  'Arrange the words to the correct category',
  'mixed-words-game/category/:id'
);
