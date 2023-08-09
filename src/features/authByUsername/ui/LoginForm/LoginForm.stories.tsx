import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { LoginForm } from './LoginForm';

const meta = {
  title: 'features/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({
      loginForm: { username: '123', password: 'ddd' },
    }),
  ],
};
export const PrimaryDark: Story = {
  args: {
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      loginForm: { username: '123', password: 'ddd' },
    }),
  ],
};
export const WithError: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({
      loginForm: { username: '123', password: 'ddd', error: 'ERROR' },
    }),
  ],
};
export const Loading: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({
      loginForm: { isLoading: true },
    }),
  ],
};
