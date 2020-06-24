import { Component, OnInit } from '@angular/core';
import { blockEnum } from '../block/blockEnum';
import { EqualityCheckService } from '../services/equalityCheckService';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  
  public currentPlayer: blockEnum;
  public grid: blockEnum[][];
  public ResultMessage: string;
  public isGameOver: boolean;

  constructor(private equalityCheckService: EqualityCheckService) {
    this.equalityCheckService = equalityCheckService;
   }

  ngOnInit() {
    this.clearGrid(); //refreshes the grid for new game.
  }

  //clearGrid function makes the grid ready for a new game, by removing inputs from the blocks
  clearGrid() {
    this.grid = [];
    //creating a new blank grid
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      this.grid[rowIndex] = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        this.grid[rowIndex][colIndex] = blockEnum.EMPTY;
      }
    }
    this.currentPlayer = blockEnum.xPlayer;   
    this.ResultMessage = `It's Player ${this.currentPlayer}'s turn`;
  }

  /* updateGrid is called whenever any block in the grid is clicked.
   It takes row number and column number of that block as input.
   It checks if the game is draw or won and displays the message accordingly,
   otherwise calls toggle function to toggle the player for next move */
  updateGrid(rowIndex: number, colIndex: number): void {
    if (!this.isGameOver && this.grid[rowIndex][colIndex] === blockEnum.EMPTY) {
    this.grid[rowIndex][colIndex] = this.currentPlayer;
    if (this.isGameDraw()) {  
      this.isGameOver = true; 
      this.ResultMessage = `It\'s a Draw!`;
    }   
    else if (this.isGameWon()) {
      this.isGameOver = true;    
      this.ResultMessage = `Player ${this.currentPlayer} wins the game!`;
    }     
    else{
      this.togglePlayer();
    }   
   }  
  }

  //togglePlayer function alternates the player for every next move.
  togglePlayer(): void {
    this.currentPlayer = this.currentPlayer === blockEnum.xPlayer ? blockEnum.oPlayer : blockEnum.xPlayer;
    this.ResultMessage = `It's Player ${this.currentPlayer}'s turn`;
  }

  /*isThreeInLine function returns boolean value based on the condition: if any player was able to
   draw on three consecutive blocks diagonally/vertically/horizontally.
   */
  isThreeInLine(): boolean {
    return (this.isThreeHorizontally() || this.isThreeVertically() || this.isThreeDiagonally());
  }

  /*isThreeHorizontally function returns boolean value based on the condition: if any player was able to
   draw on three consecutive horizontal blocks.*/
  isThreeHorizontally(): boolean {    
    let threeHorizontally = false;
    for (const rowArray of this.grid) {
      if (!threeHorizontally) {
        threeHorizontally = this.equalityCheckService.checkEquality(rowArray[0], rowArray[1], rowArray[2]);
      }
    }
    return threeHorizontally;
  }

  /*isThreeVertically function returns boolean value based on the condition: if any player was able to
   draw on three consecutive vertical blocks.*/
  isThreeVertically(): boolean {    
    let threeVertically = false;  
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      if (!threeVertically) {
        threeVertically = this.equalityCheckService.checkEquality(this.grid[0][colIndex], this.grid[1][colIndex], this.grid[2][colIndex]);
      }
    }
    return threeVertically;
  }

  /*isThreeDiagonally function returns boolean value based on the condition: if any player was able to
   draw on three consecutive diagonal blocks.*/
  isThreeDiagonally(): boolean {
    let threeInDiagonal = false;
    if(this.equalityCheckService.checkEquality(this.grid[0][0], this.grid[1][1], this.grid[2][2]))
    {
      threeInDiagonal = true;
      return threeInDiagonal;
    }
    if(this.equalityCheckService.checkEquality(this.grid[0][2], this.grid[1][1], this.grid[2][0]))
    {
      threeInDiagonal = true;
      return threeInDiagonal;
    }

    return threeInDiagonal;
  }

  /*isGridFull function checks if all the blocks are occupied by one or the other player 
  and returns boolean value after evaluating isThreeInLine() function.
  */
  isGridFull(): boolean {

    for (const colArray of this.grid){
      for (const blockItem of colArray){
        if (blockItem === blockEnum.EMPTY){
          return false;
        }
      }
    }        
    return !this.isThreeInLine();
  }

  /* isGameWon function checks if any player won the game, it returns a boolean value based on
  the evaluation of isThreeInLine() function.
  */
  isGameWon(): boolean {     
    return this.isThreeInLine();
  }

  /*isGameDraw function checks if all the blocks are occupied by one or the other player and 
  returns boolean based on isGridFull() function.
  */
  isGameDraw(): boolean {
    return this.isGridFull();
  }

} 


