import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = memo(() => {
  const { t } = useTranslation('about');
  return (
    <div>
      {t('Заголовок о сайте')}
    </div>
  );
});
export default AboutPage;
