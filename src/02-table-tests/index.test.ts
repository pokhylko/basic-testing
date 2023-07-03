// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 10, b: 5, action: Action.Subtract, expected: 5 },
    { a: 1, b: 2, action: Action.Multiply, expected: 2 },
    { a: 5, b: 5, action: Action.Multiply, expected: 25 },
    { a: 3, b: 8, action: Action.Multiply, expected: 24 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 8, b: 4, action: Action.Divide, expected: 2 },
    { a: 33, b: 11, action: Action.Divide, expected: 3 },
    { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
    { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
    { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
    { a: 10, b: 2, action: 'test', expected: null },
    { a: 8, b: 4, action: 'action', expected: null },
    { a: 33, b: 11, action: [], expected: null },
    { a: 10, b: [], action: Action.Add, expected: null },
    { a: '1', b: 4, action: Action.Subtract, expected: null },
    { a: 33, b: null, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should using Jest table tests API to test all cases', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });

    expect(result).toBe(expected);
  });
});
