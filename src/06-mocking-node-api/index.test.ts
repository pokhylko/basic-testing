// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';


const TIMEOUT = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callbackMock, TIMEOUT);

    expect(setTimeoutMock).toHaveBeenCalledWith(callbackMock, TIMEOUT);
  });

  test('should call callback only after timeout', () => {
    const MS_TO_RUN = 2000;
    const callbackMock = jest.fn();

    doStuffByTimeout(callbackMock, TIMEOUT);

    jest.advanceTimersByTime(MS_TO_RUN);

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const setIntervalMock = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callbackMock, TIMEOUT);

    expect(setIntervalMock).toHaveBeenCalledWith(callbackMock, TIMEOUT);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const MS_TO_RUN = 2000;
    const callbackMock = jest.fn();
    const setIntervalMock = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callbackMock, TIMEOUT);

    jest.advanceTimersByTime(MS_TO_RUN);

    expect(setIntervalMock).toHaveBeenCalledTimes(1);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinMock = jest.spyOn(path, 'join');

    await readFileAsynchronously('file.txt');

    expect(joinMock).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'Hello world!';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(content);

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe(content);
  });
});
