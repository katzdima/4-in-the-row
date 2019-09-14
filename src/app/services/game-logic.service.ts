import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  constructor() { }

  isBoardFull(board:number[][]){
    for ( let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if(board[i][j] === 0){
          return false;
        }
      }
    }
    return true;
  }

  winCheck(board:number[][],r,c){
    console.log("board",board);
    console.log("r & c",r,c);
    return false;


    
  }
}
