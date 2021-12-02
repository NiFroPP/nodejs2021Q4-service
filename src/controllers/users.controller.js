const { v4 } = require('uuid');
let users = require('../Users');

const getUsers = (request, reply) => reply.send(users);

const getUser = (request, reply) => {
  const { id } = request.params;

  const user = users.find((elem) => elem.id === id);

  if (!user) reply.code(404).send({ message: `User '${id}' not exist` });

  reply.send(user);
};

const addUser = (request, reply) => {
  const { name, login, password } = request.body;

  const user = {
    id: v4(),
    name,
    login,
    password,
  };

  users = [...users, user];

  reply.code(201).send(user);
};

const deleteUser = (request, reply) => {
  const { id } = request.params;

  users = users.filter((elem) => elem.id !== id);

  reply.send({ message: `User ${id} has been removed` });
};

const updateUser = (request, reply) => {
  const { id } = request.params;
  const { name, login, password } = request.body;

  users = users.map((elem) =>
    elem.id === id ? { id, name, login, password } : elem
  );

  const user = users.find((elem) => elem.id === id);

  reply.send(user);
};

module.exports = { getUsers, getUser, addUser, deleteUser, updateUser };
