import { Calculator } from '../../task14_0';

let calc = new Calculator();

describe('Test add function', () => {
  test('two positive numbers', () => {
    const result = calc.add(2, 3);
    expect(result).toEqual(5);
  });

  test('multiple numbers', () => {
    const result = calc.add(2, 3, 4);
    expect(result).toEqual(9);
  });

  test('negative numbers', () => {
    const result = calc.add(-1, -3);
    expect(result).toEqual(-4);
  });

  test('positive and negative numbers', () => {
    const result = calc.add(-2, 3);
    expect(result).toEqual(1);
  });

  test('one number', () => {
    const result = calc.add(6);
    expect(result).toEqual(6);
  });

  test('decimal numbers', () => {
    const result = calc.add(1.1, 2.7);
    expect(result).toBeCloseTo(3.8);
  });
});

describe('Test divide function', () => {
  test('two positive numbers', () => {
    const result = calc.divide(14, 2);
    expect(result).toEqual(7);
  });

  test('multiple numbers', () => {
    const result = calc.divide(24, 2, 3);
    expect(result).toEqual(4);
  });

  test('negative numbers', () => {
    const result = calc.divide(12, -3);
    expect(result).toEqual(-4);
  });

  test('negative numbers', () => {
    const result = calc.divide(10, -2);
    expect(result).toEqual(-5);
  });

  test('one number', () => {
    const result = calc.divide(5);
    expect(result).toEqual(5);
  });

  test('decimal numbers', () => {
    const result = calc.divide(2.4, 1.2);
    expect(result).toEqual(2);
  });

  test('error when dividing by zero', () => {
    const result = calc.divide(2, 0);
    expect(result).toThrow('Dividing by zero is forbidden');
  });
});
