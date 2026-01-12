import React from 'react';

import styles from './Loading.module.css';

export default function Loading(): React.JSX.Element {
    return <div className={styles.container}>
    <h1 className={styles.header}>Loading...</h1></div>
}