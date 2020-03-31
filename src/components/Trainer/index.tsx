import React from 'react';
import { stylesheet, classes } from 'typestyle';
import { Panel, PanelProps } from 'components/Panel';
import { colors } from 'utils/colors';
import { Region } from 'utils/listOfRoutes';

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
  },
  TrainerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  TrainerImageWrapper: {
    height: '88px',
    width: '88px',
    position: 'relative',
  }
});

export type Clothing = {};

export interface Trainer {
  name?: Trainer;
  clothing?: Clothing;
  startDate?: number;
  regionsVisited?: Set<Region>;
  score?: number;
  money?: number;
  bp?: number;
}

export interface TrainerProps {
  username?: string;
  trainer?: Trainer;
  panelProps?: Partial<PanelProps>;
}

export function TrainerPanel({ trainer, panelProps, username }: TrainerProps) {
  return (
    <Panel name="Trainer" {...panelProps}>
      <div className={styles.TrainerInner}>
        <div className={styles.TrainerInfo}>
          <div className={classes(styles.DataWrapper, styles.TrainerImageWrapper)}>
            <img className={styles.TrainerImage} src={`./images/trainer/bald-dawn.png`} />
            <img className={styles.TrainerImage} src={`./images/trainer/blue-hair.png`} />
            <img className={styles.TrainerImage} src={`./images/trainer/red-hat.png`} />
          </div>
          
          <div className={styles.DataWrapper}>{username}</div>
          <div className={styles.DataWrapper}>Edit Clothing</div>
        </div>
        <div className={styles.TrainerInfo}>
          <div className={styles.DataWrapper}>Start Date: {trainer?.startDate || '03/01/2020'}</div>
          <div className={styles.DataWrapper}>Regions: {trainer?.regionsVisited?.size || 1}</div>
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
