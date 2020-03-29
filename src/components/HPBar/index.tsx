import React from 'react';

export interface HPBarProps {
  currentHp: number;
  totalHp: number;
  showHp?: boolean;
  width?: string;
}

export const getHPColor = (value: number) => {
  if (value < 33) {
    return 'red';
  }
  if (value < 50) {
    return 'orange';
  }
  return 'green';
};

export type HPBar = React.FunctionComponent<HPBarProps>;
export function HPBar({ currentHp, totalHp, showHp = true, width = '24rem' }: HPBarProps) {
  const percent = (currentHp / totalHp) * 100;

  return (
    <div
      className="fs-xx-small"
      style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '.33rem',
        padding: '.25rem',
        width: width,
      }}
    >
      <div
        style={{
          height: '0.5rem',
          width: `calc(${width} - 6rem)`,
          border: '1px solid white',
          borderRadius: '.25rem',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            transition: '200ms width',
            background: getHPColor(percent),
            width: `${percent}%`,
            position: 'absolute',
            top: '0',
            left: '0',
            height: '0.5rem',
          }}
        ></div>
      </div>
      <div
        style={{
          color: 'yellow',
          textShadow: '0 0 0.25rem #111',
          marginLeft: '4px',
        }}
      >
        {showHp && `${currentHp}/${totalHp}`}
      </div>
    </div>
  );
}
