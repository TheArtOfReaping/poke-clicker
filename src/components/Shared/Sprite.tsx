import React from 'react';
import { omit } from 'ramda';

export function Sprite(props: React.ImgHTMLAttributes<HTMLElement>) {
    return <img style={{imageRendering: 'pixelated', ...props.style}} {...omit(['style'], props)} />
}