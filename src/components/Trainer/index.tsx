import React from 'react';
import { stylesheet } from 'typestyle';
import { Panel, PanelProps } from 'components/Panel';
import { colors } from 'utils/colors';

const styles = stylesheet({
  TrainerInner: {
    display: 'flex',
    textAlign: 'left',
  },
  DataWrapper: {
    background: colors.primary.get(),
    padding: '.25rem',
    margin: '2px 0',
  },
  TrainerInfo: {
    margin: '.25rem',
  }
});

export interface TrainerProps {
  trainer?: any;
  panelProps?: Partial<PanelProps>;
}

export function Trainer({ trainer, panelProps }: TrainerProps) {
  return (
    <Panel name="Trainer" {...panelProps}>
      <div className={styles.TrainerInner}>
        <div className={styles.TrainerInfo}>
          <img className={styles.DataWrapper} src={`./images/trainer/dawn-black-dress.png`} />
          <div className={styles.DataWrapper}>Emma</div>
          <div className={styles.DataWrapper}>Edit Clothing</div>
        </div>
        <div className={styles.TrainerInfo}>
          <div className={styles.DataWrapper}>Start Date: {trainer?.date || '03/01/2020'}</div>
          <div className={styles.DataWrapper}>Regions: {trainer?.regions || 1}</div>
          <div className={styles.DataWrapper}>Score: {trainer?.score || 0}</div>
        </div>
        <div className={styles.TrainerInfo}>
          <div className={styles.DataWrapper}>Money: ${trainer?.money}</div>
          <div className={styles.DataWrapper}>BP: {trainer?.bp}</div>
        </div>
      </div>
    </Panel>
  );
}
