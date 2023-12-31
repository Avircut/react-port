import type { Meta, StoryObj } from '@storybook/react';
import { LikeButton } from './LikeButton';

const meta = {
  title: 'entities/LikeButton',
  component: LikeButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Liked: Story = {
  args: {
    isLiked: true,
  },
};

export const NotLiked: Story = {
  args: {
    isLiked: false,
  },
};
