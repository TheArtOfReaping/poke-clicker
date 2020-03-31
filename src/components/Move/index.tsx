import React from 'react';
import { useSelector } from 'react-redux';
import { Types, typeToColor, getContrastColor, colors } from '../../utils';
import { style } from 'typestyle';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import clamp from 'ramda/src/clamp';
import { color } from 'csx';

export const MoveStyle = (type: Types, ready: boolean) =>
  style({
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    background: (ready ? typeToColor(type) : color(typeToColor(type) || 'white').desaturate(0.4).toString()) || 'transparent',
    color: getContrastColor(typeToColor(type) || '#000'),
    width: '14rem',
    margin: '4px',
    borderRadius: '4px',
    border: '1px solid transparent',
    fontSize: '1rem',
    cursor: 'pointer',
    opacity: ready ? '1' : '0.8',
    $nest: {
      '&:hover': {
        boxShadow: ready ? '0 0 .25rem #eee' : 'none',
        transition: '200ms all',
        borderColor: 'white',
      }
    }
  });

export const MoveWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottom: '1px solid white',
  width: '100%',
  padding: '2px',
});

export const MoveInfoWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const MoveDamage = style({
  fontSize: '1.1rem',
  background: '#222',
  color: '#fff',
  padding: '2px 6px',
  borderRadius: '.25rem',
  margin: '2px',
});

export const MoveStyleImage = style({
  height: '1.5rem',
  margin: '2px',
  borderRadius: '50%',
});

export const MoveStyleName = style({
  marginLeft: '0.25rem',
  fontWeight: 'bold',
});

export interface MoveProps {
  name?: string;
  type?: Types;
  description?: string;
  totalTime?: number;
  timeLeft?: number;
  damage?: number;
  rank?: number;
}

  const COLORS = ['#fff', 'rgba(0,0,0,0.2)'];

export function MoveTimer({time}: {time: {name: string, value: number}[]}) {
  return <PieChart width={30} height={30}>
  <Pie
    dataKey="value"
    data={time}
    paddingAngle={2}
    innerRadius={6}
    fill="transparent"
  >
    {time.map((entry, index) => (
      <Cell
        strokeWidth={0}
        key={`cell-${index}`}
        fill={COLORS[index % COLORS.length]}
      />
    ))}
  </Pie>
</PieChart>
}

export function Move({
  description,
  rank = 1,
  damage = 0,
  totalTime = 20,
  timeLeft = 16,
  name = 'Vine Whip',
  type = Types.Normal,
}: MoveProps) {
  const RADIAN = Math.PI / 180;
  const time = [
    { name: 'totalRemaining', value: totalTime - timeLeft },
    { name: 'timeUsed', value: clamp(0, totalTime, timeLeft) },
  ];
  const ready = timeLeft == 0;

  const onClick = () => {
    if (timeLeft === 0) {
      console.log('attack!', name);
    } else {
      console.log('you cannot use this attack yet');
    }
  }

  return (
    <div className={MoveStyle(type, ready)} onClick={onClick}>
      <div className={MoveWrapper}>
        <img
          alt=""
          className={MoveStyleImage}
          src={`./images/type-icons/${type}.png`}
        />
        <span className={MoveStyleName}>{name}</span>
        <div style={{marginLeft: 'auto'}}><MoveTimer time={time} /></div>
      </div>
      <div className={MoveInfoWrapper}>
        {damage === 0 ? null : <div className={MoveDamage}>DMG: {damage}</div>}
        <div className={MoveDamage}>{!ready ? `${timeLeft}s` : 'READY!'}</div>
        <div className={MoveDamage}>
        <span style={{
                      color: colors.gold.get()
                    }}>★</span> {rank}
        </div>
      </div>
    </div>
  );
}
