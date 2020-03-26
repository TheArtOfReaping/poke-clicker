import React, { useState, ImgHTMLAttributes } from 'react';
import { style, classes } from 'typestyle';
import { Panel, PanelProps, panel } from '../Panel';
import { listOfItems, Item } from 'utils';

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
  border: '1px solid #ccc',
  background: '#222',
  marginTop: '2px',
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '2px',
  transition: '200ms all 200ms',
  $nest: {
    '&:hover': {
      background: '#444',
      transition: '200ms all',
    },
  },
});
export const ItemHighlighted = style({
  background: '#444',
});
export const ContextMenu = style({
  background: '#333',
  zIndex: 1,
  position: 'absolute',
  top: '1rem',
  right: '0rem',
  width: '10rem',
  border: '1px solid white',
});
export const ContextMenuItem = style({
  height: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  alignItems: 'center',
  cursor: 'pointer',

  $nest: {
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
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

export function ItemIcon({img, folder, imgProps}: Partial<Item> & {imgProps?: ImgHTMLAttributes<HTMLElement>}) {
  return <img
      {...imgProps}
      alt=''
      src={`https://github.com/msikma/pokesprite/blob/master/items-outline/${folder}/${img}.png?raw=true`}
    />
}

export function InventoryItem({item, idx, contextId, isContextMenu, onClick, onClickToss}: InventoryItemProps) {
  const {img, folder} = item;
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
        <div onClick={onClickToss} className={ContextMenuItem}>
          Toss
        </div>
      </div>
    )}
    <ItemIcon img={img} folder={folder} />
    <span style={{ display: 'inline-block', marginLeft: '1rem' }}>
      {item.name}
    </span>
    {item?.new && (
      <span
        style={{
          display: 'inline-block',
          background: 'red',
          marginLeft: '4px',
          borderRadius: '.25rem',
          padding: '0 4px',
          fontStyle: 'italic',
        }}
      >
        NEW!
      </span>
    )}
    <span
      style={{
        width: '60px',
        background: 'red',
        display: 'inline-block',
        padding: '0.5rem',
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 'auto',
        clipPath: `polygon(8% 0, 100% 0, 100% 100%, 0% 100%)`,
      }}
    >
      x{item.quantity}
    </span>
  </div>
}

export function Inventory({ inventory = [], panelProps }: InventoryProps) {
  const [isContextMenu, setContextMenu] = useState(false);
  const [isOverlay, setOverlay] = useState(false);
  const [contextId, setContextId] = useState(-1);

  const onClick = (id: number) => (e: any) => {
    e.preventDefault();
    setContextMenu(true);
    if (id !== contextId) {
      setContextId(id);
    } else {
      setContextId(-1);
    }
  };

  const inventoryFilter = (category: string) => (e: any) => {};

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
          {['A', 'B', 'M', 'H', 'B', 'E', 'K'].map((category, idx) => {
            return (
              <div
                onClick={inventoryFilter(category)}
                className="fs-x-small"
                style={{
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  background: category === 'A' ? '#ada160' : '#444',
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
                {category}
              </div>
            );
          })}
        </div>

        {listOfItems.map((item, idx) => (
          <InventoryItem contextId={contextId} isContextMenu={isContextMenu} item={item} onClick={onClick} onClickToss={onClickToss} idx={idx} />
        ))}
      </div>
    </Panel>
  );
}
