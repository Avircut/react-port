import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleType } from '../../model/types/article';
import { ArticleTypeTabs } from './ArticleTypeTabs';

const meta = {
  title: 'entities/Article/ArticleTypeTabs',
  component: ArticleTypeTabs,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleTypeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: ArticleType.ALL,
  },
};
export const PrimaryDark: Story = {
  args: {
    value: ArticleType.ALL,
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
  ],
};
