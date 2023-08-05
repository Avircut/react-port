import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from './Button';

const meta = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Тест',
  },
};
export const PrimaryDark: Story = {
  args: {
    children: 'Тест',
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
  ],
};

export const Clear: Story = {
  args: {
    theme: ThemeButton.CLEAR,
    children: 'Тест',
  },
};

export const Outline: Story = {
  args: {
    theme: ThemeButton.OUTLINE,
    children: 'Тест',
  },
};
export const OutlineDark: Story = {
  args: {
    theme: ThemeButton.OUTLINE,
    children: 'Тест',
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
  ],
};
