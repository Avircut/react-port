import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => (
  <div className={classNames('app', {}, [theme])}>
    <Story />
  </div>
);
