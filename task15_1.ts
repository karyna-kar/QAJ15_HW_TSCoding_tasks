// 1. Для оплаты корпоративного инструмента нам нужно узнать сколько у нас пользователей с разными ролями, т.к.разные роли нуждаются в разных видах подписки
// На входе у нас.json файл с данными пользователей содержащий свойства: id, username, role
// На выходе нам нужен объект вида:
// {
//     role_1: {
//         count: 5,
//         users: [{ id, username }, { id, username }, ...]
//     },
//     role_1: {
//         count: 20,
//         users: [{ id, username }, { id, username }, ...]
//     },
//     ...
// }

import { readFileSync } from 'fs';

const users: User[] = JSON.parse(readFileSync('users.json', 'utf8'));

type User = {
  id: number;
  username: string;
  role: string;
};

type Result = {
  [role: string]: {
    count: number;
    users: Omit<User, 'role'>[];
    //users: Pick<User, 'id' | 'username'>[];
  };
};

const groupUsers = (originalUsers: User[]) => {
  const result: Result = {};
  for (const user of originalUsers) {
    const userData = { id: user.id, username: user.username };
    if (result[user.role]) {
      result[user.role].count++;
      result[user.role].users.push(userData);
    } else {
      result[user.role] = { count: 1, users: [userData] };
    }
  }
  return result;
};

console.dir(groupUsers(users), { depth: 3 });
