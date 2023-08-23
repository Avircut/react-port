import type { Meta, StoryObj } from '@storybook/react';
import { ArticleSortField } from '../../model/types/article';
import { ArticleSortSelector } from './ArticleSortSelector';

const meta = {
  title: 'entities/Article/ArticleSortSelector',
  component: ArticleSortSelector,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleSortSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sort: ArticleSortField.CREATED,
    order: 'asc',
  },
};
