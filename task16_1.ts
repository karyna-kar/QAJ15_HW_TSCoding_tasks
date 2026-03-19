// 1. Наши пользователи ранее могли в качестве имени (username) выбрать как произвольное имя так и емейл. Теперь мы хотим убрать возможность использовать просто имя. Чтобы обработать существубщие данные, создайте функцию, которая будет принимать на вход .json файл с данными пользователей (username, name, last_name, email) и возвращать массив заготовленных сообщений для коммуникации с юзерами. На выходе должен быть объект с данными только по юзерам у которых username не является емейлом. Ожидаемый объект на выходе:
// {
//     username_1: {
//         email: 'email_1',
//         message: 'Hello {name} {last_name}, please update your username "{username_1}" to be a valid email to comply with our new policy.'
//     },
//     username_2: {
//         email: 'email_2',
//         message: 'Hello {name} {last_name}, please update your username "{username_2}" to be a valid email to comply with our new policy.'
//     },
//      ...
// }

import { readFileSync } from 'fs';

const users: User[] = JSON.parse(readFileSync('usersForUpdate.json', 'utf8'));

type User = {
  username: string;
  name: string;
  last_name: string;
  email: string;
};

type Result = {
  [username: string]: {
    email: string;
    message: string;
  };
};

const prepareMessages = (users: User[]) => {
  const result: Result = {};
  for (const user of users) {
    if (user.username !== user.email) {
      const fullName = user.last_name ? user.name + ' ' + user.last_name : user.name;
      const preparedMessage = `Hello ${fullName}, please update your username "${user.username}" to be a valid email to comply with our new policy.`;
      result[user.username] = { email: user.email, message: preparedMessage };
    }
  }
  return result;
};

console.log(prepareMessages(users));
