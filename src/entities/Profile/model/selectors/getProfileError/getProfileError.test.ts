import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
  test('Success', () => {
    const state:DeepPartial<StateSchema> = {
      profile: {
        error: 'lol',
      },
    };
    expect(getProfileError(state as StateSchema)).toEqual('lol');
  });
  test('Should work with empty state', () => {
    const state:DeepPartial<StateSchema> = {};
    expect(getProfileError(state as StateSchema)).toEqual(undefined);
  });
});
