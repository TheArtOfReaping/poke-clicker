import React from 'react';
import { Panel } from '../../components';
import { Button } from 'components/Button';
import { style, classes } from 'typestyle';
import { listOfRoutes } from 'utils/listOfRoutes';
import { PanelProps } from 'components/Panel';
import { ExpBar } from 'components/ExpBar';
import { useSelector, useDispatch } from 'react-redux';
import { selectRoute, openDialog } from 'actions';
import { styles } from 'styles';

export const RoutesList = style({
  textAlign: 'left',
});

export const Route = style({
  fontSize: '1.25rem',
  cursor: 'pointer',
  opacity: '0.7',
  //display: 'none',
  transition: '200ms all',
  alignItems: 'center',
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
  display: 'flex',
});

export const selectedRoute = style({
  $nest: {
    '&:before': {
      content: `'> '`,
    },
  },
});

export interface MapProps {
  panelProps?: Partial<PanelProps>;
}

export type Map = React.FunctionComponent<MapProps>;
export function Map({panelProps}: MapProps) {
  const selectedRoute = useSelector((state: any) => state.selections.selectedRoute);
  const dispatch = useDispatch();
  return (
    <Panel name="Map" {...panelProps}>
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        Current Region: <Button options={{ smallFont: true }} value="Kanto" />
      </div> */}
      <Button
        onClick={e => dispatch(openDialog({selectedDialog: 1}))}
        options={{ image: './images/ui/pokemart-quest.png' }}
        value={'Go to Pokémart'}
      ></Button>
      <div className={RoutesList}>
        {listOfRoutes.map((r) => (
          <div
            key={r.id}
            className={classes(
              Route,
              r.id === selectedRoute && selectedRoute,
              r.accessible && AccessibleRoute,
              r.visible && VisibleRoute
            )}
            onClick={e => dispatch(selectRoute({routeId: r.id}))}
          >
            {r.name}
            {r.id === selectedRoute && <ExpBar totalExpNeeded={r.defeatNumber || 0} currentExpProgress={2} />}
            {((r?.defeatNumber || 0) > 0) && r.id === selectedRoute && <div style={{fontSize: '0.8rem'}}>2/{r?.defeatNumber}</div>}
          </div>
        ))}
      </div>
    </Panel>
  );
}
