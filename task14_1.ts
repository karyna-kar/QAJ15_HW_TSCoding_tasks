/*Создайте функцию, которая будет принимать в себя массив значений и возвращать только те, в которых заданное(второй параметр, по умолчанию - 4) количество букв*/

const filterArray = (inputArray: string[], letters: number = 4) => {
  const result = inputArray.filter(value => (value.match(/\p{L}/gu) || []).length === letters);
  if (result.length === 0) {
    throw new Error('No matches found');
  }
  return result;
};

const input = ['test123', 'example', 'dog', 'x', 'mama'];
console.log(filterArray(input, 5));
