import type { Meta, StoryObj } from '@storybook/react';
import userIcon from 'shared/assets/tests/avatar.jpg';
import { CommentCard } from './CommentCard';

const meta = {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {
    isLoading: false,
    comment: {
      id: '1',
      user: { id: '1', username: 'username', avatar: userIcon },
      text: 'Hello world',
    },
  },
};
export const Loading: Story = {
  args: {
    isLoading: true,
    comment: {
      id: '1',
      user: { id: '1', username: 'username', avatar: userIcon },
      text: 'Hello world',
    },
  },
};
