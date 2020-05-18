import React, { useState, ImgHTMLAttributes } from 'react';
import { style, classes, stylesheet } from 'typestyle';
import { Panel, PanelProps, panel } from '../Panel';
import { Item } from 'utils';
import { colors } from 'utils/colors';
import { useSelector } from 'react-redux';
import { State } from 'state';

const styles = stylesheet({
    ItemQuantity: {
        width: '60px',
        background: colors.secondary.shade1,
        display: 'inline-block',
        padding: '0.5rem',
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 'auto',
        clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
    },
    NewItem: {
        background: 'red',
        display: 'inline-block',
        padding: '0 0.25rem',
        color: 'white',
        fontWeight: 'bold',
        marginLeft: '.25rem',
        fontStyle: 'italic',
    },
    InventoryCategoryImage: {
        height: '100%',
        filter: 'invert(100%)',
    }
});

export const ItemsFilter = style({
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
});
export const ItemsWrapper = style({
    overflow: 'hidden',
    $nest: {
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
});

export const ItemEntry = style({
    display: 'flex',
    alignItems: 'center',
    //border: '1px solid #ccc',
    background: colors.primary.get(),
    marginTop: '2px',
    position: 'relative',
    cursor: 'pointer',
    borderRadius: '2px',
    transition: '200ms background 200ms',
    $nest: {
        '&:hover': {
            background: colors.primary.tint1,
            transition: '200ms all',
        },
    },
});
export const ItemHighlighted = style({
    background: colors.primary.tint1,
});
export const ContextMenu = style({
    background: colors.primary.get(),
    zIndex: 1,
    position: 'absolute',
    bottom: '0',
    right: '0rem',
    width: '10rem',
    border: '1px solid transparent',
    borderColor: colors.primary.inverse,
    boxShadow: '0 0 1rem rgba(0,0,0,0.1)',
    transition: '250ms all',
    $nest: {
        '&::before': {
            content: '\'\'',
            width: 0,
            height: 0, 
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent', 
            borderRight: '10px solid white',
            position: 'absolute',
            bottom: '0.5rem',
            left: '-10px',
        }
    }
});
export const ContextMenuItem = style({
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '250ms all',
    $nest: {
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
            transition: '250ms all',
        },
    },
});

export const InventoryStyle = style({
    marginTop: '1rem',
    border: '1px solid #444',
    padding: '1rem',
    borderRadius: '0.25rem',
});

export enum ItemCategory {
  All = 'All',
  Balls = 'Balls',
  Medicine = 'Medicine',
  Berries = 'Berries',
  Evolution = 'Evolution',
  HoldItems = 'HoldItems',
  TM = 'TM',
  Key = 'Key',
  MegaStones = 'Mega Stones',
}

export interface InventoryItem {
  category: ItemCategory;
  img: string;
  name: string;
  quantity: number;
  description?: string;
}

export interface InventoryProps {
  inventory?: InventoryItem[];
  panelProps?: Partial<PanelProps>;
}

export interface InventoryItemProps {
  item: Item;
  idx: number;

  contextId: number;
  isContextMenu: boolean;
  onClick: (id: number) => (e?: any) => void;
  onClickToss: (e?: React.MouseEvent) => void;
}

export function ItemIcon({img, folder, imgProps, outline = true}: Partial<Item> & {imgProps?: ImgHTMLAttributes<HTMLElement>; outline?: boolean}) {
    return <img
        {...imgProps}
        alt=''
        style={{imageRendering: 'pixelated'}}
        src={`https://github.com/msikma/pokesprite/blob/master/${outline ? 'items-outline' : 'items'}/${folder}/${img}.png?raw=true`}
    />;
}

export function InventoryItem({item, idx, contextId, isContextMenu, onClick, onClickToss}: InventoryItemProps) {
    const {img, folder} = item;
    if (!item.quantity) {
        return null;
    }
    return <div
        onClick={onClick(idx)}
        key={idx}
        className={classes(
            'fs-small',
            'item-entry',
            ItemEntry,
            contextId === idx && ItemHighlighted
        )}
    >
        {isContextMenu && contextId === idx && (
            <div className={ContextMenu}>
                <div className={ContextMenuItem}>Use</div>
                <div className={ContextMenuItem} onClick={e => onClick(-1)}>Cancel</div>
            </div>
        )}
        <ItemIcon img={img} folder={folder} />
        <span style={{ display: 'inline-block', marginLeft: '1rem' }}>
            {item.name}
        </span>
        {item?.new && (
            <span
                className={styles.NewItem}
            >
        NEW!
            </span>
        )}
        <span
            className={styles.ItemQuantity}
        >
            {item.folder === 'key-item' ? 'KEY' : `x${item.quantity}`}
        </span>
    </div>;
}

export function Inventory({ panelProps }: InventoryProps) {
    const inventory = useSelector<State, State['inventory']>(state => state.inventory);
    const [isContextMenu, setContextMenu] = useState(false);
    const [isOverlay, setOverlay] = useState(false);
    const [contextId, setContextId] = useState(-1);
    const [selectedCategory, selectCategory] = useState<string | null>(null);

    const onClick = (id: number) => (e: any) => {
        e.preventDefault();
        setContextMenu(true);
        if (id !== contextId) {
            setContextId(id);
        } else {
            setContextId(-1);
        }
    };

    const inventoryFilter = (category: string) => (e: any) => {
        category === selectedCategory ?
            selectCategory(null) :
            selectCategory(category);
    };

    const onClickToss = (e: any) => {
        setOverlay(true);
    };

    return (
        <Panel
            name="Bag"
            overlay={isOverlay}
            onClickOverlay={(e) => setOverlay(false)}
            {...panelProps}
        >
            <div className={classes(ItemsWrapper)}>
                <div className={ItemsFilter}>
                    {['ball', 'medicine', 'battle-items', 'berries', 'other-items', 'tms', 'treasures', 'ingredients', 'key-items'].map((category, idx) => {
                        return (
                            <div
                                onClick={inventoryFilter(category)}
                                className="fs-x-small"
                                style={{
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    background: category === selectedCategory ? colors.secondary.get() : colors.black.tint1,
                                    width: '2rem',
                                    padding: '0.5rem',
                                    height: '2rem',
                                    textAlign: 'center',
                                    borderRadius: '50%',
                                    margin: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img className={styles.InventoryCategoryImage} alt={category} src={`./images/bag-icons/${category}.png`} />
                            </div>
                        );
                    })}
                </div>

                {inventory.filter(item => selectedCategory ? item.folder === selectedCategory : true).map((item, idx) => (
                    <InventoryItem key={idx} contextId={contextId} isContextMenu={isContextMenu} item={item} onClick={onClick} onClickToss={onClickToss} idx={idx} />
                ))}
            </div>
        </Panel>
    );
}
