import React, { useState, Component } from 'react';
import { stylesheet } from 'typestyle';
import { Card } from 'components/Card';
import { Sprite } from './Sprite';
import { colors } from 'utils';
import { clamp } from 'ramda';

export type DialogueText = React.ReactNode[];

export const styles = stylesheet({
    Dialogue: {
        width: '50%',
        margin: '0 auto !important',
        boxShadow: '0 0 .25rem rgba(0,0,0,0.33)',
        cursor: 'pointer',
    },
    DialogueInner: {
        display: 'flex',
        padding: '0.25rem',
    },
    DialogueText: {
        fontSize: '120%',
        textAlign: 'left',
        margin: '4px',
    },
    DialogueCharacter: {
        marginLeft: 'auto',
        height: '60px',
    },
    DialogueSpeaker: {
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '0.25rem',
        background: colors.primary.get(),
        color: colors.secondary.get(),
        textTransform: 'uppercase',
    }
});

export interface DialogueProps {
    character: string;
    text: DialogueText;
}

export function Dialogue({character, text}: DialogueProps) {
    const [current, setCurrent] = useState(0);

    const onClick = (_: any) => setCurrent(clamp(0, text.length - 1, current + 1));

    return <Card className={styles.Dialogue} onClick={onClick} options={{padding: false}}>
        <div className={styles.DialogueSpeaker}>{character}</div>
        <div className={styles.DialogueInner}>
            <div className={styles.DialogueText}>
                {text.find((_, idx) => idx === current)}
            </div>
            <Sprite className={styles.DialogueCharacter} src={`./images/characters/${character.toLowerCase()}.png`} />
        </div>
    </Card>
}