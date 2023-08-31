import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/avatar.jpg';
import { EditableProfileCard } from './EditableProfileCard';

const meta = {
  title: 'pages/EditableProfileCard',
  component: EditableProfileCard,
  tags: ['autodocs'],
} satisfies Meta<typeof EditableProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    id: '1',
  },
  decorators: [
    StoreDecorator({
      profile: {
        form: {
          id: '1',
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
export const Dark: Story = {
  args: {
    id: '1',

  },
  decorators: [
    StoreDecorator({
      profile: {
        form: {
          id: '1',
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
    ThemeDecorator(Theme.DARK),
  ],
};
