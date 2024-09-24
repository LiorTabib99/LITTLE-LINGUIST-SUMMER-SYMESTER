import { Component, OnInit } from '@angular/core';
import { pointsScoreService } from '../services/pointsScore.service';
import { GameResult } from '../../shared/model/gameResult';

@Component({
  selector: 'app-points-score',
  standalone: true,
  imports: [],
  templateUrl: './points-score.component.html',
  styleUrl: './points-score.component.css',
})
export class PointsScoreComponent implements OnInit {
  lastScore = 0;
  gameHistory: GameResult[] = [];
  constructor(private pointsScoreService: pointsScoreService) {}
  async ngOnInit(): Promise<void> {
    await this.loadGameHistory();
    this.pointsScoreService.score$.subscribe((score) => {
      this.lastScore = score;
    });
   
  }

  async loadGameHistory(){
    try{
      this.gameHistory = await this.pointsScoreService.listGameHistory()
      if (this.gameHistory.length>0){
        const lastGame = this.gameHistory[this.gameHistory.length-1]
        this.lastScore = lastGame.totalPoints
      }
    }catch(error){
      console.log(error)
    }
  }
}
