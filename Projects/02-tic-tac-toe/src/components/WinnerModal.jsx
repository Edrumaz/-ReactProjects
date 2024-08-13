import { Square } from "./Square"
import { useEffect } from "react";
import winnerSoundFile from '../assets/sounds/victory.mp3'
import tieSoundFile from '../assets/sounds/tie.mp3';

const victorySound = new Howl({
    src: [winnerSoundFile],
  });

  const tieSound = new Howl({
    src: [tieSoundFile],
  });

  export function WinnerModal({ winner, restartGame }) {
    useEffect(() => {
      if (winner !== null) {
        if (winner === false) {
          tieSound.play();
        } else {
          victorySound.play();
        }
      }
    }, [winner]);

    if (winner === null) return null

    const winnerText = winner === false ? 'Tie' : 'Won'

    return (
        <section className="winner">
        <div className="text">
            <h2>
            {
                winner === false
                ? 'Tie'
                : "Winner"
            }
            </h2>
            <header className="win">
            {winner && <Square>{winner}</Square>}
            </header>
            <footer>
            <button onClick={restartGame}>Restart game</button>            
            </footer>         
        </div>
        </section>
        
    )
}