import React from 'react';
import {stylesheet, classes} from 'typestyle';
import { useDispatch } from 'react-redux';
import { openDialog } from 'actions';
import { colors, ZIndexMap } from 'utils';

const styles = stylesheet({
    DialogOuter: {
        background: colors.primary.get(),
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: '1rem',
        zIndex: ZIndexMap.StageDialog,
    },
    Dialog: {
        position: 'relative',
    },
    DialogClose: {
        position: 'absolute',
        top: '0',
        right: '0',
    },
    DialogChildWrapper: {
        display: 'flex',
    }
})

export enum DialogKind {
    Pokemart = 1,
    Storage = 2,
}

export interface DialogProps {
    kind: DialogKind;
    children?: React.ReactNode;
    title?: string;
    className?: string;
}

export function Dialog({
    kind,
    children,
    className,
    title,
}: DialogProps) {
    const dispatch = useDispatch();
    return <div className={styles.DialogOuter}>
            <div className={classes(styles.Dialog)}>
            <div onClick={e => dispatch(openDialog({selectedDialog: -1}))} className={styles.DialogClose}>x</div>
            <h1>{title}</h1>
            <div className={classes(styles.DialogChildWrapper, className)}>
                {children}
            </div>
        </div>
    </div>
};