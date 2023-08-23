import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import {
  getProfileData,
  getProfileReadOnly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack/';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = (props : ProfilePageHeaderProps) => {
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
};
