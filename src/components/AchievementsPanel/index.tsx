import React from 'react';
import { Panel } from 'components';
import { stylesheet, classes } from 'typestyle';

const styles = stylesheet({
  AchievementWrapper: {
    display: 'flex',
  },
  Achievement: {
    height: '2rem',
    width: '2rem',
    //border: '1px solid rgb(255, 255, 255, 0.3)',
    margin: '2px',
    filter: 'grayscale(100%)',
    $nest: {
      '& img': {
        height: '100%',
      },
    },
  },
  AchievementObtained: {
    filter: 'grayscale(0) !important',
  },
});

export function AchivementsPanel() {
  return (
    <Panel name="Achievements">
      <div className={styles.AchievementWrapper}>
        {[
          {
            name: 'First Steps',
            obtained: true,
          },
          {
            name: 'Normal Type Catcher',
            obtained: false,
          },
          {
            name: '20 Victories',
            obtained: false,
          },
        ].map((achievement) => {
          return (
            <div
              className={classes(
                styles.Achievement,
                achievement.obtained && styles.AchievementObtained
              )}
            >
              <img
                alt={achievement.name}
                title={achievement.name}
                src={`./images/achievements/${achievement.name
                  .toLowerCase()
                  .replace(/\s/g, '-')}.png`}
              />
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
