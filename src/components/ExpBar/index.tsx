import React from 'react';

export interface ExpBarProps {
  width?: number;
  currentExpProgress: number;
  totalExpNeeded: number;
}

export function ExpBar({
  width,
  currentExpProgress,
  totalExpNeeded,
}: ExpBarProps) {
  const percent = (currentExpProgress / totalExpNeeded) * 100;

  return (
    <div
      className="fs-x-small"
      title={`${currentExpProgress}/${totalExpNeeded}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '.33rem',
        padding: '.25rem',
        width: '10rem',
      }}
    >
      <div
        style={{
          height: '0.5rem',
          border: '1px solid white',
          background: `linear-gradient(to right, cyan, cyan ${percent}%, black ${percent}%, black)`,
          transition: '200ms all',
          width: '10rem',
        }}
      ></div>
    </div>
  );
}
