import { ChangeEvent, MouseEvent } from 'react';

export type OnChange = (e?: ChangeEvent<HTMLElement>) => void;
export type OnClick = (e?: MouseEvent<HTMLElement>) => void;