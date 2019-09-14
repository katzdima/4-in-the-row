import { Component, OnInit ,TemplateRef } from '@angular/core';
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
  winer:number;
  board=[];
  isTie:boolean;
  isWin:boolean;
  constructor(private modalService: BsModalService, private _router: Router, private _gameLogicService: GameLogicService) { }
  
  ngOnInit() {
    //board init
    for ( let i = 0; i < 6; i++) {
      this.board[i]=[];
      for (let j = 0; j < 7; j++) {
        this.board[i][j]=0;
      }
    }
  }

  gameMove(r:number,c:number){
    console.log("row and col",r,c);
    this.isTie = this._gameLogicService.isBoardFull(this.board);
    this.isWin = this._gameLogicService.winCheck(this.board,r,c);
  }

  endGameModal(template: TemplateRef<any>) {
    this.winer =1;
    this.modalRef = this.modalService.show(template);
    setTimeout(()=>{
      this.modalRef.hide();
      this._router.navigate(['welcome']);
    },3000);
  }

}
