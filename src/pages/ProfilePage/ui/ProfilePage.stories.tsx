import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/avatar.jpg';
import ProfilePage from './ProfilePage';

const meta = {
  title: 'pages/Profile',
  component: ProfilePage,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({
      profile: {
        form: {
          username: 'admin',
          age: 22,
          country: Country.Belarus,
          lastname: 'Lomov',
          first: 'Vyacheslav',
          city: 'Krasnoyarsk',
          currency: Currency.EUR,
          avatar,
        },
      },
    }),
  ],
};
export const Light: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({}),
  ],
};
export const Dark: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({}),
    ThemeDecorator(Theme.DARK),
  ],
};
