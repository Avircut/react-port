import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { ArticleDetailPageHeader } from './ArticleDetailPageHeader';

const meta = {
  title: 'pages/ArticleDetailPage/ArticleDetailPageHeader',
  component: ArticleDetailPageHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleDetailPageHeader>;

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
  },
  decorators: [
    StoreDecorator({}),
    ThemeDecorator(Theme.DARK),
  ],
};
