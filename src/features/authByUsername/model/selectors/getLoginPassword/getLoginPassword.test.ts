import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginIsLoading.test', () => {
  test('should return true', () => {
    const state:DeepPartial<StateSchema> = {
      loginForm: {
        password: '123',
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('123');
  });
  test('should work with empty', () => {
    const state:DeepPartial<StateSchema> = {
      loginForm: {},
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});
