/*3. Создать функцию которая будет принимать входящее значение и добавлять к нему слово "супер"*/

const addText = (input?: string) => {
  if(!input){
  return 'Суперкотик';
}
  const regex = /^[A-Za-zА-Яа-яЁё]+$/;
  if (!regex.test(input))
  {
    throw new Error('Разрешены только латинские или кириллические буквы');
  }
  return 'Супер '+ input;
};

console.log(addText('Karina'));
console.log(addText('Карина'));
console.log(addText(''));
console.log(addText());
console.log(addText('Karina45'));
