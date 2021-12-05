const { v4 } = require('uuid');
const boards = require('../Boards');

function returnAllTasksByBoardId(request, reply) {
  const { boardId } = request.params;

  const board = boards.find((b) => b.id === boardId);
  if (!board)
    return reply.code(404).send({ message: `Board '${boardId}' not exist` });

  const allTaskByBoard = board.columns.map((task) => task.order);
  return allTaskByBoard.flat();
}

function getTasks(request, reply) {
  const tasks = returnAllTasksByBoardId(request, reply);

  return reply.send(tasks);
}

function getTask(request, reply) {
  const { taskId } = request.params;

  const tasks = returnAllTasksByBoardId(request, reply);

  const task = tasks.find((t) => t.id === taskId);
  if (!task)
    return reply.code(404).send({ message: `Task '${taskId}' not exist` });

  return reply.send(task);
}

function addTask(request, reply) {
  const { title, order, description, columnId } = request.body;
  const { boardId } = request.params;

  const board = boards.find((b) => b.id === boardId);
  if (!board)
    return reply.code(404).send({ message: `Board '${boardId}' not exist` });

  const column = board.columns.find((c) => c.id === columnId);
  if (!column)
    return reply.code(404).send({ message: `Column '${columnId}' not exist` });

  const newTask = {
    id: v4(),
    title,
    order,
    description,
    userId: 'user',
    boardId,
    columnId,
  };

  column.order.push(newTask);

  return reply.code(201).send(newTask);
}

function updateTask(request, reply) {
  const { title, order, description } = request.body;
  const { boardId, taskId } = request.params;
  const updTask = {
    title,
    order,
    description,
  };

  const tasks = returnAllTasksByBoardId(request, reply);

  const task = tasks.find((t) => t.id === taskId);
  if (!task)
    return reply.code(404).send({ message: `Task '${taskId}' not exist` });

  const board = boards.find((b) => b.id === boardId);
  if (!board)
    return reply.code(404).send({ message: `Board '${boardId}' not exist` });

  const column = board.columns.find((c) => c.id === task.columnId);
  if (!column)
    return reply
      .code(404)
      .send({ message: `Column '${task.columnId}' not exist` });

  // column.order = column.order.map((o) => (o.taskId === taskId ? updTask : o));

  // boards[task.boardId].columns[task.columnId] = {
  //   ...boards[task.boardId].columns[task.columnId],
  //   updTask,
  // };

  return reply.send(updTask);

  // const boardIndex = boards.findIndex((curr) => curr.id === id);
  // if (boardIndex === -1)
  //   return reply.code(404).send({ message: `Board '${id}' not exist` });

  // boards[boardIndex] = { ...boards[boardIndex], title, columns };

  // return reply.send(boards[boardIndex]);
}

function deleteTask(request, reply) {
  const { boardId, taskId } = request.params;

  const tasks = returnAllTasksByBoardId(request, reply);

  const task = tasks.find((t) => t.id === taskId);
  if (!task)
    return reply.code(404).send({ message: `Task '${taskId}' not exist` });

  const board = boards.find((b) => b.id === boardId);
  if (!board)
    return reply.code(404).send({ message: `Board '${boardId}' not exist` });

  const column = board.columns.find((c) => c.columnId === task.columnId);
  if (!column)
    return reply
      .code(404)
      .send({ message: `Column '${task.columnId}' not exist` });

  column.order = column.order.filter((t) => t.taskId !== taskId);

  board.columns = board.columns.map((c) =>
    c.columnId === task.columnId ? { ...c, order: column.order } : c
  );

  return reply.send({ message: `Task '${taskId}' has been removed` });
}

module.exports = { getTasks, getTask, addTask, updateTask, deleteTask };
