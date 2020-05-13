import React, { useState, useEffect } from 'react';
import { stylesheet, classes } from "typestyle";
import { getItem } from 'utils/listOfRoutes';
import { colors } from 'utils/colors';
import { ItemIcon } from 'components/Inventory';
import { Item, dateAsRng, Nullable, listOfStyleItems, StyleItem, getStyleItem, StyleCategory } from 'utils';
import { Button } from 'components/Button';
import {  editTrainer, editItem, editStyleItem } from 'actions';
import { State } from 'state';
import { useDispatch, useSelector } from 'react-redux';
import * as queries from 'graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { Dialog, DialogKind } from 'components/Dialog';
import {useInput} from 'rooks';
import {DateTime} from 'luxon';


const styles = stylesheet({
    MartPanel: {
        width: '50%',
        height: '100%',
        border: `1px solid ${colors.primary.tint1}`,
        padding: '0.5rem',
        paddingTop: '1rem',
        position: 'relative',
        margin: '0.25rem',
        background: colors.primary.get(),
    },
    SellPanel: {
        width: '50%',
    },
    PanelHeading: {
        fontSize: '1.15rem',
        position: 'absolute',
        top: '-0.75rem',
        width: '120px',
        background: colors.primary.tint1,
        padding: '0.25rem 0.5rem',
        textAlign: 'left',
    },
    PurchaseItem: {
        background: colors.primary.shade1,
        display: 'flex',
        alignItems: 'center',
        padding: '0.25rem',
        margin: '0.25rem',
    },
    MartButton: {
        marginLeft: 'auto',
        width: '25%',
        borderRadius: 0,
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
    BuyButton: {
        
    },
    SellButton: {
        background: colors.pink.get(),
        $nest: {
            '&:hover': {
                background: colors.pink.shade1,
            }
        },
    },
    ItemName: {
        width: '120px',
        textAlign: 'left',
    },
    DailyDealItem: {
        backgroundImage: `linear-gradient(120deg, #f6d365 0%, #fda085 100%)`,
        color: colors.black.get(),
        transform: 'scale(1.05)',
        paddingBottom: '8px',
        marginTop: '14px',
    },
    DailyDealItemPlaceholder: {
        height: '42px',
    },
    DailyDealTag: {
        marginLeft: '8px',
        fontWeight: 'bold',
        background: colors.primary.get(),
        color: colors.white.get(),
        padding: '0.25rem',
        fontSize: '0.75rem',
    },
    QuantityOwnedTag: {
        marginLeft: '4px',
        background: colors.primary.get(),
        color: colors.white.get(),
        padding: '0.25rem',
        fontSize: '0.75rem',
        borderRadius: '.25rem',
        width: '4.5rem',
        marginRight: '4px',
    },
    DailyDealName: {
        fontWeight: 'bold',
    },
    DailyDealNotice: {
        color: colors.white.fadeOut1,
        position: 'absolute',
        fontSize: '90%',
        fontWeight: 'bold',
        letterSpacing: '2px',
        //left: 'calc(2.25rem - 4px)',
        top: '-10px',
        background: colors.red.get(),
        clipPath: `polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 0% 50%, 0% 0%)`,
        padding: '0 8px',
        textAlign: 'center',
    },
    DailyDealContent: {
        position: 'absolute',
        bottom: '0',
        fontSize: '90%',
        left: '16px',
        width: '80%',
        textAlign: 'left',
    },
    MartItemInput: {
        background: colors.primary.get(),
        color: colors.white.get(),
        border: 'none',
        marginLeft: 'auto',
        textAlign: 'right',
        justifyContent: 'flex-end',
        marginRight: '4px',
        maxWidth: '40px',
    },
    BoutiquePanel: {
        position: 'relative',
        marginTop: '2rem',
    },
    BoutiqueItemName: {
        margin: '2px 4px',
    },
    Sprite: {
        imageRendering: 'pixelated',
    }

})

export const slashPrice = (price?: number) => {
    if (!price) {
        return null;
    } else {
        return price / 2;
    }
}

export interface PokemartProps {

}

export type BuyOrSellFunction<T = Item> = ({
    type,
    item,
    sellPrice,
    buyPrice,
    sellAmount,
    buyAmount,
}: {
    type?: 'Buy' | 'Sell',
    item?: T,
    sellPrice: Nullable<number>,
    buyPrice: number,
    sellAmount: number,
    buyAmount: number,
}) => void;

export function MartItem({item, type, dailyDeal, onClick}: {item?: Item & {content?: string}, type?: 'Sell' | 'Buy', dailyDeal?: boolean, onClick: BuyOrSellFunction}) {
    // TODO: Be warned, sellAmount & buyAmount are implicity any types
    const sellAmount = useInput(1);
    const buyAmount = useInput(1);
    const money = useSelector<State, number | undefined>(state => state?.trainer?.money);
    const itemPrice = item?.price || 0;
    const sellPrice = slashPrice(itemPrice);
    console.log('money', money, 'sellAmount', sellAmount.value, 'buyAmount', buyAmount.value);
    const canBuy = money && (money) - (itemPrice * buyAmount.value) >= 0;
    const canSell = (item?.quantity || 0) - sellAmount.value >= 0;
    const inventory = useSelector<State, State['inventory']>(state => state.inventory);

    // [NOTE] Indicates item is not for sale
    if (type === 'Sell' && !sellPrice) return null;
    return <div className={classes(styles.PurchaseItem, dailyDeal && styles.DailyDealItem)}>
        <ItemIcon img={item?.img} folder={item?.folder} />
        <span className={classes(styles.ItemName, dailyDeal && styles.DailyDealName)}>
            {item?.name}
        </span>
        {dailyDeal && <div className={styles.DailyDealContent}>{item?.content}</div>}
        {dailyDeal && <span className={styles.DailyDealNotice}>DAILY DEAL!</span>}
        {<span className={styles.QuantityOwnedTag}>Owned: {item?.quantity}</span>}
        {type === 'Buy' && <input className={styles.MartItemInput} type='number' min='1' onChange={buyAmount.onChange} value={buyAmount.value} />}
        {type === 'Sell' && <input className={styles.MartItemInput} type='number' min='1' max={item?.quantity} {...sellAmount} onChange={sellAmount.onChange} value={sellAmount.value} />}
        <Button onClick={e => onClick({type, item, sellPrice, buyPrice: itemPrice, sellAmount: sellAmount.value, buyAmount: buyAmount.value})} disabled={type === 'Buy' ? !canBuy : !canSell} className={classes(styles.MartButton, styles[type === 'Sell' ?  'SellButton' : 'BuyButton'])} value={type === 'Sell' ? `SELL $${sellPrice}` : `BUY $${itemPrice * buyAmount.value}`} />
    </div>;
}

export function BoutiqueItem({item, type, onClick}: {item?: StyleItem, type?: 'Sell' | 'Buy', onClick: BuyOrSellFunction<StyleItem>}) {
    // TODO: Be warned, sellAmount & buyAmount are implicity any types
    const sellAmount = useInput(1);
    const buyAmount = useInput(1);
    const money = useSelector<State, number | undefined>(state => state?.trainer?.money);
    const itemPrice = item?.price || 0;
    const sellPrice = slashPrice(itemPrice);
    const canBuy = money && (money) - (itemPrice * buyAmount.value) >= 0;
    const canSell = (item?.quantity || 0) - sellAmount.value >= 0;
    const inventory = useSelector<State, State['inventory']>(state => state.inventory);

    // [NOTE] Indicates item is not for sale
    if (type === 'Sell' && !sellPrice) return null;
    return <div className={classes(styles.PurchaseItem)}>
        <img className={classes(styles.Sprite)} src={`./images/trainer/${item?.img}.png`} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span className={classes(styles.ItemName, styles.BoutiqueItemName)}>{item?.name}</span>
            {<span className={styles.QuantityOwnedTag}>Owned: {item?.quantity}</span>}
        </div>
        {type === 'Buy' && <input className={styles.MartItemInput} type='number' min='1' onChange={buyAmount.onChange} value={buyAmount.value} />}
        {type === 'Sell' && <input className={styles.MartItemInput} type='number' min='1' max={item?.quantity} {...sellAmount} onChange={sellAmount.onChange} value={sellAmount.value} />}
        <Button onClick={e => onClick({type, item, sellPrice, buyPrice: itemPrice, sellAmount: sellAmount.value, buyAmount: buyAmount.value})} disabled={type === 'Buy' ? !canBuy : !canSell} className={classes(styles.MartButton, styles[type === 'Sell' ?  'SellButton' : 'BuyButton'])} value={type === 'Sell' ? `SELL $${sellPrice}` : `BUY $${itemPrice * buyAmount.value}`} />
    </div>;
}

export const sellingFilter = (item: {quantity: number}) => (item?.quantity || 0) > 0;

export function Pokemart({}: PokemartProps) {
    const dispatch = useDispatch();
    const [dailyDeal, setDailyDeal] = useState<{item?: Item, price?: number, content?:string}>({item: undefined, price: undefined, content: undefined});
    const inventory = useSelector<State, State['inventory']>(state => state.inventory);
    const styleItems = useSelector<State, State['styleItems']>(state => state.styleItems);
    const trainer = useSelector<State, State['trainer']>(state => state.trainer);
    async function fetchy() {
        const date = DateTime.local().toLocaleString();
        const allDailyDeals = await API.graphql(graphqlOperation(queries.listDailyDeals, {
            filter: {date: {eq: date}
            }}));
        const dailyDeal = (allDailyDeals as any)?.data?.listDailyDeals.items[0];
        const ddItem = dailyDeal.title;
        const ddPrice = dailyDeal.price;
        const ddContent = dailyDeal.content;
        setDailyDeal({item: getItem(ddItem), price: ddPrice, content: ddContent});      
    }

    const rng = 10 || Math.ceil(dateAsRng() * 100);
    console.log(rng);

    const extraItems: Record<number, (Item | undefined)[]> = {
        9: [getItem('Dive Ball'), getItem('Max Potion')],
        10: [getItem('Rare Candy'), getItem('Moon Stone')]
    }

    const martItems = [
        getItem('Potion'),
        getItem('Poké Ball'),
        getItem('Super Potion'),
        getItem('Great Ball'),
        ...(extraItems[rng] == null ? [] : extraItems[rng]),
    ];

    const extraBoutiqueItems: Record<number, (StyleItem | undefined)[]> = {
        10: [getStyleItem('Pink Hat'), getStyleItem('Dimmahat')]
    }

    const boutiqueItems = [
        getStyleItem('Red Hat'),
        ...(extraBoutiqueItems[rng] == null ? [] : extraBoutiqueItems[rng]),
    ]

    const buyOrSellItem: BuyOrSellFunction = ({type,
        item,
        sellPrice,
        buyPrice,
        sellAmount,
        buyAmount}) => {
            const foundItem = inventory.find(inv => inv.id === item?.id);
            console.log(item?.id, item?.name);
            if (foundItem) {
                if (type === 'Sell') {
                    dispatch(editTrainer({...trainer, money: (trainer?.money || 0) + (sellPrice || 0)}));
                    dispatch(editItem({...foundItem, quantity: (foundItem?.quantity || 0) - Number.parseInt(sellAmount as any)}))
                } else if (type === 'Buy') {
                    dispatch(editTrainer({...trainer, money: (trainer?.money || 0) - (buyPrice || 0)}));
                    dispatch(editItem({...foundItem, quantity: (foundItem?.quantity || 0) + Number.parseInt(buyAmount as any)}))
                }
            } else {
                return;
            }
    }

    const buyOrSellStyleItem: BuyOrSellFunction<StyleItem> = ({type,
        item,
        sellPrice,
        buyPrice,
        sellAmount,
        buyAmount}) => {
            const foundItem = styleItems.find(inv => inv.id === item?.id);
            if (foundItem) {
                if (type === 'Sell') {
                    const quantity = (foundItem?.quantity || 0) - Number.parseInt(sellAmount as any);
                    dispatch(editTrainer({...trainer, money: (trainer?.money || 0) + (sellPrice || 0)}));
                    dispatch(editStyleItem({...foundItem, quantity}));
                    if (quantity <= 0) {
                        const category: StyleCategory = foundItem.category;
                        if (trainer.clothing![category]!.id === item?.id) {
                            dispatch(editTrainer({
                                clothing: {
                                    ...trainer.clothing,
                                    [category]: undefined,
                                }
                            }))
                        }
                    }
                } else if (type === 'Buy') {
                    dispatch(editTrainer({...trainer, money: (trainer?.money || 0) - (buyPrice || 0)}));
                    dispatch(editStyleItem({...foundItem, quantity: (foundItem?.quantity || 0) + Number.parseInt(buyAmount as any)}))
                }
            } else {
                return;
            }
    }

    const effectDependency = dailyDeal.item?.name;
    useEffect(() => {
        fetchy()
    }, [effectDependency])

    console.log(dailyDeal);
    
    return <Dialog kind={DialogKind.Pokemart} title='Pokémart'>
        <>
            <div className={styles.MartPanel}>
                <div className={styles.PanelHeading}>Buy</div>
                
                {dailyDeal.item && dailyDeal.price ? <MartItem onClick={buyOrSellItem} item={{...dailyDeal.item, price: dailyDeal.price, content: dailyDeal.content}} dailyDeal={true} type='Buy' /> : null}
                {!dailyDeal.item && <div className={classes(styles.PurchaseItem, styles.DailyDealItem, styles.DailyDealItemPlaceholder)}></div>}
                {martItems.map((item, idx) => <MartItem key={idx} onClick={buyOrSellItem} item={item} type='Buy' />)}

                <div className={styles.BoutiquePanel}>
                    <div className={styles.PanelHeading}>Boutique</div>
                    {boutiqueItems.map((item, idx) => <BoutiqueItem key={idx} onClick={buyOrSellStyleItem} item={item} type='Buy' />)}
                </div>
            </div>
            <div className={styles.MartPanel}>
            <div className={styles.PanelHeading}>Sell</div>
                {inventory.filter(sellingFilter).map((item, idx) => <MartItem key={idx} onClick={buyOrSellItem} item={item} type='Sell' />)}
                {styleItems.filter(sellingFilter).map((item, idx) => <BoutiqueItem key={idx} onClick={buyOrSellStyleItem} item={item} type='Sell' />)}
            </div>
        </>
    </Dialog>;
}