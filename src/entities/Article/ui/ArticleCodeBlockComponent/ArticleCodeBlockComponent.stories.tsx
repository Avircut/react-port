import type { Meta, StoryObj } from '@storybook/react';
import { ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

const meta = {
  title: 'entities/Article/ArticleCodeBlockComponent',
  component: ArticleCodeBlockComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleCodeBlockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    block: {
      id: '1',
      type: ArticleBlockType.CODE,
      code: 'import sd from \'./sd\'',
    },
  },
};
