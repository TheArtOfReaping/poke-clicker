import React from 'react';
import { stylesheet, classes } from 'typestyle';

export const styles = stylesheet({
  Base: {
    '-webkit-appearance': 'none',
    padding: '0.25rem',
    margin: '0.25rem',
    display: 'flex',
    background: '#444',
    borderRadius: '0.25rem',
    border: '1px solid #555',
    cursor: 'pointer',
    color: 'white',
    fontSize: '1.1rem',
    fontFamily: 'inherit',
    alignItems: 'center',
    $nest: {
      '&:hover': {
        background: '#555',
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
  options?: { smallFont?: boolean; image?: string };
}

export type Button = React.FunctionComponent<ButtonProps>;
export function Button({
  onClick,
  value,
  intent,
  disabled,
  options,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={classes(styles.Base, options?.smallFont && styles.SmallFont)}
      onClick={onClick}
    >
      {options?.image && (
        <img className={styles.Image} alt="" src={options.image} />
      )}
      {value}
    </button>
  );
}
