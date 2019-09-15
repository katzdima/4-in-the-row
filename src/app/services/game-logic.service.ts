import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  constructor() { }

  nextAvailableCell(col:number,board:number[][]){
    let row:number= board.length-1; 
    for(let i=0; i<board.length; i++){
      if(board[i][col]!==0){
        row = i-1;
        break;
      }
    }
    return row;
  }

  isBoardFull(board:number[][]){
    for ( let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if(board[i][j] === 0){
          return false;
        }
      }
    }
    return true;
  }

  winCheck(board:number[][], r:number, c:number, currentPlayer:number){
    let count:number = 0;
    let x:number = 0;
    let y:number = 0;
    let skipCheck:boolean = false;

    //right diagonal
      //left top corner elimination
      if((r==0 && c<3) || (r==1 && c<2) || (r==2 && c==0)){
        skipCheck = true;
      }

      //right bottom corner elimination
      if((r==3 && c==6)|| (r==4 && c>4) || (r==5 && c>3)){
        skipCheck = true;
      }

      if(!skipCheck){
        //geting the first cell of the diagonal
        for(x=r, y=c; x<board.length && y>=0 ;x++, y--){}

        //diagonal check
        for(x--,y++ ; x>=0 && y<board[0].length; x--,y++){
          if(board[x][y] === currentPlayer){
            count++;
            if(count==4){
              return true;
            }
          }
          else{
            count = 0;
          }
        }
      }

    //left diagonal
      //variables init
      count=0;
      x=y=0;
      skipCheck= false;

      //right top corner elimination
      if((r==0 && c>3) || (r==1 && c>4) || (r==2 && c==6) ){
        skipCheck = true;
      }
      //left bottom corner elimination
      if((r==3 && c==0) || (r==4 && c<2) || (r==5 && c<3)){
        skipCheck = true;
      }
      if(!skipCheck){
        //geting the first cell of the diagonal
        for(x=r, y=c; x>=0 && y>=0; x--,y--){}

        //check
        for(x++,y++; x<board.length && y<board[0].length; x++,y++){
          if(board[x][y] === currentPlayer){
            count++;
            if(count==4){
              return true;
            }
          }
          else{
            count = 0;
          }
        }  
      }

    //vertical check
    //variable init
    count=0;
    
    //check
    for(let i=0; i<board.length; i++){
      if(board[i][c] === currentPlayer){
        count++;
        if(count==4){
          return true;
        }
      }
      else{
        count = 0;
      }
    }

    //horizontal check
    //variable init
    count=0;

    //check
    for(let i=0; i<board[0].length; i++){
      if(board[r][i] === currentPlayer){
        count++;
        if(count==4){
          return true;
        }
      }
      else{
        count = 0;
      }
    }
    
    return false;
  }
}
