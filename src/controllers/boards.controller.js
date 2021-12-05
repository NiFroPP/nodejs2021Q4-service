const { v4 } = require('uuid');
const boards = require('../Boards');

const getBoards = (request, reply) => reply.send(boards);

function getBoard(request, reply) {
  const { id } = request.params;

  const board = boards.find((b) => b.id === id);

  if (!board)
    return reply.code(404).send({ message: `Board '${id}' not exist` });

  return reply.send(board);
}

function addBoard(request, reply) {
  const { title, columns } = request.body;

  const board = {
    id: v4(),
    title,
    columns,
  };

  boards.push(board);

  return reply.code(201).send(board);
}

function updateBoard(request, reply) {
  const { id } = request.params;
  const { title, columns } = request.body;

  const boardIndex = boards.findIndex((curr) => curr.id === id);
  if (boardIndex === -1)
    return reply.code(404).send({ message: `Board '${id}' not exist` });

  boards[boardIndex] = { ...boards[boardIndex], title, columns };

  return reply.send(boards[boardIndex]);
}

function deleteBoard(request, reply) {
  const { id } = request.params;

  const boardIndex = boards.findIndex((b) => b.id === id);
  if (boardIndex === -1)
    return reply.code(404).send({ message: `Board '${id}' not exist` });

  boards.splice(boardIndex, 1);

  return reply.send({ message: `User '${id}' has been removed` });
}

module.exports = { getBoards, getBoard, addBoard, updateBoard, deleteBoard };
