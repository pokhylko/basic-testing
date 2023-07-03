// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const CONFIG = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};
const PATH = '/users';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create');

    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ data: null });

    await throttledGetDataFromApi(PATH);
    await jest.runOnlyPendingTimersAsync();

    expect(axiosCreateMock).toHaveBeenCalledWith(CONFIG);
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetMock = jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ data: null });

     await throttledGetDataFromApi(PATH);
     await jest.runOnlyPendingTimersAsync();

     expect(axiosGetMock).toHaveBeenCalledWith(PATH);
  });

  test('should return response data', async () => {
    const data = {
      id: 1,
      name: 'user'
    }

    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ data });

    const result = await throttledGetDataFromApi(PATH);

    expect(result).toEqual(data);
  });
});
