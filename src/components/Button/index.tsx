import React from 'react';
import { stylesheet, classes } from 'typestyle';
import { colors } from 'utils/colors';
import { Button as AntButton } from 'antd';

export const styles = stylesheet({
  Base: {
    '-webkit-appearance': 'none',
    padding: '0.25rem',
    margin: '0.25rem',
    display: 'flex',
    background: colors.secondary.get(),
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '1.1rem',
    fontFamily: 'inherit',
    alignItems: 'center',
    $nest: {
      '&:hover': {
        background: colors.secondary.shade1,
      },
    },
  },
  SmallFont: {
    fontSize: '0.9rem',
  },
  Image: {
    height: '1rem',
    marginRight: '4px',
  },
  Disabled: {
    filter: 'grayscale(1)',
    pointerEvents: 'none',
  }
});

export enum Intent {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  NEUTRAL = 'neutral',
}

export interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  value?: any;
  intent?: Intent;
  disabled?: boolean;
  className?: string;
  options?: { smallFont?: boolean; image?: string };
}

export type Button = React.FunctionComponent<ButtonProps>;
export function Button({
  onClick,
  value,
  intent,
  className,
  disabled,
  options,
  ...buttonProps
}: ButtonProps) {
  return (
    <AntButton
      disabled={disabled}
      className={classes(styles.Base, options?.smallFont && styles.SmallFont, className, disabled && styles.Disabled)}
      onClick={onClick}
      type='primary'
      {...buttonProps}
    >
      {options?.image && (
        <img className={styles.Image} alt="" src={options.image} />
      )}
      {value}
    </AntButton>
  );
}
