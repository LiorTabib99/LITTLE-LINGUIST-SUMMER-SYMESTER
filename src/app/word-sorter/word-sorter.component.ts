import { Component } from '@angular/core';
import { GameSelectingComponent } from '../game-selecting/game-selecting.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, GameSelectingComponent],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css',
})
export class WordSorterComponent {
  gameType: string | null = null;
  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() : void{
    this.gameType = this.route.snapshot.paramMap.get("gameType")
  }
}
