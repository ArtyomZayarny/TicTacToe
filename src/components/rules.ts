import { ICell } from './interfaces';

export const winCombination: any = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const dangerZone: any = [
  /*
    [1, 2, 3], [1,2] [2,3] [1,3]
    [4, 5, 6], [4,5] [5,6] [4,6]
    [7, 8, 9], [7,8] [8,9] [7,9]
    [1, 4, 7], [1,4] [4,7] [1,7]
    [2, 5, 8], [2,5] [5,8] [2,8]
    [3, 6, 9], [3,6] [6,9] [3,9]
    [1, 5, 9], [1,5] [5,9] [1,9]
    [3, 5, 7], [3,5] [5,7] [3,7]
  */
];
const isMatch = (winArr: any, currenArr: any) => {
  let resultArr: any = [];
  winArr.filter((arr: any) => {
    const res = currenArr.reverse().filter((c: any) => arr.includes(c));
    if (res.length === 3) {
      resultArr = res;
    }
  });
  const alignArr = resultArr.reverse();

  return alignArr;
};

export const checkWin = (player: string, board: any) => {
  const currentCombination = board
    .filter((combine: any) => combine.status === player)
    .reduce((acc: any, a: any, i: number) => {
      acc.push(a.id);
      return acc;
    }, []);
  return isMatch(winCombination, currentCombination).length === 3;
};

export const opositPlayer = (name: string) =>
  name === 'zero' ? 'christ' : 'zero';

export const getPlayerCellsArr = (board: any, curentPlayer: any) => {
  return board.reduce((a: any, v: ICell) => {
    if (v.status === curentPlayer) {
      a.push(v.id);
    }
    return a;
  }, []);
};

export const isEmptyCell = (board: any, cellId: number) => {
  return board.find((cell: any) => cell.id === cellId && !cell.status);
};
export const getTargetCellsIds = (WinComArr: any, playerBoard: any) => {
  return WinComArr.reduce((result: any, wComArr: any) => {
    const dangerComArr = wComArr.filter((wComNumber: any) => {
      return playerBoard.includes(wComNumber);
    });
    if (dangerComArr.length === 2) {
      const posibleargetId = wComArr.reduce((res: any, item: any) => {
        if (!dangerComArr.includes(item)) {
          res.push(item);
        }
        return res;
      }, []);
      result.push(...posibleargetId);
    }
    return result;
  }, []);
};
