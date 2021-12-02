const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: { title: 'fastify-api' },
  },
});

fastify.register(require('./routes/users.router'));

const { PORT } = require('./common/config');

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
