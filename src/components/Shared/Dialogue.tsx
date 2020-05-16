import React, { useState, Component, useEffect } from 'react';
import { stylesheet } from 'typestyle';
import { Card } from 'components/Card';
import { Sprite } from './Sprite';
import { colors } from 'utils';
import { clamp } from 'ramda';
import Typist from 'react-typist';
import { RedoOutlined } from '@ant-design/icons';
import { OnClick } from 'components/Panel';


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
    DialogueHeader: {
        display: 'flex',
        padding: '0.25rem',
        background: colors.primary.get(),
    },
    DialogueSpeaker: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: colors.secondary.get(),
        textTransform: 'uppercase',
    },
    DialogueRefresh: {
        marginLeft: 'auto',
    }
});

export interface DialogueProps {
    character: string;
    text: DialogueText;
}

export function Dialogue({character, text}: DialogueProps) {
    const [current, setCurrent] = useState(0);
    const max = text.length - 1;

    const onClick: OnClick = (e) => {
        setCurrent(clamp(0, max, current + 1));
    }

    return <Card className={styles.Dialogue} onClick={onClick} options={{padding: false}}>
        <div className={styles.DialogueHeader}>
            <div className={styles.DialogueSpeaker}>{character}</div>
            {current === max && <div className={styles.DialogueRefresh}>
                <RedoOutlined onClick={e => {
                    e.stopPropagation();
                    setCurrent(0);
                }} />
            </div>}
        </div>
        <div className={styles.DialogueInner}>
            <div className={styles.DialogueText}>
                <Typist key={current} avgTypingDelay={10} cursor={{show: false}}>{text.find((_, idx) => idx === current)}</Typist>
            </div>
            <Sprite className={styles.DialogueCharacter} src={`./images/characters/${character.toLowerCase()}.png`} />
        </div>
    </Card>
}