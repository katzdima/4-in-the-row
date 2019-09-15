import { Component, OnInit ,TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { GameLogicService } from 'src/app/services/game-logic.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('template', { static: false }) modalTemplate : TemplateRef<any>;

  row:number;
  board:number[][];
  message:string;
  isWin:boolean;
  currentPlayer:number = 1;
  isFirstPlayer:boolean = true;
  isSecondPlayer:boolean = false;

  constructor(private _modalService: BsModalService, private _router: Router, private _gameLogicService: GameLogicService) { }
  
  ngOnInit() {
    //board init
    this.board=[];
    for ( let i = 0; i < 6; i++) {
      this.board[i]=[];
      for (let j = 0; j < 7; j++) {
        this.board[i][j]=0;
      }
    }
  }

  gameMove(c:number){
    //calculating next available cell in selected column
    this.row = this._gameLogicService.nextAvailableCell(c,this.board);
    if(this.row == -1){
      this.nextMove();
      return;
    };
    console.log("row & col",this.row,c);
    this.board[this.row][c]=this.currentPlayer;

    //is game tie 
    if(this._gameLogicService.isBoardFull(this.board)){
      this.endGameModal("It's A Tie, good luck next time.");
    };

    //is player won the game
    if(this._gameLogicService.winCheck(this.board,this.row,c,this.currentPlayer)){
      this.endGameModal(`The Player ${this.currentPlayer} is the Winer`);
    }

    //next player turn
    this.nextMove();
    
  }

  nextMove(){
    this.currentPlayer = (this.currentPlayer == 1) ? 2 : 1 ;
  }

  endGameModal(message:string){
    this.message=message;
    this.modalRef = this._modalService.show(this.modalTemplate);
    setTimeout(()=>{
      this.modalRef.hide();
      setTimeout(() => {
        this._router.navigate(['welcome']);
      }, 100);
    },3000);
  }

  markColumn(col:number){
    console.log("col",col);
  }


}
