import { fastify, FastifyInstance } from 'fastify';
import config from './common/config';

import userRouter from './resources/users/user.router';

const server: FastifyInstance = fastify({
  logger: true,
});

server.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: { title: 'fastify-api' },
  },
});

server.register(userRouter);

server.listen(config.PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
