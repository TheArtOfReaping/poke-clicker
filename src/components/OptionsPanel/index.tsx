import React from 'react';
import { Panel } from 'components/Panel';
import { stylesheet } from 'typestyle';

const styles = stylesheet({
  OptionsLabel: {
    margin: '4px',
    display: 'flex',
    alignItems: 'center',
  },
});

export function OptionsPanel() {
  return (
    <Panel name="Options">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginRight: 'auto',
          textAlign: 'left',
        }}
      >
        
        <label className={styles.OptionsLabel}>
          Catch{' '}
          <select style={{marginLeft: '2px'}}>
            <option>Only New Pokemon and Shinies</option>
            <option>All Pokemon</option>
          </select>
        </label>
        <label className={styles.OptionsLabel}>
          Number of Pokéballs to throw{' '}
          <select style={{marginLeft: '2px'}}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>Until Caught</option>
          </select>
        </label>
        <label className={styles.OptionsLabel}>
          <input type="checkbox" /> Rotate through new catches
        </label>
        <label className={styles.OptionsLabel}>
          <input type="checkbox" /> Auto-use Potions
        </label>
        <label className={styles.OptionsLabel}>
          <input type="checkbox" /> Automatically advance onto next route
        </label>
      </div>
    </Panel>
  );
}
