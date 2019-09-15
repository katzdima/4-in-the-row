import { Component, OnInit ,TemplateRef, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('table', { static: false }) table: ElementRef;

  row:number;
  board:number[][];
  message:string;
  currentPlayer:number = 1;
  elem:ElementRef;

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
    this.unMarkColumn(c);

    //calculating next available cell in selected column
    this.row = this._gameLogicService.nextAvailableCell(c,this.board);
    if(this.row === -1){
      return;
    };

    //new cell population
    this.board[this.row][c] = (this.currentPlayer === 1) ? 1 : 2 ;

    //is game tie 
    if(this._gameLogicService.isBoardFull(this.board)){
      this.endGameModal("It's A Tie, good luck next time.");
    };

    //is player won the game
    if(this._gameLogicService.winCheck(this.board,this.row,c,this.currentPlayer)){
      this.endGameModal(`The Player ${this.currentPlayer} is the Winer`);
    }

    //next player turn
    this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1 ;
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
    for(let i=0; i<this.board.length; i++){
      this.elem = this.table.nativeElement.querySelectorAll(`.row${i}col${col}`);
      this.elem[0].classList.add("bg-secondary");
    }
  }

  unMarkColumn(col:number){
    for(let i=0; i<this.board.length; i++){
      let elem = this.table.nativeElement.querySelectorAll(`.row${i}col${col}`);
      elem[0].classList.remove("bg-secondary");
    }
  }
}
