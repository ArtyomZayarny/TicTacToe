import { useState } from 'react';

interface ChoosePlayerProps {
  curentPlayer: null | string;
  choosePlayer: (name: string) => void;
  startGame: boolean;
  userPlay: string;
  setUserPlay: (str: string) => void;
}
export const ChoosePlayer: React.FC<ChoosePlayerProps> = ({
  curentPlayer,
  choosePlayer,
  startGame,
  userPlay,
  setUserPlay,
}) => {
  return (
    <form>
      <label className="container">
        Zero
        <input
          disabled={Boolean(userPlay)}
          type="radio"
          value="christ"
          checked={userPlay === 'zero'}
          onChange={() => setUserPlay('zero')}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Christ
        <input
          disabled={Boolean(userPlay)}
          type="radio"
          value="christ"
          checked={userPlay === 'christ'}
          onChange={() => setUserPlay('christ')}
        />
        <span className="checkmark"></span>
      </label>
    </form>
  );
};
