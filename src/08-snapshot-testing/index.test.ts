// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList([1, 1, 1]);

    const linkedListSnapshot = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 1,
        },
        value: 1,
      },
      value: 1,
    };

    expect(result).toStrictEqual(linkedListSnapshot)
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([2, 2, 2]);

    expect(linkedList).toMatchSnapshot();
  });
});
