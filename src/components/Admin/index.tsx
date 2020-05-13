import React from 'react';
import { stylesheet } from 'typestyle';
import { DailyDealEditor } from './DailyDealEditor';
import { colors } from 'utils';

const styles = stylesheet({
    AdminBase: {
        width: '100%',
        height: '100%',
        background: colors.primary.get(),
    }
});

export function Admin() {
    return <div className={styles.AdminBase}>
        <DailyDealEditor />
    </div>;
}