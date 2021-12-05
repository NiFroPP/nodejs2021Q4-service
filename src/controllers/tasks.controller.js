const { v4 } = require('uuid');
const boards = require('../Boards');

const returnAllTasksByBoardId = (request, reply) => {
  const { boardId } = request.params;

  console.log(boards);

  const board = boards.find((b) => b.id === boardId);
  if (!board)
    return reply.code(404).send({ message: `Board '${boardId}' not exist` });

  return board.columns.map((task) => task.order);
};

const returnTaskById = (request, reply) => {
  const { taskId } = request.params;

  const tasks = returnAllTasksByBoardId(request, reply);

  const task = tasks.flat().find((t) => t.taskId === taskId);
  if (!task)
    return reply.code(404).send({ message: `Task '${taskId}' not exist` });

  return task;
};

const getTasks = (request, reply) => {
  const tasks = returnAllTasksByBoardId(request, reply);

  return reply.send(tasks.flat());
};

const getTask = (request, reply) => {
  const task = returnTaskById(request, reply);

  return reply.send(task);
};

const addTask = (request, reply) => {
  const { title, columns, order, description, userId, columnId } = request.body;
  const { boardId } = request.params;

  const board = boards.find((b) => b.id === boardId);
  if (!board) reply.code(404).send({ message: `Board '${boardId}' not exist` });

  const column = board.columns.find((c) => c.columnId === columnId);
  if (!column)
    reply.code(404).send({ message: `Column '${columnId}' not exist` });

  const newTask = {
    id: v4(),
    title,
    columns,
    order,
    description,
    userId,
    boardId,
    columnId,
  };

  column.order.push(newTask);

  reply.code(201).send(newTask);
};

const updateTask = (request, reply) => {
  const { title, order, description, userId, columnId } = request.body;
  const { boardId, taskId } = request.params;
  const newTask = {
    id: taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  };

  const board = boards.find((b) => b.id === boardId);
  if (!board) reply.code(404).send({ message: `Board '${boardId}' not exist` });

  const column = board.columns.find((c) => c.columnId === columnId);
  if (!column)
    reply.code(404).send({ message: `Column '${columnId}' not exist` });

  column.order = column.order.map((o) => (o.taskId === taskId ? newTask : o));

  board.columns = board.columns.map((c) =>
    c.columnId === columnId ? { ...c, order: column.order } : c
  );

  return reply.send(newTask);
};

const deleteTask = (request, reply) => {
  const { boardId, taskId } = request.params;

  const task = returnTaskById(request, reply);

  const board = boards.find((b) => b.id === boardId);
  if (!board) reply.code(404).send({ message: `Board '${boardId}' not exist` });

  const column = board.columns.find((c) => c.columnId === task.columnId);
  if (!column)
    reply.code(404).send({ message: `Column '${task.columnId}' not exist` });

  column.order = column.order.filter((t) => t.taskId !== taskId);

  board.columns = board.columns.map((c) =>
    c.columnId === task.columnId ? { ...c, order: column.order } : c
  );

  reply.send({ message: `Task '${taskId}' has been removed` });
};

module.exports = { getTasks, getTask, addTask, updateTask, deleteTask };
