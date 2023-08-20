import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import ArticlesPage from './ArticlesPage';

const meta = {
  title: 'pages/Article/ArticlesPage',
  component: ArticlesPage,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticlesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({
      articlesPage: {
      },
    }),
  ],
};
export const PrimaryDark: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({
      articlesPage: {

      },
    }),
    ThemeDecorator(Theme.DARK),
  ],
};
