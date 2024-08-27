import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
// import { HelpComponent } from '../help/help.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, 
    MatMenuModule,MatButtonModule,
     MatToolbarModule,RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

}
