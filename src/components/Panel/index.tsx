import React, { useState } from 'react';
import { style, classes, stylesheet } from 'typestyle';
import { colors } from 'utils';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

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

const styles = stylesheet({
  Header: {
    display: 'flex',
    //justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #444',
    padding: '0.25rem',
    height: '32px',
  },
  Body: {
    padding: '1rem',
  },
  CollapsedBody: {
    display: 'none',
  },
  Overlay: {
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
  },
  OverlayCloser: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    cursor: 'pointer',
  },
  PanelToolbar: {
    borderRadius: '50%',
    padding: '0.25rem',
    marginLeft: 'auto',
    background: colors.primary.shade1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '5rem',
  },
  PanelToolbarItem: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: colors.primary.shade2,
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '4px',
  }
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
        <div className={styles.Overlay}>
          <div onClick={onClickOverlay} className={styles.OverlayCloser}>
            x
          </div>
          {overlayChildren}
        </div>
      )}
      <header className={styles.Header}>
        <img
          style={{ marginRight: '0.25rem', height: '24px' }}
          src={`./images/panel-icons/${name
            .toLocaleLowerCase()
            .replace(/é/g, 'e')}.png`}
          alt=""
        />
        <span>{name}</span>
        <div className={styles.PanelToolbar}>
          <div
            onClick={(e) => setCollapsed(!isCollapsed)}
            className={styles.PanelToolbarItem}
            style={{
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {isCollapsed ? <PlusOutlined /> : <MinusOutlined />}
          </div>
        </div>
      </header>
      <div className={classes(styles.Body, isCollapsed && styles.CollapsedBody)}>
        {children}
      </div>
    </div>
  );
}
