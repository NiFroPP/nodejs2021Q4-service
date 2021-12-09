// user schema
const boardSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        order: { type: 'number' },
      },
    },
  },
};

export default {
  // Options for GET all boards
  boardsOpts: {
    schema: {
      response: {
        200: {
          type: 'array',
          items: boardSchema,
        },
      },
    },
  },

  // Options for GET single board
  boardOpts: {
    schema: {
      response: {
        200: boardSchema,
      },
    },
  },

  // Options for POST single board
  postBoardOpts: {
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          columns: { type: 'array' },
        },
      },
      response: {
        201: boardSchema,
      },
    },
  },

  // Options for PUT (update) user
  updateBoardOpts: {
    schema: {
      body: boardSchema,
      response: {
        200: boardSchema,
      },
    },
  },

  // Options for DELETE user
  deleteBoardOpts: {
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
