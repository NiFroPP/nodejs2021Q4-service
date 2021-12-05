const {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

// task schema
const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: 'string' }, // assignee
    boardId: { type: 'string' },
    columnId: { type: 'string' },
  },
};

// Options for GET all tasks
const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Task,
      },
    },
  },
  handler: getTasks,
};

// Options for GET single task
const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

// Options for POST single task
const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'description', 'columnId'],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        columnId: { type: 'string' },
      },
    },
    response: {
      201: Task,
    },
  },
  handler: addTask,
};

// Options for PUT (update) task
const updateTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: updateTask,
};

// Options for DELETE task
const deleteTaskOpts = {
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
  handler: deleteTask,
};

const tasksRoutes = async (fastify, options, done) => {
  // GET all tasks
  await fastify.get('/boards/:boardId/tasks', getTasksOpts);

  // GET task by id
  await fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  // Create new task
  await fastify.post('/boards/:boardId/tasks', postTaskOpts);

  // Update task
  await fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  // Delete task
  await fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  done();
};

module.exports = tasksRoutes;
