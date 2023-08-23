import type { Meta, StoryObj } from '@storybook/react';
import userIcon from 'shared/assets/tests/avatar.jpg';
import { CommentList } from './CommentList';

const meta = {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  tags: ['autodocs'],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    comments: [
      {
        id: '1',
        text: 'Hello world',
        user: { id: '1', username: 'username', avatar: userIcon },
      },
      {
        id: '2',
        text: 'Hello world',
        user: { id: '2', username: 'Avircut' },
      },
    ],
  },
};
export const Loading: Story = {
  args: {
    comments: [
    ],
    isLoading: true,
  },
};
