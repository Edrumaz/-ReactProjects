import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { TURNS } from "./assets/constants"
import { checkWinnerFrom, checkEndGame } from "./logic/checkBoard"

import { WinnerModal } from "./components/WinnerModal"
import { MuteButton } from "./components/MuteButton"
import { ResetCounter } from "./components/ResetCounter"

function App() {

  //Variable that contains the gaming board.
  const [board, setBoard] = useState(() => {
    //Variable used to persist board value even if the window is reloaded.
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)    
  })
  
  //Set turns.
  const [turn, setTurn] = useState(() => {
    //Variable used to persist turn value even if the window is reloaded.
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //Variable to keep winner's value.
  const [winner, setWinner] = useState(null)

  //Variable to keep winner's count.
  const [xWins, setXWins] = useState(() => parseInt(window.localStorage.getItem('xWins')) ?? 0);
  const [oWins, setOWins] = useState(() => parseInt(window.localStorage.getItem('oWins')) ?? 0);

  /**
   *  Function to restart game setting every value to default.
   */
  const restartGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const resetWins = () => {
    setXWins(0);
    setOWins(0);
  };

  /**
   * Funtion to update the board after the click handler calls the function.
   * @param {int} index 
   * @returns {void} updated board
   */
  const updateBoard = (index) => {

    //Avoiding overwriting
    if (board[index] || winner) return

    //Update the game board
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Decide the next one to play.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard, index)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
      
      if (newWinner === TURNS.X) {
        setXWins(xWins + 1);
        } else {
          setOWins(oWins + 1);
        }

        //Save win counter
        if (newWinner === TURNS.X) {
          const updatedXWins = xWins + 1;
          setXWins(updatedXWins);
          window.localStorage.setItem('xWins', updatedXWins);
        } else {
          const updatedOWins = oWins + 1;
          setOWins(updatedOWins);
          window.localStorage.setItem('oWins', updatedOWins);
      }
    }
    else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    //Save game status
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>

      <h2>{TURNS.X} - Wins: {xWins}</h2>
      <h2>{TURNS.O} - Wins: {oWins}</h2>

      <ResetCounter resetWins={resetWins} />

      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal restartGame = {restartGame} winner = {winner}/>
      <div>
        <button onClick={restartGame}>Restart Game</button>
        <MuteButton/>
      </div>
    </main>
  )
}

export default App
