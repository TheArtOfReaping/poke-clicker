import React from 'react';
import { colors } from 'utils';

export interface ExpBarProps {
  width?: number;
  currentExpProgress?: number;
  totalExpNeeded?: number;
  baseColor?: string;
}

export function ExpBar({
    width,
    currentExpProgress = 0,
    totalExpNeeded = 1,
    baseColor = 'cyan',
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
                    background: `linear-gradient(to right, ${baseColor}, ${baseColor} ${percent}%, ${colors.primary.shade3} ${percent}%, ${colors.primary.shade3})`,
                    transition: '200ms all',
                    width: '10rem',
                }}
            ></div>
        </div>
    );
}
