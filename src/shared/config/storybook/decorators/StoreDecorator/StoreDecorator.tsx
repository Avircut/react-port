import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slices/articleDetailsSlice';
import { profileReducer } from 'entities/Profile';
import { addNewCommentReducer } from 'features/addNewComment/model/slice/addNewCommentSlice';
import { loginReducer } from 'features/authByUsername/model/slice/loginSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailPage/model/slices';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncRecucers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (Story: StoryFn) => (
  <StoreProvider
    initialState={initialState}
    asyncReducers={{ ...defaultAsyncRecucers, ...asyncReducers }}
  >
    <Story />
  </StoreProvider>
);
