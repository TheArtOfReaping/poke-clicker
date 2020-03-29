import React from 'react';
import { classes, stylesheet } from 'typestyle';

const styles = (props: any) => stylesheet({
    ProgressBar: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '.33rem',
        padding: '.25rem',
        width: '10rem',
    },
    ProgressBarInner: {
        height: '0.5rem',
        border: '1px solid white',
        transition: '200ms all',
        width: '10rem',
    }
})

export interface ProgressBarProps {
  width?: number;
  baseColor?: string,
  
  amount: number;
  total: number;
}

export function ProgressBar({
  width,
  baseColor,
  amount,
  total
}: ProgressBarProps) {
  const percent = (amount / total) * 100;
  const props = arguments;

  return (
    <div
      className={classes('fs-x-small', styles(props).ProgressBar)}
      title={`${amount}/${total}`}
    >
      <div
        className={styles(props).ProgressBarInner}
        style={{
          background: `linear-gradient(to right, ${baseColor}, ${baseColor} ${percent}%, black ${percent}%, black)`,
        }}
      ></div>
    </div>
  );
}
