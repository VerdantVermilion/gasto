"use client";

import React from 'react';
import styles from './CenterButton.module.css';

const CenterButton = () => {
  return (
    <div className={styles.container}>
      <p className={styles.button}>写真から選ぶ</p>
      <p className={styles.button}>メニュー番号から選ぶ</p>
      <p className={styles.button}>クーポン番号から選ぶ</p>
      <p className={styles.button}>お持ち帰り</p>
    </div>
  );
};

export default CenterButton;
