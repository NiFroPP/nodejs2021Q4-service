import { FastifyInstance, FastifyServerOptions } from 'fastify';
import opts from './boards.schemas';
import boardService from './boards.services';
import { IColumn } from './boards.repository';

interface IParams {
  boardId: string;
}

interface IBody {
  title: string;
  columns: IColumn[];
}

const boardsRoutes = (
  fastify: FastifyInstance,
  options: FastifyServerOptions,
  done: () => void
) => {
  // GET all boards
  fastify.get('/boards', opts.boardsOpts, async (request, reply) => {
    const boards = await boardService.getAllBoards();
    reply.send(boards);
  });

  // GET single board
  fastify.get<{ Params: IParams }>(
    '/boards/:boardId',
    opts.boardOpts,
    async (request, reply) => {
      const { boardId } = request.params;

      const board = await boardService.getBoardById(boardId);

      if (!board)
        return reply
          .code(404)
          .send({ message: `Board '${boardId}' not exist` });

      return reply.send(board);
    }
  );

  // Add new board
  fastify.post<{ Body: IBody }>(
    '/boards',
    opts.postBoardOpts,
    async (request, reply) => {
      const newBoard = await boardService.createBoard(request.body);

      reply.code(201).send(newBoard);
    }
  );

  // Delete board
  fastify.delete<{ Params: IParams }>(
    '/boards/:boardId',
    opts.deleteBoardOpts,
    async (request, reply) => {
      const { boardId } = request.params;

      await boardService.deleteBoard(boardId);

      reply.send({ message: `Board '${boardId}' has been removed` });
    }
  );

  // Update board
  fastify.put<{ Body: IBody; Params: IParams }>(
    '/boards/:boardId',
    opts.updateBoardOpts,
    async (request, reply) => {
      const { boardId } = request.params;

      await boardService.updateBoard(boardId, request.body);

      const board = await boardService.getBoardById(boardId);

      if (!board)
        return reply
          .code(404)
          .send({ message: `Board '${boardId}' not exist` });

      return reply.send(board);
    }
  );

  done();
};

export default boardsRoutes;
