/**
 * ResetCounter component renders a button that, when clicked,
 * resets the win counters for both players.
 *
 * @param {function} resetWins - A function to reset the win counters.
 * @returns {JSX.Element} A JSX element representing the reset button.
 */
export const ResetCounter = ({resetWins}) => {
    return (
        <button onClick={resetWins}>
          Reset Win Counters
        </button>
      )
    }