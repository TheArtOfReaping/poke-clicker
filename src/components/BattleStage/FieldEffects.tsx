import React from 'react';
import {style} from 'typestyle';

export const FieldEffectsStyle = style({
    backgroundColor: 'white',
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    //boxShadow: '0 0 1rem rgba(0,0,0,0.33)',
    color: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export function FieldEffects() {
    return <div
        className={FieldEffectsStyle}
    >
        <img
            alt="weather"
            height="14px"
            src="https://image.flaticon.com/icons/svg/890/890347.svg"
        />
        Sunny
    </div>;
}