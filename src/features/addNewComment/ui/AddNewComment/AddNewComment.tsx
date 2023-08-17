import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { getNewCommentError, getNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import cls from './AddNewComment.module.scss';

export interface AddNewCommentProps {
  className?: string;
  onSendComment: (text:string) => void;
}

const reducers:ReducersList = {
  addNewComment: addNewCommentReducer,
};
const AddNewComment = memo((props : AddNewCommentProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useAppSelector(getNewCommentText);
  const error = useAppSelector(getNewCommentError);
  const dispatch = useAppDispatch();
  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addNewCommentActions.setText(value));
  }, [dispatch]);
  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddNewComment, {}, [className])}>
        <Input className={cls.input} onChange={onCommentTextChange} placeholder={t('Enter your comment')} />
        <Button onClick={onSendHandler}>{t('Send')}</Button>
      </div>
    </DynamicModuleLoader>

  );
});

export default AddNewComment;
