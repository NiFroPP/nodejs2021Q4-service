import tasksRepo, { ITask } from './tasks.repository';
import Task from './tasks.model';

const getAllTasks = () => tasksRepo.getAll();

const getTaskById = (taskId: string) => tasksRepo.getById(taskId);

const createTask = (id: string, task: ITask) => {
  const { title, order, description, userId, columnId } = task;
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId: id,
    columnId,
  });

  tasksRepo.create(newTask);

  return newTask;
};

const deleteTask = (taskId: string) => tasksRepo.remove(taskId);

const updateTask = (taskId: string, task: ITask) =>
  tasksRepo.update(taskId, task);

const deleteTaskFromBoard = (boardId: string) =>
  tasksRepo.removeFromBoard(boardId);

const deleteUserIdFromTask = (userId: string) =>
  tasksRepo.deleteUserIdFromTask(userId);

export = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
  deleteTaskFromBoard,
  deleteUserIdFromTask,
};
