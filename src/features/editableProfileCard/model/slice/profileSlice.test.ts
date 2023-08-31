import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Belarus,
  lastname: 'Lomov',
  first: 'Vyacheslav',
  city: 'Krasnoyarsk',
  currency: Currency.EUR,
};
describe('profileSlice.test', () => {
  test('test set readOnly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadOnly(true)),
    ).toEqual({ readonly: true });
  });
  test('test cancel Edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { ...data, lastname: 'Lomov1' },
    };
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toEqual({
      ...state,
      form: data,
      readonly: true,
    });
  });
  test('test updateProfile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { lastname: 'Lomov' } };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ lastname: 'Lomov1' }),
      ),
    ).toEqual({ form: { lastname: 'Lomov1' } });
  });
  test('test updateProfile service pending', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.pending,
      ),
    ).toEqual({ isLoading: true, validateErrors: undefined });
  });
  test('test updateProfile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true, validateErrors: undefined };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, ''),
      ),
    ).toEqual(
      {
        isLoading: false,
        data,
        form: data,
        readonly: true,
        validateErrors: undefined,
      },
    );
  });
});
