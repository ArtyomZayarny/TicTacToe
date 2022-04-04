import { useCallback, useEffect } from 'react';
import { Cell } from '../Cell/Cell';
import { useState } from 'react';
import { ICell } from '../interfaces';
import {
  checkWin,
  getPlayerCellsArr,
  getTargetCellsIds,
  isEmptyCell,
  opositPlayer,
  winCombination,
} from '../rules';
import { changeBoard } from './helper';
import { getCellId } from '../Cell/helper';
import {
  getAvailableCellsArray,
  getInitBoardArray,
  clearBoard,
} from '../helper';

export interface BoardProps {
  switchCurrentMove: () => void;
  curentPlayer: string;
  setCurrentPlayer: (str: string) => void;
  setStartGame: (n: boolean) => void;
  startGame: boolean;
  setUserPlay: (s: string) => void;
}

export const Board: React.FC<BoardProps> = ({
  curentPlayer,
  switchCurrentMove,
  setCurrentPlayer,
  setStartGame,
  startGame,
  setUserPlay,
}) => {
  const [game, setGame] = useState({
    disableBoard: true,
    board: getInitBoardArray,
    computerRound: false,
  });
  const [isWin, setWin] = useState(false);
  const setMove = (event: React.MouseEvent) => {
    const cellId = getCellId(event);
    const newBoard = changeBoard(game.board, curentPlayer, cellId);
    if (curentPlayer && checkWin(curentPlayer, newBoard)) {
      setGame({
        ...game,
        board: newBoard,
        disableBoard: true,
      });
      setWin(true);
    } else {
      setGame({
        ...game,
        board: newBoard,
        disableBoard: true,
        computerRound: true,
      });

      switchCurrentMove();
    }
  };

  const setComputerMove = useCallback(
    (cellId: number) => {
      const newBoard = changeBoard(game.board, curentPlayer, cellId);
      if (curentPlayer && checkWin(curentPlayer, newBoard)) {
        setGame({
          ...game,
          board: newBoard,
          disableBoard: true,
        });
        setWin(true);
      } else {
        setGame({
          ...game,
          board: newBoard,
          disableBoard: false,
          computerRound: false,
        });
        switchCurrentMove();
      }
    },
    [game.board, curentPlayer]
  );

  const getDangerCellForComputer = (board: any, curentPlayer: any) => {
    //Check danger zone (prevent to win)
    const PlayerFullCellsArr = getPlayerCellsArr(
      board,
      opositPlayer(curentPlayer)
    );
    const targetCellsIds = getTargetCellsIds(
      winCombination,
      PlayerFullCellsArr
    );
    //Find empty cell id
    const filterTargetCellIdsrArr = targetCellsIds.filter((cell: any) =>
      isEmptyCell([...board], cell)
    );
    return filterTargetCellIdsrArr.length >= 1 && filterTargetCellIdsrArr[0];
  };
  const computerMove = useCallback(
    (board: any) => {
      let cellId;
      const availableCell = getAvailableCellsArray(board);
      //Anylize current board
      //TODO : check is possible Win combination for computer func possibleWin
      const computerFullCellsArr = getPlayerCellsArr(board, curentPlayer);
      const targetCellsIds = getTargetCellsIds(
        winCombination,
        computerFullCellsArr
      );
      const filterTargetCellIdsrArr = targetCellsIds.filter((cell: any) =>
        isEmptyCell([...board], cell)
      );
      //Winner cell
      const cellToWin =
        filterTargetCellIdsrArr.length >= 1 && filterTargetCellIdsrArr[0];

      //Check danger zone form computer (prevent player to wein)
      const dangerCellForComputer = getDangerCellForComputer(
        [...board],
        curentPlayer
      );

      if (cellToWin) {
        cellId = cellToWin;
      } else {
        if (dangerCellForComputer) {
          cellId = dangerCellForComputer;
        }
        if (!cellId && !dangerCellForComputer) {
          const randomIndex = Math.floor(Math.random() * availableCell.length);
          cellId = availableCell[randomIndex];
        }
      }
      setComputerMove(cellId);
    },
    [setComputerMove]
  );
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isWin) {
      window.alert(`${curentPlayer} is win`);
      setCurrentPlayer('');
      setGame({ ...game, board: clearBoard(game.board) });
      setStartGame(false);
      setUserPlay('');
      setWin(false);
    } else {
      if (getAvailableCellsArray(game.board).length === 0) {
        window.alert('DRAW');
        setCurrentPlayer('');
        setGame({ ...game, board: clearBoard(game.board) });
        setStartGame(false);
        setCurrentPlayer('');
        setUserPlay('');
      } else {
        //unblock board after player was choosen
        if (startGame && !game.computerRound) {
          setGame({ ...game, disableBoard: false });
          setStartGame(true);
        }

        if (game.computerRound) {
          timer = setTimeout(() => {
            computerMove(game.board);
          }, 1000);
        }
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [curentPlayer, startGame, game.computerRound, game.board]);

  return (
    <>
      <div className={`board ${game.disableBoard ? 'disabled' : ''}`}>
        {game.board.map((cell: ICell, index: string) => (
          <Cell state={cell.status} id={index + 1} setMove={setMove} />
        ))}
      </div>
    </>
  );
};
