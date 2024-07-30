import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { gameProfile } from '../../shared/model/gameProfile';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { GameSelectingComponent } from '../game-selecting/game-selecting.component';

@Component({
  selector: 'app-mix-letters',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './mix-letters.component.html',
  styleUrl: './mix-letters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixLettersComponent {
  @Input()
  id = '';

  // constructor(private CategoriesService:CategoriesService){
  //   ngOnInit(): void{
  //     throw new Error('Method not implemented. ');
  //   }
  // }
}
