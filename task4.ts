/*3. Создать функцию которая будет принимать входящее значение и добавлять к нему слово "супер"*/

const addText = (input = 'котик') => {
  const regexLatin = /^[A-Za-z]+$/;
  const regexCyrillic = /^[А-Яа-яЁё]+$/;
  if (!regexCyrillic.test(input) && !regexCyrillic.test(input)) {
    throw new Error('Разрешены только латинские или кириллические буквы');
  }

  if (regexCyrillic.test(input)) {
    return 'супер' + input;
  }

  if (regexLatin.test(input)) {
    return 'super' + input;
  }
};

//console.log(addText('Karina'));
console.log(addText('карина'));
console.log(addText(''));
console.log(addText());
console.log(addText('Karina45'));
