import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleDetailPageHeader } from './ArticleDetailPageHeader';

const meta = {
  title: 'pages/Article/ArticleDetailPageHeader',
  component: ArticleDetailPageHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleDetailPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};
export const PrimaryDark: Story = {
  args: {
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
  ],
};
