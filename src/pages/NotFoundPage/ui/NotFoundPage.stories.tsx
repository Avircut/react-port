import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { NotFoundPage } from './NotFoundPage';

const meta = {
  title: 'pages/Not Found',
  component: NotFoundPage,
  tags: ['autodocs'],
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
  },
};
export const Dark: Story = {
  args: {
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
  ],
};
