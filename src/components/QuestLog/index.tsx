import React from 'react';
import { Panel } from 'components/Panel';
import { Quest } from 'utils';
import { getItem } from 'utils/listOfRoutes';
import { QuestItem } from './QuestItem';
import { listOfQuests } from 'utils';

export function QuestLog() {
    //console.log(listOfQuests);

    return <Panel name='Quest Log' height={'30%'}>
        {listOfQuests.map(quest => <QuestItem quest={quest} />)}
    </Panel>;
}