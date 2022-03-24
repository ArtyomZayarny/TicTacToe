import { ICell } from '../interfaces';

export const changeBoard = (board: [ICell], curentPlayer: any, id: number) => {
  const resultBoard = board.map((item: ICell) => {
    if (item.id === id) {
      item.status = curentPlayer;
    }
    return item;
  });
  return resultBoard;
};
