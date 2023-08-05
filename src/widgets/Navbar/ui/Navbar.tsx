import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);
  return (
    <div className={classNames(cls.navbar)}>
      <div className={cls.links}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.loginBtn}
          onClick={onToggleModal}
        >
          {t('Log in')}
        </Button>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <Modal isOpen={isAuthModal} onClose={onToggleModal}>
          sd
        </Modal>
      </div>
    </div>
  );
}
