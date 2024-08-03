import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { gameProfile } from '../../shared/model/gameProfile';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { WordSorterComponent } from '../word-sorter/word-sorter.component';
import { MixLettersComponent } from '../mix-letters/mix-letters.component';
import { FooterComponent } from '../footer/footer.component';
import { GameCardComponent } from '../game-card/game-card.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { MatCardModule } from '@angular/material/card';
import { GameExplnationComponent } from '../game-explnation/game-explnation.component';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { Inject } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-game-selecting',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule,
    DashboardComponent,
    GameCardComponent,
    HeaderComponent,
    MatIconModule,
    NavigationComponent,
    FooterComponent,
    MixLettersComponent,
    WordSorterComponent,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    GameExplnationComponent,
    CategoriesListComponent
  ],
  templateUrl: './game-selecting.component.html',
  styleUrl: './game-selecting.component.css',
})
export class GameSelectingComponent {
  constructor(
    private dialogService : MatDialog
  ){
    
  }

  OpenDialog(){
    this.dialogService.open(DialogComponent)
    
  }
  
}
