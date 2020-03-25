import React, { useState } from 'react';
import { style, classes } from 'typestyle';
import { styles } from '../../styles';

export interface PanelProps {
  name: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  overlayChildren?: React.ReactNode;
  overlay?: boolean;
  onClickOverlay?(e?: React.MouseEvent): void;
  className?: string;
}

export const panel = style({
  //padding: '1rem',
  marginTop: '1rem',
  border: '1px solid #444',
  borderRadius: '0.25rem',
  position: 'relative',
});

export const header = style({
  display: 'flex',
  //justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid #444',
  padding: '0.25rem',
});

export const body = style({
  padding: '1rem',
});

export const CollapsedBody = style({
  display: 'none',
});

export const Overlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.85)',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export const OverlayCloser = style({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  cursor: 'pointer',
});

export type Panel = React.FunctionComponent<PanelProps>;
export function Panel({
  name,
  children,
  className,
  overlayChildren = null,
  overlay = false,
  onClickOverlay = (e) => null,
}: PanelProps) {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <div className={classes(panel, className && className)}>
      {overlay && (
        <div className={Overlay}>
          <div onClick={onClickOverlay} className={OverlayCloser}>
            x
          </div>
          {overlayChildren}
        </div>
      )}
      <header className={header}>
        <img
          style={{ marginRight: '0.25rem', height: '24px' }}
          src={`./images/panel-icons/${name
            .toLocaleLowerCase()
            .replace(/é/g, 'e')}.png`}
          alt=""
        />
        <span>{name}</span>
        <div
          onClick={(e) => setCollapsed(!isCollapsed)}
          style={{
            marginLeft: 'auto',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isCollapsed ? '+' : '—'}
        </div>
      </header>
      <div className={classes(body, isCollapsed && CollapsedBody)}>
        {children}
      </div>
    </div>
  );
}
