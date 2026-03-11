// 0. Реализовать класс калькулятор, с минимум следующими методами: сложение, вычитание, умножение, деление. Эта задача нам пригодится впоследствии

class Calculator {
  private checkInput(...numbers: number[]) {
    if (numbers.length === 0) {
      throw new Error('No values provided');
    }
  }

  add(...numbers: number[]) {
    this.checkInput(...numbers);
    return numbers.reduce((acc, value) => acc + value);
  }

  subtract(...numbers: number[]) {
    this.checkInput(...numbers);
    return numbers.reduce((acc, value) => acc - value);
  }

  multiply(...numbers: number[]) {
    this.checkInput(...numbers);
    return numbers.reduce((acc, value) => acc * value);
  }

  divide(...numbers: number[]) {
    this.checkInput(...numbers);
    return numbers.reduce((acc, value) => {
      if (value === 0) {
        throw new Error('Dividing by zero is forbidden');
      }
      return acc / value;
    });
  }
}
