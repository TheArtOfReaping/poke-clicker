import React, { useState } from 'react';
import {stylesheet, classes} from 'typestyle';
import { DialogKind, Dialog } from 'components/Dialog';
import { editTrainer } from 'actions';
import { State } from 'state';
import { useSelector, useDispatch } from 'react-redux';
import { colors, StyleItem, getCategoryStyleItems, StyleCategory, getStyleItem, Trainer } from 'utils';
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
        //margin: '8px',
    },
    TrainerStyleItem: {
        //background: colors.primary.tint2,
        imageRendering: 'pixelated',
        width: '80px',
        height: '80px',
    },
    TrainerStyleWrapper: {
        display: 'flex',
        background: colors.primary.shade2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
});

export function TrainerStyleItem({clothing, onClick, category}: {clothing?: StyleItem; onClick?: () => void; category?: StyleCategory}) {
    return <div onClick={onClick} className={styles.TrainerStyleWrapper}>
        <div className={styles.StyleItemCategory}>{category}</div>
        {clothing && <img alt='' className={styles.TrainerStyleItem} src={`./images/trainer/${clothing.img}.png`} />}
        <span>{clothing?.name || 'None'}</span>
    </div>;
}


export function TrainerCustomization() {
    const dispatch = useDispatch();
    const trainer = useSelector<State, State['trainer']>(state => state.trainer);
    const styleItems = useSelector<State, State['styleItems']>(state => state.styleItems);
    const [selectedCategory, setSelectedCategory] = useState<StyleCategory>(StyleCategory.Hair);
    const categoryItems = getCategoryStyleItems(selectedCategory, styleItems);

    const selectItem = (name: string) => () => dispatch(editTrainer({
        ...trainer,
        clothing: {
            ...trainer.clothing,
            [selectedCategory]: getStyleItem(name),
        }
    }));

    const CategoryStyleItem = ({trainer, category}: {trainer: Trainer; category: StyleCategory}) => <TrainerStyleItem category={category} onClick={() => setSelectedCategory(category)} clothing={trainer.clothing?.[category]} />;
    const mapToStyleItem = (trainer: Trainer) => (cat: StyleCategory, idx: number) => <CategoryStyleItem key={idx} trainer={trainer} category={cat} />;


    return <Dialog kind={DialogKind.Storage} title='Trainer Customization' className={styles.Dialog}>
        <div className={styles.TrainerCustomWrapper}>

            <div className={styles.TrainerCustomSelections}>
                <div className={styles.Column}>
                    {[StyleCategory.Headgear, StyleCategory.Hair, StyleCategory.Eyewear, StyleCategory.Bag].map(mapToStyleItem(trainer))}
                </div>

                <div className={styles.Column}>
                    <TrainerImage trainer={trainer} className={styles.BaseTrainerImage} imgClassName={styles.AdditionalTrainerImage} />
                    <div className={styles.Row}>
                        {[StyleCategory.Bottoms, StyleCategory.Footwear].map(mapToStyleItem(trainer))}
                    </div>
                </div>
                <div className={styles.Column}>
                    {[StyleCategory.Neckwear, StyleCategory.Shirt, StyleCategory.Jacket, StyleCategory.Background].map(mapToStyleItem(trainer))}
                </div>
                <div className={styles.Column}>
                    <div onClick={selectItem('')} className={classes(styles.ItemName, trainer.clothing![selectedCategory] == null ? styles.ItemNameSelected : '')}>{'None'}</div>
                    {categoryItems.length !== 0 ? categoryItems.filter(item => item.quantity).map((item) => {
                        const isSelected = trainer.clothing![selectedCategory]?.name === item.name;
                        return <div onClick={selectItem(item.name)} key={item.name} className={classes(styles.ItemName, isSelected && styles.ItemNameSelected)}>{item.name} ({item.quantity})</div>;
                    }) : <div className={classes(styles.ItemName, styles.ItemNameEmpty)}>You Have No Matching Style Options!</div>}

                </div>
                
            </div>

        </div>
    </Dialog>;
}