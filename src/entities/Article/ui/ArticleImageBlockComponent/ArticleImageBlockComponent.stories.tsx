import type { Meta, StoryObj } from '@storybook/react';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';

const meta = {
  title: 'entities/Article/ArticleImageBlockComponent',
  component: ArticleImageBlockComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleImageBlockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    block: {
      id: '1',
      title: 'Изображение 1',
      type: ArticleBlockType.IMAGE,
      src: 'https://www.freepnglogos.com/uploads/javascript-png/png-javascript-badge-picture-8.png',
    },
  },
};
