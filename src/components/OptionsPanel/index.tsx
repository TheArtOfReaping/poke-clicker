import React from 'react';
import { Panel } from 'components/Panel';
import { stylesheet } from 'typestyle';

const styles = stylesheet({
  OptionsLabel: {
    margin: '4px',
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
          <input type="checkbox" /> Rotate through new catches
        </label>
        <label className={styles.OptionsLabel}>
          Catch{' '}
          <select>
            <option>Only New Pokemon and Shinies</option>
            <option>All Pokemon</option>
          </select>
        </label>
        <label className={styles.OptionsLabel}>
          Number of Pokéballs to throw{' '}
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>Until Caught</option>
          </select>
        </label>
        <label className={styles.OptionsLabel}>
          <input type="checkbox" /> Auto-use Potions
        </label>
      </div>
    </Panel>
  );
}
