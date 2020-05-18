import React from 'react';
import { Panel } from 'components/Panel';
import { QuestItem } from './QuestItem';
import { listOfQuests } from 'utils';

export function QuestLog() {
    //console.log(listOfQuests);

    return <Panel name='Quest Log' height={'30%'}>
        {listOfQuests.map((quest, idx) => <QuestItem key={idx} quest={quest} />)}
    </Panel>;
}