// import {  MatDialogActions } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import {FormsModule} from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {MatSelectModule} from '@angular/material/select';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatButton } from '@angular/material/button';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Component, Inject } from '@angular/core';


// @Component({
//   selector: 'app-dialog',
//   standalone: true,
//   imports: [
//     MatDialogActions,
//     FormsModule,
//     MatInputModule,
//     MatSelectModule,
//     MatFormFieldModule,
//   ],
//   templateUrl: './dialog.component.html',
//   styleUrl: './dialog.component.css',
// })
// export class DialogComponent {

//   constructor(
//     public dialogRef: MatDialogRef<DialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }





// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-dialog',
//   templateUrl: './dialog.component.html',
//   styleUrls: ['./dialog.component.css'],
// })
// export class DialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<DialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { name: string; lastUpdateDate: Date; wordCount: number }
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }






// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';

// @Component({
//   selector: 'app-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatButtonModule,
//     MatDialogModule
//   ],
//   templateUrl: './dialog.component.html',
//   styleUrls: ['./dialog.component.css']
// })
// export class DialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<DialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { name: string; lastUpdateDate: Date; wordCount: number }
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }



import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; lastUpdateDate: Date; wordCount: number }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
