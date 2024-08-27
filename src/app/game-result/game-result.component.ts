// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, inject } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Dialog } from '@angular/cdk/dialog';
import { Inject } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MAT_DIALOG_DATA,MatDialog,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MatchingGameComponent } from '../matching-game/matching-game.component';
@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [MatTableModule,CommonModule,MatDialogModule],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.css'
})
export class GameResultComponent {
  displayColums : string[] = ["englishWord", "hebrewWord","status"];
  wordPairs : {englishWord: string, hebrewWord: string, status: string, categoryName: string}[] = []
  grade : number = 100;
  message :string = ""
  categoryName = ""
  
  

  constructor(private router: Router, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<GameResultComponent>) {
    if(data){
      this.wordPairs = data.wordPairs || [];
      this.grade = data.grade || 100;
      this.categoryName = data.categoryName
      this.setMessage()
    }else{
      console.log("error, invalid or missing data for game result", data)
    }
  }

  //checking the great and will display us it's status
  private setMessage(){
    if(this.grade >=80){
      this.message = "Excellent"
    }else if(this.grade>=60){
       this.message = "Good"
    }else if(this.grade<50){
       this.message = "Good"
       this.grade =40
    }else if(this.grade===50){
      this.message = 'Good';
      this.grade = 50;
    }

    //continue
    
    else{
      this.message ="Bad,try again"
    }
  } 


  //closing this specific dialog and return to the menu
  newGameButton(): void{
    this.dialogRef.close(
    )
  }




}
