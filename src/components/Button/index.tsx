import React from 'react';
import { stylesheet, classes } from 'typestyle';
import { colors } from 'utils/colors';

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
});

export enum Intent {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  NEUTRAL = 'neutral',
}

export interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
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
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={classes(styles.Base, options?.smallFont && styles.SmallFont, className)}
      onClick={onClick}
    >
      {options?.image && (
        <img className={styles.Image} alt="" src={options.image} />
      )}
      {value}
    </button>
  );
}
