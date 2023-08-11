import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginIsLoading.test', () => {
  test('should return true', () => {
    const state:DeepPartial<StateSchema> = {
      loginForm: {
        username: '123',
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('123');
  });
  test('should work with empty', () => {
    const state:DeepPartial<StateSchema> = {
      loginForm: {},
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});
