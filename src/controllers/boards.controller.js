const { v4 } = require('uuid');
let boards = require('../Boards');

const getBoards = (request, reply) => reply.send(boards);

const getBoard = (request, reply) => {
  const { id } = request.params;

  const board = boards.find((b) => b.id === id);

  if (!board) reply.code(404).send({ message: `Board '${id}' not exist` });

  reply.send(board);
};

const addBoard = (request, reply) => {
  const { title, columns } = request.body;

  const board = {
    id: v4(),
    title,
    columns,
  };

  boards = [...boards, board];

  reply.code(201).send(board);
};

const updateBoard = (request, reply) => {
  const { id } = request.params;
  const { title, columns } = request.body;

  boards = boards.map((elem) =>
    elem.id === id ? { id, title, columns } : elem
  );

  const board = boards.find((elem) => elem.id === id);

  reply.send(board);
};

const deleteBoard = (request, reply) => {
  const { id } = request.params;

  boards = boards.filter((elem) => elem.id !== id);

  reply.send({ message: `User '${id}' has been removed` });
};

module.exports = { getBoards, getBoard, addBoard, updateBoard, deleteBoard };
