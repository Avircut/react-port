import { addNewCommentSchema } from '../types/addNewComment';
import { addNewCommentActions, addNewCommentReducer } from './addNewCommentSlice';

describe('addNewCommentSlice.test', () => {
  test('test set text', () => {
    const state:DeepPartial<addNewCommentSchema> = { text: '123' };
    expect(addNewCommentReducer(state as addNewCommentSchema, addNewCommentActions.setText('1234'))).toEqual({ text: '1234' });
  });
});
