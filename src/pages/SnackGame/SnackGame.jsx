import React, { useEffect } from 'react';
import Game from './Game';
import './SnackGame.scss';

const Map = () => {
  const rect = 12;

  useEffect(() => {
    const map = document.getElementById('snackMap');
    const game = new Game(map, rect);
    document.onclick = () => {
      game.start();
    }
  }, [])

  return (
    <div id='snackMap'></div>
  )
}

export default Map;
