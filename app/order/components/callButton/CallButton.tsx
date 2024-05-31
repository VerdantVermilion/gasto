"use client";

import React, { useState } from 'react';
import styles from './CallButton.module.css';

const CallButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleYesClick = () => {
    setShowMessagePopup(true);
    setShowPopup(false);
  };

  const handleNoClick = () => {
    setShowPopup(false);
  };

  const handleCloseMessageClick = () => {
    setShowMessagePopup(false);
  };

  return (
    <div>
      <button className={styles.callButton} onClick={handleButtonClick}>Call</button>
      {showPopup && (
        <div className={styles.popup}>
          <p>店員を呼びますか？</p>
          <button onClick={handleYesClick}>はい</button>
          <button onClick={handleNoClick}>いいえ</button>
        </div>
      )}
      {showMessagePopup && (
        <div className={styles.popup}>
          <p>店員を呼び出しています。しばらくお待ちください。</p>
          <button onClick={handleCloseMessageClick} className='close'>閉じる</button>
        </div>
      )}
    </div>
  );
};

export default CallButton;
