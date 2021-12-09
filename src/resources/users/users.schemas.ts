// user schema
const UserSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const UserSchemaWithoutPass = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

// Options for GET all users
const users = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: UserSchemaWithoutPass,
      },
    },
  },
};

// Options for GET user
const user = {
  schema: {
    response: {
      200: UserSchemaWithoutPass,
    },
  },
};

// Options for POST user
const postUser = {
  schema: {
    body: {
      type: 'object',
      // required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: UserSchemaWithoutPass,
    },
  },
};

// Options for DELETE user
const deleteUser = {
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
};

// Options for PUT (update) user
const updateUser = {
  schema: {
    response: {
      200: UserSchema,
    },
  },
};

export default {
  users,
  user,
  postUser,
  deleteUser,
  updateUser,
};
