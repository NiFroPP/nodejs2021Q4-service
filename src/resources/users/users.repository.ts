import DB from '../../common/dataBase';

export interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

const getAll = async (): Promise<IUser[]> => DB.users;

const getById = async (id: string): Promise<IUser> => {
  const user = DB.users.find((u) => u.id === id);
  if (!user) {
    throw new Error(`User "${id}" is not found`);
  }

  return user;
};

const create = async (user: IUser): Promise<number> => DB.users.push(user);

const remove = async (id: string): Promise<void> => {
  const userIndex = DB.users.findIndex((u) => u.id === id);
  DB.users.splice(userIndex, 1);
};

const update = async (
  id: string,
  { name, login, password }: IUser
): Promise<void> => {
  const userIndex = DB.users.findIndex((u) => u.id === id);
  DB.users[userIndex] = { ...DB.users[userIndex], name, login, password };
};

export default {
  getAll,
  getById,
  create,
  remove,
  update,
};
