import React from 'react';

export function Background({background, imgProps}: {background: string; imgProps?: any}) {
    return <img src={`images/trainer/${background.toLowerCase().replace(/\s/g, '-')}-background.png`} {...imgProps} />;
}