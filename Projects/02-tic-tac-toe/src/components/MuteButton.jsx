import { useState } from 'react';
import { Howler } from "howler"; 

/**
 * MuteButton component toogles the mute function to remove other sounds from the game.
 * @returns {JSX.Element} A JSX element representing a clickable button that toggles the mute function.
 */

export const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(Howler._muted);

  const toggleMute = () => {
    const newMuteState = !isMuted;
    Howler.mute(newMuteState);
    setIsMuted(newMuteState);
  };

  return (
    <button onClick={toggleMute}>
      {isMuted ? 'Unmute' : 'Mute'}
    </button>
  );
};