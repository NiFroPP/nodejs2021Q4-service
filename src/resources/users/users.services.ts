import usersRepo, { IUser } from './users.repository';
import User from './users.model';

const getAllUsers = () => usersRepo.getAll();

const getUserById = (userId: string) => usersRepo.getById(userId);

const createUser = ({ login, name, password }: IUser) => {
  const newUser = new User({ login, name, password });

  usersRepo.create(newUser);

  return newUser;
};

const deleteUser = (userId: string) => usersRepo.remove(userId);

const updateUser = (userId: string, user: IUser) =>
  usersRepo.update(userId, user);

export = { getAllUsers, getUserById, createUser, deleteUser, updateUser };
