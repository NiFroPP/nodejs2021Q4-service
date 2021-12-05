const Boards = [
  {
    id: '1',
    title: 'board_title_1',
    columns: [
      {
        id: '11',
        title: 'Tasks_1',
        order: [
          {
            id: '111',
            title: 'task_title_3',
            order: '2',
            description: 'This is task_2',
            userId: 'user',
            boardId: '1',
            columnId: '11',
          },
          {
            id: '112',
            title: 'task_title_3',
            order: '2',
            description: 'This is task_2',
            userId: 'user',
            boardId: '1',
            columnId: '11',
          },
        ],
      },
      {
        id: '12',
        title: 'Tasks_2',
        order: [],
      },
    ],
  },
  {
    id: '2',
    title: 'board_title_2',
    columns: [
      {
        id: '21',
        title: 'Tasks_1',
        order: [
          {
            id: '211',
            title: 'task_title_1',
            order: '1',
            description: 'This is task_1',
            userId: 'user',
            boardId: '2',
            columnId: '21',
          },
          {
            id: '212',
            title: 'task_title_3',
            order: '2',
            description: 'This is task_2',
            userId: 'user',
            boardId: '2',
            columnId: '21',
          },
        ],
      },
      {
        id: '22',
        title: 'Tasks_2',
        order: [],
      },
    ],
  },
];

module.exports = Boards;
