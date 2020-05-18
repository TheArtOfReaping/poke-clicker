import React from 'react';
import { Panel } from 'components';
import { stylesheet, classes } from 'typestyle';
import { PanelProps } from 'components/Panel';
import { colors } from 'utils';

const styles = stylesheet({
    AchievementWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    Achievement: {
        height: '40px',
        width: '40px',
        //border: '1px solid rgb(255, 255, 255, 0.3)',
        margin: '2px',
        filter: 'grayscale(100%)',
        background: colors.primary.get(),
        borderRadius: '50%',
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

export interface AchievementsPanelProps {
  panelProps?: Partial<PanelProps>;
}

export function AchivementsPanel({panelProps}: AchievementsPanelProps) {
    return (
        <Panel name="Achievements" {...panelProps}>
            <div className={styles.AchievementWrapper}>
                {[
                    // {
                    //   name: 'First Steps Alt',
                    //   obtained: true,
                    //   description: 'Awarded to trainers who\'ve taken their first steps in their journey.',
                    // },
                    // {
                    //   name: 'Boutique Star',
                    //   obtained: true,
                    // },
                    {
                        name: 'First Route Clear',
                        obtained: false,
                    },
                    {
                        name: 'First Dozen Routes',
                        obtained: false,
                    },
                    {
                        name: 'Region Clear',
                        obtained: false,
                    },
                    {
                        name: 'Normal Type Catcher',
                        obtained: false,
                    },
                    {
                        name: '20 Victories',
                        obtained: false,
                    },
                    {
                        name: '30 Boxed',
                        obtained: false,
                    },
                    {
                        name: '120 Boxed',
                        obtained: false,
                    },
                    {
                        name: '360 Boxed',
                        obtained: false,
                    },
                    {
                        name: '1k Boxed',
                        obtained: false,
                    },
                    {
                        name: 'Evolutionista',
                        obtained: false,
                    },
                    {
                        name: 'Got the Moves',
                        obtained: false,
                    },
                    {
                        name: 'Exp Millionaire',
                        obtained: false,
                    },
                    {
                        name: 'First Friend',
                        obtained: false,
                    },
                    {
                        name: 'Teamwork',
                        obtained: false,
                    },
                    {
                        name: 'Too Many Friends',
                        obtained: false,
                    }
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
                                style={{imageRendering: 'pixelated'}}
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
