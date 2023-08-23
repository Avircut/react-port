import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo } from 'react';
import cls from './Flex.module.scss';

export type FlexJustify = 'between' | 'start' | 'center' | 'end';
export type FlexAlign = 'start' | 'stretch' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  32: cls.gap32,
};
const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
};
const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
  stretch: cls.alignStretch,
};
const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};
export interface FlexProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex = memo((props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap = '4',
    max = false,
  } = props;
  const mods:Mods = {
    [cls.max]: max,
  };
  return (
    <div
      className={classNames(cls.Flex, mods, [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gapClasses[gap],
      ])}
    >
      {children}
    </div>
  );
});
