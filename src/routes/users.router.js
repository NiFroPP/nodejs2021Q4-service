const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} = require('../controllers/users.controller');

// user schema
const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const UserWithPass = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

// Options for GET all users
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: UserWithPass,
      },
    },
  },
  handler: getUsers,
};

// Options for GET user
const getUserOpts = {
  schema: {
    response: {
      200: UserWithPass,
    },
  },
  handler: getUser,
};

// Options for POST user
const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: UserWithPass,
    },
  },
  handler: addUser,
};

// Options for DELETE user
const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteUser,
};

// Options for PUT (update) user
const updateUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUser,
};

const usersRoutes = async (fastify, options, done) => {
  // GET all users
  await fastify.get('/users', getUsersOpts);

  // GET single user
  await fastify.get('/users/:id', getUserOpts);

  // Add new user
  await fastify.post('/users', postUserOpts);

  // Delete single user
  await fastify.delete('/users/:id', deleteUserOpts);

  // Update single user
  await fastify.put('/users/:id', updateUserOpts);

  done();
};

module.exports = usersRoutes;
