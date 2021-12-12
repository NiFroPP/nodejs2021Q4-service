import { FastifyInstance, FastifyServerOptions } from 'fastify';
import opts from './tasks.schemas';
import taskService from './tasks.services';

interface IParams {
  boardId: string;
  taskId: string;
}

interface IBody {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

const tasksRoutes = (
  fastify: FastifyInstance,
  options: FastifyServerOptions,
  done: () => void
) => {
  // GET all tasks
  fastify.get(
    '/boards/:boardId/tasks',
    opts.tasksOpts,
    async (request, reply) => {
      const tasks = await taskService.getAllTasks();
      reply.send(tasks);
    }
  );

  // GET single task
  fastify.get<{ Params: IParams }>(
    '/boards/:boardId/tasks/:taskId',
    opts.taskOpts,
    async (request, reply) => {
      const { taskId } = request.params;

      try {
        const task = await taskService.getTaskById(taskId);
        return reply.send(task);
      } catch (e) {
        return reply.code(404).send({ message: `Task '${taskId}' not exist` });
      }
    }
  );

  // Add new task
  fastify.post<{ Body: IBody; Params: IParams }>(
    '/boards/:boardId/tasks',
    opts.postTaskOpts,
    async (request, reply) => {
      const { boardId } = request.params;

      const newtask = await taskService.createTask(boardId, request.body);

      reply.code(201).send(newtask);
    }
  );

  // Delete task
  fastify.delete<{ Params: IParams }>(
    '/boards/:boardId/tasks/:taskId',
    opts.deleteTaskOpts,
    async (request, reply) => {
      const { taskId } = request.params;
      try {
        await taskService.deleteTask(taskId);
        reply.send({ message: `Task '${taskId}' has been removed` });
      } catch (e) {
        reply.status(404).send();
      }
    }
  );

  // Update task
  fastify.put<{ Body: IBody; Params: IParams }>(
    '/boards/:boardId/tasks/:taskId',
    opts.updateTaskOpts,
    async (request, reply) => {
      const { taskId } = request.params;

      await taskService.updateTask(taskId, request.body);

      const task = await taskService.getTaskById(taskId);

      if (!task)
        return reply.code(404).send({ message: `Task '${taskId}' not exist` });

      return reply.send(task);
    }
  );

  done();
};

export default tasksRoutes;
