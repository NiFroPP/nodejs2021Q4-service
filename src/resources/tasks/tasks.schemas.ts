// task schema
const TaskSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] },
  },
};

export default {
  // Options for GET all tasks
  tasksOpts: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: TaskSchema,
        },
      },
    },
  },

  // Options for GET single task
  taskOpts: {
    schema: {
      response: {
        200: TaskSchema,
      },
    },
  },

  // Options for POST single task
  postTaskOpts: {
    schema: {
      body: TaskSchema,
      response: {
        201: TaskSchema,
      },
    },
  },

  // Options for PUT (update) task
  updateTaskOpts: {
    schema: {
      body: TaskSchema,
      response: {
        200: TaskSchema,
      },
    },
  },

  // Options for DELETE task
  deleteTaskOpts: {
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
  },
};
