import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { action } from '@storybook/addon-actions';
import AddNewComment from './AddNewComment';

const meta = {
  title: 'features/AddNewComment',
  component: AddNewComment,
  tags: ['autodocs'],
} satisfies Meta<typeof AddNewComment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({}),
  ],
};
export const PrimaryDark: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
  decorators: [
    StoreDecorator({}),
    ThemeDecorator(Theme.DARK),
  ],
};
