// components/BackButton.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import styles from './BackButton.module.css';

const BackButton: React.FC = () => {
  return (
    <Link href="/order">
      <button className={styles.backButton}>
        戻る
      </button>
    </Link>
  );
};

export default BackButton;
