import React from 'react';
import { style, stylesheet } from "typestyle";
import { getItem } from 'utils/listOfRoutes';
import { colors } from 'utils/colors';
import { ItemIcon } from 'components/Inventory';
import { listOfItems } from 'utils';
import { Button } from 'components/Button';
import { color } from 'csx';


const styles = stylesheet({
    Pokemart: {
    },
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
    BuyButton: {
        marginLeft: 'auto',
        width: '25%',
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
    SellButton: {
        marginLeft: 'auto',
        width: '25%',
        background: colors.pink.get(),
        textAlign: 'right',
        justifyContent: 'flex-end',
        $nest: {
            '&:hover': {
                background: colors.pink.shade1,
            }
        },
    }

})

export const martItems = [
    getItem('Potion'),
    getItem('Poké Ball'),
    getItem('Super Potion'),
    getItem('Great Ball'),
];

export const slashPrice = (price?: number) => {
    if (!price) {
        return null;
    } else {
        return price / 2;
    }
}

export interface PokemartProps {

}

export function Pokemart({}: PokemartProps) {
    return <div className={styles.Pokemart}>
        <h1>Pokémart</h1>
        <div style={{display: 'flex'}}>
            <div className={styles.MartPanel}>
                <div className={styles.PanelHeading}>Buy</div>
                {martItems.map((item, idx) => {
                    return <div className={styles.PurchaseItem}>
                        <ItemIcon img={item?.img} folder={item?.folder} />
                        <span>{item?.name}</span>
                        <Button className={styles.BuyButton} value={`BUY $${item?.price}`} />
                    </div>
                })}
            </div>
            <div className={styles.MartPanel}>
            <div className={styles.PanelHeading}>Sell</div>
                {listOfItems.map((item, idx) => {
                    const sellPrice = slashPrice(item?.price);
                    return sellPrice && <div className={styles.PurchaseItem}>
                        <ItemIcon img={item?.img} folder={item?.folder} />
                        <span>{item?.name}</span>
                        <Button className={styles.SellButton} value={`SELL $${sellPrice}`} />
                    </div>
                })}
            </div>
        </div>
    </div>
}