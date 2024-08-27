import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { gameResultData } from '../../shared/model/gameResultData';
@Injectable({
  providedIn: 'root',
})
export class GamesResultService {
  private resultData: gameResultData = {
    message: '',
    answers: [],
    grade: 0,
    score: 0,
    categoryName: '',
  };

  setResultData(data: gameResultData): void {
    this.resultData = data;
  }

  
  getResultData(): gameResultData {
    return this.resultData;
  }
}
