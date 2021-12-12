import DB from '../../common/dataBase';

export interface IColumn {
  id?: string;
  title: string;
  order: number;
}

export interface IBoard {
  id?: string;
  title: string;
  columns: IColumn[];
}

const getAll = async (): Promise<IBoard[]> => DB.boards;

const getById = async (id: string): Promise<IBoard> => {
  const board = DB.boards.find((b) => b.id === id);
  if (!board) {
    throw new Error(`Board "${id}" is not found`);
  }

  return board;
};

const create = async (board: IBoard): Promise<number> => DB.boards.push(board);

const remove = async (id: string): Promise<void> => {
  const boardIndex = DB.boards.findIndex((b) => b.id === id);
  if (boardIndex === -1) throw new Error(`Board "${id}" is not found`);

  DB.boards.splice(boardIndex, 1);
};

const update = async (
  id: string,
  { title, columns }: IBoard
): Promise<void> => {
  const boardIndex = DB.boards.findIndex((b) => b.id === id);
  DB.boards[boardIndex] = { ...DB.boards[boardIndex], title, columns };
};

export default { getAll, getById, create, remove, update };
