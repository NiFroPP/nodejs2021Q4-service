import { IBoard, IColumn } from './boards.repository';

const { v4 } = require('uuid');

class Board implements IBoard {
  id: string;

  title: string;

  columns: IColumn[];

  constructor({ id = v4(), title = 'new title', columns = [] }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
