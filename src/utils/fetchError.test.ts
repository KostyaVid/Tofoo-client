import fetchError from './fetchError';

describe('fetchError', () => {
  test('Fetch set error message', async () => {
    const res = {
      json: async () => await { message: 'Error Message' },
    };
    expect(await fetchError(res as any)).toBe('Error Message');
  });

  test('Fetch error', async () => {
    const res = {
      json: async () => await {},
    };
    expect(await fetchError(res as any)).toBe('Unknown Error');
  });
});
