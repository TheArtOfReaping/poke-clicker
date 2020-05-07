import React, { useState } from 'react';
import {stylesheet, classes} from 'typestyle';
import { DialogKind, Dialog } from 'components/Dialog';
import { State, editTrainer } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { StyledSprite } from 'components/Party/StyledSprite';
import { colors, Stat, StyleItem, getCategoryStyleItems, StyleCategory, getStyleItem } from 'utils';
import { Button } from 'components/Button';
import { PartyPokemon } from 'utils';
import { PokemonView } from 'components/Party/PokemonView';
import { color } from 'csx';
import { TrainerImage } from '.';

const styles = stylesheet({
    Dialog: {
        flexDirection: 'column',
        overflowY: 'auto',
        position: 'relative',
        height: '100%',
    },
    TrainerCustomWrapper: {

    },
    BaseTrainerImage: {
        background: colors.primary.tint1,
        height: '240px',
        imageRendering: 'pixelated',
        margin: '8px',
        width: '240px',
    },
    AdditionalTrainerImage: {
        height: '240px',
        margin: '8px',
    },
    TrainerStyleItem: {
        //background: colors.primary.tint2,
        imageRendering: 'pixelated',
    },
    TrainerStyleWrapper: {
        display: 'flex',
        background: colors.primary.shade2,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '110px',
        margin: '8px',
        width: '110px',
        position: 'relative',
        cursor: 'pointer',
        $nest: {
            '&:hover': {
                outline: '1px solid white',
                transition: '200ms all',
            }
        }
    },
    Column: {
        display: 'flex',
        flexDirection: 'column',
    },
    TrainerCustomSelections: {
        display: 'flex',
    },
    StyleItemCategory: {
        position: 'absolute',
        top: '-6px',
        right: '0',
        width: '60px',
        textAlign: 'center',
        borderRadius: '4px',
        background: colors.primary.shade2,
        padding: '4px',
    },
    Row: {
        display: 'flex',
        marginTop: '-4px',
    },
    ItemName: {
        padding: '4px',
        fontSize: '110%',
        background: colors.primary.tint1,
        margin: '4px',
        width: '200px',
        cursor: 'pointer',
    },
    ItemNameSelected: {
        background: colors.secondary.shade2,
    },
    ItemNameEmpty: {
        background: colors.red.tint1,
    }
})

export function TrainerStyleItem({clothing, onClick, category}: {clothing?: StyleItem, onClick?: () => void, category?: StyleCategory}) {
    return <div onClick={onClick} className={styles.TrainerStyleWrapper}>
        <div className={styles.StyleItemCategory}>{category}</div>
    {clothing && <img className={styles.TrainerStyleItem} src={`./images/trainer/${clothing.img}.png`} />}
    <span>{clothing?.name || 'None'}</span>
</div>
}

export function TrainerCustomization() {
    const dispatch = useDispatch();
    const trainer = useSelector<State, State['trainer']>(state => state.trainer);
    const [selectedCategory, setSelectedCategory] = useState<StyleCategory>(StyleCategory.Hair);
    const categoryItems = getCategoryStyleItems(selectedCategory);

    const selectItem = (name: string) => () => dispatch(editTrainer({
        ...trainer,
        clothing: {
            ...trainer.clothing,
            [selectedCategory]: getStyleItem(name),
        }
    }))

    return <Dialog kind={DialogKind.Storage} title='Trainer Customization' className={styles.Dialog}>
        <div className={styles.TrainerCustomWrapper}>

            <div className={styles.TrainerCustomSelections}>
                <div className={styles.Column}>
                    <TrainerStyleItem category={StyleCategory.Headgear} onClick={() => setSelectedCategory(StyleCategory.Headgear)} clothing={trainer.clothing?.headgear} />
                    <TrainerStyleItem category={StyleCategory.Hair} onClick={() => setSelectedCategory(StyleCategory.Hair)} clothing={trainer.clothing?.hair} />
                    <TrainerStyleItem category={StyleCategory.Eyewear} onClick={() => setSelectedCategory(StyleCategory.Eyewear)} clothing={trainer.clothing?.eyewear} />
                </div>

                <div className={styles.Column}>
                    <TrainerImage trainer={trainer} className={styles.BaseTrainerImage} imgClassName={styles.AdditionalTrainerImage} />
                    <div className={styles.Row}>
                        <TrainerStyleItem category={StyleCategory.Bottoms} onClick={() => setSelectedCategory(StyleCategory.Bottoms)} clothing={trainer.clothing?.bottoms} />
                        <TrainerStyleItem category={StyleCategory.Footwear} onClick={() => setSelectedCategory(StyleCategory.Footwear)} clothing={trainer.clothing?.footwear} />
                    </div>
                </div>
                <div className={styles.Column}>
                    <TrainerStyleItem category={StyleCategory.Neckwear} onClick={() => setSelectedCategory(StyleCategory.Neckwear)} clothing={trainer.clothing?.neckwear} />
                    <TrainerStyleItem category={StyleCategory.Shirt} onClick={() => setSelectedCategory(StyleCategory.Shirt)} clothing={trainer.clothing?.shirt} />
                    <TrainerStyleItem category={StyleCategory.Jacket} onClick={() => setSelectedCategory(StyleCategory.Jacket)} clothing={trainer.clothing?.jacket} />
                </div>
                <div className={styles.Column}>
                    <div onClick={selectItem('')} className={classes(styles.ItemName, trainer.clothing![selectedCategory] == null ? styles.ItemNameSelected : '')}>{'None'}</div>
                    {categoryItems.length !== 0 ? categoryItems.map((item, idx) => {
                        const isSelected = trainer.clothing![selectedCategory]?.name === item.name;
                        return <div onClick={selectItem(item.name)} key={item.name} className={classes(styles.ItemName, isSelected && styles.ItemNameSelected)}>{item.name}</div>
                    }) : <div className={classes(styles.ItemName, styles.ItemNameEmpty)}>You Have No Matching Style Options!</div>}

                </div>
                
            </div>

        </div>
    </Dialog>;
}