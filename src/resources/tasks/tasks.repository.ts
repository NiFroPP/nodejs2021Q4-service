import DB from '../../common/dataBase';

export interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

const getAll = async (): Promise<ITask[]> => DB.tasks;

const getById = async (id: string): Promise<ITask> => {
  const task = DB.tasks.find((t: ITask) => t.id === id);
  if (!task) throw new Error(`Task "${id}" is not found`);

  return task;
};

const create = async (task: ITask): Promise<number> => DB.tasks.push(task);

const remove = async (id: string): Promise<void> => {
  const taskIndex = DB.tasks.findIndex((t: ITask) => t.id === id);

  DB.tasks.splice(taskIndex, 1);
};

const update = async (id: string, task: ITask): Promise<void> => {
  const taskIndex = DB.tasks.findIndex((b: ITask) => b.id === id);
  DB.tasks[taskIndex] = { ...DB.tasks[taskIndex], ...task };
};

const removeFromBoard = async (boardId: string): Promise<void> => {
  const tasksWithBoardsId = DB.tasks.filter(
    (t: ITask) => t.boardId === boardId
  );
  tasksWithBoardsId.forEach((t: ITask) => {
    if (t.id) remove(t.id);
  });
};

const deleteUserIdFromTask = (id: string) => {
  DB.tasks.forEach((task: ITask) => {
    let temp;
    if (task.userId === id) {
      temp = task;
      temp.userId = null;
    }
  });
};
export default {
  getAll,
  getById,
  create,
  remove,
  update,
  removeFromBoard,
  deleteUserIdFromTask,
};
