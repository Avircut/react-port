import type { Meta, StoryObj } from '@storybook/react';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';

const meta = {
  title: 'entities/Article/ArticleTextBlockComponent',
  component: ArticleTextBlockComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleTextBlockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    block: {
      id: '1',
      title: 'Title',
      type: ArticleBlockType.TEXT,
      paragraphs: [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur inventore eligendi laboriosam. Aliquid quam voluptate dignissimos eaque reprehenderit delectus earum modi a necessitatibus at quos molestiae alias commodi optio quisquam, ducimus fugit facilis enim ad beatae officiis dolorem laudantium exercitationem illum! Minus aliquam dolorum itaque aut necessitatibus ab repellat qui.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur inventore eligendi laboriosam. Aliquid quam voluptate dignissimos eaque reprehenderit delectus earum modi a necessitatibus at quos molestiae alias commodi optio quisquam, ducimus fugit facilis enim ad beatae officiis dolorem laudantium exercitationem illum! Minus aliquam dolorum itaque aut necessitatibus ab repellat qui.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur inventore eligendi laboriosam. Aliquid quam voluptate dignissimos eaque reprehenderit delectus earum modi a necessitatibus at quos molestiae alias commodi optio quisquam, ducimus fugit facilis enim ad beatae officiis dolorem laudantium exercitationem illum! Minus aliquam dolorum itaque aut necessitatibus ab repellat qui.',
      ],
    },
  },
};
