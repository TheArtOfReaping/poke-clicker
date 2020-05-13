import React from 'react';
import { stylesheet, classes } from 'typestyle';
import { Panel, PanelProps } from 'components/Panel';
import { colors } from 'utils/colors';
import { Trainer, Region } from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import { openDialog } from 'actions';
import { State } from 'state';
import { DialogKind } from 'components/Dialog';

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
    height: '80px',
    width: '80px',
    position: 'relative',
    imageRendering: 'pixelated',
  },
  EditClothingButton: {
    cursor: 'pointer',
    borderRadius: '4px',
    $nest: {
      '&:hover': {
        background: colors.secondary.get(),
      }
    }
  }
});



export interface TrainerProps {
  username?: string;
  trainer?: Trainer;
  panelProps?: Partial<PanelProps>;
}

export function TrainerImage({trainer, className, imgClassName}: {trainer: Trainer, className?: string, imgClassName?: string}) {
  return <div className={classes(styles.DataWrapper, styles.TrainerImageWrapper, className)}>
    {trainer.clothing?.background && <img className={classes(styles.TrainerImage, imgClassName)} src={`./images/trainer/${trainer.clothing.background.img}.png`} />}
    <img className={classes(styles.TrainerImage, imgClassName)} src={`./images/trainer/base-dawn.png`} />
    {trainer.clothing?.hair && <img className={classes(styles.TrainerImage, imgClassName)} src={`./images/trainer/${trainer.clothing.hair.img}.png`} />}
    {trainer.clothing?.eyewear && <img className={classes(styles.TrainerImage, imgClassName)} src={`./images/trainer/${trainer.clothing.eyewear.img}.png`} />}
    {trainer.clothing?.headgear && <img className={classes(styles.TrainerImage, imgClassName)} src={`./images/trainer/${trainer.clothing.headgear.img}.png`} />}
    {trainer.clothing?.footwear && <img className={classes(styles.TrainerImage, imgClassName)} src={`./images/trainer/${trainer.clothing.footwear.img}.png`} />}
    {trainer.clothing?.jacket && <img className={classes(styles.TrainerImage, imgClassName)} src={`./images/trainer/${trainer.clothing.jacket.img}.png`} />}
    {trainer.clothing?.neckwear && <img className={classes(styles.TrainerImage, imgClassName)} src={`./images/trainer/${trainer.clothing.neckwear.img}.png`} />}
  </div>
}

export function TrainerPanel({ panelProps, username }: TrainerProps) {
  const dispatch = useDispatch();
  const trainer = useSelector<State, Trainer>(state => state.trainer);
  return (
    <Panel name="Trainer" {...panelProps}>
      <div className={styles.TrainerInner}>
        <div className={styles.TrainerInfo}>
          <TrainerImage trainer={trainer} className={''} imgClassName={''} />
          
          <div className={styles.DataWrapper}>{username}</div>
          <div onClick={e => dispatch(openDialog({selectedDialog: DialogKind.TrainerCustomization}))} className={classes(styles.DataWrapper, styles.EditClothingButton)}>Edit Clothing</div>
        </div>
        <div className={styles.TrainerInfo}>
          <div className={styles.DataWrapper}>Start Date: {trainer?.startDate || '03/01/2020'}</div>
          <div className={styles.DataWrapper}>Regions: {trainer?.regionsVisited?.size || 1}</div>
          <div className={styles.DataWrapper}>Score: {trainer?.score || 0}</div>
        </div>
        <div className={styles.TrainerInfo}>
          <div className={styles.DataWrapper}>Money: ${trainer?.money?.toFixed(0)}</div>
          <div className={styles.DataWrapper}>BP: {trainer?.bp}</div>
        </div>
      </div>
    </Panel>
  );
}
