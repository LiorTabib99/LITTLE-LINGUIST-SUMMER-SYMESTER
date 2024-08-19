// import {  Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { ActivatedRoute } from '@angular/router';
// import { OnInit } from '@angular/core';


// @Component({
//   selector: 'app-mix-letters',
//   standalone: true,
//   imports: [
//     MatButtonModule,
//     MatIconModule,
//     CommonModule,
//   ],
//   templateUrl: './mix-letters.component.html',
//   styleUrl: './mix-letters.component.css',
// })
// export class MixLettersComponent implements OnInit {
//   gameType: string | null = null;
//   categoryName: string | null = null;

//   constructor(private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.gameType = this.route.snapshot.paramMap.get('gameType');
//     this.route.queryParams.subscribe((params) => {
//       this.categoryName = params['category'] || null;
//     });
//   }

  
  
// }




import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
// import { wordStatus } from '../../shared/model/wordStatus';
// import { hebrewWord } from '../../shared/model/hebrewWord';
import {Input} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mix-letters',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,  // Added FormsModule for ngModel binding
    MatProgressBarModule,
  ],
  templateUrl: './mix-letters.component.html',
  styleUrls: ['./mix-letters.component.css'],  // Changed styleUrl to styleUrls
})
export class MixLettersComponent implements OnInit {
  isLoading = true;
  index = 1;
  mixLetter : string = ''
  gameType: string | null = null;
  categoryName: string | null = null;
  inputText: string = '';  // Added inputText to bind to the input field

  constructor(private route: ActivatedRoute,
    private categoriesService:CategoriesService,
    private router:Router ,
    private dialog : MatDialog
    

  ) {}

  ngOnInit(): void {
    this.gameType = this.route.snapshot.paramMap.get('gameType');
    this.route.queryParams.subscribe((params) => {
      this.categoryName = params['category'] || null;
    });
  }

  onSubmit(): void {
    console.log('Submitted:', this.inputText);
    // Add your submit logic here
  }

  // פונקציה שקוראת לשירות למחוק את כל הנתונים
  onReset(): void {
    this.inputText = ''; // איפוס שדה הטקסט
  }
  

}



