// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'test value';

    const result = await resolveValue(testValue);

    expect(result).toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'some error message';

    const result = () => throwError(errorMessage);

    expect(result).toThrowError(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultErrorMessage = 'Oops!';

    const result = () => throwError();

    expect(result).toThrowError(defaultErrorMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();

    expect(result).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const result = () => rejectCustomError();
    
    await expect(result).rejects.toThrowError(MyAwesomeError);
  });
});
