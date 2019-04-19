import MockAdapter from 'axios-mock-adapter';
import Api from '../Api';

describe('Api', () => {
  const apiInstance = Api._getInstance();
  const apiMock = new MockAdapter(apiInstance, { delayResponse: 100 });

  it('should add default baseUrl to Api', () => {
    expect(apiInstance.defaults.baseURL).toEqual('/api');
  });

  it('should add default timeout to Api', () => {
    expect(apiInstance.defaults.timeout).toEqual(5000);
  });

  it('should make an async GET request successfully', async () => {
    apiMock
      .onGet('/api/data')
      .reply(200, [{ id: 1, name: 'item' }]);

    const response = await Api.read('/data');

    expect(response.data).toEqual([{ id: 1, name: 'item' }]);
  });

  it('should return NULL on GET request error', async () => {
    apiMock.onGet('/api/data').networkError();

    const response = await Api.read('/data');

    expect(response).toBeNull();
  });

  it('should make an async POST request successfully', async () => {
    const user = { name: 'John' };

    apiMock.onPost('/api/users', user).reply(200, {
      id: 1,
      name: 'John',
    });

    const response = await Api.add('/users', user);

    expect(response.data).toEqual({ id: 1, name: 'John' });
  });

  it('should return NULL on POST request error', async () => {
    const user = { name: 'John' };

    apiMock.onPost('/api/users', user).networkError();

    const response = await Api.add('/users', user);

    expect(response).toBeNull();
  });

  it('should make an async PUT request successfully', async () => {
    const user = { id: 1, name: 'Peter' };

    apiMock.onPut('/api/users', user).reply(200, {
      id: 1,
      name: 'Peter',
    });

    const response = await Api.update('/users', user);

    expect(response.data).toEqual(user);
  });

  it('should return NULL on PUT request error', async () => {
    const user = { id: 1, name: 'Peter' };

    apiMock.onPut('/api/users', user).networkError();

    const response = await Api.update('/users', user);

    expect(response).toBeNull();
  });

  it('should make an async DELETE request successfully', async () => {
    apiMock.onDelete('/api/users/1').reply(200, { removed: true });

    const response = await Api.remove('/users/1');

    expect(response.data).toEqual({ removed: true });
  });

  it('should return NULL on DELETE request error', async () => {
    apiMock.onDelete('/api/users/1').networkError();

    const response = await Api.remove('/users/1');

    expect(response).toBeNull();
  });
});
