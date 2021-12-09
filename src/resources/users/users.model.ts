import { IUser } from './users.repository';

const { v4 } = require('uuid');

class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

export default User;
