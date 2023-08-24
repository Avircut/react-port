import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Listbox } from './ListBox';

const meta = {
  title: 'shared/Listbox',
  component: Listbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultValue: 'Default',
    items: [
      { value: '1', content: 'First' },
      { value: '2', content: 'Second' },
      { value: '3', content: 'Third' },
    ],
  },
};

export const DirectionTop: Story = {
  args: {
    defaultValue: 'Default',
    items: [
      { value: '1', content: 'First' },
      { value: '2', content: 'Second' },
      { value: '3', content: 'Third' },
    ],
    direction: 'top',
  },
};
