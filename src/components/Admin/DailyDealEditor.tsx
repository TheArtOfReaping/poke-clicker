import React, { useState, useEffect, ChangeEvent } from 'react';
import { stylesheet, classes } from 'typestyle';
import * as queries from 'graphql/queries';
import * as mutations from 'graphql/mutations';
import { graphqlOperation, API } from 'aws-amplify';
import { ItemIcon } from 'components/Inventory';
import { getItem } from 'utils/listOfRoutes';
import { DateTime } from 'luxon';
import { ItemName, colors, listOfItems } from 'utils';
import { useInput } from 'rooks';
import moment from 'moment';
import { Input, Select, DatePicker, Button } from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.dark.css';



const {Option} = Select;



const styles = stylesheet({
    DailyDealEditor: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    DailyDealEditorCore: {
        padding: '0.5rem 1rem',
        border: `1px solid ${colors.primary.tint1}`,
        borderRadius: '.25rem',
        margin: '1rem 0',
        //background: colors.primary.shade1,
    },

    DailyDealTable: {
        width: '40rem',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid white',
        borderColor: colors.primary.tint1,
        borderRadius: '.25rem',
        overflow: 'hidden',
    },
    DailyDealItem: {
        display: 'flex',
        alignItems: 'center',
        background: colors.primary.shade1,
        justifyContent: 'space-around',
        borderTop: `1px solid ${colors.primary.tint1}`,
        $nest: {
            '&:nth-of-type(1)': {
                borderTop: 'none',
            }
        }
    },
    DailyDealItemValue: {
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        background: colors.primary.shade1,
        maxWidth: '100%',
        padding: '4px',
        transition: '200ms all',
        $nest: {
            '&:hover': {
                transition: '200ms all',
                background: colors.primary.tint1,
                cursor: 'pointer',
            }
        }
    },
    DailyDealItemContent: {
        width: '22rem',
    },
    DailyDealItemDate: {
        marginLeft: 'auto',
        width: '8rem',
        justifyContent: 'flex-end',
    },
    DailyDealItemMoney: {
        width: '2rem',
        justifyContent: 'flex-end',
    },
    DailyDealItemPrice: {
        width: '5rem',
        background: colors.red.shade1,
        $nest: {
            '&:hover': {
                background: colors.red.shade2,
            }
        }
    },
    EditorInputs: {
        display: 'flex',
        // background: colors.primary.shade1,
        // color: colors.white.shade1,
        // //padding: '2px',
        // border: `1px solid ${colors.white.shade2}`,
        // margin: '4px',
    },
    EditorInputBase: {
        margin: '2px',
        width: '33%',
    }
    
});

export interface DailyDealItem {
    id: string;
    content: string;
    title: ItemName;
    date: string;
    price: number;
}

export const cheapDiffVal = (s: string) => {
    const [a,b,c] = s.split('/').map(s => Number.parseInt(s));
    return a + (b * 31) + (c * 365);
}


export const Provider = {
    DailyDealsList: function DailyDealsList ({children, dependency}: {children: (dailyDeals: DailyDealItem[]) => React.ReactNode, dependency: string}) {
        const [dailyDeals, setDailyDeals] = useState<DailyDealItem[]>([]);

        useEffect(() => {
            fetchy()
        }, [dependency]);

        async function fetchy() {
            const allDailyDeals = await API.graphql(graphqlOperation(queries.listDailyDeals));
            const {items}:{items: DailyDealItem[]} = (allDailyDeals as any)?.data?.listDailyDeals;
            setDailyDeals(items.sort((a, b) => cheapDiffVal(b.date) - cheapDiffVal(a.date)));
        }

        return <div>
            {children(dailyDeals)}
        </div>
    }
}

const handleChange = (setter: Function) => (v:ItemName) => {console.log(v); setter(v);}
const onDateChoose = (setter: Function) => (date: any, dateString: string) => {
    date && setter(date.format('M/D/YYYY'));
}

const formDailyDeal = ({content, priceOff, date, item}: {content: {value: string}, priceOff: {value: number}, date?: string, item: ItemName}) => {
    const title = item;
    const basePrice = getItem(item)?.price;
    if (!basePrice) {
        throw new Error('No item found');
    }
    if (!date) {
        throw new Error('No date found');
    }
    const price = basePrice * ((100 - priceOff.value) / 100);
    const contentValue = content.value;
    if (!price) {
        throw new Error('Price could not be calculated');
    }
    return {
        content: contentValue,
        price,
        date,
        title,
    }
}

