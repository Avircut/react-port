import { StateSchema } from 'app/providers/StoreProvider';
import { getLikeByArticleId, getLikesCount } from './likes';

describe('likes.test', () => {
  test('Should return 1 like', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: {
          id: '1',
        },
      },
      likes: {
        ids: [1],
        entities: {
          1: {
            article: { id: '1' },
            user: { id: '1' },
          },
        },
      },
    };
    expect(getLikesCount(state as StateSchema)).toEqual(1);
  });
  test('Should work with empty likes', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: {
          id: '1',
        },
      },
      likes: {
        ids: [],
        entities: {},
      },
    };
    expect(getLikesCount(state as StateSchema)).toEqual(0);
  });
  test('Should return correct amount of likes', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: {
          id: '1',
        },
      },
      likes: {
        ids: [1, 2, 3, 4, 5],
        entities: {
          1: {
            article: { id: '1' },
          },
          2: {
            article: { id: '1' },
          },
          3: {
            article: { id: '3' },
          },
          4: {
            article: { id: '4' },
          },
          5: {
            article: { id: '2' },
          },
        },
      },
    };
    expect(getLikesCount(state as StateSchema)).toEqual(2);
  });
  test('Should return correct like', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: {
          id: '1',
        },
      },
      user: {
        authData: {
          id: '1',
        },
      },
      likes: {
        ids: [1, 2, 3, 4, 5],
        entities: {
          1: {
            id: '1',
            article: { id: '1' },
            user: { id: '2' },
          },
          2: {
            id: '2',
            article: { id: '1' },
            user: { id: '1' },
          },
          3: {
            id: '3',
            article: { id: '3' },
            user: { id: '1' },
          },
          4: {
            id: '4',
            article: { id: '4' },
            user: { id: '1' },
          },
          5: {
            id: '5',
            article: { id: '2' },
            user: { id: '2' },
          },
        },
      },
    };
    expect(getLikeByArticleId(state as StateSchema)).toEqual({
      id: '2',
      article: { id: '1' },
      user: { id: '1' },
    });
  });
});
