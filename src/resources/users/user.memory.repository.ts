export interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

const usersDB: Array<IUser> = [
  {
    id: '1',
    name: 'one',
    login: 'ONE',
    password: '123',
  },
];

const getAll = async (): Promise<IUser[]> => usersDB;

const getById = async (id: string): Promise<IUser> => {
  const user = usersDB.find((u) => u.id === id);
  if (!user) {
    throw new Error(`User "${id}" is not found`);
  }

  return user;
};

const create = async (user: IUser): Promise<number> => usersDB.push(user);

const remove = async (id: string): Promise<void> => {
  const userIndex = usersDB.findIndex((u) => u.id === id);
  usersDB.splice(userIndex, 1);
};

const update = async (
  id: string,
  { name, login, password }: IUser
): Promise<void> => {
  const userIndex = usersDB.findIndex((u) => u.id === id);
  usersDB[userIndex] = { ...usersDB[userIndex], name, login, password };
};

export default {
  getAll,
  getById,
  create,
  remove,
  update,
};
