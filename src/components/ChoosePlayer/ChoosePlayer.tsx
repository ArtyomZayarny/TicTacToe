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
      <div className="radio">
        <label>
          <input
            disabled={Boolean(userPlay)}
            type="radio"
            value="zero"
            checked={userPlay === 'zero'}
            onChange={() => setUserPlay('zero')}
          />
          Zero
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            disabled={Boolean(userPlay)}
            type="radio"
            value="christ"
            checked={userPlay === 'christ'}
            onChange={() => setUserPlay('christ')}
          />
          Christ
        </label>
      </div>
    </form>
  );
};
