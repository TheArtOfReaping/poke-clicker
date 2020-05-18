import React, { useState } from 'react';
import { Panel } from 'components/Panel';
import { stylesheet, classes } from 'typestyle';
import { Checkbox, Select, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useInput } from 'rooks';

const styles = stylesheet({
    InputBase: {
        display: 'block',
        margin: '.25rem',
        marginRight: 'auto',
        textAlign: 'left',
    },
    InputBaseCheckboxFix: {
        marginLeft: '.5rem',
    }
});

export enum CatchMode {
  AllPokemon = 'Catch all Pokémon',
  NewAndShinies = 'Catch new Pokémon and Shinies',
  OnlyShinies = 'Only Shinies',
}


export function OptionsPanel() {
    const [pokeballMode, setPokeballMode] = useState('Until Caught');
    const [catchMode, setCatchMode] = useState(CatchMode.AllPokemon);
    const pokeballAmount = useInput(10);
    const onChange = (e?: CheckboxChangeEvent) => {

    };
    const onChangeSelect = (setter: typeof setCatchMode | typeof setPokeballMode) => (v?: any) => {
        setter(v);
    };


    return (
        <Panel name="Options">
            <Select className={styles.InputBase} value={catchMode} onChange={onChangeSelect(setCatchMode)}>
                <Select.Option value={CatchMode.NewAndShinies}>{CatchMode.NewAndShinies}</Select.Option>
                <Select.Option value={CatchMode.AllPokemon}>{CatchMode.AllPokemon}</Select.Option>
                <Select.Option value={CatchMode.OnlyShinies}>{CatchMode.OnlyShinies}</Select.Option>
            </Select>
            <div style={{display: 'flex'}}>
                <Select className={styles.InputBase} value={pokeballMode} onChange={onChangeSelect(setPokeballMode)}>
                    <Select.Option value={'Until Caught'}>Throw Pokéballs until caught</Select.Option>
                    <Select.Option value={'SpecifiedAmount'}>Throw a specified number of Pokéballs</Select.Option>
                </Select>
                {pokeballMode === 'SpecifiedAmount' && <Input className={styles.InputBase} onChange={onChange} addonBefore='Amount' type='number' {...pokeballAmount} />}
            </div>
            <Checkbox className={classes(styles.InputBase, styles.InputBaseCheckboxFix)} onChange={onChange}>Rotate Through New Catches</Checkbox>
            <Checkbox className={styles.InputBase} onChange={onChange}>Auto use Potions</Checkbox>
            <Checkbox className={styles.InputBase} onChange={onChange}>Automatically Advance Onto Next Route</Checkbox>
        </Panel>
    );
}
