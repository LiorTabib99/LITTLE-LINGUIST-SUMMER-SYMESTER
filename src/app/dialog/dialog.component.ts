import { Component } from '@angular/core';
import {  MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogActions,FormsModule,
    MatInputModule,MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})

export class DialogComponent {

}
