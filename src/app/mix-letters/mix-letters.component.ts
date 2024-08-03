import {  Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-mix-letters',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './mix-letters.component.html',
  styleUrl: './mix-letters.component.css',
})
export class MixLettersComponent implements OnInit {
  gameType: string | null = null;
  categoryName: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameType = this.route.snapshot.paramMap.get('gameType');
    this.route.queryParams.subscribe((params) => {
      this.categoryName = params['category'] || null;
    });
  }
  
}
