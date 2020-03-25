import React from 'react';
import { useSelector } from 'react-redux';
import { Types, typeToColor } from '../../utils';
import { style } from 'typestyle';
import { PieChart, Pie, Sector, Cell } from 'recharts';

export const MoveStyle = (type: Types, timeLeft: number) =>
  style({
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    background: typeToColor(type) || 'transparent',
    width: '14rem',
    margin: '4px',
    borderRadius: '4px',
    border: '1px solid #fff',
    fontSize: '1rem',
    cursor: 'pointer',
    opacity: timeLeft !== 0 ? '0.5' : '1',
  });

export const MoveWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  padding: '2px 6px',
  borderRadius: '.25rem',
  margin: '2px',
});

export const MoveStyleImage = style({
  height: '1.5rem',
  margin: '2px',
  marginRight: 'auto',
  filter: 'drop-shadow(0 0 2px white)',
  borderRadius: '50%',
});

export const MoveStyleName = style({
  marginRight: '2rem',
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

export function Move({
  description,
  rank = 1,
  damage = 0,
  totalTime = 20,
  timeLeft = 16,
  name = 'Vine Whip',
  type = Types.Normal,
}: MoveProps) {
  const COLORS = ['#fff', 'transparent'];
  const RADIAN = Math.PI / 180;
  const time = [
    { name: 'totalRemaining', value: totalTime },
    { name: 'timeUsed', value: totalTime - timeLeft },
  ];

  return (
    <div className={MoveStyle(type, timeLeft)}>
      <div className={MoveWrapper}>
        <img
          alt=""
          className={MoveStyleImage}
          src={`./images/type-icons/${type}.png`}
        />
        <span className={MoveStyleName}>{name}</span>
      </div>
      <div className={MoveInfoWrapper}>
        {damage === 0 ? null : <div className={MoveDamage}>DMG: {damage}</div>}

        <PieChart width={40} height={60}>
          <Pie
            dataKey="value"
            data={time}
            paddingAngle={2}
            innerRadius={8}
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
        {
          <div className={MoveDamage}>
            <img alt="" src="./images/panel-icons/star.png" /> {rank}
          </div>
        }
      </div>
    </div>
  );
}
