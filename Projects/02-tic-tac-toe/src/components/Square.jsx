import { Howl } from "howler"
import clickSoundFile from '../assets/sounds/hit.mp3'

const clickSound = new Howl({
  src: [clickSoundFile],
});

/**
 * Square component represents a single cell in the Tic-Tac-Toe board.
 * It renders a square that can be clicked to update the game board.
 *
 * @param {Object} props - The properties object.
 * @param {*} props.children - The content to be displayed inside the square. Typically, this will be 'X', 'O', or null.
 * @param {boolean} props.isSelected - A boolean flag indicating whether the square is currently selected or not.
 * @param {function} props.updateBoard - A function to be called when the square is clicked. This function updates the game board state.
 * @param {number} props.index - The index of the square on the board, used to identify which square was clicked.
 *
 * @returns {JSX.Element} A JSX element representing a clickable square in the Tic-Tac-Toe board.
 */

export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    
    const handleClick = () => {
      clickSound.play();
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className= {className}>
        {children}
      </div>
    )
  }