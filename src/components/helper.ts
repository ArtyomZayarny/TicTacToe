import { ICell } from './interfaces';

export const getInitBoardArray = new Array(9).fill(null).reduce((a, v, i) => {
  a.push({ id: i + 1, status: '' });
  return a;
}, []);

export const getAvailableCellsArray = (board: any) => {
  return board
    .filter((cell: ICell) => cell.status === '')
    .reduce((arr: any, item: any) => {
      arr.push(item.id);
      return arr;
    }, []);
};

export const clearBoard = (board: any) =>
  board.map((item: ICell) => {
    return { ...item, status: '' };
  });
