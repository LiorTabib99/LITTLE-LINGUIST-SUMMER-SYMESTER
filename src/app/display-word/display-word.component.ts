import { Component } from '@angular/core';
import { wordStatus } from '../../shared/model/wordStatus';
import { Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-display-word',
  standalone: true,
  imports: [MatCardModule, NgClass],
  templateUrl: './display-word.component.html',
  styleUrl: './display-word.component.css'
})
export class DisplayWordComponent {

 @Input() word: string = '';
// @Input() wordStatus: wordStatus = 0;

//  getWordStyle() {
//   switch (this.wordStatus) {
//     case wordStatus.Selected;
//       return 'selected';
//     case wordStatus.Disabled;
//       return 'disabled';
//     default:
//       return '';
//   }
//  }
}
