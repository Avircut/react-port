import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { getUserAuthData } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface EditableProfileHeaderProps {
  className?: string;
}

export const EditableProfileHeader = memo((props : EditableProfileHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation('profile');
  const readonly = useAppSelector(getProfileReadOnly);
  const authData = useAppSelector(getUserAuthData);
  const profileData = useAppSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const dispatch = useAppDispatch();
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);
  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);
  return (
    <HStack justify="between" className={classNames('', {}, [className])}>
      <Text title={t('Title')} />
      {canEdit && (
        <HStack gap="16">
          {readonly
            ? (
              <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                {t('Edit')}
              </Button>
            )
            : (
              <>
                <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
                  {t('Cancel')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                  {t('Save')}
                </Button>
              </>

            )}
        </HStack>
      )}

    </HStack>
  );
});
