/*Создайте функцию, которая создает массив с 10 случайными числами и возвращает произведение 3 самых больших значений*/

const createArray = (size: number = 10, maxValue: number = 100, multiply: number = 3) => {
  let arr = [];
  while (arr.length < size) {
    arr.push(Math.floor(Math.random() * maxValue) + 1);
  }
  arr.sort((a, b) => b - a);
  let resultArray = arr.splice(0, multiply);
  const result = resultArray.reduce((acc, value) => acc * value);
  return result;
};

console.log(createArray(undefined, 50, 2));
console.log(createArray(20));
console.log(createArray(11, undefined, 3));
