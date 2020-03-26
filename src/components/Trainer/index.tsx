import React from 'react';
import { stylesheet } from 'typestyle';
import { Panel, PanelProps } from 'components/Panel';

const styles = stylesheet({
  TrainerInner: {
    display: 'flex',
    textAlign: 'left',
  },
});

export interface TrainerProps {
  trainer?: any;
  panelProps?: Partial<PanelProps>;
}

export function Trainer({ trainer, panelProps }: TrainerProps) {
  return (
    <Panel name="Trainer" {...panelProps}>
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
