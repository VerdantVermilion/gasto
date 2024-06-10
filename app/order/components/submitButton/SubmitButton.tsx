"use client";

import React, { useState } from "react";
import styles from "./SubmitButton.module.css";

const SubmitButton: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    onSubmit();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className={styles.submit} onClick={handleClick}>
        注文する
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>注文が確定しました！</p>
            <button onClick={closePopup}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitButton;
