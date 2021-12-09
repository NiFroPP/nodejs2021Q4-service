import { IUser } from '../resources/users/users.repository';
import { IBoard } from '../resources/boards/boards.repository';

export default {
  users: [
    {
      id: '1',
      name: 'user',
      login: 'USER',
      password: '123',
    },
  ] as Array<IUser>,
  boards: [
    {
      id: '1',
      title: 'board_title_1',
      columns: [
        {
          id: '1',
          title: 'column_title_1',
          order: 1,
        },
      ],
    },
  ] as Array<IBoard>,
};
