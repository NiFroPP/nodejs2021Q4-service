import boardRepo, { IBoard } from './boards.repository';
import Board from './boards.model';

const getAllBoards = () => boardRepo.getAll();

const getBoardById = (boardId: string) => boardRepo.getById(boardId);

const createBoard = ({ title, columns }: IBoard) => {
  const newBoard = new Board({ title, columns });

  boardRepo.create(newBoard);

  return newBoard;
};

const deleteBoard = (boardId: string) => boardRepo.remove(boardId);

const updateBoard = (boardId: string, board: IBoard) =>
  boardRepo.update(boardId, board);

export = { getAllBoards, getBoardById, createBoard, deleteBoard, updateBoard };
