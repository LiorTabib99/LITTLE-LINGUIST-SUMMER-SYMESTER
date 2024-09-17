export class GameResult {
  categoryId: string;
  gameId: number;
  date: string;
  totalPoints: number;

  constructor(
    categoryId: string,
    gameId: number,
    date: string,
    totalPoints: number
  ) {
    this.categoryId = categoryId;
    this.gameId = gameId;
    this.date = date;
    this.totalPoints = totalPoints;
  }
}
