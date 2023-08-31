import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { getProfileData } from './getProfileData';

describe('getLoginData.test', () => {
  test('Success', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.Belarus,
      lastname: 'Lomov',
      first: 'Vyacheslav',
      city: 'Krasnoyarsk',
      currency: Currency.EUR,
    };
    const state:DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('Should work with empty state', () => {
    const state:DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
