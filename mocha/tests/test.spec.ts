import { Calculator } from '../../task14_0.js';
import { expect } from 'chai';

let calc: Calculator;

beforeEach(() => {
  calc = new Calculator();
});

describe('Test add function', () => {
  it('two positive numbers', () => {
    const result = calc.add(1, 2);
    expect(result).equal(3);
  });

  it('multiple numbers', () => {
    const result = calc.add(1, 2, 3);
    expect(result).equal(6);
  });

  it('negative numbers', () => {
    const result = calc.add(-2, -5);
    expect(result).equal(-7);
  });

  it('positive and negative numbers', () => {
    const result = calc.add(-3, 3);
    expect(result).equal(0);
  });

  it('one number', () => {
    const result = calc.add(5);
    expect(result).equal(5);
  });

  it('decimal numbers', () => {
    const result = calc.add(1.1, 2.4);
    expect(result).equal(3.5);
  });
});

describe('Test divide function', () => {
  it('two positive numbers', () => {
    const result = calc.divide(10, 2);
    expect(result).equal(5);
  });

  it('multiple numbers', () => {
    const result = calc.divide(12, 2, 3);
    expect(result).equal(2);
  });

  it('negative numbers', () => {
    const result = calc.divide(10, -2);
    expect(result).equal(-5);
  });

  it('negative numbers', () => {
    const result = calc.divide(10, -2);
    expect(result).equal(-5);
  });

  it('one number', () => {
    const result = calc.divide(5);
    expect(result).equal(5);
  });

  it('decimal numbers', () => {
    const result = calc.divide(2.4, 1.2);
    expect(result).equal(2);
  });

  it('error when dividing by zero', () => {
    const result = calc.divide(2, 0);
    expect(result).to.throw(Error, 'Dividing by zero is forbidden');
  });
});
