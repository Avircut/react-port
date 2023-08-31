import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency';
import { validateProfile } from './validateProfile';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

jest.mock('axios');
const data = {
  username: 'admin',
  age: 22,
  country: Country.Belarus,
  lastname: 'Lomov',
  first: 'Vyacheslav',
  city: 'Krasnoyarsk',
  currency: Currency.EUR,
};
describe('validateProfile.test', () => {
  test('success', async () => {
    const result = await validateProfile(data);

    expect(result).toEqual([]);
  });

  test('without params', async () => {
    const result = await validateProfile();
    expect(result).toEqual([ValidateProfileError.NO_DATA]);
  });
  test('with without name', async () => {
    const result = await validateProfile({
      ...data,
      first: '',
      lastname: undefined,
    });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
  test('with incorrect Age', async () => {
    const result = await validateProfile({ ...data, age: undefined });
    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });
  test('with incorrect Country', async () => {
    const result = await validateProfile({ ...data, country: undefined });
    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });
  test('with incorrect all', async () => {
    const result = await validateProfile({});
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
