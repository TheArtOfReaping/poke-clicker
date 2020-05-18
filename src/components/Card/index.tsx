import React from 'react';
import { stylesheet, classes } from 'typestyle';
import { colors } from 'utils';

export interface CardOptions {
    padding?: boolean;
}

export const cardStyles = (options: CardOptions = {
    padding: true,
}) => stylesheet({
    Card: {
        background: colors.primary.shade1,
        padding: options?.padding ? '.25rem' : 0,
        margin: '.25rem',
        marginBottom: '0.5rem',
        borderRadius: '0.25rem',
        border: `1px solid ${colors.primary.tint1}`,
        transition: '200ms all',
        transitionDelay: '200ms',
        overflow: 'hidden',
        $nest: {
            '&:hover': {
                background: colors.primary.get(),
                transition: '200ms all',
            }
        }
    },

});

export interface CardProps {
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode;
    options?: CardOptions;
}

export function Card({children, className, options, onClick}: CardProps) {
    const styles = cardStyles(options);
    return <div onClick={onClick} className={classes(styles.Card, className)}>
        {children}
    </div>;
}