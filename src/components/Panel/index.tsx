import React, { useState } from 'react';
import { style, classes } from 'typestyle';
import { styles } from '../../styles';
import { colors } from 'utils';

export interface PanelProps {
  name: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  overlayChildren?: React.ReactNode;
  overlay?: boolean;
  onClickOverlay?(e?: React.MouseEvent): void;
  className?: string;
  height?: string;
  width?: string;
  visible?: boolean;
}

export const panel = (height: PanelProps['height'], width: PanelProps['width'], isCollapsed: boolean) => style({
  //padding: '1rem',
  //background: 'rgba(0,0,0,0.2)',
  background: colors.primary.shade1,
  margin: '0.25rem',
  border: '1px solid #444',
  borderRadius: '0.25rem',
  position: 'relative',
  height: isCollapsed ? '32px' : height,
  width,
  overflow: 'auto',
  $nest: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const header = style({
  display: 'flex',
  //justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid #444',
  padding: '0.25rem',
  height: '32px',
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
  height = 'auto',
  width = '100%',
  visible = true,
  overlayChildren = null,
  overlay = false,
  onClickOverlay = (e) => null,
}: PanelProps) {
  const [isCollapsed, setCollapsed] = useState(false);

  if (!visible) return null;

  return (
    <div className={classes(panel(height, width, isCollapsed), className && className)}>
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
