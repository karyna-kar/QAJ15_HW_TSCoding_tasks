/*Создайте функцию, которая создает массив с 10 случайными числами и возвращает произведение 3 самых больших значений*/

const createArray = () => {
  let arr = [];
  while (arr.length < 10){
    arr.push(Math.floor(Math.random() * 100));
  }
  arr.sort((a, b) => b - a);
  const result = arr[0] * arr[1] * arr[2];
  return result;
}

console.log(createArray());