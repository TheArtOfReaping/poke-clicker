import React from 'react';
import { Quest, Item, Reward, colors, PartyPokemon, StyleItem } from 'utils';
import { stylesheet, classes } from 'typestyle';
import { ItemIcon } from 'components/Inventory';
import { PokemonIcon } from 'components/PokemonIcon';
import { color } from 'csx';

const styles = stylesheet({
    QuestItem: {
        //padding: '.25rem',
        margin: '.25rem',
        borderRadius: '.25rem',
        border: `1px solid ${colors.primary.shade2}`,
        background: colors.secondary.desaturate2,
        position: 'relative',
        $nest: {
            '&:hover': {
                background: color(colors.secondary.desaturate1).lighten(0.1).toString()
            }
        }
    },
    QuestItemTitle: {
        fontSize: '120%',
        textAlign: 'left',
        marginLeft: '4px',
        display: 'flex',
    },
    QuestItemRank: {
        background: colors.white.get(),
        borderRadius: '50%',
        padding: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '2rem',
        height: '2rem',
        color: colors.primary.get(),
        position: 'absolute',
        right: '4px',
        top: '4px',
    },
    QuestItemDescription: {
        textAlign: 'left',
        marginLeft: '4px',
    },
    QuestItemRewardsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    QuestItemReward: {
        display: 'flex',
        alignItems: 'center',
        background: colors.primary.shade2,
        borderRadius: '4px',
        padding: '2px 4px',
        margin: '2px',
        position: 'relative',
        height: '40px',
        width: '32%',
        $nest: {
            '&:img': {
                // position: 'absolute',
                // bottom: '50%',
                // left: '2px',
            }
        }
    },
    QuestItemRequester: {

    },
    QuestItemRewardQuantity: {
        marginLeft: 'auto',
    }
});

export interface QuestItemRewardsProps {
    rewards: Quest['rewards'];
}
export function QuestItemRewards({rewards}: QuestItemRewardsProps) {
    const provideImage = (type: Reward<any>['rewardType'], reward?: Reward<any>['reward']) => {
        const r = reward;
        if (type === 'item') {
            return <span><ItemIcon imgProps={{height: '24px'}} {...(r as Item)} />{(r as Item)?.name}</span>;
        } else if (type === 'pokemon') {
            return <span><PokemonIcon imgProps={{height: '40px'}} pokemon={r as PartyPokemon} />{(r as PartyPokemon)?.species}</span>;
        } else if (type === 'money') {
            return `$${r?.amount}`;
        } else if (type === 'styleItem') {
            return `${(r as StyleItem).name}`;
        } {
            return null;
        }
    };
    return <div className={styles.QuestItemRewardsWrapper}>
        {rewards?.map(reward => {
            const r = reward.reward as Item;
            return <div className={styles.QuestItemReward} >
                {provideImage(reward.rewardType, reward.reward)}
                <div className={styles.QuestItemRewardQuantity}>×{reward.rewardQuantity}</div>
            </div>;
        })}
    </div>;
}

export interface QuestItemProps {
    quest: Quest;
}

export function QuestItem({quest}: QuestItemProps) {
    return <div className={classes(styles.QuestItem)}>
        <div className={styles.QuestItemTitle}>
            <span>{quest.title}</span>    
        </div>
        {quest.rank && <div className={styles.QuestItemRank}>{quest.rank}</div>}
        <div className={styles.QuestItemDescription}>{quest.description}</div>
        <QuestItemRewards rewards={quest.rewards} />
    </div>;
}

// id: number;
//     occurrences?: number;
//     maxOccurrences?: number;
//     title?: string;
//     description?: string;
//     accepted?: boolean;
//     rewards?: Rewards;
//     requester?: string;