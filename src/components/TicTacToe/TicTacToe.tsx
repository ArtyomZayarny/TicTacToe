import { useEffect, useState } from 'react';
import { Board } from '../Board/Board';
import { ChoosePlayer } from '../ChoosePlayer/ChoosePlayer';

export const TicTacToe = () => {
  const [curentPlayer, setCurrentPlayer] = useState<any>(null);
  const [startGame, setStartGame] = useState(false);
  const [userPlay, setUserPlay] = useState('');
  const switchCurrentMove = () => {
    return curentPlayer === 'zero'
      ? setCurrentPlayer('christ')
      : setCurrentPlayer('zero');
  };
  useEffect(() => {
    if (!startGame && userPlay) {
      setStartGame(true);
      setCurrentPlayer(userPlay);
      setUserPlay(userPlay);
    }
  }, [userPlay]);
  return (
    <>
      <ChoosePlayer
        curentPlayer={curentPlayer}
        choosePlayer={setCurrentPlayer}
        startGame={startGame}
        userPlay={userPlay}
        setUserPlay={setUserPlay}
      />
      <Board
        startGame={startGame}
        setStartGame={setStartGame}
        switchCurrentMove={switchCurrentMove}
        curentPlayer={curentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setUserPlay={setUserPlay}
      />
    </>
  );
};
