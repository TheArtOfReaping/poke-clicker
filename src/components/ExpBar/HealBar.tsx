import React from 'react';
import { colors } from 'utils/colors';
import { color } from 'csx';
import { ZIndexMap } from 'utils';

export interface HealBarProps {
  width?: number;
  currentHealth: number;
  totalHealth: number;
  baseColor?: string;
}

export function HealBar({
    width,
    currentHealth,
    totalHealth,
    baseColor = 'cyan',
}: HealBarProps) {
    const percent = (currentHealth / totalHealth) * 100;

    return (
        <div
            className="fs-x-small"
            title={`${currentHealth}/${totalHealth}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '.5rem',
                padding: '.25rem',
                width: '100%',
            }}
        >
        
            <div
                style={{
                    height: '0.8rem',
                    border: '1px solid white',
                    borderRadius: '.5rem',
                    background: colors.primary.get(),
                    transition: '200ms all',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div style={{
                    background: baseColor,
                    width: `${percent}%`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transition: '200ms width',
                    height: '0.8rem',
                }}>
                </div>
                <span style={{fontSize: '0.5rem', marginLeft: '4px', position: 'relative', zIndex: ZIndexMap.Heart }}>❤</span></div>
        </div>
    );
}
