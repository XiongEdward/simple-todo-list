import type { ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
    left: ReactNode;
    right: ReactNode;
    overlay?: ReactNode;
}

export const Layout = ({ left, right, overlay }: LayoutProps) => {
    return (
        <div id="layout-container" className={styles.container}>
            <div id="left-panel" className={styles.leftPanel}>
                {left}
            </div>
            <div className={styles.divider}></div>
            <div id="right-panel" className={styles.rightPanel}>
                {right}
            </div>
            {overlay && <div className={styles.overlay}>{overlay}</div>}
        </div>
    );
};
