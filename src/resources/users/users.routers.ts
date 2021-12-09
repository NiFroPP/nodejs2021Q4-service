import { FastifyInstance, FastifyServerOptions } from 'fastify';
import opts from './users.schemas';
import userService from './users.services';

interface IParams {
  userId: string;
}

interface IBody {
  name: string;
  login: string;
  password: string;
}

const usersRoutes = (
  fastify: FastifyInstance,
  options: FastifyServerOptions,
  done: () => void
) => {
  // GET all users
  fastify.get('/users', opts.users, async (request, reply) => {
    const users = await userService.getAllUsers();
    reply.send(users);
  });

  // GET single user
  fastify.get<{ Params: IParams }>(
    '/users/:userId',
    opts.user,
    async (request, reply) => {
      const { userId } = request.params;

      const user = await userService.getUserById(userId);

      if (!user)
        return reply.code(404).send({ message: `User '${userId}' not exist` });

      return reply.send(user);
    }
  );

  // Add new user
  fastify.post<{ Body: IBody }>(
    '/users',
    opts.postUser,
    async (request, reply) => {
      const newUser = await userService.createUser(request.body);

      reply.code(201).send(newUser);
    }
  );

  // Delete single user
  fastify.delete<{ Params: IParams }>(
    '/users/:userId',
    opts.deleteUser,
    async (request, reply) => {
      const { userId } = request.params;

      await userService.deleteUser(userId);

      reply.send({ message: `User '${userId}' has been removed` });
    }
  );

  // Update single user
  fastify.put<{ Body: IBody; Params: IParams }>(
    '/users/:userId',
    opts.updateUser,
    async (request, reply) => {
      const { userId } = request.params;

      await userService.updateUser(userId, request.body);

      const user = await userService.getUserById(userId);

      if (!user)
        return reply.code(404).send({ message: `User '${userId}' not exist` });

      return reply.send(user);
    }
  );

  done();
};

export default usersRoutes;
