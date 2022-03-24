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
