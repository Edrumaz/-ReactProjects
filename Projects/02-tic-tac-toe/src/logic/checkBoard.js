/**
 * Checks if there is a winner on the Tic-Tac-Toe board after the latest move.
 * This function evaluates the current state of the board to determine if a player
 * has won by forming a straight line horizontally, vertically, or diagonally.
 * 
 * @param {Array} boardToCheck - An array representing the current state of the board.
 *                               it shuold have 9 positions, with each element representing a cell.
 * @param {number} boardIndex - This index represents the cell that was last clicked, containing
 *                              numbers from (0 - 8) to determine which row, column and diagonal to check.
 * @returns {string|null} - Returns ('x' or 'y') depending on the player's turn where the last cell was
 *                          clicked. Returns null if no winner has been decided after checking the board.
*/
export const checkWinnerFrom = (boardToCheck, boardIndex) => {
   const rows = Math.floor(boardIndex / 3) * 3;
   const columns = boardIndex % 3;

   // Check the row
   if (boardToCheck[rows] && boardToCheck[rows] === boardToCheck[rows + 1] && boardToCheck[rows] === boardToCheck[rows + 2]) {
    return boardToCheck[rows];
  }

   // Check the column
   if (boardToCheck[columns] && boardToCheck[columns] === boardToCheck[columns + 3] && boardToCheck[columns] === boardToCheck[columns + 6]) {
    return boardToCheck[columns];
  }

   // Check diagonals only if the last move was on a diagonal
   if (boardIndex % 2 === 0) {
       if (boardToCheck[0] === boardToCheck[4] && boardToCheck[0] === boardToCheck[8]) {
           return boardToCheck[0];
       }
       if (boardToCheck[2] === boardToCheck[4] && boardToCheck[2] === boardToCheck[6]) {
           return boardToCheck[2];
       }
   }

   return null; // No winner
}

  /**
   * Game has been finised with no winner.
   * @param {Array} newBoard 
   * @returns 
   */
  export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }