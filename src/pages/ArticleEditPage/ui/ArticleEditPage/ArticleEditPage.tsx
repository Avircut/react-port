import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { Text, TextSize } from 'shared/ui/Text/Text';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props : ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{id:string}>();
  const isEdit = Boolean(id);
  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      <Text size={TextSize.L} title={isEdit ? t('Edit Page Header') + id : t('Create Page Header')} />
    </Page>
  );
});
export default ArticleEditPage;
