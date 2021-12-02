const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} = require('../controllers/boards.controller');

// user schema
const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { type: 'array' },
  },
};

// Options for GET all boards
const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  },
  handler: getBoards,
};

// Options for GET single board
const getBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: getBoard,
};

// Options for POST single board
const postBoardOpts = {
  schema: {
    // body: {
    //   type: 'object',
    //   required: ['name', 'login', 'password'],
    //   properties: {
    //     name: { type: 'string' },
    //     login: { type: 'string' },
    //     password: { type: 'string' },
    //   },
    // },
    response: {
      201: Board,
    },
  },
  handler: addBoard,
};

// Options for PUT (update) user
const updateBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: updateBoard,
};

// Options for DELETE user
const deleteBoardOpts = {
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
  handler: deleteBoard,
};

const boardsRoutes = async (fastify, options, done) => {
  // GET all boards
  await fastify.get('/boards', getBoardsOpts);

  // GET board by id
  await fastify.get('/boards/:id', getBoardOpts);

  // Create new board
  await fastify.post('/boards', postBoardOpts);

  // Update board
  await fastify.put('/boards/:id', updateBoardOpts);

  // Delete board
  await fastify.delete('/boards/:id', deleteBoardOpts);

  done();
};

module.exports = boardsRoutes;
