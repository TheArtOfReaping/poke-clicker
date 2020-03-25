import React from 'react';
import { stylesheet } from 'typestyle';
import { Panel } from 'components/Panel';

const styles = stylesheet({
  TrainerInner: {
    display: 'flex',
    textAlign: 'left',
  },
});

export interface TrainerProps {
  trainer?: any;
}

export function Trainer({ trainer }: TrainerProps) {
  return (
    <Panel name="Trainer">
      <div className={styles.TrainerInner}>
        <div>
          <img src="https://cdn.bulbagarden.net/upload/d/d6/Spr_Pt_Dawn.png" />
          <div>Emma</div>
        </div>
        <div>
          <div>Start Date: {trainer?.date || '03/01/2020'}</div>
          <div>Regions: {trainer?.regions || 1}</div>
        </div>
      </div>
    </Panel>
  );
}
