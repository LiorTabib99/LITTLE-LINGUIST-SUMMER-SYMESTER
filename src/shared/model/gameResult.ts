export class GameResult {
  categoryId: string;
  gameId: number;
  date: Date;
  totalPoints: number;
  grade: number;

  constructor(
    categoryId: string,
    gameId: number,
    date: Date,
    totalPoints: number,
    grade: number
  ) {
    this.categoryId = categoryId;
    this.gameId = gameId;
    this.date = date;
    this.totalPoints = totalPoints;
    this.grade = grade;
  }
}