export function DailyDealItem({item, price, discount, content, date, onEdit}: any) {
    return <div className={styles.DailyDealItem}>
        <div style={{width: '42px' }} className={styles.DailyDealItemValue}>{item}</div>
        <div className={classes(styles.DailyDealItemValue, styles.DailyDealItemMoney, styles.DailyDealItemPrice)}>
            {price}
        </div>
        <div className={classes(styles.DailyDealItemValue, styles.DailyDealItemMoney)}>{discount}</div>
        <div className={classes(styles.DailyDealItemValue, styles.DailyDealItemContent)}>{content}</div>
        <div className={classes(styles.DailyDealItemValue, styles.DailyDealItemDate)}>{date}</div>
        <div onClick={onEdit} className={classes(styles.DailyDealItemValue)}>Edit</div>
    </div>
}

const discountRaw = (a?: number, b?: number) => a && b && (100 - ((a / b) * 100));
const discount = (a?: number, b?: number) => `${discountRaw(a, b)?.toFixed(0)}%`;

export type OnChange = (e?: ChangeEvent<HTMLElement>) => void;

export function DailyDealEditor() {
    const content: {value: string, onChange: OnChange} = useInput('');
    const priceOff: {value: number, onChange: OnChange} = useInput(40);
    const [date, setDate] = useState<string>();
    const [item, setItem] = useState<ItemName>('Poké Ball');
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);

    const onSubmit = async (e: React.MouseEvent) => {
        if (!editMode) {
            const dailyDeal = formDailyDeal({content, priceOff, date, item});
            const result = await API.graphql(graphqlOperation(mutations.createDailyDeal, {input: dailyDeal}));
            setId((result as any).data.createDailyDeal.id);
        } else {
            const dailyDeal = { id, ...formDailyDeal({content, priceOff, date, item}) };
            const result = await API.graphql(graphqlOperation(mutations.updateDailyDeal, {input: dailyDeal}));
            setId('');
        }
        setEditMode(false);
    }

    const onEdit = (dailyDeal: DailyDealItem) => (e: any) => {
        content.onChange({...e, target: {value: dailyDeal.content}});
        priceOff.onChange({...e, target: {value: discountRaw(dailyDeal.price, getItem(dailyDeal.title)!.price)}});
        setDate(dailyDeal.date);
        setItem(dailyDeal.title);
        setId(dailyDeal.id);
        setDate(dailyDeal.date);
        setEditMode(true);
    }

    return <div className={styles.DailyDealEditor}>
        <Provider.DailyDealsList dependency={id}>
            {(dailyDeals: DailyDealItem[]) => (<>
                <div className={styles.DailyDealEditorCore}>
                    <div className={styles.EditorInputs}>
                        <Select className={styles.EditorInputBase} value={item} onChange={handleChange(setItem)}>
                            {listOfItems.filter(i => i.price).map((i, idx) => <Option key={idx} value={i.name}><ItemIcon {...getItem(i.name)} />{i.name}</Option>)}
                        </Select>
                        <Input style={{width: '100%'}} placeholder='Content' className={styles.EditorInputBase} type='text' {...content} />
                    </div>
                    <div className={styles.EditorInputs}>
                        <Input placeholder='Discount' addonAfter='%' className={styles.EditorInputBase} type='text' {...priceOff} />
                        <DatePicker className={styles.EditorInputBase} value={moment(date)} onChange={onDateChoose(setDate)} />
                        <Button className={styles.EditorInputBase} disabled={!(content && priceOff && date && item)} onClick={e => onSubmit(e)} type='primary'>{editMode ? 'Edit' : 'Create'}</Button>
                    </div>
                    {editMode && <Button style={{marginTop: '4px'}} type='primary' onClick={e => setEditMode(false)}>Create Mode</Button>}
                </div>

                <div className={styles.DailyDealTable}>
                    <DailyDealItem price='Price' item='Item' content='Content' date='Date' discount='% Off' />
                    {
                        dailyDeals.map((dailyDeal, idx) => <DailyDealItem
                            key={idx}
                            price={`$${dailyDeal.price}`}
                            item={<ItemIcon {...getItem(dailyDeal.title)} />}
                            discount={discount(dailyDeal.price, getItem(dailyDeal.title)!.price)}
                            content={dailyDeal.content}
                            date={dailyDeal.date}
                            onEdit={onEdit(dailyDeal)}
                        />)
                    }
                </div>
            </>)}
        </Provider.DailyDealsList>
    </div>
}