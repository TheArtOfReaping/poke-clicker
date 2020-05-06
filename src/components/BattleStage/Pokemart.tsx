import React, { useState, useEffect } from 'react';
import { style, stylesheet, classes } from "typestyle";
import { getItem } from 'utils/listOfRoutes';
import { colors } from 'utils/colors';
import { ItemIcon } from 'components/Inventory';
import { listOfItems, Item, dateAsRng } from 'utils';
import { Button } from 'components/Button';
import { color } from 'csx';
import { openDialog, State } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import * as queries from 'graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { any } from 'ramda';
import { Dialog, DialogKind } from 'components/Dialog';
import {useInput} from 'rooks';


const styles = stylesheet({
    MartPanel: {
        width: '50%',
        height: '100%',
        border: `1px solid ${colors.primary.tint1}`,
        padding: '0.5rem',
        paddingTop: '1rem',
        position: 'relative',
        margin: '0.25rem',
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
    },
    DailyDealTag: {
        marginLeft: '8px',
        fontWeight: 'bold',
        background: colors.primary.get(),
        color: colors.white.get(),
        padding: '0.25rem',
        fontSize: '0.75rem',
    },
    DailyDealName: {
        fontWeight: 'bold',
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

export function MartItem({item, type, dailyDeal}: {item?: Item, type?: 'Sell' | 'Buy', dailyDeal?: boolean}) {
    const sellAmount = useInput(1);
    const buyAmount = useInput(1);
    const money = useSelector<State, number | undefined>(state => state?.trainer?.money);
    const itemPrice = item?.price || 0;
    const sellPrice = slashPrice(itemPrice);
    const canBuy = ((money || 0) - (item?.price || 0) * buyAmount) >= 0;

    console.log('canBuy? ', canBuy);
    // [NOTE] Indicates item is not for sale
    if (type === 'Sell' && !sellPrice) return null;
    return <div className={classes(styles.PurchaseItem, dailyDeal && styles.DailyDealItem)}>
        <ItemIcon img={item?.img} folder={item?.folder} />
        <span className={classes(styles.ItemName, dailyDeal && styles.DailyDealName)}>{item?.name}</span>
        {dailyDeal && <span className={styles.DailyDealTag}>DAILY DEAL!</span>}
        {type === 'Buy' && <input className={styles.MartItemInput} type='number' min='1' onChange={buyAmount.onChange} value={buyAmount.value} />}
        {type === 'Sell' && <input className={styles.MartItemInput} type='number' min='1' max={item?.quantity} {...sellAmount} onChange={buyAmount.onChange} value={buyAmount.value} />}
        <Button disabled={!canBuy && type === 'Buy'} className={classes(styles.MartButton, styles[type === 'Sell' ?  'SellButton' : 'BuyButton'])} value={type === 'Sell' ? `SELL $${sellPrice}` : `BUY $${itemPrice * buyAmount.value}`} />
    </div>;
}

export const sellingFilter = (item: Item) => (item?.quantity || 0) > 0;

export function Pokemart({}: PokemartProps) {
    const dispatch = useDispatch();
    const [dailyDeal, setDailyDeal] = useState<{item?: Item, price?: number}>({item: undefined, price: undefined});
    async function fetchy() {
        const allDailyDeals = await API.graphql(graphqlOperation(queries.listDailyDeals));
        const dailyDeal = (allDailyDeals as any)?.data?.listDailyDeals?.items[0];
        const ddItem = dailyDeal.title;
        const ddPrice = dailyDeal.price;
        setDailyDeal({item: getItem(ddItem), price: ddPrice});      
    }

    const rng = Math.ceil(dateAsRng() * 100);
    console.log(rng);

    const extraItems: Record<string, (Item | undefined)[]> = {
        '9': [getItem('Dive Ball'), getItem('Max Potion')]
    }

    const martItems = [
        getItem('Potion'),
        getItem('Poké Ball'),
        getItem('Super Potion'),
        getItem('Great Ball'),
    ];


    const effectDependency = dailyDeal.item?.name;
    useEffect(() => {
        fetchy()
    }, [effectDependency])


    
    return <Dialog kind={DialogKind.Pokemart} title='Pokémart'>
        <>
            <div className={styles.MartPanel}>
                <div className={styles.PanelHeading}>Buy</div>
                {dailyDeal.item && dailyDeal.price ? <MartItem item={{...dailyDeal.item, price: dailyDeal.price}} dailyDeal={true} /> : null}
                {martItems.map((item, idx) => <MartItem item={item} type='Buy' />)}
            </div>
            <div className={styles.MartPanel}>
            <div className={styles.PanelHeading}>Sell</div>
                {listOfItems.filter(sellingFilter).map((item, idx) => <MartItem item={item} type='Sell' />)}
            </div>
        </>
    </Dialog>;
}