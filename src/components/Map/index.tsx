import React from 'react';
import { Panel } from '../../components';
import { Button } from 'components/Button';
import { style, classes } from 'typestyle';
import { listOfRoutes } from 'utils/listOfRoutes';

export const RoutesList = style({
  textAlign: 'left',
});

export const Route = style({
  fontSize: '1.25rem',
  cursor: 'pointer',
  opacity: '0.7',
  display: 'none',
  transition: '200ms all',
  $nest: {
    '&:hover': {
      color: '#34ebe8',
      transition: '200ms all',
    },
  },
});

export const AccessibleRoute = style({
  opacity: '1',
});

export const VisibleRoute = style({
  display: 'block',
});

export const selectedRoute = style({
  $nest: {
    '&:before': {
      content: `'> '`,
    },
  },
});

export interface MapProps {}

export type Map = React.FunctionComponent<MapProps>;
export function Map({}: MapProps) {
  return (
    <Panel name="Map">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        Current Region: <Button options={{ smallFont: true }} value="Kanto" />
      </div>
      <Button
        options={{ image: './images/ui/pokemart-quest.png' }}
        value={'Go to Pokémart'}
      ></Button>
      <div className={RoutesList}>
        {listOfRoutes.map((r) => (
          <div
            key={r.id}
            className={classes(
              Route,
              r.name === 'Route 1' && selectedRoute,
              r.accessible && AccessibleRoute,
              r.visible && VisibleRoute
            )}
          >
            {r.name}
          </div>
        ))}
      </div>
    </Panel>
  );
}
