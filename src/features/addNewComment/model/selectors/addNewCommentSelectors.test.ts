import { StateSchema } from 'app/providers/StoreProvider';
import { getNewCommentError, getNewCommentText } from './addNewCommentSelectors';

describe('addNewCommentSelectors.test', () => {
  test('Should return error', () => {
    const state:DeepPartial<StateSchema> = {
      addNewComment: {
        error: 'error',
      },
    };
    expect(getNewCommentError(state as StateSchema)).toEqual('error');
  });
  test('Should return error with empty state', () => {
    const state:DeepPartial<StateSchema> = {};
    expect(getNewCommentError(state as StateSchema)).toEqual(undefined);
  });
  test('Should return text', () => {
    const state:DeepPartial<StateSchema> = {
      addNewComment: {
        text: '1234',
      },
    };
    expect(getNewCommentText(state as StateSchema)).toEqual('1234');
  });
});
