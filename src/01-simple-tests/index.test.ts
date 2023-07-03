// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 2, action: Action.Add });

    expect(result).toBe(4);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 20, b: 8, action: Action.Subtract });

    expect(result).toBe(12);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Multiply});

    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 100, b: 4, action: Action.Divide });

    expect(result).toBe(25);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate });

    expect(result).toBe(9);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: 'wrong-action' });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: {}, b: [], action: Action.Add });

    expect(result).toBeNull();
  });
});
